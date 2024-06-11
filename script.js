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
