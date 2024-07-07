import { Gameboard } from './gameboard';

class Player {
  constructor(name) {
    this.name = name;
    this.ships = [];
    this.gameboard = new Gameboard();
  }
}

export default { Player };
