const gradeMapping = {
    1: 'D+',
    2: 'C0',
    3: 'C+',
    4: 'B0',
    5: 'B+',
    6: 'A0',
    7: 'A+'
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

        const studentId = document.getElementById('student-id').value.trim();
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
                student_id: studentId,
                answers: answers
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
            } else {
                const feedback = document.getElementById('feedback');
                feedback.innerHTML = `You got ${data.correct_count} correct answers.<br>`;
                if (data.bingo_count in gradeMapping) {
                    feedback.innerHTML += `You achieved ${data.bingo_count} bingo(s): ${gradeMapping[data.bingo_count]}`;
                } else {
                    feedback.innerHTML += `You achieved ${data.bingo_count} bingo(s).`;
                }
            }
        });
    });
});
