class Player {
  constructor(name = 'Computer') {
    this.name = name
  }
  randomAttack(coordinates, gameBoard) {}
  randomXY(min = 0, max = 9) {
    const randomX = Math.floor(Math.random() * (max - min + 1) + min)
    const randomY = Math.floor(Math.random() * (max - min + 1) + min)
    return [randomX, randomY]
  }
}

export { Player }
