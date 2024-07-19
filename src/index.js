import './style.css';
import { Player } from './player';
import { Ship } from './ship';

const ships = [new Ship(2), new Ship(3), new Ship(4), new Ship(3), new Ship(5)];
const playerGameboard = document.querySelector('.player');
const computerGameboard = document.querySelector('.computer');
const humanPlayer = new Player('You');
const computerPlayer = new Player('Computer');
const placeShipsButton = document.querySelector('.placeRandom');
const startGameButton = document.querySelector('.start');
const resetButton = document.querySelector('.reset');

function createGameboard(parent) {
  for (let i = 0; i < 100; i += 1) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.dataset.index = i;
    parent.appendChild(square);
  }
}

function getRandomBoolean() {
  return Math.random() >= 0.5;
}

function placeShips(player) {
  player.gameboard.deleteAllShips();
  ships.forEach((ship) => {
    const vertical = getRandomBoolean();
    const coord = player.gameboard.randomCoord();
    player.gameboard.placeShips(ship, vertical, coord);
  });
}

function findIndex(coords, player) {
  const result = [];
  coords.forEach((coord) => {
    const index = player.gameboard.findIndex(coord);
    result.push(index);
  });
  return result;
}

function squareColor(player, color, board) {
  placeShips(player);
  const squares = board.querySelectorAll('.square');
  squares.forEach((square) => {
    square.style.backgroundColor = '#ffffff';
  });
  const coords = player.gameboard.ships;
  const indexes = findIndex(coords, player);
  indexes.forEach((index) => {
    squares[index].style.backgroundColor = color;
  });
}

function startGame(board) {
  placeShipsButton.style.display = 'none';
  resetButton.style.display = 'block';

  const squares = board.querySelectorAll('.square');
  squares.forEach((square) => {
    square.addEventListener('click', () => {
      square.style.backgroundColor = 'blue';
    });
  });
}

createGameboard(computerGameboard);
createGameboard(playerGameboard);

placeShipsButton.addEventListener('click', () => {
  squareColor(humanPlayer, 'red', playerGameboard);
  squareColor(computerPlayer, 'white', computerGameboard);
});

startGameButton.addEventListener('click', () => {
  startGame(computerGameboard);
});
