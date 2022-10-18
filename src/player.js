import { Ship } from './ship'
import { Gameboard } from './gameboard'

class Player {
  constructor(name = 'Computer') {
    this.name = name
    this.board = new Gameboard()
    this.carrier = new Ship(5)
    this.battleship = new Ship(4)
    this.destroyer = new Ship(3)
    this.submarine = new Ship(3)
    this.patrolBoat = new Ship(2)
  }
  randomPlacement() {
    while (
      this.board.validPlacement((randomCoords = this.randomXY), this.carrier)
    ) {
      this.board.placeShip(randomCoords, this.carrier)
    }
  }
  randomXY(min = 0, max = 9) {
    const randomX = Math.floor(Math.random() * (max - min + 1) + min)
    const randomY = Math.floor(Math.random() * (max - min + 1) + min)
    return [randomX, randomY]
  }
}

export { Player }
