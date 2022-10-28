import { Ship } from '../src/ship'
import { Gameboard } from '../src/gameboard'
import { Player } from '../src/player'

const testPlayer = new Player()
const testBoard = new Gameboard()
const testShip = new Ship(3)

//This tests both Player class methods
test('100 random attacks, all cells hit?', () => {
  testBoard.placeShip([1, 4], testShip)
  for (let i = 0; i < 100; i++) {
    testPlayer.randomAttack(testBoard)
  }
  let totalHits = 0
  for (let i = 0; i < 100; i++) {
    if (testBoard.gameBoard[i].beenHit == true) totalHits++
  }
  expect(totalHits).toBe(100)
})
