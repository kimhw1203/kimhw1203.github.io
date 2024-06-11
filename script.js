const gradeMapping = {
    1: 'D+',
    2: 'C0',
    3: 'C+',
    4: 'B0',
    5: 'B+',
    6: 'A0',
    7: 'A+'
};

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

        fetch('/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                student_id: 'student123',
                answers: answers
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
            } else {
                document.getElementById('feedback').innerHTML = `You got ${data.correct_count} correct answers.`;
            }
        });
    });
});
