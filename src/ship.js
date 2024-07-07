class Ship {
  constructor(length) {
    this.length = length;
    this.nHit = 0;
    this.sunk = false;
  }

  hit() {
    this.nHit += 1;
  }

  isSunk() {
    if (this.length <= this.nHit) {
      this.sunk = true;
    }
    return this.sunk;
  }
}

export default { Ship };
