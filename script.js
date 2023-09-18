const content = document.querySelector('.js-content');
let player = 'X';
let historyX = [];
let historyO = [];
const winCombinations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
];

function createMarkup() {
    let markup = '';

    for (let i = 1; i < 10; i += 1) {
        markup += `<div class='item' data-id='${i}'></div>`;
    }

    content.innerHTML = markup;
}
createMarkup();

content.addEventListener('click', onClick);

function onClick(e) {
    const { target } = e;
    if (target === e.currentTarget || target.textContent) return;

    const id = Number(target.dataset.id);
    let result = false;


    if (player === 'X') {
        historyX.push(id);
        result = isWinner(historyX);
    } else {
        historyO.push(id);
        result = isWinner(historyO);
    }

    const isEndGame = historyO.length + historyX.length === 9;
    target.textContent = player;

    if (result) {
        console.log(`Winner ${player}`);
        resetGame();
        return;
    } else if (isEndGame) {
        console.log(`Draw, try again`);
        resetGame();
        return;
    }

    player = player === 'X' ? 'O' : 'X';
}

function isWinner(arr) {
    return winCombinations.some((comb) => comb.every((id) => arr.includes(id)));
}

function resetGame() {
    createMarkup();
    historyX = [];
    historyO = [];
    player = 'X';
}
