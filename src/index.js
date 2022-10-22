import './style.scss'
import { Gameboard } from './gameboard'
import { Player } from './player'
import { Ship } from './ship'

const playerBoard = new Gameboard()
const playerDisplay = document.querySelector('#playerdisplay')

const computerBoard = new Gameboard()
const computerDisplay = document.querySelector('#computerdisplay')

playerBoard.gameBoard.forEach((cell) => {
  const cellDiv = document.createElement('div')
  cellDiv.classList.add('cell')
  playerDisplay.appendChild(cellDiv)
})

computerBoard.gameBoard.forEach((cell) => {
  const cellDiv = document.createElement('div')
  cellDiv.classList.add('cell')
  computerDisplay.appendChild(cellDiv)
})
