/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Gameboard": () => (/* binding */ Gameboard)
/* harmony export */ });
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/ship.js");

class Cell {
  constructor(x, y) {
    let occupied = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    let beenHit = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    this.x = x;
    this.y = y;
    this.occupied = occupied;
    this.beenHit = beenHit;
  }
}
class Gameboard {
  constructor() {
    this.gameBoard = this.gameBoard || this.makeGameboard();
    this.carrier = this.carrier || new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship(5);
    this.battleship = this.battleship || new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship(4);
    this.destroyer = this.destroyer || new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship(3);
    this.submarine = this.submarine || new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship(3);
    this.patrolBoat = this.patrolBoat || new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship(2);
  }
  makeGameboard() {
    let gameBoard = [];
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        gameBoard.push(new Cell(i, j));
      }
    }
    return gameBoard;
  }
  placeShip(coordinates, ship) {
    if (ship.orientation == 'vertical') {
      if (this.validPlacement(coordinates, ship)) {
        for (let i = 0; i < ship.length; i++) {
          let tempCoords = [coordinates[0] + i, coordinates[1]];
          this.findCell(tempCoords).occupied = ship;
        }
      }
    } else {
      if (this.validPlacement(coordinates, ship)) {
        for (let i = 0; i < ship.length; i++) {
          let tempCoords = [coordinates[0], coordinates[1] + i];
          this.findCell(tempCoords).occupied = ship;
        }
      }
    }
  }
  validPlacement(coordinates, ship) {
    if (ship.orientation == 'vertical') {
      for (let i = 0; i < ship.length; i++) {
        let tempCoords = [coordinates[0] + i, coordinates[1]];
        if (this.findCell(tempCoords) == undefined || this.findCell(tempCoords).occupied !== null) {
          return false;
        }
      }
      return true;
    } else {
      for (let i = 0; i < ship.length; i++) {
        let tempCoords = [coordinates[0], coordinates[1] + i];
        if (this.findCell(tempCoords) == undefined || this.findCell(tempCoords).occupied !== null) {
          return false;
        }
      }
      return true;
    }
  }
  findCell(coordinates) {
    return this.gameBoard.find(obj => obj.x === coordinates[0] && obj.y === coordinates[1]);
  }
  receiveAttack(coordinates) {
    if (this.findCell(coordinates).beenHit === true) return false;
    this.findCell(coordinates).beenHit = true;
    if (this.findCell(coordinates).occupied !== null) this.findCell(coordinates).occupied.hit();
  }
  fleetSunk() {
    if (this.carrier.isSunk() && this.battleship.isSunk() && this.destroyer.isSunk() && this.submarine.isSunk() && this.patrolBoat.isSunk()) {
      return true;
    }
    return false;
  }
  randomPlacement() {
    let fleet = [this.carrier, this.battleship, this.destroyer, this.submarine, this.patrolBoat];
    let binder = this;
    function tryPlacement(fleet) {
      if (fleet.length === 0) return;
      let randomCell = binder.findCell(binder.randomXY());
      if (binder.validPlacement([randomCell.x, randomCell.y], fleet[0])) {
        binder.placeShip([randomCell.x, randomCell.y], fleet[0]);
        fleet.shift();
        tryPlacement(fleet);
      } else {
        tryPlacement(fleet);
      }
    }
    tryPlacement(fleet);
  }
  randomXY() {
    let min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    let max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 9;
    const randomX = Math.floor(Math.random() * (max - min + 1) + min);
    const randomY = Math.floor(Math.random() * (max - min + 1) + min);
    return [randomX, randomY];
  }
  fleetPlaced() {
    let counter = 0;
    for (let i = 0; i < this.gameBoard.length; i++) {
      if (this.gameBoard[i].occupied !== null) {
        counter++;
      }
    }
    if (counter == 17) {
      return true;
    } else {
      return false;
    }
  }
}


/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Player": () => (/* binding */ Player)
/* harmony export */ });
class Player {
  constructor() {
    let name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Computer';
    this.name = name;
  }
  randomAttack(gameBoard) {
    let randomCell = gameBoard.findCell(this.randomXY());
    if (randomCell.beenHit == false) {
      randomCell.beenHit = true;
      if (randomCell.occupied !== null) {
        randomCell.occupied.hit();
      }
    } else {
      this.randomAttack(gameBoard);
    }
  }
  randomXY() {
    let min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    let max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 9;
    const randomX = Math.floor(Math.random() * (max - min + 1) + min);
    const randomY = Math.floor(Math.random() * (max - min + 1) + min);
    return [randomX, randomY];
  }
}


/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Ship": () => (/* binding */ Ship)
/* harmony export */ });
class Ship {
  constructor(length) {
    let hitNumber = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    let orientation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.orientation();
    this.length = length;
    this.hitNumber = hitNumber;
    this.orientation = orientation;
  }
  hit() {
    this.hitNumber++;
  }
  isSunk() {
    if (this.length <= this.hitNumber) return true;
    return false;
  }
  orientation() {
    return Math.random() < 0.5 ? 'vertical' : 'horizontal';
  }
}


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.scss":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.scss ***!
  \**************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "body {\n  position: relative;\n  font-family: 'Roboto Condensed', sans-serif;\n  height: 100vh;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n}\nh1 {\n  color: black;\n  -webkit-text-fill-color: white;\n  -webkit-text-stroke-width: 1px;\n  -webkit-text-stroke-color: black;\n  font-stretch: expanded;\n}\nmain {\n  display: flex;\n  align-items: center;\n  justify-content: space-around;\n  flex-wrap: wrap;\n  overflow: auto;\n  height: 100%;\n  background-color: #fef6e4;\n}\n\nheader {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 60px;\n  background-color: #00a71c;\n  padding: 10px;\n  border-bottom: 3px solid black;\n  z-index: 1;\n  box-shadow: 0px 7px 14px -4px rgba(0, 0, 0, 1);\n}\n\nfooter {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 80px;\n  background-color: #8bd3dd;\n  padding: 10px;\n  border-top: 1px solid black;\n  box-shadow: 0px -7px 14px -4px rgba(0, 0, 0, 1);\n}\n\n.area {\n  background-color: #ffebbe;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  border: black solid 1px;\n  width: 300px;\n  padding: 5px;\n  margin: 20px;\n  box-shadow: 0px 0px 9px 5px rgba(0, 0, 0, 0.5);\n  border-radius: 5px;\n}\n\n#popup {\n  background-color: #ffebbe;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: 350px;\n  height: 600px;\n  margin-left: -175px;\n  margin-top: -300px;\n  box-shadow: 0px 0px 9px 5px rgba(0, 0, 0, 0.5);\n  border-radius: 5px;\n  border: black solid 1px;\n  padding: 5px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  z-index: 2;\n}\n\n#popupButtonArea {\n  display: flex;\n  align-items: center;\n  justify-content: space-around;\n  width: 100%;\n}\n\n.board {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-wrap: wrap;\n  width: 100%;\n}\n\n.playerCell,\n.computerCell {\n  border: 1px solid black;\n  flex: 0 9%;\n  width: 30px;\n  height: 30px;\n  background-color: rgb(71, 243, 255);\n  border-radius: 2px;\n}\n\n.playerCell:hover,\n.computerCell:hover,\nbutton:hover {\n  transform: scale(1.1);\n  cursor: pointer;\n}\n\n.playerCell[data-been-hit='true'],\n.computerCell[data-been-hit='true'] {\n  background-color: rgb(190, 189, 189);\n}\n\n.playerCell[data-occupied='[object Object]'] {\n  background-color: rgb(255, 0, 0);\n}\n\n.playerCell[data-been-hit='true'].playerCell[data-occupied='[object Object]'],\n.computerCell[data-been-hit='true'].computerCell[data-occupied='[object Object]'] {\n  background-color: black;\n}\n\n#buttons {\n  background-color: #fef6e4;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n}\n\nbutton {\n  background-color: #00a71c;\n  border: none;\n  color: white;\n  padding: 5px 10px;\n  text-align: center;\n  text-decoration: none;\n  display: inline-block;\n  font-size: 16px;\n  margin-bottom: 20px;\n  border: 1px solid black;\n  border-radius: 5px;\n  box-shadow: 0px 0px 9px 5px rgba(0, 0, 0, 0.5);\n  cursor: pointer;\n}\n\n#manualButton {\n  margin-top: 20px;\n}\n\n#orientationToggle {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 5px;\n}\n\n/* The switch for ship orientation - the box around the slider */\n.switch {\n  margin: 5px;\n  position: relative;\n  display: inline-block;\n  width: 60px;\n  height: 34px;\n}\n\n/* Hide default HTML checkbox */\n.switch input {\n  opacity: 0;\n  width: 0;\n  height: 0;\n}\n\n/* The slider */\n.slider {\n  position: absolute;\n  cursor: pointer;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: #ccc;\n  -webkit-transition: 0.4s;\n  transition: 0.4s;\n}\n\n.slider:before {\n  position: absolute;\n  content: '';\n  height: 26px;\n  width: 26px;\n  left: 4px;\n  bottom: 4px;\n  background-color: white;\n  -webkit-transition: 0.4s;\n  transition: 0.4s;\n}\n\ninput:checked + .slider {\n  background-color: #2196f3;\n}\n\ninput:focus + .slider {\n  box-shadow: 0 0 1px #2196f3;\n}\n\ninput:checked + .slider:before {\n  -webkit-transform: translateX(26px);\n  -ms-transform: translateX(26px);\n  transform: translateX(26px);\n}\n\n/* Rounded sliders */\n.slider.round {\n  border-radius: 34px;\n}\n\n.slider.round:before {\n  border-radius: 50%;\n}\n", "",{"version":3,"sources":["webpack://./src/style.scss"],"names":[],"mappings":"AAAA;EACE,kBAAkB;EAClB,2CAA2C;EAC3C,aAAa;EACb,aAAa;EACb,sBAAsB;EACtB,8BAA8B;AAChC;AACA;EACE,YAAY;EACZ,8BAA8B;EAC9B,8BAA8B;EAC9B,gCAAgC;EAChC,sBAAsB;AACxB;AACA;EACE,aAAa;EACb,mBAAmB;EACnB,6BAA6B;EAC7B,eAAe;EACf,cAAc;EACd,YAAY;EACZ,yBAAyB;AAC3B;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,YAAY;EACZ,yBAAyB;EACzB,aAAa;EACb,8BAA8B;EAC9B,UAAU;EACV,8CAA8C;AAChD;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,YAAY;EACZ,yBAAyB;EACzB,aAAa;EACb,2BAA2B;EAC3B,+CAA+C;AACjD;;AAEA;EACE,yBAAyB;EACzB,aAAa;EACb,sBAAsB;EACtB,uBAAuB;EACvB,mBAAmB;EACnB,uBAAuB;EACvB,YAAY;EACZ,YAAY;EACZ,YAAY;EACZ,8CAA8C;EAC9C,kBAAkB;AACpB;;AAEA;EACE,yBAAyB;EACzB,kBAAkB;EAClB,QAAQ;EACR,SAAS;EACT,YAAY;EACZ,aAAa;EACb,mBAAmB;EACnB,kBAAkB;EAClB,8CAA8C;EAC9C,kBAAkB;EAClB,uBAAuB;EACvB,YAAY;EACZ,aAAa;EACb,sBAAsB;EACtB,uBAAuB;EACvB,mBAAmB;EACnB,UAAU;AACZ;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,6BAA6B;EAC7B,WAAW;AACb;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,eAAe;EACf,WAAW;AACb;;AAEA;;EAEE,uBAAuB;EACvB,UAAU;EACV,WAAW;EACX,YAAY;EACZ,mCAAmC;EACnC,kBAAkB;AACpB;;AAEA;;;EAGE,qBAAqB;EACrB,eAAe;AACjB;;AAEA;;EAEE,oCAAoC;AACtC;;AAEA;EACE,gCAAgC;AAClC;;AAEA;;EAEE,uBAAuB;AACzB;;AAEA;EACE,yBAAyB;EACzB,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,uBAAuB;AACzB;;AAEA;EACE,yBAAyB;EACzB,YAAY;EACZ,YAAY;EACZ,iBAAiB;EACjB,kBAAkB;EAClB,qBAAqB;EACrB,qBAAqB;EACrB,eAAe;EACf,mBAAmB;EACnB,uBAAuB;EACvB,kBAAkB;EAClB,8CAA8C;EAC9C,eAAe;AACjB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,YAAY;AACd;;AAEA,gEAAgE;AAChE;EACE,WAAW;EACX,kBAAkB;EAClB,qBAAqB;EACrB,WAAW;EACX,YAAY;AACd;;AAEA,+BAA+B;AAC/B;EACE,UAAU;EACV,QAAQ;EACR,SAAS;AACX;;AAEA,eAAe;AACf;EACE,kBAAkB;EAClB,eAAe;EACf,MAAM;EACN,OAAO;EACP,QAAQ;EACR,SAAS;EACT,sBAAsB;EACtB,wBAAwB;EACxB,gBAAgB;AAClB;;AAEA;EACE,kBAAkB;EAClB,WAAW;EACX,YAAY;EACZ,WAAW;EACX,SAAS;EACT,WAAW;EACX,uBAAuB;EACvB,wBAAwB;EACxB,gBAAgB;AAClB;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,2BAA2B;AAC7B;;AAEA;EACE,mCAAmC;EACnC,+BAA+B;EAC/B,2BAA2B;AAC7B;;AAEA,oBAAoB;AACpB;EACE,mBAAmB;AACrB;;AAEA;EACE,kBAAkB;AACpB","sourcesContent":["body {\n  position: relative;\n  font-family: 'Roboto Condensed', sans-serif;\n  height: 100vh;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n}\nh1 {\n  color: black;\n  -webkit-text-fill-color: white;\n  -webkit-text-stroke-width: 1px;\n  -webkit-text-stroke-color: black;\n  font-stretch: expanded;\n}\nmain {\n  display: flex;\n  align-items: center;\n  justify-content: space-around;\n  flex-wrap: wrap;\n  overflow: auto;\n  height: 100%;\n  background-color: #fef6e4;\n}\n\nheader {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 60px;\n  background-color: #00a71c;\n  padding: 10px;\n  border-bottom: 3px solid black;\n  z-index: 1;\n  box-shadow: 0px 7px 14px -4px rgba(0, 0, 0, 1);\n}\n\nfooter {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 80px;\n  background-color: #8bd3dd;\n  padding: 10px;\n  border-top: 1px solid black;\n  box-shadow: 0px -7px 14px -4px rgba(0, 0, 0, 1);\n}\n\n.area {\n  background-color: #ffebbe;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  border: black solid 1px;\n  width: 300px;\n  padding: 5px;\n  margin: 20px;\n  box-shadow: 0px 0px 9px 5px rgba(0, 0, 0, 0.5);\n  border-radius: 5px;\n}\n\n#popup {\n  background-color: #ffebbe;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: 350px;\n  height: 600px;\n  margin-left: -175px;\n  margin-top: -300px;\n  box-shadow: 0px 0px 9px 5px rgba(0, 0, 0, 0.5);\n  border-radius: 5px;\n  border: black solid 1px;\n  padding: 5px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  z-index: 2;\n}\n\n#popupButtonArea {\n  display: flex;\n  align-items: center;\n  justify-content: space-around;\n  width: 100%;\n}\n\n.board {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-wrap: wrap;\n  width: 100%;\n}\n\n.playerCell,\n.computerCell {\n  border: 1px solid black;\n  flex: 0 9%;\n  width: 30px;\n  height: 30px;\n  background-color: rgb(71, 243, 255);\n  border-radius: 2px;\n}\n\n.playerCell:hover,\n.computerCell:hover,\nbutton:hover {\n  transform: scale(1.1);\n  cursor: pointer;\n}\n\n.playerCell[data-been-hit='true'],\n.computerCell[data-been-hit='true'] {\n  background-color: rgb(190, 189, 189);\n}\n\n.playerCell[data-occupied='[object Object]'] {\n  background-color: rgb(255, 0, 0);\n}\n\n.playerCell[data-been-hit='true'].playerCell[data-occupied='[object Object]'],\n.computerCell[data-been-hit='true'].computerCell[data-occupied='[object Object]'] {\n  background-color: black;\n}\n\n#buttons {\n  background-color: #fef6e4;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n}\n\nbutton {\n  background-color: #00a71c;\n  border: none;\n  color: white;\n  padding: 5px 10px;\n  text-align: center;\n  text-decoration: none;\n  display: inline-block;\n  font-size: 16px;\n  margin-bottom: 20px;\n  border: 1px solid black;\n  border-radius: 5px;\n  box-shadow: 0px 0px 9px 5px rgba(0, 0, 0, 0.5);\n  cursor: pointer;\n}\n\n#manualButton {\n  margin-top: 20px;\n}\n\n#orientationToggle {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 5px;\n}\n\n/* The switch for ship orientation - the box around the slider */\n.switch {\n  margin: 5px;\n  position: relative;\n  display: inline-block;\n  width: 60px;\n  height: 34px;\n}\n\n/* Hide default HTML checkbox */\n.switch input {\n  opacity: 0;\n  width: 0;\n  height: 0;\n}\n\n/* The slider */\n.slider {\n  position: absolute;\n  cursor: pointer;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: #ccc;\n  -webkit-transition: 0.4s;\n  transition: 0.4s;\n}\n\n.slider:before {\n  position: absolute;\n  content: '';\n  height: 26px;\n  width: 26px;\n  left: 4px;\n  bottom: 4px;\n  background-color: white;\n  -webkit-transition: 0.4s;\n  transition: 0.4s;\n}\n\ninput:checked + .slider {\n  background-color: #2196f3;\n}\n\ninput:focus + .slider {\n  box-shadow: 0 0 1px #2196f3;\n}\n\ninput:checked + .slider:before {\n  -webkit-transform: translateX(26px);\n  -ms-transform: translateX(26px);\n  transform: translateX(26px);\n}\n\n/* Rounded sliders */\n.slider.round {\n  border-radius: 34px;\n}\n\n.slider.round:before {\n  border-radius: 50%;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.scss */ "./node_modules/css-loader/dist/cjs.js!./src/style.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.scss */ "./src/style.scss");
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameboard */ "./src/gameboard.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./player */ "./src/player.js");



const playerBoard = new _gameboard__WEBPACK_IMPORTED_MODULE_1__.Gameboard();
const playerDisplay = document.querySelector('#playerdisplay');
const computerBoard = new _gameboard__WEBPACK_IMPORTED_MODULE_1__.Gameboard();
const computerDisplay = document.querySelector('#computerdisplay');
const computerAI = new _player__WEBPACK_IMPORTED_MODULE_2__.Player();
computerBoard.randomPlacement();
function renderPlayerBoard() {
  playerDisplay.innerHTML = '';
  playerBoard.gameBoard.forEach(cell => {
    const cellDiv = document.createElement('div');
    cellDiv.classList.add('playerCell');
    cellDiv.dataset.x = cell.x;
    cellDiv.dataset.y = cell.y;
    cellDiv.dataset.occupied = cell.occupied;
    cellDiv.dataset.beenHit = cell.beenHit;
    playerDisplay.appendChild(cellDiv);
  });
}
renderPlayerBoard();
function renderComputerBoard() {
  computerDisplay.innerHTML = '';
  computerBoard.gameBoard.forEach(cell => {
    const cellDiv = document.createElement('div');
    cellDiv.classList.add('computerCell');
    cellDiv.dataset.x = cell.x;
    cellDiv.dataset.y = cell.y;
    cellDiv.dataset.occupied = cell.occupied;
    cellDiv.dataset.beenHit = cell.beenHit;
    computerDisplay.appendChild(cellDiv);
  });
}
renderComputerBoard();
function playerTurn() {
  const computerBoardCells = document.querySelectorAll('.computerCell');
  computerBoardCells.forEach(cellDiv => {
    cellDiv.addEventListener('click', () => {
      computerBoard.receiveAttack([Number(cellDiv.dataset.x), Number(cellDiv.dataset.y)]);
      renderComputerBoard();
      computerAI.randomAttack(playerBoard);
      renderPlayerBoard();
      gameLoop();
    });
  });
}

//main game loop

function gameLoop() {
  if (!playerBoard.fleetSunk() && !computerBoard.fleetSunk()) {
    playerTurn();
  } else if (playerBoard.fleetSunk()) {
    alert('You Lose!');
  } else if (computerBoard.fleetSunk()) {
    alert('You Win!');
  }
}
playerTurn();

//Ship names for manual placement
let manualPlacementDisplay = document.createElement('div');
manualPlacementDisplay.id = 'manualPlacementDisplay';

//Toggle switch for ship orientation
const orientationToggle = document.querySelector('#orientationToggle');
const orientationInput = document.querySelector('#orientationInput');
function getOrientation() {
  let orientation;
  if (orientationInput.checked) {
    orientation = 'horizontal';
  } else {
    orientation = 'vertical';
  }
  return orientation;
}
orientationToggle.style.display = 'none';

//Clone player board for placement popup
let playerDisplayClone = playerDisplay.cloneNode(true);
const popup = document.querySelector('#popup');
popup.appendChild(manualPlacementDisplay);
popup.appendChild(playerDisplayClone);

//Popup div button listeners
const randomButton = document.querySelector('#randomButton');
randomButton.addEventListener('click', () => {
  manualButton.style.display = 'none';
  playerBoard.gameBoard = playerBoard.makeGameboard();
  playerBoard.randomPlacement();
  renderPlayerBoard();
  playerDisplayClone.innerHTML = '';
  playerDisplayClone = playerDisplay.cloneNode(true);
  popup.appendChild(playerDisplayClone);
  popup.appendChild(manualButton);
});
const startButton = document.querySelector('#startButton');
startButton.addEventListener('click', () => {
  if (playerBoard.fleetPlaced()) {
    popup.style.display = 'none';
  } else {
    alert('You must place all your ships!');
  }
});

//Button and arrays to cycle through manual ship placement
const manualButton = document.createElement('button');
manualButton.innerHTML = '';
manualButton.id = 'manualButton';
manualButton.textContent = 'Manual Ship Placement';
popup.appendChild(manualButton);
let playerBoardFleet = [playerBoard.carrier, playerBoard.battleship, playerBoard.destroyer, playerBoard.submarine, playerBoard.patrolBoat];
let playerBoardFleetNames = ['Carrier', 'Battleship', 'Destroyer', 'Submarine', 'Patrol Boat'];
function manualShipCycle() {
  manualButton.addEventListener('click', () => {
    orientationToggle.style.display = 'flex';
    randomButton.style.display = 'none';
    manualPlacementDisplay.textContent = `Place your ${playerBoardFleetNames[0]}`;
    let ship = playerBoardFleet[0];
    let playerBoardCells = document.querySelectorAll('.playerCell');
    playerBoardCells.forEach(cellDiv => {
      cellDiv.addEventListener('click', () => {
        ship.orientation = getOrientation();
        if (!playerBoard.validPlacement([Number(cellDiv.dataset.x), Number(cellDiv.dataset.y)], ship)) {
          manualPlacementDisplay.textContent = 'Invalid placement, try again';
          setTimeout(() => {
            manualPlacementDisplay.textContent = `Place your ${playerBoardFleetNames[0]}`;
          }, 1000);
          return;
        }
        playerBoard.placeShip([Number(cellDiv.dataset.x), Number(cellDiv.dataset.y)], ship);
        renderPlayerBoard();
        playerDisplayClone.innerHTML = '';
        playerDisplayClone = playerDisplay.cloneNode(true);
        popup.appendChild(playerDisplayClone);
        popup.appendChild(manualButton);
        playerBoardFleetNames.shift();
        playerBoardFleet.shift();
        manualButton.textContent = `Next Up: ${playerBoardFleetNames[0]}`;
        if (playerBoardFleetNames.length == 0) {
          manualButton.style.display = 'none';
          manualPlacementDisplay.textContent = 'Ready to start!';
          orientationToggle.style.display = 'none';
        }
      });
    });
  });
}
manualShipCycle();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFpQixFQUFFO1FBQ25CMEIsa0JBQWtCLENBQUN6QixTQUFTLEdBQUcsRUFBRTtRQUNqQ3lCLGtCQUFrQixHQUFHaEMsYUFBYSxDQUFDaUMsU0FBUyxDQUFDLElBQUksQ0FBQztRQUNsREMsS0FBSyxDQUFDbkIsV0FBVyxDQUFDaUIsa0JBQWtCLENBQUM7UUFDckNFLEtBQUssQ0FBQ25CLFdBQVcsQ0FBQ3FCLFlBQVksQ0FBQztRQUMvQkkscUJBQXFCLENBQUN2RCxLQUFLLEVBQUU7UUFDN0JzRCxnQkFBZ0IsQ0FBQ3RELEtBQUssRUFBRTtRQUN4Qm1ELFlBQVksQ0FBQ0UsV0FBVyxHQUFJLFlBQVdFLHFCQUFxQixDQUFDLENBQUMsQ0FBRSxFQUFDO1FBQ2pFLElBQUlBLHFCQUFxQixDQUFDdkUsTUFBTSxJQUFJLENBQUMsRUFBRTtVQUNyQ21FLFlBQVksQ0FBQ04sS0FBSyxDQUFDQyxPQUFPLEdBQUcsTUFBTTtVQUNuQ1Asc0JBQXNCLENBQUNjLFdBQVcsR0FBRyxpQkFBaUI7VUFDdERaLGlCQUFpQixDQUFDSSxLQUFLLENBQUNDLE9BQU8sR0FBRyxNQUFNO1FBQzFDO01BQ0YsQ0FBQyxDQUFDO0lBQ0osQ0FBQyxDQUFDO0VBQ0osQ0FBQyxDQUFDO0FBQ0o7QUFDQVUsZUFBZSxFQUFFLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwanMvLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBqcy8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcGpzLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcGpzLy4vc3JjL3N0eWxlLnNjc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcGpzLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwanMvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwanMvLi9zcmMvc3R5bGUuc2Nzcz84NDZhIiwid2VicGFjazovL2JhdHRsZXNoaXBqcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwanMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBqcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwanMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcGpzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcGpzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcGpzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXBqcy93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwanMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXBqcy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXBqcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXBqcy93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcGpzLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNoaXAgfSBmcm9tICcuL3NoaXAnXG5cbmNsYXNzIENlbGwge1xuICBjb25zdHJ1Y3Rvcih4LCB5LCBvY2N1cGllZCA9IG51bGwsIGJlZW5IaXQgPSBmYWxzZSkge1xuICAgIHRoaXMueCA9IHhcbiAgICB0aGlzLnkgPSB5XG4gICAgdGhpcy5vY2N1cGllZCA9IG9jY3VwaWVkXG4gICAgdGhpcy5iZWVuSGl0ID0gYmVlbkhpdFxuICB9XG59XG5cbmNsYXNzIEdhbWVib2FyZCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuZ2FtZUJvYXJkID0gdGhpcy5nYW1lQm9hcmQgfHwgdGhpcy5tYWtlR2FtZWJvYXJkKClcbiAgICB0aGlzLmNhcnJpZXIgPSB0aGlzLmNhcnJpZXIgfHwgbmV3IFNoaXAoNSlcbiAgICB0aGlzLmJhdHRsZXNoaXAgPSB0aGlzLmJhdHRsZXNoaXAgfHwgbmV3IFNoaXAoNClcbiAgICB0aGlzLmRlc3Ryb3llciA9IHRoaXMuZGVzdHJveWVyIHx8IG5ldyBTaGlwKDMpXG4gICAgdGhpcy5zdWJtYXJpbmUgPSB0aGlzLnN1Ym1hcmluZSB8fCBuZXcgU2hpcCgzKVxuICAgIHRoaXMucGF0cm9sQm9hdCA9IHRoaXMucGF0cm9sQm9hdCB8fCBuZXcgU2hpcCgyKVxuICB9XG5cbiAgbWFrZUdhbWVib2FyZCgpIHtcbiAgICBsZXQgZ2FtZUJvYXJkID0gW11cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgICBnYW1lQm9hcmQucHVzaChuZXcgQ2VsbChpLCBqKSlcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGdhbWVCb2FyZFxuICB9XG4gIHBsYWNlU2hpcChjb29yZGluYXRlcywgc2hpcCkge1xuICAgIGlmIChzaGlwLm9yaWVudGF0aW9uID09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgIGlmICh0aGlzLnZhbGlkUGxhY2VtZW50KGNvb3JkaW5hdGVzLCBzaGlwKSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBsZXQgdGVtcENvb3JkcyA9IFtjb29yZGluYXRlc1swXSArIGksIGNvb3JkaW5hdGVzWzFdXVxuICAgICAgICAgIHRoaXMuZmluZENlbGwodGVtcENvb3Jkcykub2NjdXBpZWQgPSBzaGlwXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMudmFsaWRQbGFjZW1lbnQoY29vcmRpbmF0ZXMsIHNoaXApKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGxldCB0ZW1wQ29vcmRzID0gW2Nvb3JkaW5hdGVzWzBdLCBjb29yZGluYXRlc1sxXSArIGldXG4gICAgICAgICAgdGhpcy5maW5kQ2VsbCh0ZW1wQ29vcmRzKS5vY2N1cGllZCA9IHNoaXBcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICB2YWxpZFBsYWNlbWVudChjb29yZGluYXRlcywgc2hpcCkge1xuICAgIGlmIChzaGlwLm9yaWVudGF0aW9uID09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgdGVtcENvb3JkcyA9IFtjb29yZGluYXRlc1swXSArIGksIGNvb3JkaW5hdGVzWzFdXVxuICAgICAgICBpZiAoXG4gICAgICAgICAgdGhpcy5maW5kQ2VsbCh0ZW1wQ29vcmRzKSA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICB0aGlzLmZpbmRDZWxsKHRlbXBDb29yZHMpLm9jY3VwaWVkICE9PSBudWxsXG4gICAgICAgICkge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IHRlbXBDb29yZHMgPSBbY29vcmRpbmF0ZXNbMF0sIGNvb3JkaW5hdGVzWzFdICsgaV1cbiAgICAgICAgaWYgKFxuICAgICAgICAgIHRoaXMuZmluZENlbGwodGVtcENvb3JkcykgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgdGhpcy5maW5kQ2VsbCh0ZW1wQ29vcmRzKS5vY2N1cGllZCAhPT0gbnVsbFxuICAgICAgICApIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gIH1cbiAgZmluZENlbGwoY29vcmRpbmF0ZXMpIHtcbiAgICByZXR1cm4gdGhpcy5nYW1lQm9hcmQuZmluZChcbiAgICAgIChvYmopID0+IG9iai54ID09PSBjb29yZGluYXRlc1swXSAmJiBvYmoueSA9PT0gY29vcmRpbmF0ZXNbMV1cbiAgICApXG4gIH1cbiAgcmVjZWl2ZUF0dGFjayhjb29yZGluYXRlcykge1xuICAgIGlmICh0aGlzLmZpbmRDZWxsKGNvb3JkaW5hdGVzKS5iZWVuSGl0ID09PSB0cnVlKSByZXR1cm4gZmFsc2VcbiAgICB0aGlzLmZpbmRDZWxsKGNvb3JkaW5hdGVzKS5iZWVuSGl0ID0gdHJ1ZVxuICAgIGlmICh0aGlzLmZpbmRDZWxsKGNvb3JkaW5hdGVzKS5vY2N1cGllZCAhPT0gbnVsbClcbiAgICAgIHRoaXMuZmluZENlbGwoY29vcmRpbmF0ZXMpLm9jY3VwaWVkLmhpdCgpXG4gIH1cbiAgZmxlZXRTdW5rKCkge1xuICAgIGlmIChcbiAgICAgIHRoaXMuY2Fycmllci5pc1N1bmsoKSAmJlxuICAgICAgdGhpcy5iYXR0bGVzaGlwLmlzU3VuaygpICYmXG4gICAgICB0aGlzLmRlc3Ryb3llci5pc1N1bmsoKSAmJlxuICAgICAgdGhpcy5zdWJtYXJpbmUuaXNTdW5rKCkgJiZcbiAgICAgIHRoaXMucGF0cm9sQm9hdC5pc1N1bmsoKVxuICAgICkge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbiAgcmFuZG9tUGxhY2VtZW50KCkge1xuICAgIGxldCBmbGVldCA9IFtcbiAgICAgIHRoaXMuY2FycmllcixcbiAgICAgIHRoaXMuYmF0dGxlc2hpcCxcbiAgICAgIHRoaXMuZGVzdHJveWVyLFxuICAgICAgdGhpcy5zdWJtYXJpbmUsXG4gICAgICB0aGlzLnBhdHJvbEJvYXQsXG4gICAgXVxuICAgIGxldCBiaW5kZXIgPSB0aGlzXG4gICAgZnVuY3Rpb24gdHJ5UGxhY2VtZW50KGZsZWV0KSB7XG4gICAgICBpZiAoZmxlZXQubGVuZ3RoID09PSAwKSByZXR1cm5cbiAgICAgIGxldCByYW5kb21DZWxsID0gYmluZGVyLmZpbmRDZWxsKGJpbmRlci5yYW5kb21YWSgpKVxuICAgICAgaWYgKGJpbmRlci52YWxpZFBsYWNlbWVudChbcmFuZG9tQ2VsbC54LCByYW5kb21DZWxsLnldLCBmbGVldFswXSkpIHtcbiAgICAgICAgYmluZGVyLnBsYWNlU2hpcChbcmFuZG9tQ2VsbC54LCByYW5kb21DZWxsLnldLCBmbGVldFswXSlcbiAgICAgICAgZmxlZXQuc2hpZnQoKVxuICAgICAgICB0cnlQbGFjZW1lbnQoZmxlZXQpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0cnlQbGFjZW1lbnQoZmxlZXQpXG4gICAgICB9XG4gICAgfVxuICAgIHRyeVBsYWNlbWVudChmbGVldClcbiAgfVxuICByYW5kb21YWShtaW4gPSAwLCBtYXggPSA5KSB7XG4gICAgY29uc3QgcmFuZG9tWCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSArIG1pbilcbiAgICBjb25zdCByYW5kb21ZID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpICsgbWluKVxuICAgIHJldHVybiBbcmFuZG9tWCwgcmFuZG9tWV1cbiAgfVxuICBmbGVldFBsYWNlZCgpIHtcbiAgICBsZXQgY291bnRlciA9IDBcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZ2FtZUJvYXJkLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodGhpcy5nYW1lQm9hcmRbaV0ub2NjdXBpZWQgIT09IG51bGwpIHtcbiAgICAgICAgY291bnRlcisrXG4gICAgICB9XG4gICAgfVxuICAgIGlmIChjb3VudGVyID09IDE3KSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IHsgR2FtZWJvYXJkIH1cbiIsImNsYXNzIFBsYXllciB7XG4gIGNvbnN0cnVjdG9yKG5hbWUgPSAnQ29tcHV0ZXInKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZVxuICB9XG4gIHJhbmRvbUF0dGFjayhnYW1lQm9hcmQpIHtcbiAgICBsZXQgcmFuZG9tQ2VsbCA9IGdhbWVCb2FyZC5maW5kQ2VsbCh0aGlzLnJhbmRvbVhZKCkpXG4gICAgaWYgKHJhbmRvbUNlbGwuYmVlbkhpdCA9PSBmYWxzZSkge1xuICAgICAgcmFuZG9tQ2VsbC5iZWVuSGl0ID0gdHJ1ZVxuICAgICAgaWYgKHJhbmRvbUNlbGwub2NjdXBpZWQgIT09IG51bGwpIHtcbiAgICAgICAgcmFuZG9tQ2VsbC5vY2N1cGllZC5oaXQoKVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJhbmRvbUF0dGFjayhnYW1lQm9hcmQpXG4gICAgfVxuICB9XG4gIHJhbmRvbVhZKG1pbiA9IDAsIG1heCA9IDkpIHtcbiAgICBjb25zdCByYW5kb21YID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpICsgbWluKVxuICAgIGNvbnN0IHJhbmRvbVkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkgKyBtaW4pXG4gICAgcmV0dXJuIFtyYW5kb21YLCByYW5kb21ZXVxuICB9XG59XG5cbmV4cG9ydCB7IFBsYXllciB9XG4iLCJjbGFzcyBTaGlwIHtcbiAgY29uc3RydWN0b3IobGVuZ3RoLCBoaXROdW1iZXIgPSAwLCBvcmllbnRhdGlvbiA9IHRoaXMub3JpZW50YXRpb24oKSkge1xuICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoXG4gICAgdGhpcy5oaXROdW1iZXIgPSBoaXROdW1iZXJcbiAgICB0aGlzLm9yaWVudGF0aW9uID0gb3JpZW50YXRpb25cbiAgfVxuICBoaXQoKSB7XG4gICAgdGhpcy5oaXROdW1iZXIrK1xuICB9XG4gIGlzU3VuaygpIHtcbiAgICBpZiAodGhpcy5sZW5ndGggPD0gdGhpcy5oaXROdW1iZXIpIHJldHVybiB0cnVlXG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbiAgb3JpZW50YXRpb24oKSB7XG4gICAgcmV0dXJuIE1hdGgucmFuZG9tKCkgPCAwLjUgPyAndmVydGljYWwnIDogJ2hvcml6b250YWwnXG4gIH1cbn1cblxuZXhwb3J0IHsgU2hpcCB9XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcImJvZHkge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8gQ29uZGVuc2VkJywgc2Fucy1zZXJpZjtcXG4gIGhlaWdodDogMTAwdmg7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG59XFxuaDEge1xcbiAgY29sb3I6IGJsYWNrO1xcbiAgLXdlYmtpdC10ZXh0LWZpbGwtY29sb3I6IHdoaXRlO1xcbiAgLXdlYmtpdC10ZXh0LXN0cm9rZS13aWR0aDogMXB4O1xcbiAgLXdlYmtpdC10ZXh0LXN0cm9rZS1jb2xvcjogYmxhY2s7XFxuICBmb250LXN0cmV0Y2g6IGV4cGFuZGVkO1xcbn1cXG5tYWluIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxuICBmbGV4LXdyYXA6IHdyYXA7XFxuICBvdmVyZmxvdzogYXV0bztcXG4gIGhlaWdodDogMTAwJTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZWY2ZTQ7XFxufVxcblxcbmhlYWRlciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgaGVpZ2h0OiA2MHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwYTcxYztcXG4gIHBhZGRpbmc6IDEwcHg7XFxuICBib3JkZXItYm90dG9tOiAzcHggc29saWQgYmxhY2s7XFxuICB6LWluZGV4OiAxO1xcbiAgYm94LXNoYWRvdzogMHB4IDdweCAxNHB4IC00cHggcmdiYSgwLCAwLCAwLCAxKTtcXG59XFxuXFxuZm9vdGVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBoZWlnaHQ6IDgwcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjOGJkM2RkO1xcbiAgcGFkZGluZzogMTBweDtcXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCBibGFjaztcXG4gIGJveC1zaGFkb3c6IDBweCAtN3B4IDE0cHggLTRweCByZ2JhKDAsIDAsIDAsIDEpO1xcbn1cXG5cXG4uYXJlYSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZlYmJlO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBib3JkZXI6IGJsYWNrIHNvbGlkIDFweDtcXG4gIHdpZHRoOiAzMDBweDtcXG4gIHBhZGRpbmc6IDVweDtcXG4gIG1hcmdpbjogMjBweDtcXG4gIGJveC1zaGFkb3c6IDBweCAwcHggOXB4IDVweCByZ2JhKDAsIDAsIDAsIDAuNSk7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxufVxcblxcbiNwb3B1cCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZlYmJlO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiA1MCU7XFxuICBsZWZ0OiA1MCU7XFxuICB3aWR0aDogMzUwcHg7XFxuICBoZWlnaHQ6IDYwMHB4O1xcbiAgbWFyZ2luLWxlZnQ6IC0xNzVweDtcXG4gIG1hcmdpbi10b3A6IC0zMDBweDtcXG4gIGJveC1zaGFkb3c6IDBweCAwcHggOXB4IDVweCByZ2JhKDAsIDAsIDAsIDAuNSk7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICBib3JkZXI6IGJsYWNrIHNvbGlkIDFweDtcXG4gIHBhZGRpbmc6IDVweDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgei1pbmRleDogMjtcXG59XFxuXFxuI3BvcHVwQnV0dG9uQXJlYSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcbiAgd2lkdGg6IDEwMCU7XFxufVxcblxcbi5ib2FyZCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgZmxleC13cmFwOiB3cmFwO1xcbiAgd2lkdGg6IDEwMCU7XFxufVxcblxcbi5wbGF5ZXJDZWxsLFxcbi5jb21wdXRlckNlbGwge1xcbiAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxuICBmbGV4OiAwIDklO1xcbiAgd2lkdGg6IDMwcHg7XFxuICBoZWlnaHQ6IDMwcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNzEsIDI0MywgMjU1KTtcXG4gIGJvcmRlci1yYWRpdXM6IDJweDtcXG59XFxuXFxuLnBsYXllckNlbGw6aG92ZXIsXFxuLmNvbXB1dGVyQ2VsbDpob3ZlcixcXG5idXR0b246aG92ZXIge1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgxLjEpO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4ucGxheWVyQ2VsbFtkYXRhLWJlZW4taGl0PSd0cnVlJ10sXFxuLmNvbXB1dGVyQ2VsbFtkYXRhLWJlZW4taGl0PSd0cnVlJ10ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDE5MCwgMTg5LCAxODkpO1xcbn1cXG5cXG4ucGxheWVyQ2VsbFtkYXRhLW9jY3VwaWVkPSdbb2JqZWN0IE9iamVjdF0nXSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjU1LCAwLCAwKTtcXG59XFxuXFxuLnBsYXllckNlbGxbZGF0YS1iZWVuLWhpdD0ndHJ1ZSddLnBsYXllckNlbGxbZGF0YS1vY2N1cGllZD0nW29iamVjdCBPYmplY3RdJ10sXFxuLmNvbXB1dGVyQ2VsbFtkYXRhLWJlZW4taGl0PSd0cnVlJ10uY29tcHV0ZXJDZWxsW2RhdGEtb2NjdXBpZWQ9J1tvYmplY3QgT2JqZWN0XSddIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbn1cXG5cXG4jYnV0dG9ucyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmVmNmU0O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbmJ1dHRvbiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDBhNzFjO1xcbiAgYm9yZGVyOiBub25lO1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgcGFkZGluZzogNXB4IDEwcHg7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBmb250LXNpemU6IDE2cHg7XFxuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xcbiAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICBib3gtc2hhZG93OiAwcHggMHB4IDlweCA1cHggcmdiYSgwLCAwLCAwLCAwLjUpO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4jbWFudWFsQnV0dG9uIHtcXG4gIG1hcmdpbi10b3A6IDIwcHg7XFxufVxcblxcbiNvcmllbnRhdGlvblRvZ2dsZSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgcGFkZGluZzogNXB4O1xcbn1cXG5cXG4vKiBUaGUgc3dpdGNoIGZvciBzaGlwIG9yaWVudGF0aW9uIC0gdGhlIGJveCBhcm91bmQgdGhlIHNsaWRlciAqL1xcbi5zd2l0Y2gge1xcbiAgbWFyZ2luOiA1cHg7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICB3aWR0aDogNjBweDtcXG4gIGhlaWdodDogMzRweDtcXG59XFxuXFxuLyogSGlkZSBkZWZhdWx0IEhUTUwgY2hlY2tib3ggKi9cXG4uc3dpdGNoIGlucHV0IHtcXG4gIG9wYWNpdHk6IDA7XFxuICB3aWR0aDogMDtcXG4gIGhlaWdodDogMDtcXG59XFxuXFxuLyogVGhlIHNsaWRlciAqL1xcbi5zbGlkZXIge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG4gIHJpZ2h0OiAwO1xcbiAgYm90dG9tOiAwO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2NjYztcXG4gIC13ZWJraXQtdHJhbnNpdGlvbjogMC40cztcXG4gIHRyYW5zaXRpb246IDAuNHM7XFxufVxcblxcbi5zbGlkZXI6YmVmb3JlIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGNvbnRlbnQ6ICcnO1xcbiAgaGVpZ2h0OiAyNnB4O1xcbiAgd2lkdGg6IDI2cHg7XFxuICBsZWZ0OiA0cHg7XFxuICBib3R0b206IDRweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgLXdlYmtpdC10cmFuc2l0aW9uOiAwLjRzO1xcbiAgdHJhbnNpdGlvbjogMC40cztcXG59XFxuXFxuaW5wdXQ6Y2hlY2tlZCArIC5zbGlkZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzIxOTZmMztcXG59XFxuXFxuaW5wdXQ6Zm9jdXMgKyAuc2xpZGVyIHtcXG4gIGJveC1zaGFkb3c6IDAgMCAxcHggIzIxOTZmMztcXG59XFxuXFxuaW5wdXQ6Y2hlY2tlZCArIC5zbGlkZXI6YmVmb3JlIHtcXG4gIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDI2cHgpO1xcbiAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlWCgyNnB4KTtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgyNnB4KTtcXG59XFxuXFxuLyogUm91bmRlZCBzbGlkZXJzICovXFxuLnNsaWRlci5yb3VuZCB7XFxuICBib3JkZXItcmFkaXVzOiAzNHB4O1xcbn1cXG5cXG4uc2xpZGVyLnJvdW5kOmJlZm9yZSB7XFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxufVxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5zY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0Usa0JBQWtCO0VBQ2xCLDJDQUEyQztFQUMzQyxhQUFhO0VBQ2IsYUFBYTtFQUNiLHNCQUFzQjtFQUN0Qiw4QkFBOEI7QUFDaEM7QUFDQTtFQUNFLFlBQVk7RUFDWiw4QkFBOEI7RUFDOUIsOEJBQThCO0VBQzlCLGdDQUFnQztFQUNoQyxzQkFBc0I7QUFDeEI7QUFDQTtFQUNFLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsNkJBQTZCO0VBQzdCLGVBQWU7RUFDZixjQUFjO0VBQ2QsWUFBWTtFQUNaLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsdUJBQXVCO0VBQ3ZCLFlBQVk7RUFDWix5QkFBeUI7RUFDekIsYUFBYTtFQUNiLDhCQUE4QjtFQUM5QixVQUFVO0VBQ1YsOENBQThDO0FBQ2hEOztBQUVBO0VBQ0UsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQix1QkFBdUI7RUFDdkIsWUFBWTtFQUNaLHlCQUF5QjtFQUN6QixhQUFhO0VBQ2IsMkJBQTJCO0VBQzNCLCtDQUErQztBQUNqRDs7QUFFQTtFQUNFLHlCQUF5QjtFQUN6QixhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLHVCQUF1QjtFQUN2QixtQkFBbUI7RUFDbkIsdUJBQXVCO0VBQ3ZCLFlBQVk7RUFDWixZQUFZO0VBQ1osWUFBWTtFQUNaLDhDQUE4QztFQUM5QyxrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSx5QkFBeUI7RUFDekIsa0JBQWtCO0VBQ2xCLFFBQVE7RUFDUixTQUFTO0VBQ1QsWUFBWTtFQUNaLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsa0JBQWtCO0VBQ2xCLDhDQUE4QztFQUM5QyxrQkFBa0I7RUFDbEIsdUJBQXVCO0VBQ3ZCLFlBQVk7RUFDWixhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLHVCQUF1QjtFQUN2QixtQkFBbUI7RUFDbkIsVUFBVTtBQUNaOztBQUVBO0VBQ0UsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQiw2QkFBNkI7RUFDN0IsV0FBVztBQUNiOztBQUVBO0VBQ0UsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQix1QkFBdUI7RUFDdkIsZUFBZTtFQUNmLFdBQVc7QUFDYjs7QUFFQTs7RUFFRSx1QkFBdUI7RUFDdkIsVUFBVTtFQUNWLFdBQVc7RUFDWCxZQUFZO0VBQ1osbUNBQW1DO0VBQ25DLGtCQUFrQjtBQUNwQjs7QUFFQTs7O0VBR0UscUJBQXFCO0VBQ3JCLGVBQWU7QUFDakI7O0FBRUE7O0VBRUUsb0NBQW9DO0FBQ3RDOztBQUVBO0VBQ0UsZ0NBQWdDO0FBQ2xDOztBQUVBOztFQUVFLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLHlCQUF5QjtFQUN6QixhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLG1CQUFtQjtFQUNuQix1QkFBdUI7QUFDekI7O0FBRUE7RUFDRSx5QkFBeUI7RUFDekIsWUFBWTtFQUNaLFlBQVk7RUFDWixpQkFBaUI7RUFDakIsa0JBQWtCO0VBQ2xCLHFCQUFxQjtFQUNyQixxQkFBcUI7RUFDckIsZUFBZTtFQUNmLG1CQUFtQjtFQUNuQix1QkFBdUI7RUFDdkIsa0JBQWtCO0VBQ2xCLDhDQUE4QztFQUM5QyxlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQix1QkFBdUI7RUFDdkIsWUFBWTtBQUNkOztBQUVBLGdFQUFnRTtBQUNoRTtFQUNFLFdBQVc7RUFDWCxrQkFBa0I7RUFDbEIscUJBQXFCO0VBQ3JCLFdBQVc7RUFDWCxZQUFZO0FBQ2Q7O0FBRUEsK0JBQStCO0FBQy9CO0VBQ0UsVUFBVTtFQUNWLFFBQVE7RUFDUixTQUFTO0FBQ1g7O0FBRUEsZUFBZTtBQUNmO0VBQ0Usa0JBQWtCO0VBQ2xCLGVBQWU7RUFDZixNQUFNO0VBQ04sT0FBTztFQUNQLFFBQVE7RUFDUixTQUFTO0VBQ1Qsc0JBQXNCO0VBQ3RCLHdCQUF3QjtFQUN4QixnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsV0FBVztFQUNYLFlBQVk7RUFDWixXQUFXO0VBQ1gsU0FBUztFQUNULFdBQVc7RUFDWCx1QkFBdUI7RUFDdkIsd0JBQXdCO0VBQ3hCLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLDJCQUEyQjtBQUM3Qjs7QUFFQTtFQUNFLG1DQUFtQztFQUNuQywrQkFBK0I7RUFDL0IsMkJBQTJCO0FBQzdCOztBQUVBLG9CQUFvQjtBQUNwQjtFQUNFLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLGtCQUFrQjtBQUNwQlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJib2R5IHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvIENvbmRlbnNlZCcsIHNhbnMtc2VyaWY7XFxuICBoZWlnaHQ6IDEwMHZoO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxufVxcbmgxIHtcXG4gIGNvbG9yOiBibGFjaztcXG4gIC13ZWJraXQtdGV4dC1maWxsLWNvbG9yOiB3aGl0ZTtcXG4gIC13ZWJraXQtdGV4dC1zdHJva2Utd2lkdGg6IDFweDtcXG4gIC13ZWJraXQtdGV4dC1zdHJva2UtY29sb3I6IGJsYWNrO1xcbiAgZm9udC1zdHJldGNoOiBleHBhbmRlZDtcXG59XFxubWFpbiB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcbiAgZmxleC13cmFwOiB3cmFwO1xcbiAgb3ZlcmZsb3c6IGF1dG87XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmVmNmU0O1xcbn1cXG5cXG5oZWFkZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGhlaWdodDogNjBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwMGE3MWM7XFxuICBwYWRkaW5nOiAxMHB4O1xcbiAgYm9yZGVyLWJvdHRvbTogM3B4IHNvbGlkIGJsYWNrO1xcbiAgei1pbmRleDogMTtcXG4gIGJveC1zaGFkb3c6IDBweCA3cHggMTRweCAtNHB4IHJnYmEoMCwgMCwgMCwgMSk7XFxufVxcblxcbmZvb3RlciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgaGVpZ2h0OiA4MHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzhiZDNkZDtcXG4gIHBhZGRpbmc6IDEwcHg7XFxuICBib3JkZXItdG9wOiAxcHggc29saWQgYmxhY2s7XFxuICBib3gtc2hhZG93OiAwcHggLTdweCAxNHB4IC00cHggcmdiYSgwLCAwLCAwLCAxKTtcXG59XFxuXFxuLmFyZWEge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZWJiZTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgYm9yZGVyOiBibGFjayBzb2xpZCAxcHg7XFxuICB3aWR0aDogMzAwcHg7XFxuICBwYWRkaW5nOiA1cHg7XFxuICBtYXJnaW46IDIwcHg7XFxuICBib3gtc2hhZG93OiAwcHggMHB4IDlweCA1cHggcmdiYSgwLCAwLCAwLCAwLjUpO1xcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcbn1cXG5cXG4jcG9wdXAge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZWJiZTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogNTAlO1xcbiAgbGVmdDogNTAlO1xcbiAgd2lkdGg6IDM1MHB4O1xcbiAgaGVpZ2h0OiA2MDBweDtcXG4gIG1hcmdpbi1sZWZ0OiAtMTc1cHg7XFxuICBtYXJnaW4tdG9wOiAtMzAwcHg7XFxuICBib3gtc2hhZG93OiAwcHggMHB4IDlweCA1cHggcmdiYSgwLCAwLCAwLCAwLjUpO1xcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgYm9yZGVyOiBibGFjayBzb2xpZCAxcHg7XFxuICBwYWRkaW5nOiA1cHg7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIHotaW5kZXg6IDI7XFxufVxcblxcbiNwb3B1cEJ1dHRvbkFyZWEge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXG4gIHdpZHRoOiAxMDAlO1xcbn1cXG5cXG4uYm9hcmQge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGZsZXgtd3JhcDogd3JhcDtcXG4gIHdpZHRoOiAxMDAlO1xcbn1cXG5cXG4ucGxheWVyQ2VsbCxcXG4uY29tcHV0ZXJDZWxsIHtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcbiAgZmxleDogMCA5JTtcXG4gIHdpZHRoOiAzMHB4O1xcbiAgaGVpZ2h0OiAzMHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDcxLCAyNDMsIDI1NSk7XFxuICBib3JkZXItcmFkaXVzOiAycHg7XFxufVxcblxcbi5wbGF5ZXJDZWxsOmhvdmVyLFxcbi5jb21wdXRlckNlbGw6aG92ZXIsXFxuYnV0dG9uOmhvdmVyIHtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMS4xKTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLnBsYXllckNlbGxbZGF0YS1iZWVuLWhpdD0ndHJ1ZSddLFxcbi5jb21wdXRlckNlbGxbZGF0YS1iZWVuLWhpdD0ndHJ1ZSddIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigxOTAsIDE4OSwgMTg5KTtcXG59XFxuXFxuLnBsYXllckNlbGxbZGF0YS1vY2N1cGllZD0nW29iamVjdCBPYmplY3RdJ10ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI1NSwgMCwgMCk7XFxufVxcblxcbi5wbGF5ZXJDZWxsW2RhdGEtYmVlbi1oaXQ9J3RydWUnXS5wbGF5ZXJDZWxsW2RhdGEtb2NjdXBpZWQ9J1tvYmplY3QgT2JqZWN0XSddLFxcbi5jb21wdXRlckNlbGxbZGF0YS1iZWVuLWhpdD0ndHJ1ZSddLmNvbXB1dGVyQ2VsbFtkYXRhLW9jY3VwaWVkPSdbb2JqZWN0IE9iamVjdF0nXSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXG59XFxuXFxuI2J1dHRvbnMge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZlZjZlNDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG5cXG5idXR0b24ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwYTcxYztcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIHBhZGRpbmc6IDVweCAxMHB4O1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgZm9udC1zaXplOiAxNnB4O1xcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgYm94LXNoYWRvdzogMHB4IDBweCA5cHggNXB4IHJnYmEoMCwgMCwgMCwgMC41KTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuI21hbnVhbEJ1dHRvbiB7XFxuICBtYXJnaW4tdG9wOiAyMHB4O1xcbn1cXG5cXG4jb3JpZW50YXRpb25Ub2dnbGUge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIHBhZGRpbmc6IDVweDtcXG59XFxuXFxuLyogVGhlIHN3aXRjaCBmb3Igc2hpcCBvcmllbnRhdGlvbiAtIHRoZSBib3ggYXJvdW5kIHRoZSBzbGlkZXIgKi9cXG4uc3dpdGNoIHtcXG4gIG1hcmdpbjogNXB4O1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgd2lkdGg6IDYwcHg7XFxuICBoZWlnaHQ6IDM0cHg7XFxufVxcblxcbi8qIEhpZGUgZGVmYXVsdCBIVE1MIGNoZWNrYm94ICovXFxuLnN3aXRjaCBpbnB1dCB7XFxuICBvcGFjaXR5OiAwO1xcbiAgd2lkdGg6IDA7XFxuICBoZWlnaHQ6IDA7XFxufVxcblxcbi8qIFRoZSBzbGlkZXIgKi9cXG4uc2xpZGVyIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxuICByaWdodDogMDtcXG4gIGJvdHRvbTogMDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNjY2M7XFxuICAtd2Via2l0LXRyYW5zaXRpb246IDAuNHM7XFxuICB0cmFuc2l0aW9uOiAwLjRzO1xcbn1cXG5cXG4uc2xpZGVyOmJlZm9yZSB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBjb250ZW50OiAnJztcXG4gIGhlaWdodDogMjZweDtcXG4gIHdpZHRoOiAyNnB4O1xcbiAgbGVmdDogNHB4O1xcbiAgYm90dG9tOiA0cHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXG4gIC13ZWJraXQtdHJhbnNpdGlvbjogMC40cztcXG4gIHRyYW5zaXRpb246IDAuNHM7XFxufVxcblxcbmlucHV0OmNoZWNrZWQgKyAuc2xpZGVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyMTk2ZjM7XFxufVxcblxcbmlucHV0OmZvY3VzICsgLnNsaWRlciB7XFxuICBib3gtc2hhZG93OiAwIDAgMXB4ICMyMTk2ZjM7XFxufVxcblxcbmlucHV0OmNoZWNrZWQgKyAuc2xpZGVyOmJlZm9yZSB7XFxuICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWCgyNnB4KTtcXG4gIC1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMjZweCk7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMjZweCk7XFxufVxcblxcbi8qIFJvdW5kZWQgc2xpZGVycyAqL1xcbi5zbGlkZXIucm91bmQge1xcbiAgYm9yZGVyLXJhZGl1czogMzRweDtcXG59XFxuXFxuLnNsaWRlci5yb3VuZDpiZWZvcmUge1xcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcblxuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuXG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgXCJcIikuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLnNjc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLnNjc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcblxuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gdXBkYXRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cblxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuXG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cblxuICBjc3MgKz0gb2JqLmNzcztcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0ICcuL3N0eWxlLnNjc3MnXG5pbXBvcnQgeyBHYW1lYm9hcmQgfSBmcm9tICcuL2dhbWVib2FyZCdcbmltcG9ydCB7IFBsYXllciB9IGZyb20gJy4vcGxheWVyJ1xuXG5jb25zdCBwbGF5ZXJCb2FyZCA9IG5ldyBHYW1lYm9hcmQoKVxuY29uc3QgcGxheWVyRGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwbGF5ZXJkaXNwbGF5JylcblxuY29uc3QgY29tcHV0ZXJCb2FyZCA9IG5ldyBHYW1lYm9hcmQoKVxuY29uc3QgY29tcHV0ZXJEaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NvbXB1dGVyZGlzcGxheScpXG5jb25zdCBjb21wdXRlckFJID0gbmV3IFBsYXllcigpXG5cbmNvbXB1dGVyQm9hcmQucmFuZG9tUGxhY2VtZW50KClcblxuZnVuY3Rpb24gcmVuZGVyUGxheWVyQm9hcmQoKSB7XG4gIHBsYXllckRpc3BsYXkuaW5uZXJIVE1MID0gJydcbiAgcGxheWVyQm9hcmQuZ2FtZUJvYXJkLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICBjb25zdCBjZWxsRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBjZWxsRGl2LmNsYXNzTGlzdC5hZGQoJ3BsYXllckNlbGwnKVxuICAgIGNlbGxEaXYuZGF0YXNldC54ID0gY2VsbC54XG4gICAgY2VsbERpdi5kYXRhc2V0LnkgPSBjZWxsLnlcbiAgICBjZWxsRGl2LmRhdGFzZXQub2NjdXBpZWQgPSBjZWxsLm9jY3VwaWVkXG4gICAgY2VsbERpdi5kYXRhc2V0LmJlZW5IaXQgPSBjZWxsLmJlZW5IaXRcbiAgICBwbGF5ZXJEaXNwbGF5LmFwcGVuZENoaWxkKGNlbGxEaXYpXG4gIH0pXG59XG5cbnJlbmRlclBsYXllckJvYXJkKClcblxuZnVuY3Rpb24gcmVuZGVyQ29tcHV0ZXJCb2FyZCgpIHtcbiAgY29tcHV0ZXJEaXNwbGF5LmlubmVySFRNTCA9ICcnXG4gIGNvbXB1dGVyQm9hcmQuZ2FtZUJvYXJkLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICBjb25zdCBjZWxsRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBjZWxsRGl2LmNsYXNzTGlzdC5hZGQoJ2NvbXB1dGVyQ2VsbCcpXG4gICAgY2VsbERpdi5kYXRhc2V0LnggPSBjZWxsLnhcbiAgICBjZWxsRGl2LmRhdGFzZXQueSA9IGNlbGwueVxuICAgIGNlbGxEaXYuZGF0YXNldC5vY2N1cGllZCA9IGNlbGwub2NjdXBpZWRcbiAgICBjZWxsRGl2LmRhdGFzZXQuYmVlbkhpdCA9IGNlbGwuYmVlbkhpdFxuICAgIGNvbXB1dGVyRGlzcGxheS5hcHBlbmRDaGlsZChjZWxsRGl2KVxuICB9KVxufVxuXG5yZW5kZXJDb21wdXRlckJvYXJkKClcblxuZnVuY3Rpb24gcGxheWVyVHVybigpIHtcbiAgY29uc3QgY29tcHV0ZXJCb2FyZENlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNvbXB1dGVyQ2VsbCcpXG4gIGNvbXB1dGVyQm9hcmRDZWxscy5mb3JFYWNoKChjZWxsRGl2KSA9PiB7XG4gICAgY2VsbERpdi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGNvbXB1dGVyQm9hcmQucmVjZWl2ZUF0dGFjayhbXG4gICAgICAgIE51bWJlcihjZWxsRGl2LmRhdGFzZXQueCksXG4gICAgICAgIE51bWJlcihjZWxsRGl2LmRhdGFzZXQueSksXG4gICAgICBdKVxuICAgICAgcmVuZGVyQ29tcHV0ZXJCb2FyZCgpXG4gICAgICBjb21wdXRlckFJLnJhbmRvbUF0dGFjayhwbGF5ZXJCb2FyZClcbiAgICAgIHJlbmRlclBsYXllckJvYXJkKClcbiAgICAgIGdhbWVMb29wKClcbiAgICB9KVxuICB9KVxufVxuXG4vL21haW4gZ2FtZSBsb29wXG5cbmZ1bmN0aW9uIGdhbWVMb29wKCkge1xuICBpZiAoIXBsYXllckJvYXJkLmZsZWV0U3VuaygpICYmICFjb21wdXRlckJvYXJkLmZsZWV0U3VuaygpKSB7XG4gICAgcGxheWVyVHVybigpXG4gIH0gZWxzZSBpZiAocGxheWVyQm9hcmQuZmxlZXRTdW5rKCkpIHtcbiAgICBhbGVydCgnWW91IExvc2UhJylcbiAgfSBlbHNlIGlmIChjb21wdXRlckJvYXJkLmZsZWV0U3VuaygpKSB7XG4gICAgYWxlcnQoJ1lvdSBXaW4hJylcbiAgfVxufVxuXG5wbGF5ZXJUdXJuKClcblxuLy9TaGlwIG5hbWVzIGZvciBtYW51YWwgcGxhY2VtZW50XG5sZXQgbWFudWFsUGxhY2VtZW50RGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5tYW51YWxQbGFjZW1lbnREaXNwbGF5LmlkID0gJ21hbnVhbFBsYWNlbWVudERpc3BsYXknXG5cbi8vVG9nZ2xlIHN3aXRjaCBmb3Igc2hpcCBvcmllbnRhdGlvblxuY29uc3Qgb3JpZW50YXRpb25Ub2dnbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjb3JpZW50YXRpb25Ub2dnbGUnKVxuY29uc3Qgb3JpZW50YXRpb25JbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNvcmllbnRhdGlvbklucHV0JylcbmZ1bmN0aW9uIGdldE9yaWVudGF0aW9uKCkge1xuICBsZXQgb3JpZW50YXRpb25cbiAgaWYgKG9yaWVudGF0aW9uSW5wdXQuY2hlY2tlZCkge1xuICAgIG9yaWVudGF0aW9uID0gJ2hvcml6b250YWwnXG4gIH0gZWxzZSB7XG4gICAgb3JpZW50YXRpb24gPSAndmVydGljYWwnXG4gIH1cbiAgcmV0dXJuIG9yaWVudGF0aW9uXG59XG5vcmllbnRhdGlvblRvZ2dsZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG5cbi8vQ2xvbmUgcGxheWVyIGJvYXJkIGZvciBwbGFjZW1lbnQgcG9wdXBcbmxldCBwbGF5ZXJEaXNwbGF5Q2xvbmUgPSBwbGF5ZXJEaXNwbGF5LmNsb25lTm9kZSh0cnVlKVxuY29uc3QgcG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcG9wdXAnKVxucG9wdXAuYXBwZW5kQ2hpbGQobWFudWFsUGxhY2VtZW50RGlzcGxheSlcbnBvcHVwLmFwcGVuZENoaWxkKHBsYXllckRpc3BsYXlDbG9uZSlcblxuLy9Qb3B1cCBkaXYgYnV0dG9uIGxpc3RlbmVyc1xuY29uc3QgcmFuZG9tQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3JhbmRvbUJ1dHRvbicpXG5yYW5kb21CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIG1hbnVhbEJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gIHBsYXllckJvYXJkLmdhbWVCb2FyZCA9IHBsYXllckJvYXJkLm1ha2VHYW1lYm9hcmQoKVxuICBwbGF5ZXJCb2FyZC5yYW5kb21QbGFjZW1lbnQoKVxuICByZW5kZXJQbGF5ZXJCb2FyZCgpXG4gIHBsYXllckRpc3BsYXlDbG9uZS5pbm5lckhUTUwgPSAnJ1xuICBwbGF5ZXJEaXNwbGF5Q2xvbmUgPSBwbGF5ZXJEaXNwbGF5LmNsb25lTm9kZSh0cnVlKVxuICBwb3B1cC5hcHBlbmRDaGlsZChwbGF5ZXJEaXNwbGF5Q2xvbmUpXG4gIHBvcHVwLmFwcGVuZENoaWxkKG1hbnVhbEJ1dHRvbilcbn0pXG5jb25zdCBzdGFydEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzdGFydEJ1dHRvbicpXG5zdGFydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgaWYgKHBsYXllckJvYXJkLmZsZWV0UGxhY2VkKCkpIHtcbiAgICBwb3B1cC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gIH0gZWxzZSB7XG4gICAgYWxlcnQoJ1lvdSBtdXN0IHBsYWNlIGFsbCB5b3VyIHNoaXBzIScpXG4gIH1cbn0pXG5cbi8vQnV0dG9uIGFuZCBhcnJheXMgdG8gY3ljbGUgdGhyb3VnaCBtYW51YWwgc2hpcCBwbGFjZW1lbnRcbmNvbnN0IG1hbnVhbEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXG5tYW51YWxCdXR0b24uaW5uZXJIVE1MID0gJydcbm1hbnVhbEJ1dHRvbi5pZCA9ICdtYW51YWxCdXR0b24nXG5tYW51YWxCdXR0b24udGV4dENvbnRlbnQgPSAnTWFudWFsIFNoaXAgUGxhY2VtZW50J1xucG9wdXAuYXBwZW5kQ2hpbGQobWFudWFsQnV0dG9uKVxuXG5sZXQgcGxheWVyQm9hcmRGbGVldCA9IFtcbiAgcGxheWVyQm9hcmQuY2FycmllcixcbiAgcGxheWVyQm9hcmQuYmF0dGxlc2hpcCxcbiAgcGxheWVyQm9hcmQuZGVzdHJveWVyLFxuICBwbGF5ZXJCb2FyZC5zdWJtYXJpbmUsXG4gIHBsYXllckJvYXJkLnBhdHJvbEJvYXQsXG5dXG5cbmxldCBwbGF5ZXJCb2FyZEZsZWV0TmFtZXMgPSBbXG4gICdDYXJyaWVyJyxcbiAgJ0JhdHRsZXNoaXAnLFxuICAnRGVzdHJveWVyJyxcbiAgJ1N1Ym1hcmluZScsXG4gICdQYXRyb2wgQm9hdCcsXG5dXG5cbmZ1bmN0aW9uIG1hbnVhbFNoaXBDeWNsZSgpIHtcbiAgbWFudWFsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIG9yaWVudGF0aW9uVG9nZ2xlLnN0eWxlLmRpc3BsYXkgPSAnZmxleCdcbiAgICByYW5kb21CdXR0b24uc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICAgIG1hbnVhbFBsYWNlbWVudERpc3BsYXkudGV4dENvbnRlbnQgPSBgUGxhY2UgeW91ciAke3BsYXllckJvYXJkRmxlZXROYW1lc1swXX1gXG4gICAgbGV0IHNoaXAgPSBwbGF5ZXJCb2FyZEZsZWV0WzBdXG4gICAgbGV0IHBsYXllckJvYXJkQ2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucGxheWVyQ2VsbCcpXG4gICAgcGxheWVyQm9hcmRDZWxscy5mb3JFYWNoKChjZWxsRGl2KSA9PiB7XG4gICAgICBjZWxsRGl2LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBzaGlwLm9yaWVudGF0aW9uID0gZ2V0T3JpZW50YXRpb24oKVxuICAgICAgICBpZiAoXG4gICAgICAgICAgIXBsYXllckJvYXJkLnZhbGlkUGxhY2VtZW50KFxuICAgICAgICAgICAgW051bWJlcihjZWxsRGl2LmRhdGFzZXQueCksIE51bWJlcihjZWxsRGl2LmRhdGFzZXQueSldLFxuICAgICAgICAgICAgc2hpcFxuICAgICAgICAgIClcbiAgICAgICAgKSB7XG4gICAgICAgICAgbWFudWFsUGxhY2VtZW50RGlzcGxheS50ZXh0Q29udGVudCA9ICdJbnZhbGlkIHBsYWNlbWVudCwgdHJ5IGFnYWluJ1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgbWFudWFsUGxhY2VtZW50RGlzcGxheS50ZXh0Q29udGVudCA9IGBQbGFjZSB5b3VyICR7cGxheWVyQm9hcmRGbGVldE5hbWVzWzBdfWBcbiAgICAgICAgICB9LCAxMDAwKVxuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIHBsYXllckJvYXJkLnBsYWNlU2hpcChcbiAgICAgICAgICBbTnVtYmVyKGNlbGxEaXYuZGF0YXNldC54KSwgTnVtYmVyKGNlbGxEaXYuZGF0YXNldC55KV0sXG4gICAgICAgICAgc2hpcFxuICAgICAgICApXG4gICAgICAgIHJlbmRlclBsYXllckJvYXJkKClcbiAgICAgICAgcGxheWVyRGlzcGxheUNsb25lLmlubmVySFRNTCA9ICcnXG4gICAgICAgIHBsYXllckRpc3BsYXlDbG9uZSA9IHBsYXllckRpc3BsYXkuY2xvbmVOb2RlKHRydWUpXG4gICAgICAgIHBvcHVwLmFwcGVuZENoaWxkKHBsYXllckRpc3BsYXlDbG9uZSlcbiAgICAgICAgcG9wdXAuYXBwZW5kQ2hpbGQobWFudWFsQnV0dG9uKVxuICAgICAgICBwbGF5ZXJCb2FyZEZsZWV0TmFtZXMuc2hpZnQoKVxuICAgICAgICBwbGF5ZXJCb2FyZEZsZWV0LnNoaWZ0KClcbiAgICAgICAgbWFudWFsQnV0dG9uLnRleHRDb250ZW50ID0gYE5leHQgVXA6ICR7cGxheWVyQm9hcmRGbGVldE5hbWVzWzBdfWBcbiAgICAgICAgaWYgKHBsYXllckJvYXJkRmxlZXROYW1lcy5sZW5ndGggPT0gMCkge1xuICAgICAgICAgIG1hbnVhbEJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gICAgICAgICAgbWFudWFsUGxhY2VtZW50RGlzcGxheS50ZXh0Q29udGVudCA9ICdSZWFkeSB0byBzdGFydCEnXG4gICAgICAgICAgb3JpZW50YXRpb25Ub2dnbGUuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG4gIH0pXG59XG5tYW51YWxTaGlwQ3ljbGUoKVxuIl0sIm5hbWVzIjpbIlNoaXAiLCJDZWxsIiwiY29uc3RydWN0b3IiLCJ4IiwieSIsIm9jY3VwaWVkIiwiYmVlbkhpdCIsIkdhbWVib2FyZCIsImdhbWVCb2FyZCIsIm1ha2VHYW1lYm9hcmQiLCJjYXJyaWVyIiwiYmF0dGxlc2hpcCIsImRlc3Ryb3llciIsInN1Ym1hcmluZSIsInBhdHJvbEJvYXQiLCJpIiwiaiIsInB1c2giLCJwbGFjZVNoaXAiLCJjb29yZGluYXRlcyIsInNoaXAiLCJvcmllbnRhdGlvbiIsInZhbGlkUGxhY2VtZW50IiwibGVuZ3RoIiwidGVtcENvb3JkcyIsImZpbmRDZWxsIiwidW5kZWZpbmVkIiwiZmluZCIsIm9iaiIsInJlY2VpdmVBdHRhY2siLCJoaXQiLCJmbGVldFN1bmsiLCJpc1N1bmsiLCJyYW5kb21QbGFjZW1lbnQiLCJmbGVldCIsImJpbmRlciIsInRyeVBsYWNlbWVudCIsInJhbmRvbUNlbGwiLCJyYW5kb21YWSIsInNoaWZ0IiwibWluIiwibWF4IiwicmFuZG9tWCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInJhbmRvbVkiLCJmbGVldFBsYWNlZCIsImNvdW50ZXIiLCJQbGF5ZXIiLCJuYW1lIiwicmFuZG9tQXR0YWNrIiwiaGl0TnVtYmVyIiwicGxheWVyQm9hcmQiLCJwbGF5ZXJEaXNwbGF5IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiY29tcHV0ZXJCb2FyZCIsImNvbXB1dGVyRGlzcGxheSIsImNvbXB1dGVyQUkiLCJyZW5kZXJQbGF5ZXJCb2FyZCIsImlubmVySFRNTCIsImZvckVhY2giLCJjZWxsIiwiY2VsbERpdiIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJkYXRhc2V0IiwiYXBwZW5kQ2hpbGQiLCJyZW5kZXJDb21wdXRlckJvYXJkIiwicGxheWVyVHVybiIsImNvbXB1dGVyQm9hcmRDZWxscyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJhZGRFdmVudExpc3RlbmVyIiwiTnVtYmVyIiwiZ2FtZUxvb3AiLCJhbGVydCIsIm1hbnVhbFBsYWNlbWVudERpc3BsYXkiLCJpZCIsIm9yaWVudGF0aW9uVG9nZ2xlIiwib3JpZW50YXRpb25JbnB1dCIsImdldE9yaWVudGF0aW9uIiwiY2hlY2tlZCIsInN0eWxlIiwiZGlzcGxheSIsInBsYXllckRpc3BsYXlDbG9uZSIsImNsb25lTm9kZSIsInBvcHVwIiwicmFuZG9tQnV0dG9uIiwibWFudWFsQnV0dG9uIiwic3RhcnRCdXR0b24iLCJ0ZXh0Q29udGVudCIsInBsYXllckJvYXJkRmxlZXQiLCJwbGF5ZXJCb2FyZEZsZWV0TmFtZXMiLCJtYW51YWxTaGlwQ3ljbGUiLCJwbGF5ZXJCb2FyZENlbGxzIiwic2V0VGltZW91dCJdLCJzb3VyY2VSb290IjoiIn0=