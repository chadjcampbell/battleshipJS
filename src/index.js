import './style.scss'
import { Gameboard } from './gameboard'
import { Player } from './player'

const playerBoard = new Gameboard()
const playerDisplay = document.querySelector('#playerdisplay')

const computerBoard = new Gameboard()
const computerDisplay = document.querySelector('#computerdisplay')
const computerAI = new Player()

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

//Clone player board for manual placement popup
let playerDisplayClone = playerDisplay.cloneNode(true)
const popup = document.querySelector('#popup')
popup.appendChild(playerDisplayClone)

//Manual placement popup listeners
const randomButton = document.querySelector('#randomButton')
randomButton.addEventListener('click', () => {
  playerBoard.gameBoard = playerBoard.makeGameboard()
  playerBoard.randomPlacement()
  renderPlayerBoard()
  playerDisplayClone.innerHTML = ''
  playerDisplayClone = playerDisplay.cloneNode(true)
  popup.appendChild(playerDisplayClone)
  popup.appendChild(manualButton)
})
const startButton = document.querySelector('#startButton')
startButton.addEventListener('click', () => {
  if (playerBoard.fleetPlaced()) {
    popup.style.display = 'none'
  } else {
    alert('You must place all your ships!')
  }
})

const manualButton = document.createElement('button')
manualButton.innerHTML = ''
manualButton.id = 'manualButton'
manualButton.textContent = 'Manual Ship Placement'
popup.appendChild(manualButton)
