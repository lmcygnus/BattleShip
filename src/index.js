import './style.css';
import { Player } from './player';
import { Ship } from './ship';

function createGameboard(parent) {
  for (let i = 0; i < 100; i += 1) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.dataset.index = i;
    parent.appendChild(square);
  }
}

const ships = [new Ship(2), new Ship(3), new Ship(4), new Ship(3), new Ship(5)];

const playerGameboard = document.querySelector('.player');
const computerGameboard = document.querySelector('.computer');
const humanPlayer = new Player('You');
const computerPlayer = new Player('Computer');

const placeShipsButton = document.querySelector('.placeRandom');

function getRandomBoolean() {
  return Math.random() >= 0.5;
}

function placeShips(player) {
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

function color(player) {
  const squares = document.querySelectorAll('.square');
  const coords = player.gameboard.ships;
  const indexes = findIndex(coords, player);
  console.log(indexes);
  indexes.forEach((index) => {
    squares[index].style.backgroundColor = '#000000';
  });
}

placeShips(humanPlayer);

createGameboard(playerGameboard);
//createGameboard(computerGameboard);
color(humanPlayer);
