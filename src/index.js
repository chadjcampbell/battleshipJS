import './style.scss'
import { Gameboard } from './gameboard'
import { Player } from './player'
import { Ship } from './ship'

const playerBoard = new Gameboard()
const playerDisplay = document.querySelector('#playerdisplay')

const computerBoard = new Gameboard()
const computerDisplay = document.querySelector('#computerdisplay')

function renderPlayerBoard() {
  playerBoard.gameBoard.forEach((cell) => {
    const cellDiv = document.createElement('div')
    cellDiv.classList.add('cell')
    cellDiv.dataset.x = cell.x
    cellDiv.dataset.y = cell.y
    cellDiv.dataset.occupied = cell.occupied
    cellDiv.dataset.beenHit = cell.beenHit
    playerDisplay.appendChild(cellDiv)
  })
}

renderPlayerBoard()

computerBoard.gameBoard.forEach((cell) => {
  const cellDiv = document.createElement('div')
  cellDiv.classList.add('cell')
  cellDiv.dataset.x = cell.x
  cellDiv.dataset.y = cell.y
  cellDiv.dataset.occupied = cell.occupied
  cellDiv.dataset.beenHit = cell.beenHit
  computerDisplay.appendChild(cellDiv)
})

const playerBoardCells = document.querySelectorAll('.cell')

playerBoardCells.forEach((cellDiv) => {
  cellDiv.addEventListener('click', () => {
    playerBoard.receiveAttack([
      Number(cellDiv.dataset.x),
      Number(cellDiv.dataset.y),
    ])
    updateCell(cellDiv)
  })
})

function updateCell(cellDiv) {
  cellDiv.dataset.beenHit = true
}
