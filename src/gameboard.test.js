import { Gameboard } from './gameboard'
import { Ship } from './ship'

test("You've sunk my battleship (ships register hits)", () => {
  const testBoard = new Gameboard()
  const testShip = new Ship(3)
  testBoard.placeShip([1, 4], testShip)
  testBoard.receiveAttack([1, 4])
  testBoard.receiveAttack([2, 4])
  expect(testShip.hitNumber).toBe(2)
})
