import { Ship } from './ship'

class Cell {
  constructor(x, y, occupied = null, beenHit = false) {
    this.x = x
    this.y = y
    this.occupied = occupied
    this.beenHit = beenHit
  }
}

class Gameboard {
  constructor() {
    this.gameBoard = this.gameBoard || this.makeGameboard()
    this.carrier = this.carrier || new Ship(5)
    this.battleship = this.battleship || new Ship(4)
    this.destroyer = this.destroyer || new Ship(3)
    this.submarine = this.submarine || new Ship(3)
    this.patrolBoat = this.patrolBoat || new Ship(2)
  }

  makeGameboard() {
    let gameBoard = []
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        gameBoard.push(new Cell(i, j))
      }
    }
    return gameBoard
  }
  placeShip(coordinates, ship) {
    if (this.validPlacement(coordinates, ship)) {
      for (let i = 0; i < ship.length; i++) {
        let tempCoords = [coordinates[0] + i, coordinates[1]]
        this.findCell(tempCoords).occupied = ship
      }
    }
  }
  validPlacement(coordinates, ship) {
    for (let i = 0; i < ship.length; i++) {
      let tempCoords = [coordinates[0] + i, coordinates[1]]
      if (
        this.findCell(tempCoords) == undefined ||
        this.findCell(tempCoords).occupied !== null
      ) {
        return false
      }
    }
    return true
  }
  findCell(coordinates) {
    return this.gameBoard.find(
      (obj) => obj.x === coordinates[0] && obj.y === coordinates[1]
    )
  }
  receiveAttack(coordinates) {
    if (this.findCell(coordinates).beenHit === true) return false
    this.findCell(coordinates).beenHit = true
    if (this.findCell(coordinates).occupied !== null)
      this.findCell(coordinates).occupied.hit()
  }
  fleetSunk() {
    if (
      this.carrier.isSunk() &&
      this.battleship.isSunk() &&
      this.destroyer.isSunk() &&
      this.submarine.isSunk() &&
      this.patrolBoat.isSunk()
    ) {
      return true
    }
    return false
  }
  randomPlacement() {
    let fleet = [
      this.carrier,
      this.battleship,
      this.destroyer,
      this.submarine,
      this.patrolBoat,
    ]
    let binder = this
    function tryPlacement(fleet) {
      if (fleet.length === 0) return
      let randomCell = binder.findCell(binder.randomXY())
      if (binder.validPlacement([randomCell.x, randomCell.y], fleet[0])) {
        binder.placeShip([randomCell.x, randomCell.y], fleet[0])
        fleet.shift()
        tryPlacement(fleet)
      } else {
        tryPlacement(fleet)
      }
    }
    tryPlacement(fleet)
  }
  randomXY(min = 0, max = 9) {
    const randomX = Math.floor(Math.random() * (max - min + 1) + min)
    const randomY = Math.floor(Math.random() * (max - min + 1) + min)
    return [randomX, randomY]
  }
}

export { Gameboard }
