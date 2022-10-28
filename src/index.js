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

//Ship names for manual placement
let manualPlacementDisplay = document.createElement('div')
manualPlacementDisplay.id = 'manualPlacementDisplay'

//Toggle switch for ship orientation

//Clone player board for placement popup
let playerDisplayClone = playerDisplay.cloneNode(true)
const popup = document.querySelector('#popup')
popup.appendChild(manualPlacementDisplay)
popup.appendChild(playerDisplayClone)

//Popup div button listeners
const randomButton = document.querySelector('#randomButton')
randomButton.addEventListener('click', () => {
  manualButton.style.display = 'none'
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

//Button and arrays to cycle through manual ship placement
const manualButton = document.createElement('button')
manualButton.innerHTML = ''
manualButton.id = 'manualButton'
manualButton.textContent = 'Manual Ship Placement'
popup.appendChild(manualButton)

let playerBoardFleet = [
  playerBoard.carrier,
  playerBoard.battleship,
  playerBoard.destroyer,
  playerBoard.submarine,
  playerBoard.patrolBoat,
]

let playerBoardFleetNames = [
  'Carrier',
  'Battleship',
  'Destroyer',
  'Submarine',
  'Patrol Boat',
]

function manualShipCycle() {
  manualButton.addEventListener('click', () => {
    randomButton.style.display = 'none'
    manualPlacementDisplay.textContent = `Place your ${playerBoardFleetNames[0]}`
    let ship = playerBoardFleet[0]
    let playerBoardCells = document.querySelectorAll('.playerCell')
    playerBoardCells.forEach((cellDiv) => {
      cellDiv.addEventListener('click', () => {
        if (
          !playerBoard.validPlacement(
            [Number(cellDiv.dataset.x), Number(cellDiv.dataset.y)],
            ship
          )
        ) {
          manualPlacementDisplay.textContent = 'Invalid placement, try again'
          setTimeout(() => {
            manualPlacementDisplay.textContent = `Place your ${playerBoardFleetNames[0]}`
          }, 1000)
          return
        }
        playerBoard.placeShip(
          [Number(cellDiv.dataset.x), Number(cellDiv.dataset.y)],
          ship
        )
        renderPlayerBoard()
        playerDisplayClone.innerHTML = ''
        playerDisplayClone = playerDisplay.cloneNode(true)
        popup.appendChild(playerDisplayClone)
        popup.appendChild(manualButton)
        playerBoardFleetNames.shift()
        playerBoardFleet.shift()
        manualButton.textContent = `Next Up: ${playerBoardFleetNames[0]}`
        if (playerBoardFleetNames.length == 0) {
          manualButton.style.display = 'none'
          manualPlacementDisplay.textContent = 'Ready to start!'
        }
      })
    })
  })
}
manualShipCycle()
