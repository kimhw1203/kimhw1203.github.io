document.addEventListener('DOMContentLoaded', () => {
    const resultData = JSON.parse(localStorage.getItem('bingoResult'));
    const resultDiv = document.getElementById('result');

    if (resultData) {
        resultDiv.innerHTML = `
            <p>You got ${resultData.correctCount} correct answers.</p>
            <p>You achieved ${resultData.bingoCount} bingo(s): ${resultData.grade}</p>
        `;
    } else {
        resultDiv.innerHTML = '<p>No results to display.</
