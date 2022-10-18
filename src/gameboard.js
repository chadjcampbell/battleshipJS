class Cell {
  constructor(x, y, occupied = false, beenHit = false) {
    this.x = x
    this.y = y
    this.occupied = occupied
    this.beenHit = beenHit
  }
}

class Gameboard {
  constructor() {
    let gameBoard = []
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        gameBoard.push(new Cell(i, j))
      }
    }
    return gameBoard
  }
  placeShip(coordinates, ship) {
    for (let i = 0; i < ship.length; i++) {
      if (coordinates >= 0 && coordinates <= 100) {
        this[coordinates + i].occupied = ship
      }
    }
  }
  validPlacement(coordinates, ship) {
    for (let i = 0; i < ship.length; i++) {
      if (this[this.coordinatesConverter(coordinates) + i].occupied) {
        return false
      }
    }
  }
  coordinatesConverter(coordinates) {
    return coordinates.join(',')
  }
}

export { Gameboard }
