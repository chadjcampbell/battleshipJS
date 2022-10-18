class Ship {
  constructor(length, hitNumber = 0) {
    this.length = length
    this.hitNumber = hitNumber
  }
  hit() {
    this.hitNumber++
  }
  isSunk() {
    if (this.length <= this.hitNumber) return true
    return false
  }
}

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
    this.gameBoard = []
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        this.gameBoard.push(new Cell(i, j))
      }
    }
  }
  placeShip(coordinates, ship) {
    if (this.validPlacement(coordinates, ship)) {
      for (let i = 0; i < ship.length; i++) {
        coordinates[0] = coordinates[0] + i
        this.findCell(coordinates).occupied = ship
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
    this.findCell(coordinates).beenHit === true
    if (this.findCell(coordinates).occupied !== null)
      this.findCell(coordinates).occupied.hit()
  }
}

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
    if (this.board.validPlacement(this.randomXY(), this.carrier)) {
      this.board.placeShip(this.randomXY(), this.carrier)
    }
  }
  randomXY(min = 0, max = 9) {
    const randomX = Math.floor(Math.random() * (max - min + 1) + min)
    const randomY = Math.floor(Math.random() * (max - min + 1) + min)
    return [randomX, randomY]
  }
}

const testBoard = new Gameboard()
const testShip = new Ship(3)

console.log(testBoard.validPlacement([1, 4], testShip))
testBoard.placeShip([1, 4], testShip)
console.log(testShip.length)
console.log(testBoard.findCell([1, 4]))
console.log(testBoard.validPlacement([1, 4], testShip))
testBoard.receiveAttack([1, 4])
console.log(testShip)

const testPlayer = new Player()

testPlayer.randomPlacement()
console.log(testPlayer.board)
console.log()
