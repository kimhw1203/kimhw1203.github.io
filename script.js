const questions = [
    'Question 1', 'Question 2', 'Question 3', 'Question 4', 'Question 5',
    'Question 6', 'Question 7', 'Question 8', 'Question 9', 'Question 10',
    'Question 11', 'Question 12', 'Question 13', 'Question 14', 'Question 15',
    'Question 16', 'Question 17', 'Question 18', 'Question 19', 'Question 20',
    'Question 21', 'Question 22', 'Question 23', 'Question 24', 'Question 25'
];

const correctAnswers = [
    'Answer1', 'Answer2', 'Answer3', 'Answer4', 'Answer5',
    'Answer6', 'Answer7', 'Answer8', 'Answer9', 'Answer10',
    'Answer11', 'Answer12', 'Answer13', 'Answer14', 'Answer15',
    'Answer16', 'Answer17', 'Answer18', 'Answer19', 'Answer20',
    'Answer21', 'Answer22', 'Answer23', 'Answer24', 'Answer25'
];

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

document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('bingo-board');

    questions.forEach((question, index) => {
        const cell = document.createElement('div');
        cell.innerHTML = `<p>${question}</p><input type="text" id="answer-${index}">`;
        board.appendChild(cell);
    });

    document.getElementById('quiz-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const studentId = document.getElementById('student-id').value.trim();
        const answers = [];
        questions.forEach((_, index) => {
            answers.push(document.getElementById(`answer-${index}`).value.trim());
        });

        let correctCount = 0;
        const boardState = answers.map((answer, index) => {
            if (answer.toLowerCase() === correctAnswers[index].toLowerCase()) {
                correctCount++;
                return true;
            }
            return false;
        });

        const bingoCount = checkBingo(boardState);

        let grade;
        if (correctCount === 0) {
            grade = 'F';
        } else if (bingoCount === 0) {
            grade = 'D0';
        } else {
            grade = gradeMapping[bingoCount] || 'F';
        }

        const resultData = {
            correctCount: correctCount,
            bingoCount: bingoCount,
            grade: grade
        };

        localStorage.setItem('bingoResult', JSON.stringify(resultData));
        window.location.href = 'result.html';
    });
});
