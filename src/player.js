class Player {
  constructor(name = 'Computer') {
    this.name = name
  }
  randomAttack(gameBoard) {
    let randomCell = gameBoard.findCell(this.randomXY())
    if(randomCell.beenHit == false) {
      randomCell.beenHit = true
      if (randomCell.occupied !== null) {
      randomCell.occupied.hit()}
    } else {
      this.randomAttack(gameBoard)
    }
  }
  randomXY(min = 0, max = 9) {
    const randomX = Math.floor(Math.random() * (max - min + 1) + min)
    const randomY = Math.floor(Math.random() * (max - min + 1) + min)
    return [randomX, randomY]
  }
}

export { Player }
