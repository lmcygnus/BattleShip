const { Ship } = require('./ship');
const { Gameboard } = require('./gameboard').default;

const newShip = new Ship(3);
const gameb = new Gameboard();

test('is sunk', () => {
  newShip.hit();
  newShip.hit();
  newShip.hit();
  newShip.isSunk();
  expect(newShip.sunk).toBeTruthy();
});

test('find index', () => {
  expect(gameb.findIndex([0, 1])).toBe(1);
});

test('is coordinate valid', () => {
  expect(gameb.isValid(newShip, [10, 10])).toBeFalsy();
});

test('can place ship', () => {
  expect(gameb.canPlace(newShip, [9, 9], false)).toBeFalsy();
});

test('place ship at specific coordinates', () => {
  const index = gameb.findIndex([4, 4]);
  gameb.placeShips(newShip, false, [4, 4]);
  expect(gameb.board[index]).not.toBeFalsy();
});

test('records missed atacks', () => {
  gameb.receiveAttack([1, 1]);
  expect(gameb.missedAtacks).toContainEqual([1, 1]);
});

test('all ships are sunk', () => {
  gameb.placeShips(newShip, false, [4, 4]);
  gameb.receiveAttack([4, 4]);
  gameb.receiveAttack([4, 5]);
  gameb.receiveAttack([4, 6]);
  expect(gameb.allShipsSunk()).toBeTruthy();
});
