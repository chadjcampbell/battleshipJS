class Ship {
  constructor(length, hitNumber = 0, orientation = this.orientation()) {
    this.length = length
    this.hitNumber = hitNumber
    this.orientation = orientation
  }
  hit() {
    this.hitNumber++
  }
  isSunk() {
    if (this.length <= this.hitNumber) return true
    return false
  }
  orientation() {
    return Math.random() < 0.5 ? 'vertical' : 'horizontal'
  }
}

export { Ship }
