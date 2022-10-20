import { Ship } from "./ship";
import { Gameboard } from "./gameboard";
import { Player } from "./player";

const testPlayer = new Player()
const testBoard = new Gameboard()
const testShip = new Ship(3)

testBoard.placeShip([1, 4], testShip)
for (let i = 0; i < 100 ; i++) {
    testPlayer.randomAttack(testBoard)
  }
test('100 random attacks, all cells hit?', (testBoard) => {
    for (let i = 0; i < 100; i++) {
        expect(testBoard[i].beenHit).toBe(true)
    }
});