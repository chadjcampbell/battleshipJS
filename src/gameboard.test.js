import { Gameboard } from './gameboard'
import { Ship } from './ship'
import { Player } from './player'

test("You've sunk my battleship (ships register hits)", () => {
  const testBoard = new Gameboard()
  const testShip = new Ship(3)
  testBoard.placeShip([1, 4], testShip)
  testBoard.receiveAttack([1, 4])
  testBoard.receiveAttack([2, 4])
  expect(testShip.hitNumber).toBe(2)
})

test("You've sunk all my ships and won the game! (testing fleetSunk)", () => {
  const testPlayer = new Player()
  const testBoard = new Gameboard()
  testBoard.placeShip([1, 1], testBoard.carrier)
  testBoard.placeShip([1, 2], testBoard.battleship)
  testBoard.placeShip([1, 3], testBoard.destroyer)
  testBoard.placeShip([1, 4], testBoard.submarine)
  testBoard.placeShip([1, 5], testBoard.patrolBoat)
  for (let i = 0; i < 100; i++) {
    testPlayer.randomAttack(testBoard)
  }
  expect(testBoard.fleetSunk()).toBe(true)
})
