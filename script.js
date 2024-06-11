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
    'A': 3,
    'B': 2,
    'C': 1
};

let lastSubmitTime = 0;

document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('bingo-board');

    questions.forEach((question, index) => {
        const cell = document.createElement('div');
        cell.innerHTML = `<p>${question}</p><input type="text" id="answer-${index}">`;
        board.appendChild(cell);
    });

    document.getElementById('quiz-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const currentTime = new Date().getTime();
        if (currentTime - lastSubmitTime < 60000) {
            alert('You can submit answers once every minute.');
            return;
        }

        lastSubmitTime = currentTime;

        const answers = [];
        questions.forEach((_, index) => {
            answers.push(document.getElementById(`answer-${index}`).value.trim());
        });

        // 학생의 학번 및 등급 처리 (여기에서는 고정된 학번 및 등급을 사용)
        const studentGrade = 'B'; // 예제에서는 B등급 학생으로 고정

        // 정답 확인
        let correctCount = 0;
        correctAnswers.forEach((correctAnswer, index) => {
            const userAnswer = document.getElementById(`answer-${index}`).value.trim();
            if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
                correctCount++;
            }
        });

        // 등급에 따른 보너스 정답 처리
        if (gradeMapping[studentGrade]) {
            correctCount += gradeMapping[studentGrade];
        }

        // 피드백 출력
        document.getElementById('feedback').innerHTML = `You got ${correctCount} correct answers.`;
    });
});
