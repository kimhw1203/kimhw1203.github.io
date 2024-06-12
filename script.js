const questions = [
    'What is 5 + 5?', 'What is 12 - 5?', 'What is 7 * 3?', 'What is 20 / 4?', 'What is 15 % 4?',
    'What is 3 + 8?', 'What is 14 - 6?', 'What is 8 * 2?', 'What is 16 / 2?', 'What is 18 % 5?',
    'What is 2 + 3?', 'What is 13 - 7?', 'What is 6 * 2?', 'What is 24 / 6?', 'What is 17 % 3?',
    'What is 4 + 6?', 'What is 11 - 8?', 'What is 9 * 2?', 'What is 30 / 5?', 'What is 22 % 4?',
    'What is 1 + 4?', 'What is 15 - 9?', 'What is 5 * 3?', 'What is 18 / 3?', 'What is 19 % 6?'
];

const correctAnswers = [
    { answer: 10, tolerance: 1 }, { answer: 7, tolerance: 1 }, { answer: 21, tolerance: 2 }, { answer: 5, tolerance: 0.5 }, { answer: 3, tolerance: 0.2 },
    { answer: 11, tolerance: 1 }, { answer: 8, tolerance: 1 }, { answer: 16, tolerance: 2 }, { answer: 8, tolerance: 0.5 }, { answer: 3, tolerance: 0.2 },
    { answer: 5, tolerance: 0.5 }, { answer: 6, tolerance: 1 }, { answer: 12, tolerance: 1 }, { answer: 4, tolerance: 0.5 }, { answer: 2, tolerance: 0.2 },
    { answer: 10, tolerance: 1 }, { answer: 3, tolerance: 0.5 }, { answer: 18, tolerance: 1 }, { answer: 6, tolerance: 0.5 }, { answer: 2, tolerance: 0.2 },
    { answer: 5, tolerance: 0.5 }, { answer: 6, tolerance: 1 }, { answer: 15, tolerance: 1 }, { answer: 6, tolerance: 0.5 }, { answer: 1, tolerance: 0.2 }
];

// 학번에 따른 등급 데이터 (예시)
const studentGrades = {
    "student1": 1,
    "student2": 2,
    "student3": 3,
    "student4": 4,
    "student5": 5
};

const gradeMapping = {
    1: 'D+',
    2: 'C0',
    3: 'C+',
    4: 'B0',
    5: 'B+',
    6: 'A0',
    7: 'A+'
};

function checkBingo(board) {
    let bingoCount = 0;
    // Check rows
    for (let row = 0; row < 5; row++) {
        if (board.slice(row * 5, row * 5 + 5).every(val => val)) {
            bingoCount++;
        }
    }
    // Check columns
    for (let col = 0; col < 5; col++) {
        if ([0, 1, 2, 3, 4].every(row => board[row * 5 + col])) {
            bingoCount++;
        }
    }
    // Check diagonals
    if ([0, 1, 2, 3, 4].every(i => board[i * 5 + i])) {
        bingoCount++;
    }
    if ([0, 1, 2, 3, 4].every(i => board[i * 5 + (4 - i)])) {
        bingoCount++;
    }
    return bingoCount;
}

function isWithinTolerance(userAnswer, correctAnswer, tolerance) {
    return Math.abs(userAnswer - correctAnswer) <= tolerance;
}

function canSubmit() {
    const lastSubmitTime = localStorage.getItem('lastSubmitTime');
    if (!lastSubmitTime) {
        return true;
    }
    const currentTime = Date.now();
    return (currentTime - lastSubmitTime) >= 30000; // 60초 제한
}

function updateLastSubmitTime() {
    localStorage.setItem('lastSubmitTime', Date.now());
}

document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('bingo-board');

    questions.forEach((question, index) => {
        const cell = document.createElement('div');
        cell.innerHTML = `<p>${question}</p><input type="text" id="answer-${index}">`;
        board.appendChild(cell);
    });

    document.getElementById('quiz-form').addEventListener('submit', function(event) {
        event.preventDefault();

        if (!canSubmit()) {
            alert('30초에 한 번만 제출 가능합니다.');
            return;
        }

        const studentId = document.getElementById('student-id').value.trim();
        const grade = studentGrades[studentId] || 5; // 학번에 따른 등급 조회, 기본값은 5 (0문제 정답처리)
        const autoCorrectCount = 5 - grade; // 자동으로 정답 처리할 문제 수

        const answers = [];
        questions.forEach((_, index) => {
            answers.push(parseFloat(document.getElementById(`answer-${index}`).value.trim()));
        });

        let correctCount = 0;
        const boardState = Array(25).fill(false);
        const resultDetails = Array(25).fill('Incorrect');

        // 자동 정답 처리
        for (let i = 0; i < autoCorrectCount; i++) {
            boardState[i] = true;
            resultDetails[i] = 'Auto Correct';
            correctCount++;
        }

        // 나머지 문제 정답 확인
        answers.forEach((answer, index) => {
            if (!boardState[index]) {
                if (isWithinTolerance(answer, correctAnswers[index].answer, correctAnswers[index].tolerance)) {
                    resultDetails[index] = `Within Tolerance (Correct: ${correctAnswers[index].answer})`;
                } else if (answer === correctAnswers[index].answer) {
                    boardState[index] = true;
                    resultDetails[index] = 'Correct';
                    correctCount++;
                }
            }
        });

        const bingoCount = checkBingo(boardState);

        let finalGrade;
        if (correctCount === 0) {
            finalGrade = 'F';
        } else if (bingoCount === 0) {
            finalGrade = 'D0';
        } else {
            finalGrade = gradeMapping[bingoCount] || 'F';
        }

        const resultData = {
            correctCount: correctCount,
            bingoCount: bingoCount,
            grade: finalGrade,
            resultDetails: resultDetails
        };

        localStorage.setItem('bingoResult', JSON.stringify(resultData));
        updateLastSubmitTime();
        window.location.href = 'result.html';
    });
});
