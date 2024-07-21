class Ship {
  constructor(length) {
    this.length = length;
    this.nHit = 0;
  }

  hit() {
    this.nHit += 1;
  }

  isSunk() {
    return this.nHit >= this.length;
  }
}

export { Ship };
