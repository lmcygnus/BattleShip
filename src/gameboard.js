/* eslint-disable no-restricted-syntax */
import { Square } from './square';

class Gameboard {
  constructor() {
    this.board = this.createGameboard();
    this.ships = [];
    this.missedAttacks = [];
  }

  createGameboard() {
    const board = [];
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        board.push(new Square([i, j]));
      }
    }
    return board;
  }

  randomCoord() {
    function randomNum() {
      return Math.floor(Math.random() * 10);
    }
    const coord = [randomNum(), randomNum()];
    return coord;
  }

  findIndex(rCoord) {
    return this.board.findIndex((sqr) => sqr.coord[0] === rCoord[0] && sqr.coord[1] === rCoord[1]);
  }

  canPlace(ship, coord, vertical = false) {
    const index = this.findIndex(coord);
    for (let i = 0; i < ship.length; i += 1) {
      if (vertical === false) {
        if ((index + i) >= this.board.length || this.board[index + i].ship !== false) {
          return false;
        }
      } else if ((index + (i * 10)) >= this.board.length || this.board[index + (i * 10)].ship !== false) {
        return false;
      }
    }
    return true;
  }

  isValid(ship, coord) {
    if (ship.length + coord[0] > 10 || ship.length + coord[1] > 10) {
      return false;
    }
    return true;
  }

  placeShips(ship, vertical = false, rCoord) {
    if (this.isValid(ship, rCoord) && this.canPlace(ship, rCoord, vertical)) {
      const index = this.findIndex(rCoord);
      for (let i = 0; i < ship.length; i += 1) {
        if (vertical === false) {
          this.board[index + i].ship = ship;
          this.ships.push(this.findIndex(this.board[index + i].coord));
        } else {
          this.board[index + (i * 10)].ship = ship;
          this.ships.push(this.findIndex(this.board[index + (i * 10)].coord));
        }
      }
      return this.board;
    }
    const newCoord = this.randomCoord();
    this.placeShips(ship, vertical, newCoord);
  }

  receiveAttack(sCoord) {
    const index = sCoord;
    const square = this.board[index];
    square.attacked = true;
    if (square.ship !== false) {
      square.ship.hit();
      return true;
    }
    this.missedAttacks.push(sCoord);
    return false;
  }

  allShipsSunk() {
    return this.ships.every((index) => {
      const sqr = this.board[index];
      return sqr.attacked;
    });
  }

  deleteAllShips() {
    this.ships = [];
    this.board = this.createGameboard();
  }
}

export { Gameboard };
