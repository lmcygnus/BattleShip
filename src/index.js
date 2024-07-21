import './style.css';
import { Player } from './player';
import { Ship } from './ship';

const DOM = () => {
  const playerGameboard = document.querySelector('.player');
  const computerGameboard = document.querySelector('.computer');
  const humanPlayer = new Player('You');
  const computerPlayer = new Player('Computer');
  const placeShipsButton = document.querySelector('.placeRandom');
  const startGameButton = document.querySelector('.start');
  const resetButton = document.querySelector('.reset');
  const playAgain = document.querySelector('.again');
  const dialog = document.querySelector('dialog');

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
    const ships = [new Ship(2), new Ship(3), new Ship(4), new Ship(3), new Ship(5)];
    player.gameboard.deleteAllShips();
    ships.forEach((ship) => {
      const vertical = getRandomBoolean();
      const coord = player.gameboard.randomCoord();
      player.gameboard.placeShips(ship, vertical, coord);
    });
  }

  function squareColor(player, color, board) {
    const squares = board.querySelectorAll('.square');
    squares.forEach((square) => {
      const sqr = square;
      sqr.style.backgroundColor = '#ffffff';
    });
    const indexes = player.gameboard.ships;
    indexes.forEach((index) => {
      squares[index].style.backgroundColor = color;
    });
  }

  function randomPoint() {
    const point = computerPlayer.gameboard.findIndex(computerPlayer.gameboard.randomCoord());
    if (humanPlayer.gameboard.board[point].attacked === false) {
      return point;
    }
    return randomPoint();
  }

  function checkWinner() {
    const message = dialog.querySelector('.message');
    if (computerPlayer.gameboard.allShipsSunk() === true) {
      message.textContent = `The winner is: ${humanPlayer.name}`;
      dialog.showModal();
    } else if (humanPlayer.gameboard.allShipsSunk() === true) {
      message.textContent = `The winner is: ${computerPlayer.name}`;
      dialog.showModal();
    }
  }

  function computerTurn() {
    const point = randomPoint();
    const squares = playerGameboard.querySelectorAll('.square');
    const square = squares[point];
    if (humanPlayer.gameboard.board[square.dataset.index].ship !== false) {
      square.style.backgroundColor = 'firebrick';
      humanPlayer.gameboard.receiveAttack(point);
    } else {
      square.style.backgroundColor = 'royalblue';
      humanPlayer.gameboard.receiveAttack(point);
    }
    checkWinner();
  }

  function handleSquareClick(event) {
    const square = event.target;
    if (computerPlayer.gameboard.board[square.dataset.index].ship !== false) {
      square.style.backgroundColor = 'salmon';
      computerPlayer.gameboard.receiveAttack(square.dataset.index);
    } else {
      square.style.backgroundColor = 'royalblue';
    }
    computerTurn();
    square.removeEventListener('click', handleSquareClick);
  }

  function startGame(board) {
    placeShipsButton.style.display = 'none';
    resetButton.style.display = 'block';
    const squares = board.querySelectorAll('.square');
    squares.forEach((square) => {
      square.addEventListener('click', handleSquareClick);
    });
  }

  createGameboard(computerGameboard);
  createGameboard(playerGameboard);

  placeShipsButton.addEventListener('click', () => {
    placeShips(humanPlayer);
    placeShips(computerPlayer);
    squareColor(humanPlayer, 'salmon', playerGameboard);
    squareColor(computerPlayer, 'white', computerGameboard);
    startGameButton.style.display = 'block';
  });

  startGameButton.addEventListener('click', () => {
    startGame(computerGameboard);
    startGameButton.style.display = 'none';
  });

  resetButton.addEventListener('click', () => {
    placeShipsButton.style.display = 'block';
    resetButton.style.display = 'none';
    const squares = document.querySelectorAll('.square');
    squares.forEach((square) => {
      const sqr = square;
      sqr.style.backgroundColor = '#ffffff';
      sqr.removeEventListener('click', handleSquareClick);
    });
  });

  playAgain.addEventListener('click', () => {
    placeShipsButton.style.display = 'block';
    const squares = document.querySelectorAll('.square');
    squares.forEach((square) => {
      const sqr = square;
      sqr.style.backgroundColor = '#ffffff';
      sqr.removeEventListener('click', handleSquareClick);
    });
    dialog.close();
  });
};

DOM();
