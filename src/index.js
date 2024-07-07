import './style.css';

function createGameboard(parent) {
  for (let i = 0; i < 100; i += 1) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.dataset.index = i;
    parent.appendChild(square);
  }
}

const playerGameboard = document.querySelector('.player');
const computerGameboard = document.querySelector('.computer');

createGameboard(playerGameboard);
createGameboard(computerGameboard);
