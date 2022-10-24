import './style.scss'
import { Gameboard } from './gameboard'
import { Player } from './player'

const playerBoard = new Gameboard()
const playerDisplay = document.querySelector('#playerdisplay')

const computerBoard = new Gameboard()
const computerDisplay = document.querySelector('#computerdisplay')
const computerAI = new Player()

playerBoard.randomPlacement()
computerBoard.randomPlacement()

function renderPlayerBoard() {
  playerDisplay.innerHTML = ''
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
  computerDisplay.innerHTML = ''
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

function playerTurn() {
  const computerBoardCells = document.querySelectorAll('.computerCell')
  computerBoardCells.forEach((cellDiv) => {
    cellDiv.addEventListener('click', () => {
      computerBoard.receiveAttack([
        Number(cellDiv.dataset.x),
        Number(cellDiv.dataset.y),
      ])
      renderComputerBoard()
      computerAI.randomAttack(playerBoard)
      renderPlayerBoard()
      gameLoop()
    })
  })
}

//main game loop

function gameLoop() {
  if (!playerBoard.fleetSunk() && !computerBoard.fleetSunk()) {
    playerTurn()
  } else if (playerBoard.fleetSunk()) {
    alert('You Lose!')
  } else if (computerBoard.fleetSunk()) {
    alert('You Win!')
  }
}

playerTurn()
