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

export { Ship }
