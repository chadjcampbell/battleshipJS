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
  manualPlacement(div) {
    let fleet = [this.carrier, this.battleship, this.destroyer, this.submarine, this.patrolBoat];
    let binder = this;
    function manualPlacementEach(fleet) {
      if (fleet.length === 0) return;
      //TODO
    }

    this.manualPlacementEach(fleet);
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
    randomButton.style.display = 'none';
    manualPlacementDisplay.textContent = `Place your ${playerBoardFleetNames[0]}`;
    let ship = playerBoardFleet[0];
    let playerBoardCells = document.querySelectorAll('.playerCell');
    playerBoardCells.forEach(cellDiv => {
      cellDiv.addEventListener('click', () => {
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
        }
      });
    });
  });
}
manualShipCycle();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1FBQ2xEQyxLQUFLLENBQUNiLFdBQVcsQ0FBQ1csa0JBQWtCLENBQUM7UUFDckNFLEtBQUssQ0FBQ2IsV0FBVyxDQUFDZSxZQUFZLENBQUM7UUFDL0JNLHFCQUFxQixDQUFDdEQsS0FBSyxFQUFFO1FBQzdCcUQsZ0JBQWdCLENBQUNyRCxLQUFLLEVBQUU7UUFDeEJnRCxZQUFZLENBQUNJLFdBQVcsR0FBSSxZQUFXRSxxQkFBcUIsQ0FBQyxDQUFDLENBQUUsRUFBQztRQUNqRSxJQUFJQSxxQkFBcUIsQ0FBQ3RFLE1BQU0sSUFBSSxDQUFDLEVBQUU7VUFDckNnRSxZQUFZLENBQUNDLEtBQUssQ0FBQ0MsT0FBTyxHQUFHLE1BQU07VUFDbkNSLHNCQUFzQixDQUFDVSxXQUFXLEdBQUcsaUJBQWlCO1FBQ3hEO01BQ0YsQ0FBQyxDQUFDO0lBQ0osQ0FBQyxDQUFDO0VBQ0osQ0FBQyxDQUFDO0FBQ0o7QUFDQUcsZUFBZSxFQUFFLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwanMvLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBqcy8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcGpzLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcGpzLy4vc3JjL3N0eWxlLnNjc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcGpzLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwanMvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwanMvLi9zcmMvc3R5bGUuc2Nzcz84NDZhIiwid2VicGFjazovL2JhdHRsZXNoaXBqcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwanMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBqcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwanMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcGpzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcGpzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcGpzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXBqcy93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwanMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXBqcy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXBqcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXBqcy93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcGpzLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNoaXAgfSBmcm9tICcuL3NoaXAnXG5cbmNsYXNzIENlbGwge1xuICBjb25zdHJ1Y3Rvcih4LCB5LCBvY2N1cGllZCA9IG51bGwsIGJlZW5IaXQgPSBmYWxzZSkge1xuICAgIHRoaXMueCA9IHhcbiAgICB0aGlzLnkgPSB5XG4gICAgdGhpcy5vY2N1cGllZCA9IG9jY3VwaWVkXG4gICAgdGhpcy5iZWVuSGl0ID0gYmVlbkhpdFxuICB9XG59XG5cbmNsYXNzIEdhbWVib2FyZCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuZ2FtZUJvYXJkID0gdGhpcy5nYW1lQm9hcmQgfHwgdGhpcy5tYWtlR2FtZWJvYXJkKClcbiAgICB0aGlzLmNhcnJpZXIgPSB0aGlzLmNhcnJpZXIgfHwgbmV3IFNoaXAoNSlcbiAgICB0aGlzLmJhdHRsZXNoaXAgPSB0aGlzLmJhdHRsZXNoaXAgfHwgbmV3IFNoaXAoNClcbiAgICB0aGlzLmRlc3Ryb3llciA9IHRoaXMuZGVzdHJveWVyIHx8IG5ldyBTaGlwKDMpXG4gICAgdGhpcy5zdWJtYXJpbmUgPSB0aGlzLnN1Ym1hcmluZSB8fCBuZXcgU2hpcCgzKVxuICAgIHRoaXMucGF0cm9sQm9hdCA9IHRoaXMucGF0cm9sQm9hdCB8fCBuZXcgU2hpcCgyKVxuICB9XG5cbiAgbWFrZUdhbWVib2FyZCgpIHtcbiAgICBsZXQgZ2FtZUJvYXJkID0gW11cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgICBnYW1lQm9hcmQucHVzaChuZXcgQ2VsbChpLCBqKSlcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGdhbWVCb2FyZFxuICB9XG4gIHBsYWNlU2hpcChjb29yZGluYXRlcywgc2hpcCkge1xuICAgIGlmIChzaGlwLm9yaWVudGF0aW9uID09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgIGlmICh0aGlzLnZhbGlkUGxhY2VtZW50KGNvb3JkaW5hdGVzLCBzaGlwKSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBsZXQgdGVtcENvb3JkcyA9IFtjb29yZGluYXRlc1swXSArIGksIGNvb3JkaW5hdGVzWzFdXVxuICAgICAgICAgIHRoaXMuZmluZENlbGwodGVtcENvb3Jkcykub2NjdXBpZWQgPSBzaGlwXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMudmFsaWRQbGFjZW1lbnQoY29vcmRpbmF0ZXMsIHNoaXApKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGxldCB0ZW1wQ29vcmRzID0gW2Nvb3JkaW5hdGVzWzBdLCBjb29yZGluYXRlc1sxXSArIGldXG4gICAgICAgICAgdGhpcy5maW5kQ2VsbCh0ZW1wQ29vcmRzKS5vY2N1cGllZCA9IHNoaXBcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICB2YWxpZFBsYWNlbWVudChjb29yZGluYXRlcywgc2hpcCkge1xuICAgIGlmIChzaGlwLm9yaWVudGF0aW9uID09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgdGVtcENvb3JkcyA9IFtjb29yZGluYXRlc1swXSArIGksIGNvb3JkaW5hdGVzWzFdXVxuICAgICAgICBpZiAoXG4gICAgICAgICAgdGhpcy5maW5kQ2VsbCh0ZW1wQ29vcmRzKSA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICB0aGlzLmZpbmRDZWxsKHRlbXBDb29yZHMpLm9jY3VwaWVkICE9PSBudWxsXG4gICAgICAgICkge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IHRlbXBDb29yZHMgPSBbY29vcmRpbmF0ZXNbMF0sIGNvb3JkaW5hdGVzWzFdICsgaV1cbiAgICAgICAgaWYgKFxuICAgICAgICAgIHRoaXMuZmluZENlbGwodGVtcENvb3JkcykgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgdGhpcy5maW5kQ2VsbCh0ZW1wQ29vcmRzKS5vY2N1cGllZCAhPT0gbnVsbFxuICAgICAgICApIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gIH1cbiAgZmluZENlbGwoY29vcmRpbmF0ZXMpIHtcbiAgICByZXR1cm4gdGhpcy5nYW1lQm9hcmQuZmluZChcbiAgICAgIChvYmopID0+IG9iai54ID09PSBjb29yZGluYXRlc1swXSAmJiBvYmoueSA9PT0gY29vcmRpbmF0ZXNbMV1cbiAgICApXG4gIH1cbiAgcmVjZWl2ZUF0dGFjayhjb29yZGluYXRlcykge1xuICAgIGlmICh0aGlzLmZpbmRDZWxsKGNvb3JkaW5hdGVzKS5iZWVuSGl0ID09PSB0cnVlKSByZXR1cm4gZmFsc2VcbiAgICB0aGlzLmZpbmRDZWxsKGNvb3JkaW5hdGVzKS5iZWVuSGl0ID0gdHJ1ZVxuICAgIGlmICh0aGlzLmZpbmRDZWxsKGNvb3JkaW5hdGVzKS5vY2N1cGllZCAhPT0gbnVsbClcbiAgICAgIHRoaXMuZmluZENlbGwoY29vcmRpbmF0ZXMpLm9jY3VwaWVkLmhpdCgpXG4gIH1cbiAgZmxlZXRTdW5rKCkge1xuICAgIGlmIChcbiAgICAgIHRoaXMuY2Fycmllci5pc1N1bmsoKSAmJlxuICAgICAgdGhpcy5iYXR0bGVzaGlwLmlzU3VuaygpICYmXG4gICAgICB0aGlzLmRlc3Ryb3llci5pc1N1bmsoKSAmJlxuICAgICAgdGhpcy5zdWJtYXJpbmUuaXNTdW5rKCkgJiZcbiAgICAgIHRoaXMucGF0cm9sQm9hdC5pc1N1bmsoKVxuICAgICkge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbiAgcmFuZG9tUGxhY2VtZW50KCkge1xuICAgIGxldCBmbGVldCA9IFtcbiAgICAgIHRoaXMuY2FycmllcixcbiAgICAgIHRoaXMuYmF0dGxlc2hpcCxcbiAgICAgIHRoaXMuZGVzdHJveWVyLFxuICAgICAgdGhpcy5zdWJtYXJpbmUsXG4gICAgICB0aGlzLnBhdHJvbEJvYXQsXG4gICAgXVxuICAgIGxldCBiaW5kZXIgPSB0aGlzXG4gICAgZnVuY3Rpb24gdHJ5UGxhY2VtZW50KGZsZWV0KSB7XG4gICAgICBpZiAoZmxlZXQubGVuZ3RoID09PSAwKSByZXR1cm5cbiAgICAgIGxldCByYW5kb21DZWxsID0gYmluZGVyLmZpbmRDZWxsKGJpbmRlci5yYW5kb21YWSgpKVxuICAgICAgaWYgKGJpbmRlci52YWxpZFBsYWNlbWVudChbcmFuZG9tQ2VsbC54LCByYW5kb21DZWxsLnldLCBmbGVldFswXSkpIHtcbiAgICAgICAgYmluZGVyLnBsYWNlU2hpcChbcmFuZG9tQ2VsbC54LCByYW5kb21DZWxsLnldLCBmbGVldFswXSlcbiAgICAgICAgZmxlZXQuc2hpZnQoKVxuICAgICAgICB0cnlQbGFjZW1lbnQoZmxlZXQpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0cnlQbGFjZW1lbnQoZmxlZXQpXG4gICAgICB9XG4gICAgfVxuICAgIHRyeVBsYWNlbWVudChmbGVldClcbiAgfVxuICByYW5kb21YWShtaW4gPSAwLCBtYXggPSA5KSB7XG4gICAgY29uc3QgcmFuZG9tWCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSArIG1pbilcbiAgICBjb25zdCByYW5kb21ZID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpICsgbWluKVxuICAgIHJldHVybiBbcmFuZG9tWCwgcmFuZG9tWV1cbiAgfVxuICBmbGVldFBsYWNlZCgpIHtcbiAgICBsZXQgY291bnRlciA9IDBcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZ2FtZUJvYXJkLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodGhpcy5nYW1lQm9hcmRbaV0ub2NjdXBpZWQgIT09IG51bGwpIHtcbiAgICAgICAgY291bnRlcisrXG4gICAgICB9XG4gICAgfVxuICAgIGlmIChjb3VudGVyID09IDE3KSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gIH1cbiAgbWFudWFsUGxhY2VtZW50KGRpdikge1xuICAgIGxldCBmbGVldCA9IFtcbiAgICAgIHRoaXMuY2FycmllcixcbiAgICAgIHRoaXMuYmF0dGxlc2hpcCxcbiAgICAgIHRoaXMuZGVzdHJveWVyLFxuICAgICAgdGhpcy5zdWJtYXJpbmUsXG4gICAgICB0aGlzLnBhdHJvbEJvYXQsXG4gICAgXVxuICAgIGxldCBiaW5kZXIgPSB0aGlzXG4gICAgZnVuY3Rpb24gbWFudWFsUGxhY2VtZW50RWFjaChmbGVldCkge1xuICAgICAgaWYgKGZsZWV0Lmxlbmd0aCA9PT0gMCkgcmV0dXJuXG4gICAgICAvL1RPRE9cbiAgICB9XG4gICAgdGhpcy5tYW51YWxQbGFjZW1lbnRFYWNoKGZsZWV0KVxuICB9XG59XG5cbmV4cG9ydCB7IEdhbWVib2FyZCB9XG4iLCJjbGFzcyBQbGF5ZXIge1xuICBjb25zdHJ1Y3RvcihuYW1lID0gJ0NvbXB1dGVyJykge1xuICAgIHRoaXMubmFtZSA9IG5hbWVcbiAgfVxuICByYW5kb21BdHRhY2soZ2FtZUJvYXJkKSB7XG4gICAgbGV0IHJhbmRvbUNlbGwgPSBnYW1lQm9hcmQuZmluZENlbGwodGhpcy5yYW5kb21YWSgpKVxuICAgIGlmIChyYW5kb21DZWxsLmJlZW5IaXQgPT0gZmFsc2UpIHtcbiAgICAgIHJhbmRvbUNlbGwuYmVlbkhpdCA9IHRydWVcbiAgICAgIGlmIChyYW5kb21DZWxsLm9jY3VwaWVkICE9PSBudWxsKSB7XG4gICAgICAgIHJhbmRvbUNlbGwub2NjdXBpZWQuaGl0KClcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yYW5kb21BdHRhY2soZ2FtZUJvYXJkKVxuICAgIH1cbiAgfVxuICByYW5kb21YWShtaW4gPSAwLCBtYXggPSA5KSB7XG4gICAgY29uc3QgcmFuZG9tWCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSArIG1pbilcbiAgICBjb25zdCByYW5kb21ZID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpICsgbWluKVxuICAgIHJldHVybiBbcmFuZG9tWCwgcmFuZG9tWV1cbiAgfVxufVxuXG5leHBvcnQgeyBQbGF5ZXIgfVxuIiwiY2xhc3MgU2hpcCB7XG4gIGNvbnN0cnVjdG9yKGxlbmd0aCwgaGl0TnVtYmVyID0gMCwgb3JpZW50YXRpb24gPSB0aGlzLm9yaWVudGF0aW9uKCkpIHtcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aFxuICAgIHRoaXMuaGl0TnVtYmVyID0gaGl0TnVtYmVyXG4gICAgdGhpcy5vcmllbnRhdGlvbiA9IG9yaWVudGF0aW9uXG4gIH1cbiAgaGl0KCkge1xuICAgIHRoaXMuaGl0TnVtYmVyKytcbiAgfVxuICBpc1N1bmsoKSB7XG4gICAgaWYgKHRoaXMubGVuZ3RoIDw9IHRoaXMuaGl0TnVtYmVyKSByZXR1cm4gdHJ1ZVxuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIG9yaWVudGF0aW9uKCkge1xuICAgIHJldHVybiBNYXRoLnJhbmRvbSgpIDwgMC41ID8gJ3ZlcnRpY2FsJyA6ICdob3Jpem9udGFsJ1xuICB9XG59XG5cbmV4cG9ydCB7IFNoaXAgfVxuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJib2R5IHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvIENvbmRlbnNlZCcsIHNhbnMtc2VyaWY7XFxuICBoZWlnaHQ6IDEwMHZoO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxufVxcbmgxIHtcXG4gIGNvbG9yOiBibGFjaztcXG4gIC13ZWJraXQtdGV4dC1maWxsLWNvbG9yOiB3aGl0ZTtcXG4gIC13ZWJraXQtdGV4dC1zdHJva2Utd2lkdGg6IDFweDtcXG4gIC13ZWJraXQtdGV4dC1zdHJva2UtY29sb3I6IGJsYWNrO1xcbiAgZm9udC1zdHJldGNoOiBleHBhbmRlZDtcXG59XFxubWFpbiB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcbiAgZmxleC13cmFwOiB3cmFwO1xcbiAgb3ZlcmZsb3c6IGF1dG87XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmVmNmU0O1xcbn1cXG5cXG5oZWFkZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGhlaWdodDogNjBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwMGE3MWM7XFxuICBwYWRkaW5nOiAxMHB4O1xcbiAgYm9yZGVyLWJvdHRvbTogM3B4IHNvbGlkIGJsYWNrO1xcbiAgei1pbmRleDogMTtcXG4gIGJveC1zaGFkb3c6IDBweCA3cHggMTRweCAtNHB4IHJnYmEoMCwgMCwgMCwgMSk7XFxufVxcblxcbmZvb3RlciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgaGVpZ2h0OiA4MHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzhiZDNkZDtcXG4gIHBhZGRpbmc6IDEwcHg7XFxuICBib3JkZXItdG9wOiAxcHggc29saWQgYmxhY2s7XFxuICBib3gtc2hhZG93OiAwcHggLTdweCAxNHB4IC00cHggcmdiYSgwLCAwLCAwLCAxKTtcXG59XFxuXFxuLmFyZWEge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZWJiZTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgYm9yZGVyOiBibGFjayBzb2xpZCAxcHg7XFxuICB3aWR0aDogMzAwcHg7XFxuICBwYWRkaW5nOiA1cHg7XFxuICBtYXJnaW46IDIwcHg7XFxuICBib3gtc2hhZG93OiAwcHggMHB4IDlweCA1cHggcmdiYSgwLCAwLCAwLCAwLjUpO1xcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcbn1cXG5cXG4jcG9wdXAge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZWJiZTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogNTAlO1xcbiAgbGVmdDogNTAlO1xcbiAgd2lkdGg6IDM1MHB4O1xcbiAgaGVpZ2h0OiA2MDBweDtcXG4gIG1hcmdpbi1sZWZ0OiAtMTc1cHg7XFxuICBtYXJnaW4tdG9wOiAtMzAwcHg7XFxuICBib3gtc2hhZG93OiAwcHggMHB4IDlweCA1cHggcmdiYSgwLCAwLCAwLCAwLjUpO1xcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgYm9yZGVyOiBibGFjayBzb2xpZCAxcHg7XFxuICBwYWRkaW5nOiA1cHg7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIHotaW5kZXg6IDI7XFxufVxcblxcbiNwb3B1cEJ1dHRvbkFyZWEge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXG4gIHdpZHRoOiAxMDAlO1xcbn1cXG5cXG4uYm9hcmQge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGZsZXgtd3JhcDogd3JhcDtcXG4gIHdpZHRoOiAxMDAlO1xcbn1cXG5cXG4ucGxheWVyQ2VsbCxcXG4uY29tcHV0ZXJDZWxsIHtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcbiAgZmxleDogMCA5JTtcXG4gIHdpZHRoOiAzMHB4O1xcbiAgaGVpZ2h0OiAzMHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDcxLCAyNDMsIDI1NSk7XFxuICBib3JkZXItcmFkaXVzOiAycHg7XFxufVxcblxcbi5wbGF5ZXJDZWxsOmhvdmVyLFxcbi5jb21wdXRlckNlbGw6aG92ZXIsXFxuYnV0dG9uOmhvdmVyIHtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMS4xKTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLnBsYXllckNlbGxbZGF0YS1iZWVuLWhpdD0ndHJ1ZSddLFxcbi5jb21wdXRlckNlbGxbZGF0YS1iZWVuLWhpdD0ndHJ1ZSddIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigxOTAsIDE4OSwgMTg5KTtcXG59XFxuXFxuLnBsYXllckNlbGxbZGF0YS1vY2N1cGllZD0nW29iamVjdCBPYmplY3RdJ10ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI1NSwgMCwgMCk7XFxufVxcblxcbi5wbGF5ZXJDZWxsW2RhdGEtYmVlbi1oaXQ9J3RydWUnXS5wbGF5ZXJDZWxsW2RhdGEtb2NjdXBpZWQ9J1tvYmplY3QgT2JqZWN0XSddLFxcbi5jb21wdXRlckNlbGxbZGF0YS1iZWVuLWhpdD0ndHJ1ZSddLmNvbXB1dGVyQ2VsbFtkYXRhLW9jY3VwaWVkPSdbb2JqZWN0IE9iamVjdF0nXSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXG59XFxuXFxuI2J1dHRvbnMge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZlZjZlNDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG5cXG5idXR0b24ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwYTcxYztcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIHBhZGRpbmc6IDVweCAxMHB4O1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgZm9udC1zaXplOiAxNnB4O1xcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgYm94LXNoYWRvdzogMHB4IDBweCA5cHggNXB4IHJnYmEoMCwgMCwgMCwgMC41KTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuI21hbnVhbEJ1dHRvbiB7XFxuICBtYXJnaW4tdG9wOiAyMHB4O1xcbn1cXG5cXG4jb3JpZW50YXRpb25Ub2dnbGUge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIHBhZGRpbmc6IDVweDtcXG59XFxuXFxuLyogVGhlIHN3aXRjaCBmb3Igc2hpcCBvcmllbnRhdGlvbiAtIHRoZSBib3ggYXJvdW5kIHRoZSBzbGlkZXIgKi9cXG4uc3dpdGNoIHtcXG4gIG1hcmdpbjogNXB4O1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgd2lkdGg6IDYwcHg7XFxuICBoZWlnaHQ6IDM0cHg7XFxufVxcblxcbi8qIEhpZGUgZGVmYXVsdCBIVE1MIGNoZWNrYm94ICovXFxuLnN3aXRjaCBpbnB1dCB7XFxuICBvcGFjaXR5OiAwO1xcbiAgd2lkdGg6IDA7XFxuICBoZWlnaHQ6IDA7XFxufVxcblxcbi8qIFRoZSBzbGlkZXIgKi9cXG4uc2xpZGVyIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxuICByaWdodDogMDtcXG4gIGJvdHRvbTogMDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNjY2M7XFxuICAtd2Via2l0LXRyYW5zaXRpb246IDAuNHM7XFxuICB0cmFuc2l0aW9uOiAwLjRzO1xcbn1cXG5cXG4uc2xpZGVyOmJlZm9yZSB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBjb250ZW50OiAnJztcXG4gIGhlaWdodDogMjZweDtcXG4gIHdpZHRoOiAyNnB4O1xcbiAgbGVmdDogNHB4O1xcbiAgYm90dG9tOiA0cHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXG4gIC13ZWJraXQtdHJhbnNpdGlvbjogMC40cztcXG4gIHRyYW5zaXRpb246IDAuNHM7XFxufVxcblxcbmlucHV0OmNoZWNrZWQgKyAuc2xpZGVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyMTk2ZjM7XFxufVxcblxcbmlucHV0OmZvY3VzICsgLnNsaWRlciB7XFxuICBib3gtc2hhZG93OiAwIDAgMXB4ICMyMTk2ZjM7XFxufVxcblxcbmlucHV0OmNoZWNrZWQgKyAuc2xpZGVyOmJlZm9yZSB7XFxuICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWCgyNnB4KTtcXG4gIC1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMjZweCk7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMjZweCk7XFxufVxcblxcbi8qIFJvdW5kZWQgc2xpZGVycyAqL1xcbi5zbGlkZXIucm91bmQge1xcbiAgYm9yZGVyLXJhZGl1czogMzRweDtcXG59XFxuXFxuLnNsaWRlci5yb3VuZDpiZWZvcmUge1xcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcbn1cXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuc2Nzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLGtCQUFrQjtFQUNsQiwyQ0FBMkM7RUFDM0MsYUFBYTtFQUNiLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsOEJBQThCO0FBQ2hDO0FBQ0E7RUFDRSxZQUFZO0VBQ1osOEJBQThCO0VBQzlCLDhCQUE4QjtFQUM5QixnQ0FBZ0M7RUFDaEMsc0JBQXNCO0FBQ3hCO0FBQ0E7RUFDRSxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLDZCQUE2QjtFQUM3QixlQUFlO0VBQ2YsY0FBYztFQUNkLFlBQVk7RUFDWix5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLHVCQUF1QjtFQUN2QixZQUFZO0VBQ1oseUJBQXlCO0VBQ3pCLGFBQWE7RUFDYiw4QkFBOEI7RUFDOUIsVUFBVTtFQUNWLDhDQUE4QztBQUNoRDs7QUFFQTtFQUNFLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsdUJBQXVCO0VBQ3ZCLFlBQVk7RUFDWix5QkFBeUI7RUFDekIsYUFBYTtFQUNiLDJCQUEyQjtFQUMzQiwrQ0FBK0M7QUFDakQ7O0FBRUE7RUFDRSx5QkFBeUI7RUFDekIsYUFBYTtFQUNiLHNCQUFzQjtFQUN0Qix1QkFBdUI7RUFDdkIsbUJBQW1CO0VBQ25CLHVCQUF1QjtFQUN2QixZQUFZO0VBQ1osWUFBWTtFQUNaLFlBQVk7RUFDWiw4Q0FBOEM7RUFDOUMsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UseUJBQXlCO0VBQ3pCLGtCQUFrQjtFQUNsQixRQUFRO0VBQ1IsU0FBUztFQUNULFlBQVk7RUFDWixhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLGtCQUFrQjtFQUNsQiw4Q0FBOEM7RUFDOUMsa0JBQWtCO0VBQ2xCLHVCQUF1QjtFQUN2QixZQUFZO0VBQ1osYUFBYTtFQUNiLHNCQUFzQjtFQUN0Qix1QkFBdUI7RUFDdkIsbUJBQW1CO0VBQ25CLFVBQVU7QUFDWjs7QUFFQTtFQUNFLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsNkJBQTZCO0VBQzdCLFdBQVc7QUFDYjs7QUFFQTtFQUNFLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsdUJBQXVCO0VBQ3ZCLGVBQWU7RUFDZixXQUFXO0FBQ2I7O0FBRUE7O0VBRUUsdUJBQXVCO0VBQ3ZCLFVBQVU7RUFDVixXQUFXO0VBQ1gsWUFBWTtFQUNaLG1DQUFtQztFQUNuQyxrQkFBa0I7QUFDcEI7O0FBRUE7OztFQUdFLHFCQUFxQjtFQUNyQixlQUFlO0FBQ2pCOztBQUVBOztFQUVFLG9DQUFvQztBQUN0Qzs7QUFFQTtFQUNFLGdDQUFnQztBQUNsQzs7QUFFQTs7RUFFRSx1QkFBdUI7QUFDekI7O0FBRUE7RUFDRSx5QkFBeUI7RUFDekIsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixtQkFBbUI7RUFDbkIsdUJBQXVCO0FBQ3pCOztBQUVBO0VBQ0UseUJBQXlCO0VBQ3pCLFlBQVk7RUFDWixZQUFZO0VBQ1osaUJBQWlCO0VBQ2pCLGtCQUFrQjtFQUNsQixxQkFBcUI7RUFDckIscUJBQXFCO0VBQ3JCLGVBQWU7RUFDZixtQkFBbUI7RUFDbkIsdUJBQXVCO0VBQ3ZCLGtCQUFrQjtFQUNsQiw4Q0FBOEM7RUFDOUMsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsdUJBQXVCO0VBQ3ZCLFlBQVk7QUFDZDs7QUFFQSxnRUFBZ0U7QUFDaEU7RUFDRSxXQUFXO0VBQ1gsa0JBQWtCO0VBQ2xCLHFCQUFxQjtFQUNyQixXQUFXO0VBQ1gsWUFBWTtBQUNkOztBQUVBLCtCQUErQjtBQUMvQjtFQUNFLFVBQVU7RUFDVixRQUFRO0VBQ1IsU0FBUztBQUNYOztBQUVBLGVBQWU7QUFDZjtFQUNFLGtCQUFrQjtFQUNsQixlQUFlO0VBQ2YsTUFBTTtFQUNOLE9BQU87RUFDUCxRQUFRO0VBQ1IsU0FBUztFQUNULHNCQUFzQjtFQUN0Qix3QkFBd0I7RUFDeEIsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLFdBQVc7RUFDWCxZQUFZO0VBQ1osV0FBVztFQUNYLFNBQVM7RUFDVCxXQUFXO0VBQ1gsdUJBQXVCO0VBQ3ZCLHdCQUF3QjtFQUN4QixnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSwyQkFBMkI7QUFDN0I7O0FBRUE7RUFDRSxtQ0FBbUM7RUFDbkMsK0JBQStCO0VBQy9CLDJCQUEyQjtBQUM3Qjs7QUFFQSxvQkFBb0I7QUFDcEI7RUFDRSxtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxrQkFBa0I7QUFDcEJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiYm9keSB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBmb250LWZhbWlseTogJ1JvYm90byBDb25kZW5zZWQnLCBzYW5zLXNlcmlmO1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbn1cXG5oMSB7XFxuICBjb2xvcjogYmxhY2s7XFxuICAtd2Via2l0LXRleHQtZmlsbC1jb2xvcjogd2hpdGU7XFxuICAtd2Via2l0LXRleHQtc3Ryb2tlLXdpZHRoOiAxcHg7XFxuICAtd2Via2l0LXRleHQtc3Ryb2tlLWNvbG9yOiBibGFjaztcXG4gIGZvbnQtc3RyZXRjaDogZXhwYW5kZWQ7XFxufVxcbm1haW4ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXG4gIGZsZXgtd3JhcDogd3JhcDtcXG4gIG92ZXJmbG93OiBhdXRvO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZlZjZlNDtcXG59XFxuXFxuaGVhZGVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBoZWlnaHQ6IDYwcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDBhNzFjO1xcbiAgcGFkZGluZzogMTBweDtcXG4gIGJvcmRlci1ib3R0b206IDNweCBzb2xpZCBibGFjaztcXG4gIHotaW5kZXg6IDE7XFxuICBib3gtc2hhZG93OiAwcHggN3B4IDE0cHggLTRweCByZ2JhKDAsIDAsIDAsIDEpO1xcbn1cXG5cXG5mb290ZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGhlaWdodDogODBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM4YmQzZGQ7XFxuICBwYWRkaW5nOiAxMHB4O1xcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkIGJsYWNrO1xcbiAgYm94LXNoYWRvdzogMHB4IC03cHggMTRweCAtNHB4IHJnYmEoMCwgMCwgMCwgMSk7XFxufVxcblxcbi5hcmVhIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmViYmU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGJvcmRlcjogYmxhY2sgc29saWQgMXB4O1xcbiAgd2lkdGg6IDMwMHB4O1xcbiAgcGFkZGluZzogNXB4O1xcbiAgbWFyZ2luOiAyMHB4O1xcbiAgYm94LXNoYWRvdzogMHB4IDBweCA5cHggNXB4IHJnYmEoMCwgMCwgMCwgMC41KTtcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXG59XFxuXFxuI3BvcHVwIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmViYmU7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDUwJTtcXG4gIGxlZnQ6IDUwJTtcXG4gIHdpZHRoOiAzNTBweDtcXG4gIGhlaWdodDogNjAwcHg7XFxuICBtYXJnaW4tbGVmdDogLTE3NXB4O1xcbiAgbWFyZ2luLXRvcDogLTMwMHB4O1xcbiAgYm94LXNoYWRvdzogMHB4IDBweCA5cHggNXB4IHJnYmEoMCwgMCwgMCwgMC41KTtcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXG4gIGJvcmRlcjogYmxhY2sgc29saWQgMXB4O1xcbiAgcGFkZGluZzogNXB4O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICB6LWluZGV4OiAyO1xcbn1cXG5cXG4jcG9wdXBCdXR0b25BcmVhIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxuICB3aWR0aDogMTAwJTtcXG59XFxuXFxuLmJvYXJkIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBmbGV4LXdyYXA6IHdyYXA7XFxuICB3aWR0aDogMTAwJTtcXG59XFxuXFxuLnBsYXllckNlbGwsXFxuLmNvbXB1dGVyQ2VsbCB7XFxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gIGZsZXg6IDAgOSU7XFxuICB3aWR0aDogMzBweDtcXG4gIGhlaWdodDogMzBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYig3MSwgMjQzLCAyNTUpO1xcbiAgYm9yZGVyLXJhZGl1czogMnB4O1xcbn1cXG5cXG4ucGxheWVyQ2VsbDpob3ZlcixcXG4uY29tcHV0ZXJDZWxsOmhvdmVyLFxcbmJ1dHRvbjpob3ZlciB7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDEuMSk7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbi5wbGF5ZXJDZWxsW2RhdGEtYmVlbi1oaXQ9J3RydWUnXSxcXG4uY29tcHV0ZXJDZWxsW2RhdGEtYmVlbi1oaXQ9J3RydWUnXSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTkwLCAxODksIDE4OSk7XFxufVxcblxcbi5wbGF5ZXJDZWxsW2RhdGEtb2NjdXBpZWQ9J1tvYmplY3QgT2JqZWN0XSddIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyNTUsIDAsIDApO1xcbn1cXG5cXG4ucGxheWVyQ2VsbFtkYXRhLWJlZW4taGl0PSd0cnVlJ10ucGxheWVyQ2VsbFtkYXRhLW9jY3VwaWVkPSdbb2JqZWN0IE9iamVjdF0nXSxcXG4uY29tcHV0ZXJDZWxsW2RhdGEtYmVlbi1oaXQ9J3RydWUnXS5jb21wdXRlckNlbGxbZGF0YS1vY2N1cGllZD0nW29iamVjdCBPYmplY3RdJ10ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxufVxcblxcbiNidXR0b25zIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZWY2ZTQ7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuYnV0dG9uIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwMGE3MWM7XFxuICBib3JkZXI6IG5vbmU7XFxuICBjb2xvcjogd2hpdGU7XFxuICBwYWRkaW5nOiA1cHggMTBweDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIGZvbnQtc2l6ZTogMTZweDtcXG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XFxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXG4gIGJveC1zaGFkb3c6IDBweCAwcHggOXB4IDVweCByZ2JhKDAsIDAsIDAsIDAuNSk7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbiNtYW51YWxCdXR0b24ge1xcbiAgbWFyZ2luLXRvcDogMjBweDtcXG59XFxuXFxuI29yaWVudGF0aW9uVG9nZ2xlIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBwYWRkaW5nOiA1cHg7XFxufVxcblxcbi8qIFRoZSBzd2l0Y2ggZm9yIHNoaXAgb3JpZW50YXRpb24gLSB0aGUgYm94IGFyb3VuZCB0aGUgc2xpZGVyICovXFxuLnN3aXRjaCB7XFxuICBtYXJnaW46IDVweDtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHdpZHRoOiA2MHB4O1xcbiAgaGVpZ2h0OiAzNHB4O1xcbn1cXG5cXG4vKiBIaWRlIGRlZmF1bHQgSFRNTCBjaGVja2JveCAqL1xcbi5zd2l0Y2ggaW5wdXQge1xcbiAgb3BhY2l0eTogMDtcXG4gIHdpZHRoOiAwO1xcbiAgaGVpZ2h0OiAwO1xcbn1cXG5cXG4vKiBUaGUgc2xpZGVyICovXFxuLnNsaWRlciB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcbiAgcmlnaHQ6IDA7XFxuICBib3R0b206IDA7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjY2NjO1xcbiAgLXdlYmtpdC10cmFuc2l0aW9uOiAwLjRzO1xcbiAgdHJhbnNpdGlvbjogMC40cztcXG59XFxuXFxuLnNsaWRlcjpiZWZvcmUge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgY29udGVudDogJyc7XFxuICBoZWlnaHQ6IDI2cHg7XFxuICB3aWR0aDogMjZweDtcXG4gIGxlZnQ6IDRweDtcXG4gIGJvdHRvbTogNHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxuICAtd2Via2l0LXRyYW5zaXRpb246IDAuNHM7XFxuICB0cmFuc2l0aW9uOiAwLjRzO1xcbn1cXG5cXG5pbnB1dDpjaGVja2VkICsgLnNsaWRlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjE5NmYzO1xcbn1cXG5cXG5pbnB1dDpmb2N1cyArIC5zbGlkZXIge1xcbiAgYm94LXNoYWRvdzogMCAwIDFweCAjMjE5NmYzO1xcbn1cXG5cXG5pbnB1dDpjaGVja2VkICsgLnNsaWRlcjpiZWZvcmUge1xcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMjZweCk7XFxuICAtbXMtdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDI2cHgpO1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDI2cHgpO1xcbn1cXG5cXG4vKiBSb3VuZGVkIHNsaWRlcnMgKi9cXG4uc2xpZGVyLnJvdW5kIHtcXG4gIGJvcmRlci1yYWRpdXM6IDM0cHg7XFxufVxcblxcbi5zbGlkZXIucm91bmQ6YmVmb3JlIHtcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdOyAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTsgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcblxuXG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG5cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG5cbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcblxuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblxuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290IHx8IFwiXCIpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cblxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5zY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5zY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsImltcG9ydCAnLi9zdHlsZS5zY3NzJ1xuaW1wb3J0IHsgR2FtZWJvYXJkIH0gZnJvbSAnLi9nYW1lYm9hcmQnXG5pbXBvcnQgeyBQbGF5ZXIgfSBmcm9tICcuL3BsYXllcidcblxuY29uc3QgcGxheWVyQm9hcmQgPSBuZXcgR2FtZWJvYXJkKClcbmNvbnN0IHBsYXllckRpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGxheWVyZGlzcGxheScpXG5cbmNvbnN0IGNvbXB1dGVyQm9hcmQgPSBuZXcgR2FtZWJvYXJkKClcbmNvbnN0IGNvbXB1dGVyRGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjb21wdXRlcmRpc3BsYXknKVxuY29uc3QgY29tcHV0ZXJBSSA9IG5ldyBQbGF5ZXIoKVxuXG5jb21wdXRlckJvYXJkLnJhbmRvbVBsYWNlbWVudCgpXG5cbmZ1bmN0aW9uIHJlbmRlclBsYXllckJvYXJkKCkge1xuICBwbGF5ZXJEaXNwbGF5LmlubmVySFRNTCA9ICcnXG4gIHBsYXllckJvYXJkLmdhbWVCb2FyZC5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgY29uc3QgY2VsbERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgY2VsbERpdi5jbGFzc0xpc3QuYWRkKCdwbGF5ZXJDZWxsJylcbiAgICBjZWxsRGl2LmRhdGFzZXQueCA9IGNlbGwueFxuICAgIGNlbGxEaXYuZGF0YXNldC55ID0gY2VsbC55XG4gICAgY2VsbERpdi5kYXRhc2V0Lm9jY3VwaWVkID0gY2VsbC5vY2N1cGllZFxuICAgIGNlbGxEaXYuZGF0YXNldC5iZWVuSGl0ID0gY2VsbC5iZWVuSGl0XG4gICAgcGxheWVyRGlzcGxheS5hcHBlbmRDaGlsZChjZWxsRGl2KVxuICB9KVxufVxuXG5yZW5kZXJQbGF5ZXJCb2FyZCgpXG5cbmZ1bmN0aW9uIHJlbmRlckNvbXB1dGVyQm9hcmQoKSB7XG4gIGNvbXB1dGVyRGlzcGxheS5pbm5lckhUTUwgPSAnJ1xuICBjb21wdXRlckJvYXJkLmdhbWVCb2FyZC5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgY29uc3QgY2VsbERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgY2VsbERpdi5jbGFzc0xpc3QuYWRkKCdjb21wdXRlckNlbGwnKVxuICAgIGNlbGxEaXYuZGF0YXNldC54ID0gY2VsbC54XG4gICAgY2VsbERpdi5kYXRhc2V0LnkgPSBjZWxsLnlcbiAgICBjZWxsRGl2LmRhdGFzZXQub2NjdXBpZWQgPSBjZWxsLm9jY3VwaWVkXG4gICAgY2VsbERpdi5kYXRhc2V0LmJlZW5IaXQgPSBjZWxsLmJlZW5IaXRcbiAgICBjb21wdXRlckRpc3BsYXkuYXBwZW5kQ2hpbGQoY2VsbERpdilcbiAgfSlcbn1cblxucmVuZGVyQ29tcHV0ZXJCb2FyZCgpXG5cbmZ1bmN0aW9uIHBsYXllclR1cm4oKSB7XG4gIGNvbnN0IGNvbXB1dGVyQm9hcmRDZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb21wdXRlckNlbGwnKVxuICBjb21wdXRlckJvYXJkQ2VsbHMuZm9yRWFjaCgoY2VsbERpdikgPT4ge1xuICAgIGNlbGxEaXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBjb21wdXRlckJvYXJkLnJlY2VpdmVBdHRhY2soW1xuICAgICAgICBOdW1iZXIoY2VsbERpdi5kYXRhc2V0LngpLFxuICAgICAgICBOdW1iZXIoY2VsbERpdi5kYXRhc2V0LnkpLFxuICAgICAgXSlcbiAgICAgIHJlbmRlckNvbXB1dGVyQm9hcmQoKVxuICAgICAgY29tcHV0ZXJBSS5yYW5kb21BdHRhY2socGxheWVyQm9hcmQpXG4gICAgICByZW5kZXJQbGF5ZXJCb2FyZCgpXG4gICAgICBnYW1lTG9vcCgpXG4gICAgfSlcbiAgfSlcbn1cblxuLy9tYWluIGdhbWUgbG9vcFxuXG5mdW5jdGlvbiBnYW1lTG9vcCgpIHtcbiAgaWYgKCFwbGF5ZXJCb2FyZC5mbGVldFN1bmsoKSAmJiAhY29tcHV0ZXJCb2FyZC5mbGVldFN1bmsoKSkge1xuICAgIHBsYXllclR1cm4oKVxuICB9IGVsc2UgaWYgKHBsYXllckJvYXJkLmZsZWV0U3VuaygpKSB7XG4gICAgYWxlcnQoJ1lvdSBMb3NlIScpXG4gIH0gZWxzZSBpZiAoY29tcHV0ZXJCb2FyZC5mbGVldFN1bmsoKSkge1xuICAgIGFsZXJ0KCdZb3UgV2luIScpXG4gIH1cbn1cblxucGxheWVyVHVybigpXG5cbi8vU2hpcCBuYW1lcyBmb3IgbWFudWFsIHBsYWNlbWVudFxubGV0IG1hbnVhbFBsYWNlbWVudERpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxubWFudWFsUGxhY2VtZW50RGlzcGxheS5pZCA9ICdtYW51YWxQbGFjZW1lbnREaXNwbGF5J1xuXG4vL1RvZ2dsZSBzd2l0Y2ggZm9yIHNoaXAgb3JpZW50YXRpb25cblxuLy9DbG9uZSBwbGF5ZXIgYm9hcmQgZm9yIHBsYWNlbWVudCBwb3B1cFxubGV0IHBsYXllckRpc3BsYXlDbG9uZSA9IHBsYXllckRpc3BsYXkuY2xvbmVOb2RlKHRydWUpXG5jb25zdCBwb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwb3B1cCcpXG5wb3B1cC5hcHBlbmRDaGlsZChtYW51YWxQbGFjZW1lbnREaXNwbGF5KVxucG9wdXAuYXBwZW5kQ2hpbGQocGxheWVyRGlzcGxheUNsb25lKVxuXG4vL1BvcHVwIGRpdiBidXR0b24gbGlzdGVuZXJzXG5jb25zdCByYW5kb21CdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcmFuZG9tQnV0dG9uJylcbnJhbmRvbUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgbWFudWFsQnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgcGxheWVyQm9hcmQuZ2FtZUJvYXJkID0gcGxheWVyQm9hcmQubWFrZUdhbWVib2FyZCgpXG4gIHBsYXllckJvYXJkLnJhbmRvbVBsYWNlbWVudCgpXG4gIHJlbmRlclBsYXllckJvYXJkKClcbiAgcGxheWVyRGlzcGxheUNsb25lLmlubmVySFRNTCA9ICcnXG4gIHBsYXllckRpc3BsYXlDbG9uZSA9IHBsYXllckRpc3BsYXkuY2xvbmVOb2RlKHRydWUpXG4gIHBvcHVwLmFwcGVuZENoaWxkKHBsYXllckRpc3BsYXlDbG9uZSlcbiAgcG9wdXAuYXBwZW5kQ2hpbGQobWFudWFsQnV0dG9uKVxufSlcbmNvbnN0IHN0YXJ0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3N0YXJ0QnV0dG9uJylcbnN0YXJ0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBpZiAocGxheWVyQm9hcmQuZmxlZXRQbGFjZWQoKSkge1xuICAgIHBvcHVwLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgfSBlbHNlIHtcbiAgICBhbGVydCgnWW91IG11c3QgcGxhY2UgYWxsIHlvdXIgc2hpcHMhJylcbiAgfVxufSlcblxuLy9CdXR0b24gYW5kIGFycmF5cyB0byBjeWNsZSB0aHJvdWdoIG1hbnVhbCBzaGlwIHBsYWNlbWVudFxuY29uc3QgbWFudWFsQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJylcbm1hbnVhbEJ1dHRvbi5pbm5lckhUTUwgPSAnJ1xubWFudWFsQnV0dG9uLmlkID0gJ21hbnVhbEJ1dHRvbidcbm1hbnVhbEJ1dHRvbi50ZXh0Q29udGVudCA9ICdNYW51YWwgU2hpcCBQbGFjZW1lbnQnXG5wb3B1cC5hcHBlbmRDaGlsZChtYW51YWxCdXR0b24pXG5cbmxldCBwbGF5ZXJCb2FyZEZsZWV0ID0gW1xuICBwbGF5ZXJCb2FyZC5jYXJyaWVyLFxuICBwbGF5ZXJCb2FyZC5iYXR0bGVzaGlwLFxuICBwbGF5ZXJCb2FyZC5kZXN0cm95ZXIsXG4gIHBsYXllckJvYXJkLnN1Ym1hcmluZSxcbiAgcGxheWVyQm9hcmQucGF0cm9sQm9hdCxcbl1cblxubGV0IHBsYXllckJvYXJkRmxlZXROYW1lcyA9IFtcbiAgJ0NhcnJpZXInLFxuICAnQmF0dGxlc2hpcCcsXG4gICdEZXN0cm95ZXInLFxuICAnU3VibWFyaW5lJyxcbiAgJ1BhdHJvbCBCb2F0Jyxcbl1cblxuZnVuY3Rpb24gbWFudWFsU2hpcEN5Y2xlKCkge1xuICBtYW51YWxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgcmFuZG9tQnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgICBtYW51YWxQbGFjZW1lbnREaXNwbGF5LnRleHRDb250ZW50ID0gYFBsYWNlIHlvdXIgJHtwbGF5ZXJCb2FyZEZsZWV0TmFtZXNbMF19YFxuICAgIGxldCBzaGlwID0gcGxheWVyQm9hcmRGbGVldFswXVxuICAgIGxldCBwbGF5ZXJCb2FyZENlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBsYXllckNlbGwnKVxuICAgIHBsYXllckJvYXJkQ2VsbHMuZm9yRWFjaCgoY2VsbERpdikgPT4ge1xuICAgICAgY2VsbERpdi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICFwbGF5ZXJCb2FyZC52YWxpZFBsYWNlbWVudChcbiAgICAgICAgICAgIFtOdW1iZXIoY2VsbERpdi5kYXRhc2V0LngpLCBOdW1iZXIoY2VsbERpdi5kYXRhc2V0LnkpXSxcbiAgICAgICAgICAgIHNoaXBcbiAgICAgICAgICApXG4gICAgICAgICkge1xuICAgICAgICAgIG1hbnVhbFBsYWNlbWVudERpc3BsYXkudGV4dENvbnRlbnQgPSAnSW52YWxpZCBwbGFjZW1lbnQsIHRyeSBhZ2FpbidcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIG1hbnVhbFBsYWNlbWVudERpc3BsYXkudGV4dENvbnRlbnQgPSBgUGxhY2UgeW91ciAke3BsYXllckJvYXJkRmxlZXROYW1lc1swXX1gXG4gICAgICAgICAgfSwgMTAwMClcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBwbGF5ZXJCb2FyZC5wbGFjZVNoaXAoXG4gICAgICAgICAgW051bWJlcihjZWxsRGl2LmRhdGFzZXQueCksIE51bWJlcihjZWxsRGl2LmRhdGFzZXQueSldLFxuICAgICAgICAgIHNoaXBcbiAgICAgICAgKVxuICAgICAgICByZW5kZXJQbGF5ZXJCb2FyZCgpXG4gICAgICAgIHBsYXllckRpc3BsYXlDbG9uZS5pbm5lckhUTUwgPSAnJ1xuICAgICAgICBwbGF5ZXJEaXNwbGF5Q2xvbmUgPSBwbGF5ZXJEaXNwbGF5LmNsb25lTm9kZSh0cnVlKVxuICAgICAgICBwb3B1cC5hcHBlbmRDaGlsZChwbGF5ZXJEaXNwbGF5Q2xvbmUpXG4gICAgICAgIHBvcHVwLmFwcGVuZENoaWxkKG1hbnVhbEJ1dHRvbilcbiAgICAgICAgcGxheWVyQm9hcmRGbGVldE5hbWVzLnNoaWZ0KClcbiAgICAgICAgcGxheWVyQm9hcmRGbGVldC5zaGlmdCgpXG4gICAgICAgIG1hbnVhbEJ1dHRvbi50ZXh0Q29udGVudCA9IGBOZXh0IFVwOiAke3BsYXllckJvYXJkRmxlZXROYW1lc1swXX1gXG4gICAgICAgIGlmIChwbGF5ZXJCb2FyZEZsZWV0TmFtZXMubGVuZ3RoID09IDApIHtcbiAgICAgICAgICBtYW51YWxCdXR0b24uc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICAgICAgICAgIG1hbnVhbFBsYWNlbWVudERpc3BsYXkudGV4dENvbnRlbnQgPSAnUmVhZHkgdG8gc3RhcnQhJ1xuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG4gIH0pXG59XG5tYW51YWxTaGlwQ3ljbGUoKVxuIl0sIm5hbWVzIjpbIlNoaXAiLCJDZWxsIiwiY29uc3RydWN0b3IiLCJ4IiwieSIsIm9jY3VwaWVkIiwiYmVlbkhpdCIsIkdhbWVib2FyZCIsImdhbWVCb2FyZCIsIm1ha2VHYW1lYm9hcmQiLCJjYXJyaWVyIiwiYmF0dGxlc2hpcCIsImRlc3Ryb3llciIsInN1Ym1hcmluZSIsInBhdHJvbEJvYXQiLCJpIiwiaiIsInB1c2giLCJwbGFjZVNoaXAiLCJjb29yZGluYXRlcyIsInNoaXAiLCJvcmllbnRhdGlvbiIsInZhbGlkUGxhY2VtZW50IiwibGVuZ3RoIiwidGVtcENvb3JkcyIsImZpbmRDZWxsIiwidW5kZWZpbmVkIiwiZmluZCIsIm9iaiIsInJlY2VpdmVBdHRhY2siLCJoaXQiLCJmbGVldFN1bmsiLCJpc1N1bmsiLCJyYW5kb21QbGFjZW1lbnQiLCJmbGVldCIsImJpbmRlciIsInRyeVBsYWNlbWVudCIsInJhbmRvbUNlbGwiLCJyYW5kb21YWSIsInNoaWZ0IiwibWluIiwibWF4IiwicmFuZG9tWCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInJhbmRvbVkiLCJmbGVldFBsYWNlZCIsImNvdW50ZXIiLCJtYW51YWxQbGFjZW1lbnQiLCJkaXYiLCJtYW51YWxQbGFjZW1lbnRFYWNoIiwiUGxheWVyIiwibmFtZSIsInJhbmRvbUF0dGFjayIsImhpdE51bWJlciIsInBsYXllckJvYXJkIiwicGxheWVyRGlzcGxheSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImNvbXB1dGVyQm9hcmQiLCJjb21wdXRlckRpc3BsYXkiLCJjb21wdXRlckFJIiwicmVuZGVyUGxheWVyQm9hcmQiLCJpbm5lckhUTUwiLCJmb3JFYWNoIiwiY2VsbCIsImNlbGxEaXYiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwiZGF0YXNldCIsImFwcGVuZENoaWxkIiwicmVuZGVyQ29tcHV0ZXJCb2FyZCIsInBsYXllclR1cm4iLCJjb21wdXRlckJvYXJkQ2VsbHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiYWRkRXZlbnRMaXN0ZW5lciIsIk51bWJlciIsImdhbWVMb29wIiwiYWxlcnQiLCJtYW51YWxQbGFjZW1lbnREaXNwbGF5IiwiaWQiLCJwbGF5ZXJEaXNwbGF5Q2xvbmUiLCJjbG9uZU5vZGUiLCJwb3B1cCIsInJhbmRvbUJ1dHRvbiIsIm1hbnVhbEJ1dHRvbiIsInN0eWxlIiwiZGlzcGxheSIsInN0YXJ0QnV0dG9uIiwidGV4dENvbnRlbnQiLCJwbGF5ZXJCb2FyZEZsZWV0IiwicGxheWVyQm9hcmRGbGVldE5hbWVzIiwibWFudWFsU2hpcEN5Y2xlIiwicGxheWVyQm9hcmRDZWxscyIsInNldFRpbWVvdXQiXSwic291cmNlUm9vdCI6IiJ9