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
___CSS_LOADER_EXPORT___.push([module.id, "body {\n  position: relative;\n  font-family: 'Roboto Condensed', sans-serif;\n  height: 100vh;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n}\nh1 {\n  color: black;\n  -webkit-text-fill-color: white;\n  -webkit-text-stroke-width: 1px;\n  -webkit-text-stroke-color: black;\n  font-stretch: expanded;\n}\nmain {\n  display: flex;\n  align-items: center;\n  justify-content: space-around;\n  flex-wrap: wrap;\n  overflow: auto;\n  height: 100%;\n  background-color: #fef6e4;\n}\n\nheader {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 60px;\n  background-color: #00a71c;\n  padding: 10px;\n  border-bottom: 3px solid black;\n  z-index: 1;\n  box-shadow: 0px 7px 14px -4px rgba(0, 0, 0, 1);\n}\n\nfooter {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 80px;\n  background-color: #8bd3dd;\n  padding: 10px;\n  border-top: 1px solid black;\n  box-shadow: 0px -7px 14px -4px rgba(0, 0, 0, 1);\n}\n\n.area {\n  background-color: #ffebbe;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  border: black solid 1px;\n  width: 300px;\n  padding: 5px;\n  margin: 20px;\n  box-shadow: 0px 0px 9px 5px rgba(0, 0, 0, 0.5);\n  border-radius: 5px;\n}\n\n#popup {\n  background-color: #ffebbe;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: 350px;\n  height: 600px;\n  margin-left: -175px;\n  margin-top: -300px;\n  box-shadow: 0px 0px 9px 5px rgba(0, 0, 0, 0.5);\n  border-radius: 5px;\n  border: black solid 1px;\n  padding: 5px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n}\n\n#popupButtonArea {\n  display: flex;\n  align-items: center;\n  justify-content: space-around;\n  width: 100%;\n}\n\n.board {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-wrap: wrap;\n  width: 100%;\n}\n\n.playerCell,\n.computerCell {\n  border: 1px solid black;\n  flex: 0 9%;\n  width: 30px;\n  height: 30px;\n  background-color: rgb(71, 243, 255);\n  border-radius: 2px;\n}\n\n.playerCell:hover,\n.computerCell:hover,\nbutton:hover {\n  transform: scale(1.1);\n  cursor: pointer;\n}\n\n.playerCell[data-been-hit='true'],\n.computerCell[data-been-hit='true'] {\n  background-color: rgb(190, 189, 189);\n}\n\n.playerCell[data-occupied='[object Object]'] {\n  background-color: rgb(255, 0, 0);\n}\n\n.playerCell[data-been-hit='true'].playerCell[data-occupied='[object Object]'],\n.computerCell[data-been-hit='true'].computerCell[data-occupied='[object Object]'] {\n  background-color: black;\n}\n\n#buttons {\n  background-color: #fef6e4;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n}\n\nbutton {\n  background-color: #00a71c;\n  border: none;\n  color: white;\n  padding: 5px 10px;\n  text-align: center;\n  text-decoration: none;\n  display: inline-block;\n  font-size: 16px;\n  margin-bottom: 20px;\n  border: 1px solid black;\n  border-radius: 5px;\n  box-shadow: 0px 0px 9px 5px rgba(0, 0, 0, 0.5);\n  cursor: pointer;\n}\n", "",{"version":3,"sources":["webpack://./src/style.scss"],"names":[],"mappings":"AAAA;EACE,kBAAkB;EAClB,2CAA2C;EAC3C,aAAa;EACb,aAAa;EACb,sBAAsB;EACtB,8BAA8B;AAChC;AACA;EACE,YAAY;EACZ,8BAA8B;EAC9B,8BAA8B;EAC9B,gCAAgC;EAChC,sBAAsB;AACxB;AACA;EACE,aAAa;EACb,mBAAmB;EACnB,6BAA6B;EAC7B,eAAe;EACf,cAAc;EACd,YAAY;EACZ,yBAAyB;AAC3B;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,YAAY;EACZ,yBAAyB;EACzB,aAAa;EACb,8BAA8B;EAC9B,UAAU;EACV,8CAA8C;AAChD;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,YAAY;EACZ,yBAAyB;EACzB,aAAa;EACb,2BAA2B;EAC3B,+CAA+C;AACjD;;AAEA;EACE,yBAAyB;EACzB,aAAa;EACb,sBAAsB;EACtB,uBAAuB;EACvB,mBAAmB;EACnB,uBAAuB;EACvB,YAAY;EACZ,YAAY;EACZ,YAAY;EACZ,8CAA8C;EAC9C,kBAAkB;AACpB;;AAEA;EACE,yBAAyB;EACzB,kBAAkB;EAClB,QAAQ;EACR,SAAS;EACT,YAAY;EACZ,aAAa;EACb,mBAAmB;EACnB,kBAAkB;EAClB,8CAA8C;EAC9C,kBAAkB;EAClB,uBAAuB;EACvB,YAAY;EACZ,aAAa;EACb,sBAAsB;EACtB,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,6BAA6B;EAC7B,WAAW;AACb;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,eAAe;EACf,WAAW;AACb;;AAEA;;EAEE,uBAAuB;EACvB,UAAU;EACV,WAAW;EACX,YAAY;EACZ,mCAAmC;EACnC,kBAAkB;AACpB;;AAEA;;;EAGE,qBAAqB;EACrB,eAAe;AACjB;;AAEA;;EAEE,oCAAoC;AACtC;;AAEA;EACE,gCAAgC;AAClC;;AAEA;;EAEE,uBAAuB;AACzB;;AAEA;EACE,yBAAyB;EACzB,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,uBAAuB;AACzB;;AAEA;EACE,yBAAyB;EACzB,YAAY;EACZ,YAAY;EACZ,iBAAiB;EACjB,kBAAkB;EAClB,qBAAqB;EACrB,qBAAqB;EACrB,eAAe;EACf,mBAAmB;EACnB,uBAAuB;EACvB,kBAAkB;EAClB,8CAA8C;EAC9C,eAAe;AACjB","sourcesContent":["body {\n  position: relative;\n  font-family: 'Roboto Condensed', sans-serif;\n  height: 100vh;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n}\nh1 {\n  color: black;\n  -webkit-text-fill-color: white;\n  -webkit-text-stroke-width: 1px;\n  -webkit-text-stroke-color: black;\n  font-stretch: expanded;\n}\nmain {\n  display: flex;\n  align-items: center;\n  justify-content: space-around;\n  flex-wrap: wrap;\n  overflow: auto;\n  height: 100%;\n  background-color: #fef6e4;\n}\n\nheader {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 60px;\n  background-color: #00a71c;\n  padding: 10px;\n  border-bottom: 3px solid black;\n  z-index: 1;\n  box-shadow: 0px 7px 14px -4px rgba(0, 0, 0, 1);\n}\n\nfooter {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 80px;\n  background-color: #8bd3dd;\n  padding: 10px;\n  border-top: 1px solid black;\n  box-shadow: 0px -7px 14px -4px rgba(0, 0, 0, 1);\n}\n\n.area {\n  background-color: #ffebbe;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  border: black solid 1px;\n  width: 300px;\n  padding: 5px;\n  margin: 20px;\n  box-shadow: 0px 0px 9px 5px rgba(0, 0, 0, 0.5);\n  border-radius: 5px;\n}\n\n#popup {\n  background-color: #ffebbe;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: 350px;\n  height: 600px;\n  margin-left: -175px;\n  margin-top: -300px;\n  box-shadow: 0px 0px 9px 5px rgba(0, 0, 0, 0.5);\n  border-radius: 5px;\n  border: black solid 1px;\n  padding: 5px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n}\n\n#popupButtonArea {\n  display: flex;\n  align-items: center;\n  justify-content: space-around;\n  width: 100%;\n}\n\n.board {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-wrap: wrap;\n  width: 100%;\n}\n\n.playerCell,\n.computerCell {\n  border: 1px solid black;\n  flex: 0 9%;\n  width: 30px;\n  height: 30px;\n  background-color: rgb(71, 243, 255);\n  border-radius: 2px;\n}\n\n.playerCell:hover,\n.computerCell:hover,\nbutton:hover {\n  transform: scale(1.1);\n  cursor: pointer;\n}\n\n.playerCell[data-been-hit='true'],\n.computerCell[data-been-hit='true'] {\n  background-color: rgb(190, 189, 189);\n}\n\n.playerCell[data-occupied='[object Object]'] {\n  background-color: rgb(255, 0, 0);\n}\n\n.playerCell[data-been-hit='true'].playerCell[data-occupied='[object Object]'],\n.computerCell[data-been-hit='true'].computerCell[data-occupied='[object Object]'] {\n  background-color: black;\n}\n\n#buttons {\n  background-color: #fef6e4;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n}\n\nbutton {\n  background-color: #00a71c;\n  border: none;\n  color: white;\n  padding: 5px 10px;\n  text-align: center;\n  text-decoration: none;\n  display: inline-block;\n  font-size: 16px;\n  margin-bottom: 20px;\n  border: 1px solid black;\n  border-radius: 5px;\n  box-shadow: 0px 0px 9px 5px rgba(0, 0, 0, 0.5);\n  cursor: pointer;\n}\n"],"sourceRoot":""}]);
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

//Clone player board for manual placement popup
const playerDisplayClone = playerDisplay.cloneNode(true);
const popup = document.querySelector('#popup');
popup.appendChild(playerDisplayClone);

//Manual placement popup listeners
const randomButton = document.querySelector('#randomButton');
randomButton.addEventListener('click', () => {
  playerBoard.gameBoard = playerBoard.makeGameboard();
  playerBoard.randomPlacement();
  renderPlayerBoard();
});
const startButton = document.querySelector('#startButton');
startButton.addEventListener('click', () => {
  if (playerBoard.fleetPlaced()) {
    popup.style.display = 'none';
  } else {
    alert('You must place all your ships!');
  }
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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NUR5QixZQUFZLENBQUNQLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxNQUFNO0VBQzNDckIsV0FBVyxDQUFDN0MsU0FBUyxHQUFHNkMsV0FBVyxDQUFDNUMsYUFBYSxFQUFFO0VBQ25ENEMsV0FBVyxDQUFDcEIsZUFBZSxFQUFFO0VBQzdCMkIsaUJBQWlCLEVBQUU7QUFDckIsQ0FBQyxDQUFDO0FBQ0YsTUFBTXNCLFdBQVcsR0FBRzNCLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLGNBQWMsQ0FBQztBQUMxRDBCLFdBQVcsQ0FBQ1IsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLE1BQU07RUFDMUMsSUFBSXJCLFdBQVcsQ0FBQ04sV0FBVyxFQUFFLEVBQUU7SUFDN0JpQyxLQUFLLENBQUNHLEtBQUssQ0FBQ0MsT0FBTyxHQUFHLE1BQU07RUFDOUIsQ0FBQyxNQUFNO0lBQ0xQLEtBQUssQ0FBQyxnQ0FBZ0MsQ0FBQztFQUN6QztBQUNGLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcGpzLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwanMvLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBqcy8uL3NyYy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBqcy8uL3NyYy9zdHlsZS5zY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXBqcy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcGpzLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcGpzLy4vc3JjL3N0eWxlLnNjc3M/ODQ2YSIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwanMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcGpzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwanMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcGpzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBqcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBqcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBqcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwanMvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcGpzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwanMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwanMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwanMvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL2JhdHRsZXNoaXBqcy8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTaGlwIH0gZnJvbSAnLi9zaGlwJ1xuXG5jbGFzcyBDZWxsIHtcbiAgY29uc3RydWN0b3IoeCwgeSwgb2NjdXBpZWQgPSBudWxsLCBiZWVuSGl0ID0gZmFsc2UpIHtcbiAgICB0aGlzLnggPSB4XG4gICAgdGhpcy55ID0geVxuICAgIHRoaXMub2NjdXBpZWQgPSBvY2N1cGllZFxuICAgIHRoaXMuYmVlbkhpdCA9IGJlZW5IaXRcbiAgfVxufVxuXG5jbGFzcyBHYW1lYm9hcmQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmdhbWVCb2FyZCA9IHRoaXMuZ2FtZUJvYXJkIHx8IHRoaXMubWFrZUdhbWVib2FyZCgpXG4gICAgdGhpcy5jYXJyaWVyID0gdGhpcy5jYXJyaWVyIHx8IG5ldyBTaGlwKDUpXG4gICAgdGhpcy5iYXR0bGVzaGlwID0gdGhpcy5iYXR0bGVzaGlwIHx8IG5ldyBTaGlwKDQpXG4gICAgdGhpcy5kZXN0cm95ZXIgPSB0aGlzLmRlc3Ryb3llciB8fCBuZXcgU2hpcCgzKVxuICAgIHRoaXMuc3VibWFyaW5lID0gdGhpcy5zdWJtYXJpbmUgfHwgbmV3IFNoaXAoMylcbiAgICB0aGlzLnBhdHJvbEJvYXQgPSB0aGlzLnBhdHJvbEJvYXQgfHwgbmV3IFNoaXAoMilcbiAgfVxuXG4gIG1ha2VHYW1lYm9hcmQoKSB7XG4gICAgbGV0IGdhbWVCb2FyZCA9IFtdXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgICAgZ2FtZUJvYXJkLnB1c2gobmV3IENlbGwoaSwgaikpXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBnYW1lQm9hcmRcbiAgfVxuICBwbGFjZVNoaXAoY29vcmRpbmF0ZXMsIHNoaXApIHtcbiAgICBpZiAoc2hpcC5vcmllbnRhdGlvbiA9PSAndmVydGljYWwnKSB7XG4gICAgICBpZiAodGhpcy52YWxpZFBsYWNlbWVudChjb29yZGluYXRlcywgc2hpcCkpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgbGV0IHRlbXBDb29yZHMgPSBbY29vcmRpbmF0ZXNbMF0gKyBpLCBjb29yZGluYXRlc1sxXV1cbiAgICAgICAgICB0aGlzLmZpbmRDZWxsKHRlbXBDb29yZHMpLm9jY3VwaWVkID0gc2hpcFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLnZhbGlkUGxhY2VtZW50KGNvb3JkaW5hdGVzLCBzaGlwKSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBsZXQgdGVtcENvb3JkcyA9IFtjb29yZGluYXRlc1swXSwgY29vcmRpbmF0ZXNbMV0gKyBpXVxuICAgICAgICAgIHRoaXMuZmluZENlbGwodGVtcENvb3Jkcykub2NjdXBpZWQgPSBzaGlwXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgdmFsaWRQbGFjZW1lbnQoY29vcmRpbmF0ZXMsIHNoaXApIHtcbiAgICBpZiAoc2hpcC5vcmllbnRhdGlvbiA9PSAndmVydGljYWwnKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IHRlbXBDb29yZHMgPSBbY29vcmRpbmF0ZXNbMF0gKyBpLCBjb29yZGluYXRlc1sxXV1cbiAgICAgICAgaWYgKFxuICAgICAgICAgIHRoaXMuZmluZENlbGwodGVtcENvb3JkcykgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgdGhpcy5maW5kQ2VsbCh0ZW1wQ29vcmRzKS5vY2N1cGllZCAhPT0gbnVsbFxuICAgICAgICApIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWVcbiAgICB9IGVsc2Uge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCB0ZW1wQ29vcmRzID0gW2Nvb3JkaW5hdGVzWzBdLCBjb29yZGluYXRlc1sxXSArIGldXG4gICAgICAgIGlmIChcbiAgICAgICAgICB0aGlzLmZpbmRDZWxsKHRlbXBDb29yZHMpID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgIHRoaXMuZmluZENlbGwodGVtcENvb3Jkcykub2NjdXBpZWQgIT09IG51bGxcbiAgICAgICAgKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICB9XG4gIGZpbmRDZWxsKGNvb3JkaW5hdGVzKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2FtZUJvYXJkLmZpbmQoXG4gICAgICAob2JqKSA9PiBvYmoueCA9PT0gY29vcmRpbmF0ZXNbMF0gJiYgb2JqLnkgPT09IGNvb3JkaW5hdGVzWzFdXG4gICAgKVxuICB9XG4gIHJlY2VpdmVBdHRhY2soY29vcmRpbmF0ZXMpIHtcbiAgICBpZiAodGhpcy5maW5kQ2VsbChjb29yZGluYXRlcykuYmVlbkhpdCA9PT0gdHJ1ZSkgcmV0dXJuIGZhbHNlXG4gICAgdGhpcy5maW5kQ2VsbChjb29yZGluYXRlcykuYmVlbkhpdCA9IHRydWVcbiAgICBpZiAodGhpcy5maW5kQ2VsbChjb29yZGluYXRlcykub2NjdXBpZWQgIT09IG51bGwpXG4gICAgICB0aGlzLmZpbmRDZWxsKGNvb3JkaW5hdGVzKS5vY2N1cGllZC5oaXQoKVxuICB9XG4gIGZsZWV0U3VuaygpIHtcbiAgICBpZiAoXG4gICAgICB0aGlzLmNhcnJpZXIuaXNTdW5rKCkgJiZcbiAgICAgIHRoaXMuYmF0dGxlc2hpcC5pc1N1bmsoKSAmJlxuICAgICAgdGhpcy5kZXN0cm95ZXIuaXNTdW5rKCkgJiZcbiAgICAgIHRoaXMuc3VibWFyaW5lLmlzU3VuaygpICYmXG4gICAgICB0aGlzLnBhdHJvbEJvYXQuaXNTdW5rKClcbiAgICApIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIHJhbmRvbVBsYWNlbWVudCgpIHtcbiAgICBsZXQgZmxlZXQgPSBbXG4gICAgICB0aGlzLmNhcnJpZXIsXG4gICAgICB0aGlzLmJhdHRsZXNoaXAsXG4gICAgICB0aGlzLmRlc3Ryb3llcixcbiAgICAgIHRoaXMuc3VibWFyaW5lLFxuICAgICAgdGhpcy5wYXRyb2xCb2F0LFxuICAgIF1cbiAgICBsZXQgYmluZGVyID0gdGhpc1xuICAgIGZ1bmN0aW9uIHRyeVBsYWNlbWVudChmbGVldCkge1xuICAgICAgaWYgKGZsZWV0Lmxlbmd0aCA9PT0gMCkgcmV0dXJuXG4gICAgICBsZXQgcmFuZG9tQ2VsbCA9IGJpbmRlci5maW5kQ2VsbChiaW5kZXIucmFuZG9tWFkoKSlcbiAgICAgIGlmIChiaW5kZXIudmFsaWRQbGFjZW1lbnQoW3JhbmRvbUNlbGwueCwgcmFuZG9tQ2VsbC55XSwgZmxlZXRbMF0pKSB7XG4gICAgICAgIGJpbmRlci5wbGFjZVNoaXAoW3JhbmRvbUNlbGwueCwgcmFuZG9tQ2VsbC55XSwgZmxlZXRbMF0pXG4gICAgICAgIGZsZWV0LnNoaWZ0KClcbiAgICAgICAgdHJ5UGxhY2VtZW50KGZsZWV0KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdHJ5UGxhY2VtZW50KGZsZWV0KVxuICAgICAgfVxuICAgIH1cbiAgICB0cnlQbGFjZW1lbnQoZmxlZXQpXG4gIH1cbiAgcmFuZG9tWFkobWluID0gMCwgbWF4ID0gOSkge1xuICAgIGNvbnN0IHJhbmRvbVggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkgKyBtaW4pXG4gICAgY29uc3QgcmFuZG9tWSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSArIG1pbilcbiAgICByZXR1cm4gW3JhbmRvbVgsIHJhbmRvbVldXG4gIH1cbiAgZmxlZXRQbGFjZWQoKSB7XG4gICAgbGV0IGNvdW50ZXIgPSAwXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmdhbWVCb2FyZC5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHRoaXMuZ2FtZUJvYXJkW2ldLm9jY3VwaWVkICE9PSBudWxsKSB7XG4gICAgICAgIGNvdW50ZXIrK1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoY291bnRlciA9PSAxNykge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCB7IEdhbWVib2FyZCB9XG4iLCJjbGFzcyBQbGF5ZXIge1xuICBjb25zdHJ1Y3RvcihuYW1lID0gJ0NvbXB1dGVyJykge1xuICAgIHRoaXMubmFtZSA9IG5hbWVcbiAgfVxuICByYW5kb21BdHRhY2soZ2FtZUJvYXJkKSB7XG4gICAgbGV0IHJhbmRvbUNlbGwgPSBnYW1lQm9hcmQuZmluZENlbGwodGhpcy5yYW5kb21YWSgpKVxuICAgIGlmIChyYW5kb21DZWxsLmJlZW5IaXQgPT0gZmFsc2UpIHtcbiAgICAgIHJhbmRvbUNlbGwuYmVlbkhpdCA9IHRydWVcbiAgICAgIGlmIChyYW5kb21DZWxsLm9jY3VwaWVkICE9PSBudWxsKSB7XG4gICAgICAgIHJhbmRvbUNlbGwub2NjdXBpZWQuaGl0KClcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yYW5kb21BdHRhY2soZ2FtZUJvYXJkKVxuICAgIH1cbiAgfVxuICByYW5kb21YWShtaW4gPSAwLCBtYXggPSA5KSB7XG4gICAgY29uc3QgcmFuZG9tWCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSArIG1pbilcbiAgICBjb25zdCByYW5kb21ZID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpICsgbWluKVxuICAgIHJldHVybiBbcmFuZG9tWCwgcmFuZG9tWV1cbiAgfVxufVxuXG5leHBvcnQgeyBQbGF5ZXIgfVxuIiwiY2xhc3MgU2hpcCB7XG4gIGNvbnN0cnVjdG9yKGxlbmd0aCwgaGl0TnVtYmVyID0gMCwgb3JpZW50YXRpb24gPSB0aGlzLm9yaWVudGF0aW9uKCkpIHtcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aFxuICAgIHRoaXMuaGl0TnVtYmVyID0gaGl0TnVtYmVyXG4gICAgdGhpcy5vcmllbnRhdGlvbiA9IG9yaWVudGF0aW9uXG4gIH1cbiAgaGl0KCkge1xuICAgIHRoaXMuaGl0TnVtYmVyKytcbiAgfVxuICBpc1N1bmsoKSB7XG4gICAgaWYgKHRoaXMubGVuZ3RoIDw9IHRoaXMuaGl0TnVtYmVyKSByZXR1cm4gdHJ1ZVxuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIG9yaWVudGF0aW9uKCkge1xuICAgIHJldHVybiBNYXRoLnJhbmRvbSgpIDwgMC41ID8gJ3ZlcnRpY2FsJyA6ICdob3Jpem9udGFsJ1xuICB9XG59XG5cbmV4cG9ydCB7IFNoaXAgfVxuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJib2R5IHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvIENvbmRlbnNlZCcsIHNhbnMtc2VyaWY7XFxuICBoZWlnaHQ6IDEwMHZoO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxufVxcbmgxIHtcXG4gIGNvbG9yOiBibGFjaztcXG4gIC13ZWJraXQtdGV4dC1maWxsLWNvbG9yOiB3aGl0ZTtcXG4gIC13ZWJraXQtdGV4dC1zdHJva2Utd2lkdGg6IDFweDtcXG4gIC13ZWJraXQtdGV4dC1zdHJva2UtY29sb3I6IGJsYWNrO1xcbiAgZm9udC1zdHJldGNoOiBleHBhbmRlZDtcXG59XFxubWFpbiB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcbiAgZmxleC13cmFwOiB3cmFwO1xcbiAgb3ZlcmZsb3c6IGF1dG87XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmVmNmU0O1xcbn1cXG5cXG5oZWFkZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGhlaWdodDogNjBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwMGE3MWM7XFxuICBwYWRkaW5nOiAxMHB4O1xcbiAgYm9yZGVyLWJvdHRvbTogM3B4IHNvbGlkIGJsYWNrO1xcbiAgei1pbmRleDogMTtcXG4gIGJveC1zaGFkb3c6IDBweCA3cHggMTRweCAtNHB4IHJnYmEoMCwgMCwgMCwgMSk7XFxufVxcblxcbmZvb3RlciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgaGVpZ2h0OiA4MHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzhiZDNkZDtcXG4gIHBhZGRpbmc6IDEwcHg7XFxuICBib3JkZXItdG9wOiAxcHggc29saWQgYmxhY2s7XFxuICBib3gtc2hhZG93OiAwcHggLTdweCAxNHB4IC00cHggcmdiYSgwLCAwLCAwLCAxKTtcXG59XFxuXFxuLmFyZWEge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZWJiZTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgYm9yZGVyOiBibGFjayBzb2xpZCAxcHg7XFxuICB3aWR0aDogMzAwcHg7XFxuICBwYWRkaW5nOiA1cHg7XFxuICBtYXJnaW46IDIwcHg7XFxuICBib3gtc2hhZG93OiAwcHggMHB4IDlweCA1cHggcmdiYSgwLCAwLCAwLCAwLjUpO1xcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcbn1cXG5cXG4jcG9wdXAge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZWJiZTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogNTAlO1xcbiAgbGVmdDogNTAlO1xcbiAgd2lkdGg6IDM1MHB4O1xcbiAgaGVpZ2h0OiA2MDBweDtcXG4gIG1hcmdpbi1sZWZ0OiAtMTc1cHg7XFxuICBtYXJnaW4tdG9wOiAtMzAwcHg7XFxuICBib3gtc2hhZG93OiAwcHggMHB4IDlweCA1cHggcmdiYSgwLCAwLCAwLCAwLjUpO1xcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgYm9yZGVyOiBibGFjayBzb2xpZCAxcHg7XFxuICBwYWRkaW5nOiA1cHg7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuI3BvcHVwQnV0dG9uQXJlYSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcbiAgd2lkdGg6IDEwMCU7XFxufVxcblxcbi5ib2FyZCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgZmxleC13cmFwOiB3cmFwO1xcbiAgd2lkdGg6IDEwMCU7XFxufVxcblxcbi5wbGF5ZXJDZWxsLFxcbi5jb21wdXRlckNlbGwge1xcbiAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxuICBmbGV4OiAwIDklO1xcbiAgd2lkdGg6IDMwcHg7XFxuICBoZWlnaHQ6IDMwcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNzEsIDI0MywgMjU1KTtcXG4gIGJvcmRlci1yYWRpdXM6IDJweDtcXG59XFxuXFxuLnBsYXllckNlbGw6aG92ZXIsXFxuLmNvbXB1dGVyQ2VsbDpob3ZlcixcXG5idXR0b246aG92ZXIge1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgxLjEpO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4ucGxheWVyQ2VsbFtkYXRhLWJlZW4taGl0PSd0cnVlJ10sXFxuLmNvbXB1dGVyQ2VsbFtkYXRhLWJlZW4taGl0PSd0cnVlJ10ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDE5MCwgMTg5LCAxODkpO1xcbn1cXG5cXG4ucGxheWVyQ2VsbFtkYXRhLW9jY3VwaWVkPSdbb2JqZWN0IE9iamVjdF0nXSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjU1LCAwLCAwKTtcXG59XFxuXFxuLnBsYXllckNlbGxbZGF0YS1iZWVuLWhpdD0ndHJ1ZSddLnBsYXllckNlbGxbZGF0YS1vY2N1cGllZD0nW29iamVjdCBPYmplY3RdJ10sXFxuLmNvbXB1dGVyQ2VsbFtkYXRhLWJlZW4taGl0PSd0cnVlJ10uY29tcHV0ZXJDZWxsW2RhdGEtb2NjdXBpZWQ9J1tvYmplY3QgT2JqZWN0XSddIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbn1cXG5cXG4jYnV0dG9ucyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmVmNmU0O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbmJ1dHRvbiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDBhNzFjO1xcbiAgYm9yZGVyOiBub25lO1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgcGFkZGluZzogNXB4IDEwcHg7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBmb250LXNpemU6IDE2cHg7XFxuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xcbiAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICBib3gtc2hhZG93OiAwcHggMHB4IDlweCA1cHggcmdiYSgwLCAwLCAwLCAwLjUpO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuc2Nzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLGtCQUFrQjtFQUNsQiwyQ0FBMkM7RUFDM0MsYUFBYTtFQUNiLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsOEJBQThCO0FBQ2hDO0FBQ0E7RUFDRSxZQUFZO0VBQ1osOEJBQThCO0VBQzlCLDhCQUE4QjtFQUM5QixnQ0FBZ0M7RUFDaEMsc0JBQXNCO0FBQ3hCO0FBQ0E7RUFDRSxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLDZCQUE2QjtFQUM3QixlQUFlO0VBQ2YsY0FBYztFQUNkLFlBQVk7RUFDWix5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLHVCQUF1QjtFQUN2QixZQUFZO0VBQ1oseUJBQXlCO0VBQ3pCLGFBQWE7RUFDYiw4QkFBOEI7RUFDOUIsVUFBVTtFQUNWLDhDQUE4QztBQUNoRDs7QUFFQTtFQUNFLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsdUJBQXVCO0VBQ3ZCLFlBQVk7RUFDWix5QkFBeUI7RUFDekIsYUFBYTtFQUNiLDJCQUEyQjtFQUMzQiwrQ0FBK0M7QUFDakQ7O0FBRUE7RUFDRSx5QkFBeUI7RUFDekIsYUFBYTtFQUNiLHNCQUFzQjtFQUN0Qix1QkFBdUI7RUFDdkIsbUJBQW1CO0VBQ25CLHVCQUF1QjtFQUN2QixZQUFZO0VBQ1osWUFBWTtFQUNaLFlBQVk7RUFDWiw4Q0FBOEM7RUFDOUMsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UseUJBQXlCO0VBQ3pCLGtCQUFrQjtFQUNsQixRQUFRO0VBQ1IsU0FBUztFQUNULFlBQVk7RUFDWixhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLGtCQUFrQjtFQUNsQiw4Q0FBOEM7RUFDOUMsa0JBQWtCO0VBQ2xCLHVCQUF1QjtFQUN2QixZQUFZO0VBQ1osYUFBYTtFQUNiLHNCQUFzQjtFQUN0Qix1QkFBdUI7RUFDdkIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQiw2QkFBNkI7RUFDN0IsV0FBVztBQUNiOztBQUVBO0VBQ0UsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQix1QkFBdUI7RUFDdkIsZUFBZTtFQUNmLFdBQVc7QUFDYjs7QUFFQTs7RUFFRSx1QkFBdUI7RUFDdkIsVUFBVTtFQUNWLFdBQVc7RUFDWCxZQUFZO0VBQ1osbUNBQW1DO0VBQ25DLGtCQUFrQjtBQUNwQjs7QUFFQTs7O0VBR0UscUJBQXFCO0VBQ3JCLGVBQWU7QUFDakI7O0FBRUE7O0VBRUUsb0NBQW9DO0FBQ3RDOztBQUVBO0VBQ0UsZ0NBQWdDO0FBQ2xDOztBQUVBOztFQUVFLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLHlCQUF5QjtFQUN6QixhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLG1CQUFtQjtFQUNuQix1QkFBdUI7QUFDekI7O0FBRUE7RUFDRSx5QkFBeUI7RUFDekIsWUFBWTtFQUNaLFlBQVk7RUFDWixpQkFBaUI7RUFDakIsa0JBQWtCO0VBQ2xCLHFCQUFxQjtFQUNyQixxQkFBcUI7RUFDckIsZUFBZTtFQUNmLG1CQUFtQjtFQUNuQix1QkFBdUI7RUFDdkIsa0JBQWtCO0VBQ2xCLDhDQUE4QztFQUM5QyxlQUFlO0FBQ2pCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcImJvZHkge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8gQ29uZGVuc2VkJywgc2Fucy1zZXJpZjtcXG4gIGhlaWdodDogMTAwdmg7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG59XFxuaDEge1xcbiAgY29sb3I6IGJsYWNrO1xcbiAgLXdlYmtpdC10ZXh0LWZpbGwtY29sb3I6IHdoaXRlO1xcbiAgLXdlYmtpdC10ZXh0LXN0cm9rZS13aWR0aDogMXB4O1xcbiAgLXdlYmtpdC10ZXh0LXN0cm9rZS1jb2xvcjogYmxhY2s7XFxuICBmb250LXN0cmV0Y2g6IGV4cGFuZGVkO1xcbn1cXG5tYWluIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxuICBmbGV4LXdyYXA6IHdyYXA7XFxuICBvdmVyZmxvdzogYXV0bztcXG4gIGhlaWdodDogMTAwJTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZWY2ZTQ7XFxufVxcblxcbmhlYWRlciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgaGVpZ2h0OiA2MHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwYTcxYztcXG4gIHBhZGRpbmc6IDEwcHg7XFxuICBib3JkZXItYm90dG9tOiAzcHggc29saWQgYmxhY2s7XFxuICB6LWluZGV4OiAxO1xcbiAgYm94LXNoYWRvdzogMHB4IDdweCAxNHB4IC00cHggcmdiYSgwLCAwLCAwLCAxKTtcXG59XFxuXFxuZm9vdGVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBoZWlnaHQ6IDgwcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjOGJkM2RkO1xcbiAgcGFkZGluZzogMTBweDtcXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCBibGFjaztcXG4gIGJveC1zaGFkb3c6IDBweCAtN3B4IDE0cHggLTRweCByZ2JhKDAsIDAsIDAsIDEpO1xcbn1cXG5cXG4uYXJlYSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZlYmJlO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBib3JkZXI6IGJsYWNrIHNvbGlkIDFweDtcXG4gIHdpZHRoOiAzMDBweDtcXG4gIHBhZGRpbmc6IDVweDtcXG4gIG1hcmdpbjogMjBweDtcXG4gIGJveC1zaGFkb3c6IDBweCAwcHggOXB4IDVweCByZ2JhKDAsIDAsIDAsIDAuNSk7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxufVxcblxcbiNwb3B1cCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZlYmJlO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiA1MCU7XFxuICBsZWZ0OiA1MCU7XFxuICB3aWR0aDogMzUwcHg7XFxuICBoZWlnaHQ6IDYwMHB4O1xcbiAgbWFyZ2luLWxlZnQ6IC0xNzVweDtcXG4gIG1hcmdpbi10b3A6IC0zMDBweDtcXG4gIGJveC1zaGFkb3c6IDBweCAwcHggOXB4IDVweCByZ2JhKDAsIDAsIDAsIDAuNSk7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICBib3JkZXI6IGJsYWNrIHNvbGlkIDFweDtcXG4gIHBhZGRpbmc6IDVweDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4jcG9wdXBCdXR0b25BcmVhIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxuICB3aWR0aDogMTAwJTtcXG59XFxuXFxuLmJvYXJkIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBmbGV4LXdyYXA6IHdyYXA7XFxuICB3aWR0aDogMTAwJTtcXG59XFxuXFxuLnBsYXllckNlbGwsXFxuLmNvbXB1dGVyQ2VsbCB7XFxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gIGZsZXg6IDAgOSU7XFxuICB3aWR0aDogMzBweDtcXG4gIGhlaWdodDogMzBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYig3MSwgMjQzLCAyNTUpO1xcbiAgYm9yZGVyLXJhZGl1czogMnB4O1xcbn1cXG5cXG4ucGxheWVyQ2VsbDpob3ZlcixcXG4uY29tcHV0ZXJDZWxsOmhvdmVyLFxcbmJ1dHRvbjpob3ZlciB7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDEuMSk7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbi5wbGF5ZXJDZWxsW2RhdGEtYmVlbi1oaXQ9J3RydWUnXSxcXG4uY29tcHV0ZXJDZWxsW2RhdGEtYmVlbi1oaXQ9J3RydWUnXSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTkwLCAxODksIDE4OSk7XFxufVxcblxcbi5wbGF5ZXJDZWxsW2RhdGEtb2NjdXBpZWQ9J1tvYmplY3QgT2JqZWN0XSddIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyNTUsIDAsIDApO1xcbn1cXG5cXG4ucGxheWVyQ2VsbFtkYXRhLWJlZW4taGl0PSd0cnVlJ10ucGxheWVyQ2VsbFtkYXRhLW9jY3VwaWVkPSdbb2JqZWN0IE9iamVjdF0nXSxcXG4uY29tcHV0ZXJDZWxsW2RhdGEtYmVlbi1oaXQ9J3RydWUnXS5jb21wdXRlckNlbGxbZGF0YS1vY2N1cGllZD0nW29iamVjdCBPYmplY3RdJ10ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxufVxcblxcbiNidXR0b25zIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZWY2ZTQ7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuYnV0dG9uIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwMGE3MWM7XFxuICBib3JkZXI6IG5vbmU7XFxuICBjb2xvcjogd2hpdGU7XFxuICBwYWRkaW5nOiA1cHggMTBweDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIGZvbnQtc2l6ZTogMTZweDtcXG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XFxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXG4gIGJveC1zaGFkb3c6IDBweCAwcHggOXB4IDVweCByZ2JhKDAsIDAsIDAsIDAuNSk7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTsgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07IC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cblxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuXG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblxuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuXG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG5cbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cblxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgdmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiBcIi8qIyBzb3VyY2VVUkw9XCIuY29uY2F0KGNzc01hcHBpbmcuc291cmNlUm9vdCB8fCBcIlwiKS5jb25jYXQoc291cmNlLCBcIiAqL1wiKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG5cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuc2Nzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuc2Nzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgJy4vc3R5bGUuc2NzcydcbmltcG9ydCB7IEdhbWVib2FyZCB9IGZyb20gJy4vZ2FtZWJvYXJkJ1xuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSAnLi9wbGF5ZXInXG5cbmNvbnN0IHBsYXllckJvYXJkID0gbmV3IEdhbWVib2FyZCgpXG5jb25zdCBwbGF5ZXJEaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BsYXllcmRpc3BsYXknKVxuXG5jb25zdCBjb21wdXRlckJvYXJkID0gbmV3IEdhbWVib2FyZCgpXG5jb25zdCBjb21wdXRlckRpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY29tcHV0ZXJkaXNwbGF5JylcbmNvbnN0IGNvbXB1dGVyQUkgPSBuZXcgUGxheWVyKClcblxuY29tcHV0ZXJCb2FyZC5yYW5kb21QbGFjZW1lbnQoKVxuXG5mdW5jdGlvbiByZW5kZXJQbGF5ZXJCb2FyZCgpIHtcbiAgcGxheWVyRGlzcGxheS5pbm5lckhUTUwgPSAnJ1xuICBwbGF5ZXJCb2FyZC5nYW1lQm9hcmQuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgIGNvbnN0IGNlbGxEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGNlbGxEaXYuY2xhc3NMaXN0LmFkZCgncGxheWVyQ2VsbCcpXG4gICAgY2VsbERpdi5kYXRhc2V0LnggPSBjZWxsLnhcbiAgICBjZWxsRGl2LmRhdGFzZXQueSA9IGNlbGwueVxuICAgIGNlbGxEaXYuZGF0YXNldC5vY2N1cGllZCA9IGNlbGwub2NjdXBpZWRcbiAgICBjZWxsRGl2LmRhdGFzZXQuYmVlbkhpdCA9IGNlbGwuYmVlbkhpdFxuICAgIHBsYXllckRpc3BsYXkuYXBwZW5kQ2hpbGQoY2VsbERpdilcbiAgfSlcbn1cblxucmVuZGVyUGxheWVyQm9hcmQoKVxuXG5mdW5jdGlvbiByZW5kZXJDb21wdXRlckJvYXJkKCkge1xuICBjb21wdXRlckRpc3BsYXkuaW5uZXJIVE1MID0gJydcbiAgY29tcHV0ZXJCb2FyZC5nYW1lQm9hcmQuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgIGNvbnN0IGNlbGxEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGNlbGxEaXYuY2xhc3NMaXN0LmFkZCgnY29tcHV0ZXJDZWxsJylcbiAgICBjZWxsRGl2LmRhdGFzZXQueCA9IGNlbGwueFxuICAgIGNlbGxEaXYuZGF0YXNldC55ID0gY2VsbC55XG4gICAgY2VsbERpdi5kYXRhc2V0Lm9jY3VwaWVkID0gY2VsbC5vY2N1cGllZFxuICAgIGNlbGxEaXYuZGF0YXNldC5iZWVuSGl0ID0gY2VsbC5iZWVuSGl0XG4gICAgY29tcHV0ZXJEaXNwbGF5LmFwcGVuZENoaWxkKGNlbGxEaXYpXG4gIH0pXG59XG5cbnJlbmRlckNvbXB1dGVyQm9hcmQoKVxuXG5mdW5jdGlvbiBwbGF5ZXJUdXJuKCkge1xuICBjb25zdCBjb21wdXRlckJvYXJkQ2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY29tcHV0ZXJDZWxsJylcbiAgY29tcHV0ZXJCb2FyZENlbGxzLmZvckVhY2goKGNlbGxEaXYpID0+IHtcbiAgICBjZWxsRGl2LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgY29tcHV0ZXJCb2FyZC5yZWNlaXZlQXR0YWNrKFtcbiAgICAgICAgTnVtYmVyKGNlbGxEaXYuZGF0YXNldC54KSxcbiAgICAgICAgTnVtYmVyKGNlbGxEaXYuZGF0YXNldC55KSxcbiAgICAgIF0pXG4gICAgICByZW5kZXJDb21wdXRlckJvYXJkKClcbiAgICAgIGNvbXB1dGVyQUkucmFuZG9tQXR0YWNrKHBsYXllckJvYXJkKVxuICAgICAgcmVuZGVyUGxheWVyQm9hcmQoKVxuICAgICAgZ2FtZUxvb3AoKVxuICAgIH0pXG4gIH0pXG59XG5cbi8vbWFpbiBnYW1lIGxvb3BcblxuZnVuY3Rpb24gZ2FtZUxvb3AoKSB7XG4gIGlmICghcGxheWVyQm9hcmQuZmxlZXRTdW5rKCkgJiYgIWNvbXB1dGVyQm9hcmQuZmxlZXRTdW5rKCkpIHtcbiAgICBwbGF5ZXJUdXJuKClcbiAgfSBlbHNlIGlmIChwbGF5ZXJCb2FyZC5mbGVldFN1bmsoKSkge1xuICAgIGFsZXJ0KCdZb3UgTG9zZSEnKVxuICB9IGVsc2UgaWYgKGNvbXB1dGVyQm9hcmQuZmxlZXRTdW5rKCkpIHtcbiAgICBhbGVydCgnWW91IFdpbiEnKVxuICB9XG59XG5cbnBsYXllclR1cm4oKVxuXG4vL0Nsb25lIHBsYXllciBib2FyZCBmb3IgbWFudWFsIHBsYWNlbWVudCBwb3B1cFxuY29uc3QgcGxheWVyRGlzcGxheUNsb25lID0gcGxheWVyRGlzcGxheS5jbG9uZU5vZGUodHJ1ZSlcbmNvbnN0IHBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BvcHVwJylcbnBvcHVwLmFwcGVuZENoaWxkKHBsYXllckRpc3BsYXlDbG9uZSlcblxuLy9NYW51YWwgcGxhY2VtZW50IHBvcHVwIGxpc3RlbmVyc1xuY29uc3QgcmFuZG9tQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3JhbmRvbUJ1dHRvbicpXG5yYW5kb21CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIHBsYXllckJvYXJkLmdhbWVCb2FyZCA9IHBsYXllckJvYXJkLm1ha2VHYW1lYm9hcmQoKVxuICBwbGF5ZXJCb2FyZC5yYW5kb21QbGFjZW1lbnQoKVxuICByZW5kZXJQbGF5ZXJCb2FyZCgpXG59KVxuY29uc3Qgc3RhcnRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3RhcnRCdXR0b24nKVxuc3RhcnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIGlmIChwbGF5ZXJCb2FyZC5mbGVldFBsYWNlZCgpKSB7XG4gICAgcG9wdXAuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICB9IGVsc2Uge1xuICAgIGFsZXJ0KCdZb3UgbXVzdCBwbGFjZSBhbGwgeW91ciBzaGlwcyEnKVxuICB9XG59KVxuIl0sIm5hbWVzIjpbIlNoaXAiLCJDZWxsIiwiY29uc3RydWN0b3IiLCJ4IiwieSIsIm9jY3VwaWVkIiwiYmVlbkhpdCIsIkdhbWVib2FyZCIsImdhbWVCb2FyZCIsIm1ha2VHYW1lYm9hcmQiLCJjYXJyaWVyIiwiYmF0dGxlc2hpcCIsImRlc3Ryb3llciIsInN1Ym1hcmluZSIsInBhdHJvbEJvYXQiLCJpIiwiaiIsInB1c2giLCJwbGFjZVNoaXAiLCJjb29yZGluYXRlcyIsInNoaXAiLCJvcmllbnRhdGlvbiIsInZhbGlkUGxhY2VtZW50IiwibGVuZ3RoIiwidGVtcENvb3JkcyIsImZpbmRDZWxsIiwidW5kZWZpbmVkIiwiZmluZCIsIm9iaiIsInJlY2VpdmVBdHRhY2siLCJoaXQiLCJmbGVldFN1bmsiLCJpc1N1bmsiLCJyYW5kb21QbGFjZW1lbnQiLCJmbGVldCIsImJpbmRlciIsInRyeVBsYWNlbWVudCIsInJhbmRvbUNlbGwiLCJyYW5kb21YWSIsInNoaWZ0IiwibWluIiwibWF4IiwicmFuZG9tWCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInJhbmRvbVkiLCJmbGVldFBsYWNlZCIsImNvdW50ZXIiLCJQbGF5ZXIiLCJuYW1lIiwicmFuZG9tQXR0YWNrIiwiaGl0TnVtYmVyIiwicGxheWVyQm9hcmQiLCJwbGF5ZXJEaXNwbGF5IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiY29tcHV0ZXJCb2FyZCIsImNvbXB1dGVyRGlzcGxheSIsImNvbXB1dGVyQUkiLCJyZW5kZXJQbGF5ZXJCb2FyZCIsImlubmVySFRNTCIsImZvckVhY2giLCJjZWxsIiwiY2VsbERpdiIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJkYXRhc2V0IiwiYXBwZW5kQ2hpbGQiLCJyZW5kZXJDb21wdXRlckJvYXJkIiwicGxheWVyVHVybiIsImNvbXB1dGVyQm9hcmRDZWxscyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJhZGRFdmVudExpc3RlbmVyIiwiTnVtYmVyIiwiZ2FtZUxvb3AiLCJhbGVydCIsInBsYXllckRpc3BsYXlDbG9uZSIsImNsb25lTm9kZSIsInBvcHVwIiwicmFuZG9tQnV0dG9uIiwic3RhcnRCdXR0b24iLCJzdHlsZSIsImRpc3BsYXkiXSwic291cmNlUm9vdCI6IiJ9