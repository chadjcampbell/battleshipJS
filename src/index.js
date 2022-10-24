import './style.scss'
import { Gameboard } from './gameboard'
import { Player } from './player'
import { Ship } from './ship'

const playerBoard = new Gameboard()
const playerDisplay = document.querySelector('#playerdisplay')

const computerBoard = new Gameboard()
const computerDisplay = document.querySelector('#computerdisplay')

playerBoard.randomPlacement()
computerBoard.randomPlacement()

function renderPlayerBoard() {
  playerBoard.gameBoard.forEach((cell) => {
    const cellDiv = document.createElement('div')
    cellDiv.classList.add('playerCell')
    cellDiv.dataset.x = cell.x
    cellDiv.dataset.y = cell.y
    cellDiv.dataset.occupied = cell.occupied
    cellDiv.dataset.beenHit = cell.beenHit
    playerDisplay.appendChild(cellDiv)
  })
}

renderPlayerBoard()

function renderComputerBoard() {
  computerBoard.gameBoard.forEach((cell) => {
    const cellDiv = document.createElement('div')
    cellDiv.classList.add('computerCell')
    cellDiv.dataset.x = cell.x
    cellDiv.dataset.y = cell.y
    cellDiv.dataset.occupied = cell.occupied
    cellDiv.dataset.beenHit = cell.beenHit
    computerDisplay.appendChild(cellDiv)
  })
}

renderComputerBoard()

const playerBoardCells = document.querySelectorAll('.playerCell')

playerBoardCells.forEach((cellDiv) => {
  cellDiv.addEventListener('click', () => {
    playerBoard.receiveAttack([
      Number(cellDiv.dataset.x),
      Number(cellDiv.dataset.y),
    ])
    updateCell(cellDiv)
  })
})

const computerBoardCells = document.querySelectorAll('.computerCell')

computerBoardCells.forEach((cellDiv) => {
  cellDiv.addEventListener('click', () => {
    computerBoard.receiveAttack([
      Number(cellDiv.dataset.x),
      Number(cellDiv.dataset.y),
    ])
    updateCell(cellDiv)
  })
})

function updateCell(cellDiv) {
  cellDiv.dataset.beenHit = true
}
