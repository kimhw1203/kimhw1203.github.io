document.addEventListener('DOMContentLoaded', () => {
    const resultData = JSON.parse(localStorage.getItem('bingoResult'));
    const resultBoard = document.getElementById('result-board');
    resultBoard.classList.add('result-board');
    const resultSummary = document.getElementById('result-summary');

    if (resultData) {
        for (let i = 0; i < 25; i++) {
            const cell = document.createElement('div');
            cell.innerText = resultData.resultDetails[i];
            cell.classList.add('result-cell');
            resultBoard.appendChild(cell);
        }
        resultSummary.innerHTML = `
            <p>You got ${resultData.correctCount} correct answers.</p>
            <p>You achieved ${resultData.bingoCount} bingo(s): ${resultData.grade}</p>
        `;
    } else {
        resultSummary.innerHTML = '<p>No results to display.</p>';
    }
});
