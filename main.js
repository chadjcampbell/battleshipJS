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
___CSS_LOADER_EXPORT___.push([module.id, "body {\n  position: relative;\n  font-family: 'Roboto Condensed', sans-serif;\n  height: 100vh;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n}\nh1 {\n  color: black;\n  -webkit-text-fill-color: white;\n  -webkit-text-stroke-width: 1px;\n  -webkit-text-stroke-color: black;\n  font-stretch: expanded;\n}\nmain {\n  display: flex;\n  align-items: center;\n  justify-content: space-around;\n  flex-wrap: wrap;\n  overflow: auto;\n  height: 100%;\n  background-color: #fef6e4;\n}\n\nheader {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 60px;\n  background-color: #00a71c;\n  padding: 10px;\n  border-bottom: 3px solid black;\n  z-index: 1;\n  box-shadow: 0px 7px 14px -4px rgba(0, 0, 0, 1);\n}\n\nfooter {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 80px;\n  background-color: #8bd3dd;\n  padding: 10px;\n  border-top: 1px solid black;\n  box-shadow: 0px -7px 14px -4px rgba(0, 0, 0, 1);\n}\n\n.area {\n  background-color: #ffebbe;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  border: black solid 1px;\n  width: 300px;\n  padding: 5px;\n  margin: 20px;\n  box-shadow: 0px 0px 9px 5px rgba(0, 0, 0, 0.5);\n  border-radius: 5px;\n}\n\n#popup {\n  background-color: #ffebbe;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: 350px;\n  height: 600px;\n  margin-left: -175px;\n  margin-top: -300px;\n  box-shadow: 0px 0px 9px 5px rgba(0, 0, 0, 0.5);\n  border-radius: 5px;\n  border: black solid 1px;\n  padding: 5px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  z-index: 2;\n}\n\n#popupButtonArea {\n  display: flex;\n  align-items: center;\n  justify-content: space-around;\n  width: 100%;\n}\n\n.board {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-wrap: wrap;\n  width: 100%;\n}\n\n.playerCell,\n.computerCell {\n  border: 1px solid black;\n  flex: 0 9%;\n  width: 30px;\n  height: 30px;\n  background-color: rgb(71, 243, 255);\n  border-radius: 2px;\n}\n\n.playerCell:hover,\n.computerCell:hover,\nbutton:hover {\n  transform: scale(1.1);\n  cursor: pointer;\n}\n\n.playerCell[data-been-hit='true'],\n.computerCell[data-been-hit='true'] {\n  background-color: rgb(190, 189, 189);\n}\n\n.playerCell[data-occupied='[object Object]'] {\n  background-color: rgb(255, 0, 0);\n}\n\n.playerCell[data-been-hit='true'].playerCell[data-occupied='[object Object]'],\n.computerCell[data-been-hit='true'].computerCell[data-occupied='[object Object]'] {\n  background-color: black;\n}\n\n#buttons {\n  background-color: #fef6e4;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n}\n\nbutton {\n  background-color: #00a71c;\n  border: none;\n  color: white;\n  padding: 5px 10px;\n  text-align: center;\n  text-decoration: none;\n  display: inline-block;\n  font-size: 16px;\n  margin-bottom: 20px;\n  border: 1px solid black;\n  border-radius: 5px;\n  box-shadow: 0px 0px 9px 5px rgba(0, 0, 0, 0.5);\n  cursor: pointer;\n}\n\n#manualButton {\n  margin-top: 20px;\n}\n", "",{"version":3,"sources":["webpack://./src/style.scss"],"names":[],"mappings":"AAAA;EACE,kBAAkB;EAClB,2CAA2C;EAC3C,aAAa;EACb,aAAa;EACb,sBAAsB;EACtB,8BAA8B;AAChC;AACA;EACE,YAAY;EACZ,8BAA8B;EAC9B,8BAA8B;EAC9B,gCAAgC;EAChC,sBAAsB;AACxB;AACA;EACE,aAAa;EACb,mBAAmB;EACnB,6BAA6B;EAC7B,eAAe;EACf,cAAc;EACd,YAAY;EACZ,yBAAyB;AAC3B;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,YAAY;EACZ,yBAAyB;EACzB,aAAa;EACb,8BAA8B;EAC9B,UAAU;EACV,8CAA8C;AAChD;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,YAAY;EACZ,yBAAyB;EACzB,aAAa;EACb,2BAA2B;EAC3B,+CAA+C;AACjD;;AAEA;EACE,yBAAyB;EACzB,aAAa;EACb,sBAAsB;EACtB,uBAAuB;EACvB,mBAAmB;EACnB,uBAAuB;EACvB,YAAY;EACZ,YAAY;EACZ,YAAY;EACZ,8CAA8C;EAC9C,kBAAkB;AACpB;;AAEA;EACE,yBAAyB;EACzB,kBAAkB;EAClB,QAAQ;EACR,SAAS;EACT,YAAY;EACZ,aAAa;EACb,mBAAmB;EACnB,kBAAkB;EAClB,8CAA8C;EAC9C,kBAAkB;EAClB,uBAAuB;EACvB,YAAY;EACZ,aAAa;EACb,sBAAsB;EACtB,uBAAuB;EACvB,mBAAmB;EACnB,UAAU;AACZ;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,6BAA6B;EAC7B,WAAW;AACb;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,eAAe;EACf,WAAW;AACb;;AAEA;;EAEE,uBAAuB;EACvB,UAAU;EACV,WAAW;EACX,YAAY;EACZ,mCAAmC;EACnC,kBAAkB;AACpB;;AAEA;;;EAGE,qBAAqB;EACrB,eAAe;AACjB;;AAEA;;EAEE,oCAAoC;AACtC;;AAEA;EACE,gCAAgC;AAClC;;AAEA;;EAEE,uBAAuB;AACzB;;AAEA;EACE,yBAAyB;EACzB,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,uBAAuB;AACzB;;AAEA;EACE,yBAAyB;EACzB,YAAY;EACZ,YAAY;EACZ,iBAAiB;EACjB,kBAAkB;EAClB,qBAAqB;EACrB,qBAAqB;EACrB,eAAe;EACf,mBAAmB;EACnB,uBAAuB;EACvB,kBAAkB;EAClB,8CAA8C;EAC9C,eAAe;AACjB;;AAEA;EACE,gBAAgB;AAClB","sourcesContent":["body {\n  position: relative;\n  font-family: 'Roboto Condensed', sans-serif;\n  height: 100vh;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n}\nh1 {\n  color: black;\n  -webkit-text-fill-color: white;\n  -webkit-text-stroke-width: 1px;\n  -webkit-text-stroke-color: black;\n  font-stretch: expanded;\n}\nmain {\n  display: flex;\n  align-items: center;\n  justify-content: space-around;\n  flex-wrap: wrap;\n  overflow: auto;\n  height: 100%;\n  background-color: #fef6e4;\n}\n\nheader {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 60px;\n  background-color: #00a71c;\n  padding: 10px;\n  border-bottom: 3px solid black;\n  z-index: 1;\n  box-shadow: 0px 7px 14px -4px rgba(0, 0, 0, 1);\n}\n\nfooter {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 80px;\n  background-color: #8bd3dd;\n  padding: 10px;\n  border-top: 1px solid black;\n  box-shadow: 0px -7px 14px -4px rgba(0, 0, 0, 1);\n}\n\n.area {\n  background-color: #ffebbe;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  border: black solid 1px;\n  width: 300px;\n  padding: 5px;\n  margin: 20px;\n  box-shadow: 0px 0px 9px 5px rgba(0, 0, 0, 0.5);\n  border-radius: 5px;\n}\n\n#popup {\n  background-color: #ffebbe;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: 350px;\n  height: 600px;\n  margin-left: -175px;\n  margin-top: -300px;\n  box-shadow: 0px 0px 9px 5px rgba(0, 0, 0, 0.5);\n  border-radius: 5px;\n  border: black solid 1px;\n  padding: 5px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  z-index: 2;\n}\n\n#popupButtonArea {\n  display: flex;\n  align-items: center;\n  justify-content: space-around;\n  width: 100%;\n}\n\n.board {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-wrap: wrap;\n  width: 100%;\n}\n\n.playerCell,\n.computerCell {\n  border: 1px solid black;\n  flex: 0 9%;\n  width: 30px;\n  height: 30px;\n  background-color: rgb(71, 243, 255);\n  border-radius: 2px;\n}\n\n.playerCell:hover,\n.computerCell:hover,\nbutton:hover {\n  transform: scale(1.1);\n  cursor: pointer;\n}\n\n.playerCell[data-been-hit='true'],\n.computerCell[data-been-hit='true'] {\n  background-color: rgb(190, 189, 189);\n}\n\n.playerCell[data-occupied='[object Object]'] {\n  background-color: rgb(255, 0, 0);\n}\n\n.playerCell[data-been-hit='true'].playerCell[data-occupied='[object Object]'],\n.computerCell[data-been-hit='true'].computerCell[data-occupied='[object Object]'] {\n  background-color: black;\n}\n\n#buttons {\n  background-color: #fef6e4;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n}\n\nbutton {\n  background-color: #00a71c;\n  border: none;\n  color: white;\n  padding: 5px 10px;\n  text-align: center;\n  text-decoration: none;\n  display: inline-block;\n  font-size: 16px;\n  margin-bottom: 20px;\n  border: 1px solid black;\n  border-radius: 5px;\n  box-shadow: 0px 0px 9px 5px rgba(0, 0, 0, 0.5);\n  cursor: pointer;\n}\n\n#manualButton {\n  margin-top: 20px;\n}\n"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBNkI7QUFFN0IsTUFBTUMsSUFBSSxDQUFDO0VBQ1RDLFdBQVcsQ0FBQ0MsQ0FBQyxFQUFFQyxDQUFDLEVBQW9DO0lBQUEsSUFBbENDLFFBQVEsdUVBQUcsSUFBSTtJQUFBLElBQUVDLE9BQU8sdUVBQUcsS0FBSztJQUNoRCxJQUFJLENBQUNILENBQUMsR0FBR0EsQ0FBQztJQUNWLElBQUksQ0FBQ0MsQ0FBQyxHQUFHQSxDQUFDO0lBQ1YsSUFBSSxDQUFDQyxRQUFRLEdBQUdBLFFBQVE7SUFDeEIsSUFBSSxDQUFDQyxPQUFPLEdBQUdBLE9BQU87RUFDeEI7QUFDRjtBQUVBLE1BQU1DLFNBQVMsQ0FBQztFQUNkTCxXQUFXLEdBQUc7SUFDWixJQUFJLENBQUNNLFNBQVMsR0FBRyxJQUFJLENBQUNBLFNBQVMsSUFBSSxJQUFJLENBQUNDLGFBQWEsRUFBRTtJQUN2RCxJQUFJLENBQUNDLE9BQU8sR0FBRyxJQUFJLENBQUNBLE9BQU8sSUFBSSxJQUFJVix1Q0FBSSxDQUFDLENBQUMsQ0FBQztJQUMxQyxJQUFJLENBQUNXLFVBQVUsR0FBRyxJQUFJLENBQUNBLFVBQVUsSUFBSSxJQUFJWCx1Q0FBSSxDQUFDLENBQUMsQ0FBQztJQUNoRCxJQUFJLENBQUNZLFNBQVMsR0FBRyxJQUFJLENBQUNBLFNBQVMsSUFBSSxJQUFJWix1Q0FBSSxDQUFDLENBQUMsQ0FBQztJQUM5QyxJQUFJLENBQUNhLFNBQVMsR0FBRyxJQUFJLENBQUNBLFNBQVMsSUFBSSxJQUFJYix1Q0FBSSxDQUFDLENBQUMsQ0FBQztJQUM5QyxJQUFJLENBQUNjLFVBQVUsR0FBRyxJQUFJLENBQUNBLFVBQVUsSUFBSSxJQUFJZCx1Q0FBSSxDQUFDLENBQUMsQ0FBQztFQUNsRDtFQUVBUyxhQUFhLEdBQUc7SUFDZCxJQUFJRCxTQUFTLEdBQUcsRUFBRTtJQUNsQixLQUFLLElBQUlPLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBRyxFQUFFLEVBQUVBLENBQUMsRUFBRSxFQUFFO01BQzNCLEtBQUssSUFBSUMsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHLEVBQUUsRUFBRUEsQ0FBQyxFQUFFLEVBQUU7UUFDM0JSLFNBQVMsQ0FBQ1MsSUFBSSxDQUFDLElBQUloQixJQUFJLENBQUNjLENBQUMsRUFBRUMsQ0FBQyxDQUFDLENBQUM7TUFDaEM7SUFDRjtJQUNBLE9BQU9SLFNBQVM7RUFDbEI7RUFDQVUsU0FBUyxDQUFDQyxXQUFXLEVBQUVDLElBQUksRUFBRTtJQUMzQixJQUFJQSxJQUFJLENBQUNDLFdBQVcsSUFBSSxVQUFVLEVBQUU7TUFDbEMsSUFBSSxJQUFJLENBQUNDLGNBQWMsQ0FBQ0gsV0FBVyxFQUFFQyxJQUFJLENBQUMsRUFBRTtRQUMxQyxLQUFLLElBQUlMLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBR0ssSUFBSSxDQUFDRyxNQUFNLEVBQUVSLENBQUMsRUFBRSxFQUFFO1VBQ3BDLElBQUlTLFVBQVUsR0FBRyxDQUFDTCxXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUdKLENBQUMsRUFBRUksV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1VBQ3JELElBQUksQ0FBQ00sUUFBUSxDQUFDRCxVQUFVLENBQUMsQ0FBQ25CLFFBQVEsR0FBR2UsSUFBSTtRQUMzQztNQUNGO0lBQ0YsQ0FBQyxNQUFNO01BQ0wsSUFBSSxJQUFJLENBQUNFLGNBQWMsQ0FBQ0gsV0FBVyxFQUFFQyxJQUFJLENBQUMsRUFBRTtRQUMxQyxLQUFLLElBQUlMLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBR0ssSUFBSSxDQUFDRyxNQUFNLEVBQUVSLENBQUMsRUFBRSxFQUFFO1VBQ3BDLElBQUlTLFVBQVUsR0FBRyxDQUFDTCxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUVBLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBR0osQ0FBQyxDQUFDO1VBQ3JELElBQUksQ0FBQ1UsUUFBUSxDQUFDRCxVQUFVLENBQUMsQ0FBQ25CLFFBQVEsR0FBR2UsSUFBSTtRQUMzQztNQUNGO0lBQ0Y7RUFDRjtFQUNBRSxjQUFjLENBQUNILFdBQVcsRUFBRUMsSUFBSSxFQUFFO0lBQ2hDLElBQUlBLElBQUksQ0FBQ0MsV0FBVyxJQUFJLFVBQVUsRUFBRTtNQUNsQyxLQUFLLElBQUlOLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBR0ssSUFBSSxDQUFDRyxNQUFNLEVBQUVSLENBQUMsRUFBRSxFQUFFO1FBQ3BDLElBQUlTLFVBQVUsR0FBRyxDQUFDTCxXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUdKLENBQUMsRUFBRUksV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JELElBQ0UsSUFBSSxDQUFDTSxRQUFRLENBQUNELFVBQVUsQ0FBQyxJQUFJRSxTQUFTLElBQ3RDLElBQUksQ0FBQ0QsUUFBUSxDQUFDRCxVQUFVLENBQUMsQ0FBQ25CLFFBQVEsS0FBSyxJQUFJLEVBQzNDO1VBQ0EsT0FBTyxLQUFLO1FBQ2Q7TUFDRjtNQUNBLE9BQU8sSUFBSTtJQUNiLENBQUMsTUFBTTtNQUNMLEtBQUssSUFBSVUsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHSyxJQUFJLENBQUNHLE1BQU0sRUFBRVIsQ0FBQyxFQUFFLEVBQUU7UUFDcEMsSUFBSVMsVUFBVSxHQUFHLENBQUNMLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRUEsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHSixDQUFDLENBQUM7UUFDckQsSUFDRSxJQUFJLENBQUNVLFFBQVEsQ0FBQ0QsVUFBVSxDQUFDLElBQUlFLFNBQVMsSUFDdEMsSUFBSSxDQUFDRCxRQUFRLENBQUNELFVBQVUsQ0FBQyxDQUFDbkIsUUFBUSxLQUFLLElBQUksRUFDM0M7VUFDQSxPQUFPLEtBQUs7UUFDZDtNQUNGO01BQ0EsT0FBTyxJQUFJO0lBQ2I7RUFDRjtFQUNBb0IsUUFBUSxDQUFDTixXQUFXLEVBQUU7SUFDcEIsT0FBTyxJQUFJLENBQUNYLFNBQVMsQ0FBQ21CLElBQUksQ0FDdkJDLEdBQUcsSUFBS0EsR0FBRyxDQUFDekIsQ0FBQyxLQUFLZ0IsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJUyxHQUFHLENBQUN4QixDQUFDLEtBQUtlLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FDOUQ7RUFDSDtFQUNBVSxhQUFhLENBQUNWLFdBQVcsRUFBRTtJQUN6QixJQUFJLElBQUksQ0FBQ00sUUFBUSxDQUFDTixXQUFXLENBQUMsQ0FBQ2IsT0FBTyxLQUFLLElBQUksRUFBRSxPQUFPLEtBQUs7SUFDN0QsSUFBSSxDQUFDbUIsUUFBUSxDQUFDTixXQUFXLENBQUMsQ0FBQ2IsT0FBTyxHQUFHLElBQUk7SUFDekMsSUFBSSxJQUFJLENBQUNtQixRQUFRLENBQUNOLFdBQVcsQ0FBQyxDQUFDZCxRQUFRLEtBQUssSUFBSSxFQUM5QyxJQUFJLENBQUNvQixRQUFRLENBQUNOLFdBQVcsQ0FBQyxDQUFDZCxRQUFRLENBQUN5QixHQUFHLEVBQUU7RUFDN0M7RUFDQUMsU0FBUyxHQUFHO0lBQ1YsSUFDRSxJQUFJLENBQUNyQixPQUFPLENBQUNzQixNQUFNLEVBQUUsSUFDckIsSUFBSSxDQUFDckIsVUFBVSxDQUFDcUIsTUFBTSxFQUFFLElBQ3hCLElBQUksQ0FBQ3BCLFNBQVMsQ0FBQ29CLE1BQU0sRUFBRSxJQUN2QixJQUFJLENBQUNuQixTQUFTLENBQUNtQixNQUFNLEVBQUUsSUFDdkIsSUFBSSxDQUFDbEIsVUFBVSxDQUFDa0IsTUFBTSxFQUFFLEVBQ3hCO01BQ0EsT0FBTyxJQUFJO0lBQ2I7SUFDQSxPQUFPLEtBQUs7RUFDZDtFQUNBQyxlQUFlLEdBQUc7SUFDaEIsSUFBSUMsS0FBSyxHQUFHLENBQ1YsSUFBSSxDQUFDeEIsT0FBTyxFQUNaLElBQUksQ0FBQ0MsVUFBVSxFQUNmLElBQUksQ0FBQ0MsU0FBUyxFQUNkLElBQUksQ0FBQ0MsU0FBUyxFQUNkLElBQUksQ0FBQ0MsVUFBVSxDQUNoQjtJQUNELElBQUlxQixNQUFNLEdBQUcsSUFBSTtJQUNqQixTQUFTQyxZQUFZLENBQUNGLEtBQUssRUFBRTtNQUMzQixJQUFJQSxLQUFLLENBQUNYLE1BQU0sS0FBSyxDQUFDLEVBQUU7TUFDeEIsSUFBSWMsVUFBVSxHQUFHRixNQUFNLENBQUNWLFFBQVEsQ0FBQ1UsTUFBTSxDQUFDRyxRQUFRLEVBQUUsQ0FBQztNQUNuRCxJQUFJSCxNQUFNLENBQUNiLGNBQWMsQ0FBQyxDQUFDZSxVQUFVLENBQUNsQyxDQUFDLEVBQUVrQyxVQUFVLENBQUNqQyxDQUFDLENBQUMsRUFBRThCLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQ2pFQyxNQUFNLENBQUNqQixTQUFTLENBQUMsQ0FBQ21CLFVBQVUsQ0FBQ2xDLENBQUMsRUFBRWtDLFVBQVUsQ0FBQ2pDLENBQUMsQ0FBQyxFQUFFOEIsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hEQSxLQUFLLENBQUNLLEtBQUssRUFBRTtRQUNiSCxZQUFZLENBQUNGLEtBQUssQ0FBQztNQUNyQixDQUFDLE1BQU07UUFDTEUsWUFBWSxDQUFDRixLQUFLLENBQUM7TUFDckI7SUFDRjtJQUNBRSxZQUFZLENBQUNGLEtBQUssQ0FBQztFQUNyQjtFQUNBSSxRQUFRLEdBQW1CO0lBQUEsSUFBbEJFLEdBQUcsdUVBQUcsQ0FBQztJQUFBLElBQUVDLEdBQUcsdUVBQUcsQ0FBQztJQUN2QixNQUFNQyxPQUFPLEdBQUdDLElBQUksQ0FBQ0MsS0FBSyxDQUFDRCxJQUFJLENBQUNFLE1BQU0sRUFBRSxJQUFJSixHQUFHLEdBQUdELEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBR0EsR0FBRyxDQUFDO0lBQ2pFLE1BQU1NLE9BQU8sR0FBR0gsSUFBSSxDQUFDQyxLQUFLLENBQUNELElBQUksQ0FBQ0UsTUFBTSxFQUFFLElBQUlKLEdBQUcsR0FBR0QsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHQSxHQUFHLENBQUM7SUFDakUsT0FBTyxDQUFDRSxPQUFPLEVBQUVJLE9BQU8sQ0FBQztFQUMzQjtFQUNBQyxXQUFXLEdBQUc7SUFDWixJQUFJQyxPQUFPLEdBQUcsQ0FBQztJQUNmLEtBQUssSUFBSWpDLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBRyxJQUFJLENBQUNQLFNBQVMsQ0FBQ2UsTUFBTSxFQUFFUixDQUFDLEVBQUUsRUFBRTtNQUM5QyxJQUFJLElBQUksQ0FBQ1AsU0FBUyxDQUFDTyxDQUFDLENBQUMsQ0FBQ1YsUUFBUSxLQUFLLElBQUksRUFBRTtRQUN2QzJDLE9BQU8sRUFBRTtNQUNYO0lBQ0Y7SUFDQSxJQUFJQSxPQUFPLElBQUksRUFBRSxFQUFFO01BQ2pCLE9BQU8sSUFBSTtJQUNiLENBQUMsTUFBTTtNQUNMLE9BQU8sS0FBSztJQUNkO0VBQ0Y7RUFDQUMsZUFBZSxDQUFDQyxHQUFHLEVBQUU7SUFDbkIsSUFBSWhCLEtBQUssR0FBRyxDQUNWLElBQUksQ0FBQ3hCLE9BQU8sRUFDWixJQUFJLENBQUNDLFVBQVUsRUFDZixJQUFJLENBQUNDLFNBQVMsRUFDZCxJQUFJLENBQUNDLFNBQVMsRUFDZCxJQUFJLENBQUNDLFVBQVUsQ0FDaEI7SUFDRCxJQUFJcUIsTUFBTSxHQUFHLElBQUk7SUFDakIsU0FBU2dCLG1CQUFtQixDQUFDakIsS0FBSyxFQUFFO01BQ2xDLElBQUlBLEtBQUssQ0FBQ1gsTUFBTSxLQUFLLENBQUMsRUFBRTtNQUN4QjtJQUNGOztJQUNBLElBQUksQ0FBQzRCLG1CQUFtQixDQUFDakIsS0FBSyxDQUFDO0VBQ2pDO0FBQ0Y7Ozs7Ozs7Ozs7Ozs7OztBQ3RKQSxNQUFNa0IsTUFBTSxDQUFDO0VBQ1hsRCxXQUFXLEdBQW9CO0lBQUEsSUFBbkJtRCxJQUFJLHVFQUFHLFVBQVU7SUFDM0IsSUFBSSxDQUFDQSxJQUFJLEdBQUdBLElBQUk7RUFDbEI7RUFDQUMsWUFBWSxDQUFDOUMsU0FBUyxFQUFFO0lBQ3RCLElBQUk2QixVQUFVLEdBQUc3QixTQUFTLENBQUNpQixRQUFRLENBQUMsSUFBSSxDQUFDYSxRQUFRLEVBQUUsQ0FBQztJQUNwRCxJQUFJRCxVQUFVLENBQUMvQixPQUFPLElBQUksS0FBSyxFQUFFO01BQy9CK0IsVUFBVSxDQUFDL0IsT0FBTyxHQUFHLElBQUk7TUFDekIsSUFBSStCLFVBQVUsQ0FBQ2hDLFFBQVEsS0FBSyxJQUFJLEVBQUU7UUFDaENnQyxVQUFVLENBQUNoQyxRQUFRLENBQUN5QixHQUFHLEVBQUU7TUFDM0I7SUFDRixDQUFDLE1BQU07TUFDTCxJQUFJLENBQUN3QixZQUFZLENBQUM5QyxTQUFTLENBQUM7SUFDOUI7RUFDRjtFQUNBOEIsUUFBUSxHQUFtQjtJQUFBLElBQWxCRSxHQUFHLHVFQUFHLENBQUM7SUFBQSxJQUFFQyxHQUFHLHVFQUFHLENBQUM7SUFDdkIsTUFBTUMsT0FBTyxHQUFHQyxJQUFJLENBQUNDLEtBQUssQ0FBQ0QsSUFBSSxDQUFDRSxNQUFNLEVBQUUsSUFBSUosR0FBRyxHQUFHRCxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUdBLEdBQUcsQ0FBQztJQUNqRSxNQUFNTSxPQUFPLEdBQUdILElBQUksQ0FBQ0MsS0FBSyxDQUFDRCxJQUFJLENBQUNFLE1BQU0sRUFBRSxJQUFJSixHQUFHLEdBQUdELEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBR0EsR0FBRyxDQUFDO0lBQ2pFLE9BQU8sQ0FBQ0UsT0FBTyxFQUFFSSxPQUFPLENBQUM7RUFDM0I7QUFDRjs7Ozs7Ozs7Ozs7Ozs7O0FDcEJBLE1BQU05QyxJQUFJLENBQUM7RUFDVEUsV0FBVyxDQUFDcUIsTUFBTSxFQUFtRDtJQUFBLElBQWpEZ0MsU0FBUyx1RUFBRyxDQUFDO0lBQUEsSUFBRWxDLFdBQVcsdUVBQUcsSUFBSSxDQUFDQSxXQUFXLEVBQUU7SUFDakUsSUFBSSxDQUFDRSxNQUFNLEdBQUdBLE1BQU07SUFDcEIsSUFBSSxDQUFDZ0MsU0FBUyxHQUFHQSxTQUFTO0lBQzFCLElBQUksQ0FBQ2xDLFdBQVcsR0FBR0EsV0FBVztFQUNoQztFQUNBUyxHQUFHLEdBQUc7SUFDSixJQUFJLENBQUN5QixTQUFTLEVBQUU7RUFDbEI7RUFDQXZCLE1BQU0sR0FBRztJQUNQLElBQUksSUFBSSxDQUFDVCxNQUFNLElBQUksSUFBSSxDQUFDZ0MsU0FBUyxFQUFFLE9BQU8sSUFBSTtJQUM5QyxPQUFPLEtBQUs7RUFDZDtFQUNBbEMsV0FBVyxHQUFHO0lBQ1osT0FBT3NCLElBQUksQ0FBQ0UsTUFBTSxFQUFFLEdBQUcsR0FBRyxHQUFHLFVBQVUsR0FBRyxZQUFZO0VBQ3hEO0FBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoQkE7QUFDMEc7QUFDakI7QUFDekYsOEJBQThCLG1GQUEyQixDQUFDLDRGQUFxQztBQUMvRjtBQUNBLGdEQUFnRCx1QkFBdUIsZ0RBQWdELGtCQUFrQixrQkFBa0IsMkJBQTJCLG1DQUFtQyxHQUFHLE1BQU0saUJBQWlCLG1DQUFtQyxtQ0FBbUMscUNBQXFDLDJCQUEyQixHQUFHLFFBQVEsa0JBQWtCLHdCQUF3QixrQ0FBa0Msb0JBQW9CLG1CQUFtQixpQkFBaUIsOEJBQThCLEdBQUcsWUFBWSxrQkFBa0Isd0JBQXdCLDRCQUE0QixpQkFBaUIsOEJBQThCLGtCQUFrQixtQ0FBbUMsZUFBZSxtREFBbUQsR0FBRyxZQUFZLGtCQUFrQix3QkFBd0IsNEJBQTRCLGlCQUFpQiw4QkFBOEIsa0JBQWtCLGdDQUFnQyxvREFBb0QsR0FBRyxXQUFXLDhCQUE4QixrQkFBa0IsMkJBQTJCLDRCQUE0Qix3QkFBd0IsNEJBQTRCLGlCQUFpQixpQkFBaUIsaUJBQWlCLG1EQUFtRCx1QkFBdUIsR0FBRyxZQUFZLDhCQUE4Qix1QkFBdUIsYUFBYSxjQUFjLGlCQUFpQixrQkFBa0Isd0JBQXdCLHVCQUF1QixtREFBbUQsdUJBQXVCLDRCQUE0QixpQkFBaUIsa0JBQWtCLDJCQUEyQiw0QkFBNEIsd0JBQXdCLGVBQWUsR0FBRyxzQkFBc0Isa0JBQWtCLHdCQUF3QixrQ0FBa0MsZ0JBQWdCLEdBQUcsWUFBWSxrQkFBa0Isd0JBQXdCLDRCQUE0QixvQkFBb0IsZ0JBQWdCLEdBQUcsaUNBQWlDLDRCQUE0QixlQUFlLGdCQUFnQixpQkFBaUIsd0NBQXdDLHVCQUF1QixHQUFHLDREQUE0RCwwQkFBMEIsb0JBQW9CLEdBQUcsNkVBQTZFLHlDQUF5QyxHQUFHLGtEQUFrRCxxQ0FBcUMsR0FBRyx1S0FBdUssNEJBQTRCLEdBQUcsY0FBYyw4QkFBOEIsa0JBQWtCLDJCQUEyQix3QkFBd0IsNEJBQTRCLEdBQUcsWUFBWSw4QkFBOEIsaUJBQWlCLGlCQUFpQixzQkFBc0IsdUJBQXVCLDBCQUEwQiwwQkFBMEIsb0JBQW9CLHdCQUF3Qiw0QkFBNEIsdUJBQXVCLG1EQUFtRCxvQkFBb0IsR0FBRyxtQkFBbUIscUJBQXFCLEdBQUcsU0FBUyxpRkFBaUYsWUFBWSxhQUFhLFdBQVcsVUFBVSxZQUFZLGFBQWEsTUFBTSxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxNQUFNLEtBQUssVUFBVSxZQUFZLGFBQWEsV0FBVyxVQUFVLFVBQVUsWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsV0FBVyxZQUFZLFdBQVcsWUFBWSxXQUFXLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLFdBQVcsWUFBWSxXQUFXLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxXQUFXLFlBQVksYUFBYSxhQUFhLGFBQWEsV0FBVyxVQUFVLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsV0FBVyxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsV0FBVyxVQUFVLFlBQVksYUFBYSxhQUFhLFdBQVcsTUFBTSxLQUFLLFVBQVUsWUFBWSxhQUFhLFdBQVcsTUFBTSxLQUFLLFVBQVUsWUFBWSxhQUFhLFdBQVcsVUFBVSxNQUFNLE1BQU0sWUFBWSxXQUFXLFVBQVUsVUFBVSxZQUFZLGFBQWEsT0FBTyxPQUFPLFlBQVksV0FBVyxPQUFPLE1BQU0sWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLE1BQU0sWUFBWSxPQUFPLEtBQUssWUFBWSxXQUFXLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLFdBQVcsVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLFdBQVcsWUFBWSxhQUFhLGFBQWEsYUFBYSxXQUFXLE9BQU8sS0FBSyxZQUFZLGdDQUFnQyx1QkFBdUIsZ0RBQWdELGtCQUFrQixrQkFBa0IsMkJBQTJCLG1DQUFtQyxHQUFHLE1BQU0saUJBQWlCLG1DQUFtQyxtQ0FBbUMscUNBQXFDLDJCQUEyQixHQUFHLFFBQVEsa0JBQWtCLHdCQUF3QixrQ0FBa0Msb0JBQW9CLG1CQUFtQixpQkFBaUIsOEJBQThCLEdBQUcsWUFBWSxrQkFBa0Isd0JBQXdCLDRCQUE0QixpQkFBaUIsOEJBQThCLGtCQUFrQixtQ0FBbUMsZUFBZSxtREFBbUQsR0FBRyxZQUFZLGtCQUFrQix3QkFBd0IsNEJBQTRCLGlCQUFpQiw4QkFBOEIsa0JBQWtCLGdDQUFnQyxvREFBb0QsR0FBRyxXQUFXLDhCQUE4QixrQkFBa0IsMkJBQTJCLDRCQUE0Qix3QkFBd0IsNEJBQTRCLGlCQUFpQixpQkFBaUIsaUJBQWlCLG1EQUFtRCx1QkFBdUIsR0FBRyxZQUFZLDhCQUE4Qix1QkFBdUIsYUFBYSxjQUFjLGlCQUFpQixrQkFBa0Isd0JBQXdCLHVCQUF1QixtREFBbUQsdUJBQXVCLDRCQUE0QixpQkFBaUIsa0JBQWtCLDJCQUEyQiw0QkFBNEIsd0JBQXdCLGVBQWUsR0FBRyxzQkFBc0Isa0JBQWtCLHdCQUF3QixrQ0FBa0MsZ0JBQWdCLEdBQUcsWUFBWSxrQkFBa0Isd0JBQXdCLDRCQUE0QixvQkFBb0IsZ0JBQWdCLEdBQUcsaUNBQWlDLDRCQUE0QixlQUFlLGdCQUFnQixpQkFBaUIsd0NBQXdDLHVCQUF1QixHQUFHLDREQUE0RCwwQkFBMEIsb0JBQW9CLEdBQUcsNkVBQTZFLHlDQUF5QyxHQUFHLGtEQUFrRCxxQ0FBcUMsR0FBRyx1S0FBdUssNEJBQTRCLEdBQUcsY0FBYyw4QkFBOEIsa0JBQWtCLDJCQUEyQix3QkFBd0IsNEJBQTRCLEdBQUcsWUFBWSw4QkFBOEIsaUJBQWlCLGlCQUFpQixzQkFBc0IsdUJBQXVCLDBCQUEwQiwwQkFBMEIsb0JBQW9CLHdCQUF3Qiw0QkFBNEIsdUJBQXVCLG1EQUFtRCxvQkFBb0IsR0FBRyxtQkFBbUIscUJBQXFCLEdBQUcscUJBQXFCO0FBQzVzUDtBQUNBLGlFQUFlLHVCQUF1QixFQUFDOzs7Ozs7Ozs7OztBQ1AxQjs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHFEQUFxRDtBQUNyRDs7QUFFQTtBQUNBLGdEQUFnRDtBQUNoRDs7QUFFQTtBQUNBLHFGQUFxRjtBQUNyRjs7QUFFQTs7QUFFQTtBQUNBLHFCQUFxQjtBQUNyQjs7QUFFQTtBQUNBLHFCQUFxQjtBQUNyQjs7QUFFQTtBQUNBLHFCQUFxQjtBQUNyQjs7QUFFQTtBQUNBLEtBQUs7QUFDTCxLQUFLOzs7QUFHTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLHNCQUFzQixpQkFBaUI7QUFDdkM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQkFBcUIscUJBQXFCO0FBQzFDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Ysc0ZBQXNGLHFCQUFxQjtBQUMzRztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWLGlEQUFpRCxxQkFBcUI7QUFDdEU7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVixzREFBc0QscUJBQXFCO0FBQzNFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7OztBQ3JHYTs7QUFFYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1REFBdUQsY0FBYztBQUNyRTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcEJBLE1BQStGO0FBQy9GLE1BQXFGO0FBQ3JGLE1BQTRGO0FBQzVGLE1BQStHO0FBQy9HLE1BQXdHO0FBQ3hHLE1BQXdHO0FBQ3hHLE1BQW9HO0FBQ3BHO0FBQ0E7O0FBRUE7O0FBRUEsNEJBQTRCLHFHQUFtQjtBQUMvQyx3QkFBd0Isa0hBQWE7O0FBRXJDLHVCQUF1Qix1R0FBYTtBQUNwQztBQUNBLGlCQUFpQiwrRkFBTTtBQUN2Qiw2QkFBNkIsc0dBQWtCOztBQUUvQyxhQUFhLDBHQUFHLENBQUMsdUZBQU87Ozs7QUFJOEM7QUFDdEUsT0FBTyxpRUFBZSx1RkFBTyxJQUFJLDhGQUFjLEdBQUcsOEZBQWMsWUFBWSxFQUFDOzs7Ozs7Ozs7OztBQzFCaEU7O0FBRWI7O0FBRUE7QUFDQTs7QUFFQSxrQkFBa0Isd0JBQXdCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsa0JBQWtCLGlCQUFpQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsb0JBQW9CLDRCQUE0QjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxxQkFBcUIsNkJBQTZCO0FBQ2xEOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ3ZHYTs7QUFFYjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxzREFBc0Q7O0FBRXREO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7QUN0Q2E7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7QUNWYTs7QUFFYjtBQUNBO0FBQ0EsY0FBYyxLQUF3QyxHQUFHLHNCQUFpQixHQUFHLENBQUk7O0FBRWpGO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7O0FDWGE7O0FBRWI7QUFDQTtBQUNBOztBQUVBO0FBQ0Esa0RBQWtEO0FBQ2xEOztBQUVBO0FBQ0EsMENBQTBDO0FBQzFDOztBQUVBOztBQUVBO0FBQ0EsaUZBQWlGO0FBQ2pGOztBQUVBOztBQUVBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0EsYUFBYTtBQUNiOztBQUVBOztBQUVBO0FBQ0EseURBQXlEO0FBQ3pELElBQUk7O0FBRUo7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7OztBQ3JFYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOzs7Ozs7VUNmQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTs7Ozs7Ozs7Ozs7Ozs7QUNBcUI7QUFDa0I7QUFDTjtBQUVqQyxNQUFNVyxXQUFXLEdBQUcsSUFBSWpELGlEQUFTLEVBQUU7QUFDbkMsTUFBTWtELGFBQWEsR0FBR0MsUUFBUSxDQUFDQyxhQUFhLENBQUMsZ0JBQWdCLENBQUM7QUFFOUQsTUFBTUMsYUFBYSxHQUFHLElBQUlyRCxpREFBUyxFQUFFO0FBQ3JDLE1BQU1zRCxlQUFlLEdBQUdILFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLGtCQUFrQixDQUFDO0FBQ2xFLE1BQU1HLFVBQVUsR0FBRyxJQUFJViwyQ0FBTSxFQUFFO0FBRS9CUSxhQUFhLENBQUMzQixlQUFlLEVBQUU7QUFFL0IsU0FBUzhCLGlCQUFpQixHQUFHO0VBQzNCTixhQUFhLENBQUNPLFNBQVMsR0FBRyxFQUFFO0VBQzVCUixXQUFXLENBQUNoRCxTQUFTLENBQUN5RCxPQUFPLENBQUVDLElBQUksSUFBSztJQUN0QyxNQUFNQyxPQUFPLEdBQUdULFFBQVEsQ0FBQ1UsYUFBYSxDQUFDLEtBQUssQ0FBQztJQUM3Q0QsT0FBTyxDQUFDRSxTQUFTLENBQUNDLEdBQUcsQ0FBQyxZQUFZLENBQUM7SUFDbkNILE9BQU8sQ0FBQ0ksT0FBTyxDQUFDcEUsQ0FBQyxHQUFHK0QsSUFBSSxDQUFDL0QsQ0FBQztJQUMxQmdFLE9BQU8sQ0FBQ0ksT0FBTyxDQUFDbkUsQ0FBQyxHQUFHOEQsSUFBSSxDQUFDOUQsQ0FBQztJQUMxQitELE9BQU8sQ0FBQ0ksT0FBTyxDQUFDbEUsUUFBUSxHQUFHNkQsSUFBSSxDQUFDN0QsUUFBUTtJQUN4QzhELE9BQU8sQ0FBQ0ksT0FBTyxDQUFDakUsT0FBTyxHQUFHNEQsSUFBSSxDQUFDNUQsT0FBTztJQUN0Q21ELGFBQWEsQ0FBQ2UsV0FBVyxDQUFDTCxPQUFPLENBQUM7RUFDcEMsQ0FBQyxDQUFDO0FBQ0o7QUFFQUosaUJBQWlCLEVBQUU7QUFFbkIsU0FBU1UsbUJBQW1CLEdBQUc7RUFDN0JaLGVBQWUsQ0FBQ0csU0FBUyxHQUFHLEVBQUU7RUFDOUJKLGFBQWEsQ0FBQ3BELFNBQVMsQ0FBQ3lELE9BQU8sQ0FBRUMsSUFBSSxJQUFLO0lBQ3hDLE1BQU1DLE9BQU8sR0FBR1QsUUFBUSxDQUFDVSxhQUFhLENBQUMsS0FBSyxDQUFDO0lBQzdDRCxPQUFPLENBQUNFLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLGNBQWMsQ0FBQztJQUNyQ0gsT0FBTyxDQUFDSSxPQUFPLENBQUNwRSxDQUFDLEdBQUcrRCxJQUFJLENBQUMvRCxDQUFDO0lBQzFCZ0UsT0FBTyxDQUFDSSxPQUFPLENBQUNuRSxDQUFDLEdBQUc4RCxJQUFJLENBQUM5RCxDQUFDO0lBQzFCK0QsT0FBTyxDQUFDSSxPQUFPLENBQUNsRSxRQUFRLEdBQUc2RCxJQUFJLENBQUM3RCxRQUFRO0lBQ3hDOEQsT0FBTyxDQUFDSSxPQUFPLENBQUNqRSxPQUFPLEdBQUc0RCxJQUFJLENBQUM1RCxPQUFPO0lBQ3RDdUQsZUFBZSxDQUFDVyxXQUFXLENBQUNMLE9BQU8sQ0FBQztFQUN0QyxDQUFDLENBQUM7QUFDSjtBQUVBTSxtQkFBbUIsRUFBRTtBQUVyQixTQUFTQyxVQUFVLEdBQUc7RUFDcEIsTUFBTUMsa0JBQWtCLEdBQUdqQixRQUFRLENBQUNrQixnQkFBZ0IsQ0FBQyxlQUFlLENBQUM7RUFDckVELGtCQUFrQixDQUFDVixPQUFPLENBQUVFLE9BQU8sSUFBSztJQUN0Q0EsT0FBTyxDQUFDVSxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsTUFBTTtNQUN0Q2pCLGFBQWEsQ0FBQy9CLGFBQWEsQ0FBQyxDQUMxQmlELE1BQU0sQ0FBQ1gsT0FBTyxDQUFDSSxPQUFPLENBQUNwRSxDQUFDLENBQUMsRUFDekIyRSxNQUFNLENBQUNYLE9BQU8sQ0FBQ0ksT0FBTyxDQUFDbkUsQ0FBQyxDQUFDLENBQzFCLENBQUM7TUFDRnFFLG1CQUFtQixFQUFFO01BQ3JCWCxVQUFVLENBQUNSLFlBQVksQ0FBQ0UsV0FBVyxDQUFDO01BQ3BDTyxpQkFBaUIsRUFBRTtNQUNuQmdCLFFBQVEsRUFBRTtJQUNaLENBQUMsQ0FBQztFQUNKLENBQUMsQ0FBQztBQUNKOztBQUVBOztBQUVBLFNBQVNBLFFBQVEsR0FBRztFQUNsQixJQUFJLENBQUN2QixXQUFXLENBQUN6QixTQUFTLEVBQUUsSUFBSSxDQUFDNkIsYUFBYSxDQUFDN0IsU0FBUyxFQUFFLEVBQUU7SUFDMUQyQyxVQUFVLEVBQUU7RUFDZCxDQUFDLE1BQU0sSUFBSWxCLFdBQVcsQ0FBQ3pCLFNBQVMsRUFBRSxFQUFFO0lBQ2xDaUQsS0FBSyxDQUFDLFdBQVcsQ0FBQztFQUNwQixDQUFDLE1BQU0sSUFBSXBCLGFBQWEsQ0FBQzdCLFNBQVMsRUFBRSxFQUFFO0lBQ3BDaUQsS0FBSyxDQUFDLFVBQVUsQ0FBQztFQUNuQjtBQUNGO0FBRUFOLFVBQVUsRUFBRTs7QUFFWjtBQUNBLElBQUlPLHNCQUFzQixHQUFHdkIsUUFBUSxDQUFDVSxhQUFhLENBQUMsS0FBSyxDQUFDO0FBQzFEYSxzQkFBc0IsQ0FBQ0MsRUFBRSxHQUFHLHdCQUF3Qjs7QUFFcEQ7QUFDQSxJQUFJQyxrQkFBa0IsR0FBRzFCLGFBQWEsQ0FBQzJCLFNBQVMsQ0FBQyxJQUFJLENBQUM7QUFDdEQsTUFBTUMsS0FBSyxHQUFHM0IsUUFBUSxDQUFDQyxhQUFhLENBQUMsUUFBUSxDQUFDO0FBQzlDMEIsS0FBSyxDQUFDYixXQUFXLENBQUNTLHNCQUFzQixDQUFDO0FBQ3pDSSxLQUFLLENBQUNiLFdBQVcsQ0FBQ1csa0JBQWtCLENBQUM7O0FBRXJDO0FBQ0EsTUFBTUcsWUFBWSxHQUFHNUIsUUFBUSxDQUFDQyxhQUFhLENBQUMsZUFBZSxDQUFDO0FBQzVEMkIsWUFBWSxDQUFDVCxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsTUFBTTtFQUMzQ1UsWUFBWSxDQUFDQyxLQUFLLENBQUNDLE9BQU8sR0FBRyxNQUFNO0VBQ25DakMsV0FBVyxDQUFDaEQsU0FBUyxHQUFHZ0QsV0FBVyxDQUFDL0MsYUFBYSxFQUFFO0VBQ25EK0MsV0FBVyxDQUFDdkIsZUFBZSxFQUFFO0VBQzdCOEIsaUJBQWlCLEVBQUU7RUFDbkJvQixrQkFBa0IsQ0FBQ25CLFNBQVMsR0FBRyxFQUFFO0VBQ2pDbUIsa0JBQWtCLEdBQUcxQixhQUFhLENBQUMyQixTQUFTLENBQUMsSUFBSSxDQUFDO0VBQ2xEQyxLQUFLLENBQUNiLFdBQVcsQ0FBQ1csa0JBQWtCLENBQUM7RUFDckNFLEtBQUssQ0FBQ2IsV0FBVyxDQUFDZSxZQUFZLENBQUM7QUFDakMsQ0FBQyxDQUFDO0FBQ0YsTUFBTUcsV0FBVyxHQUFHaEMsUUFBUSxDQUFDQyxhQUFhLENBQUMsY0FBYyxDQUFDO0FBQzFEK0IsV0FBVyxDQUFDYixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsTUFBTTtFQUMxQyxJQUFJckIsV0FBVyxDQUFDVCxXQUFXLEVBQUUsRUFBRTtJQUM3QnNDLEtBQUssQ0FBQ0csS0FBSyxDQUFDQyxPQUFPLEdBQUcsTUFBTTtFQUM5QixDQUFDLE1BQU07SUFDTFQsS0FBSyxDQUFDLGdDQUFnQyxDQUFDO0VBQ3pDO0FBQ0YsQ0FBQyxDQUFDOztBQUVGO0FBQ0EsTUFBTU8sWUFBWSxHQUFHN0IsUUFBUSxDQUFDVSxhQUFhLENBQUMsUUFBUSxDQUFDO0FBQ3JEbUIsWUFBWSxDQUFDdkIsU0FBUyxHQUFHLEVBQUU7QUFDM0J1QixZQUFZLENBQUNMLEVBQUUsR0FBRyxjQUFjO0FBQ2hDSyxZQUFZLENBQUNJLFdBQVcsR0FBRyx1QkFBdUI7QUFDbEROLEtBQUssQ0FBQ2IsV0FBVyxDQUFDZSxZQUFZLENBQUM7QUFFL0IsSUFBSUssZ0JBQWdCLEdBQUcsQ0FDckJwQyxXQUFXLENBQUM5QyxPQUFPLEVBQ25COEMsV0FBVyxDQUFDN0MsVUFBVSxFQUN0QjZDLFdBQVcsQ0FBQzVDLFNBQVMsRUFDckI0QyxXQUFXLENBQUMzQyxTQUFTLEVBQ3JCMkMsV0FBVyxDQUFDMUMsVUFBVSxDQUN2QjtBQUVELElBQUkrRSxxQkFBcUIsR0FBRyxDQUMxQixTQUFTLEVBQ1QsWUFBWSxFQUNaLFdBQVcsRUFDWCxXQUFXLEVBQ1gsYUFBYSxDQUNkO0FBRUQsU0FBU0MsZUFBZSxHQUFHO0VBQ3pCUCxZQUFZLENBQUNWLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxNQUFNO0lBQzNDUyxZQUFZLENBQUNFLEtBQUssQ0FBQ0MsT0FBTyxHQUFHLE1BQU07SUFDbkNSLHNCQUFzQixDQUFDVSxXQUFXLEdBQUksY0FBYUUscUJBQXFCLENBQUMsQ0FBQyxDQUFFLEVBQUM7SUFDN0UsSUFBSXpFLElBQUksR0FBR3dFLGdCQUFnQixDQUFDLENBQUMsQ0FBQztJQUM5QixJQUFJRyxnQkFBZ0IsR0FBR3JDLFFBQVEsQ0FBQ2tCLGdCQUFnQixDQUFDLGFBQWEsQ0FBQztJQUMvRG1CLGdCQUFnQixDQUFDOUIsT0FBTyxDQUFFRSxPQUFPLElBQUs7TUFDcENBLE9BQU8sQ0FBQ1UsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLE1BQU07UUFDdEMsSUFDRSxDQUFDckIsV0FBVyxDQUFDbEMsY0FBYyxDQUN6QixDQUFDd0QsTUFBTSxDQUFDWCxPQUFPLENBQUNJLE9BQU8sQ0FBQ3BFLENBQUMsQ0FBQyxFQUFFMkUsTUFBTSxDQUFDWCxPQUFPLENBQUNJLE9BQU8sQ0FBQ25FLENBQUMsQ0FBQyxDQUFDLEVBQ3REZ0IsSUFBSSxDQUNMLEVBQ0Q7VUFDQTZELHNCQUFzQixDQUFDVSxXQUFXLEdBQUcsOEJBQThCO1VBQ25FSyxVQUFVLENBQUMsTUFBTTtZQUNmZixzQkFBc0IsQ0FBQ1UsV0FBVyxHQUFJLGNBQWFFLHFCQUFxQixDQUFDLENBQUMsQ0FBRSxFQUFDO1VBQy9FLENBQUMsRUFBRSxJQUFJLENBQUM7VUFDUjtRQUNGO1FBQ0FyQyxXQUFXLENBQUN0QyxTQUFTLENBQ25CLENBQUM0RCxNQUFNLENBQUNYLE9BQU8sQ0FBQ0ksT0FBTyxDQUFDcEUsQ0FBQyxDQUFDLEVBQUUyRSxNQUFNLENBQUNYLE9BQU8sQ0FBQ0ksT0FBTyxDQUFDbkUsQ0FBQyxDQUFDLENBQUMsRUFDdERnQixJQUFJLENBQ0w7UUFDRDJDLGlCQUFpQixFQUFFO1FBQ25Cb0Isa0JBQWtCLENBQUNuQixTQUFTLEdBQUcsRUFBRTtRQUNqQ21CLGtCQUFrQixHQUFHMUIsYUFBYSxDQUFDMkIsU0FBUyxDQUFDLElBQUksQ0FBQztRQUNsREMsS0FBSyxDQUFDYixXQUFXLENBQUNXLGtCQUFrQixDQUFDO1FBQ3JDRSxLQUFLLENBQUNiLFdBQVcsQ0FBQ2UsWUFBWSxDQUFDO1FBQy9CTSxxQkFBcUIsQ0FBQ3RELEtBQUssRUFBRTtRQUM3QnFELGdCQUFnQixDQUFDckQsS0FBSyxFQUFFO1FBQ3hCZ0QsWUFBWSxDQUFDSSxXQUFXLEdBQUksWUFBV0UscUJBQXFCLENBQUMsQ0FBQyxDQUFFLEVBQUM7UUFDakUsSUFBSUEscUJBQXFCLENBQUN0RSxNQUFNLElBQUksQ0FBQyxFQUFFO1VBQ3JDZ0UsWUFBWSxDQUFDQyxLQUFLLENBQUNDLE9BQU8sR0FBRyxNQUFNO1VBQ25DUixzQkFBc0IsQ0FBQ1UsV0FBVyxHQUFHLGlCQUFpQjtRQUN4RDtNQUNGLENBQUMsQ0FBQztJQUNKLENBQUMsQ0FBQztFQUNKLENBQUMsQ0FBQztBQUNKO0FBQ0FHLGVBQWUsRUFBRSxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcGpzLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwanMvLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBqcy8uL3NyYy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBqcy8uL3NyYy9zdHlsZS5zY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXBqcy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcGpzLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcGpzLy4vc3JjL3N0eWxlLnNjc3M/ODQ2YSIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwanMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcGpzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwanMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcGpzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBqcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBqcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBqcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwanMvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcGpzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwanMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwanMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwanMvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL2JhdHRsZXNoaXBqcy8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTaGlwIH0gZnJvbSAnLi9zaGlwJ1xuXG5jbGFzcyBDZWxsIHtcbiAgY29uc3RydWN0b3IoeCwgeSwgb2NjdXBpZWQgPSBudWxsLCBiZWVuSGl0ID0gZmFsc2UpIHtcbiAgICB0aGlzLnggPSB4XG4gICAgdGhpcy55ID0geVxuICAgIHRoaXMub2NjdXBpZWQgPSBvY2N1cGllZFxuICAgIHRoaXMuYmVlbkhpdCA9IGJlZW5IaXRcbiAgfVxufVxuXG5jbGFzcyBHYW1lYm9hcmQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmdhbWVCb2FyZCA9IHRoaXMuZ2FtZUJvYXJkIHx8IHRoaXMubWFrZUdhbWVib2FyZCgpXG4gICAgdGhpcy5jYXJyaWVyID0gdGhpcy5jYXJyaWVyIHx8IG5ldyBTaGlwKDUpXG4gICAgdGhpcy5iYXR0bGVzaGlwID0gdGhpcy5iYXR0bGVzaGlwIHx8IG5ldyBTaGlwKDQpXG4gICAgdGhpcy5kZXN0cm95ZXIgPSB0aGlzLmRlc3Ryb3llciB8fCBuZXcgU2hpcCgzKVxuICAgIHRoaXMuc3VibWFyaW5lID0gdGhpcy5zdWJtYXJpbmUgfHwgbmV3IFNoaXAoMylcbiAgICB0aGlzLnBhdHJvbEJvYXQgPSB0aGlzLnBhdHJvbEJvYXQgfHwgbmV3IFNoaXAoMilcbiAgfVxuXG4gIG1ha2VHYW1lYm9hcmQoKSB7XG4gICAgbGV0IGdhbWVCb2FyZCA9IFtdXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgICAgZ2FtZUJvYXJkLnB1c2gobmV3IENlbGwoaSwgaikpXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBnYW1lQm9hcmRcbiAgfVxuICBwbGFjZVNoaXAoY29vcmRpbmF0ZXMsIHNoaXApIHtcbiAgICBpZiAoc2hpcC5vcmllbnRhdGlvbiA9PSAndmVydGljYWwnKSB7XG4gICAgICBpZiAodGhpcy52YWxpZFBsYWNlbWVudChjb29yZGluYXRlcywgc2hpcCkpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgbGV0IHRlbXBDb29yZHMgPSBbY29vcmRpbmF0ZXNbMF0gKyBpLCBjb29yZGluYXRlc1sxXV1cbiAgICAgICAgICB0aGlzLmZpbmRDZWxsKHRlbXBDb29yZHMpLm9jY3VwaWVkID0gc2hpcFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLnZhbGlkUGxhY2VtZW50KGNvb3JkaW5hdGVzLCBzaGlwKSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBsZXQgdGVtcENvb3JkcyA9IFtjb29yZGluYXRlc1swXSwgY29vcmRpbmF0ZXNbMV0gKyBpXVxuICAgICAgICAgIHRoaXMuZmluZENlbGwodGVtcENvb3Jkcykub2NjdXBpZWQgPSBzaGlwXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgdmFsaWRQbGFjZW1lbnQoY29vcmRpbmF0ZXMsIHNoaXApIHtcbiAgICBpZiAoc2hpcC5vcmllbnRhdGlvbiA9PSAndmVydGljYWwnKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IHRlbXBDb29yZHMgPSBbY29vcmRpbmF0ZXNbMF0gKyBpLCBjb29yZGluYXRlc1sxXV1cbiAgICAgICAgaWYgKFxuICAgICAgICAgIHRoaXMuZmluZENlbGwodGVtcENvb3JkcykgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgdGhpcy5maW5kQ2VsbCh0ZW1wQ29vcmRzKS5vY2N1cGllZCAhPT0gbnVsbFxuICAgICAgICApIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWVcbiAgICB9IGVsc2Uge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCB0ZW1wQ29vcmRzID0gW2Nvb3JkaW5hdGVzWzBdLCBjb29yZGluYXRlc1sxXSArIGldXG4gICAgICAgIGlmIChcbiAgICAgICAgICB0aGlzLmZpbmRDZWxsKHRlbXBDb29yZHMpID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgIHRoaXMuZmluZENlbGwodGVtcENvb3Jkcykub2NjdXBpZWQgIT09IG51bGxcbiAgICAgICAgKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICB9XG4gIGZpbmRDZWxsKGNvb3JkaW5hdGVzKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2FtZUJvYXJkLmZpbmQoXG4gICAgICAob2JqKSA9PiBvYmoueCA9PT0gY29vcmRpbmF0ZXNbMF0gJiYgb2JqLnkgPT09IGNvb3JkaW5hdGVzWzFdXG4gICAgKVxuICB9XG4gIHJlY2VpdmVBdHRhY2soY29vcmRpbmF0ZXMpIHtcbiAgICBpZiAodGhpcy5maW5kQ2VsbChjb29yZGluYXRlcykuYmVlbkhpdCA9PT0gdHJ1ZSkgcmV0dXJuIGZhbHNlXG4gICAgdGhpcy5maW5kQ2VsbChjb29yZGluYXRlcykuYmVlbkhpdCA9IHRydWVcbiAgICBpZiAodGhpcy5maW5kQ2VsbChjb29yZGluYXRlcykub2NjdXBpZWQgIT09IG51bGwpXG4gICAgICB0aGlzLmZpbmRDZWxsKGNvb3JkaW5hdGVzKS5vY2N1cGllZC5oaXQoKVxuICB9XG4gIGZsZWV0U3VuaygpIHtcbiAgICBpZiAoXG4gICAgICB0aGlzLmNhcnJpZXIuaXNTdW5rKCkgJiZcbiAgICAgIHRoaXMuYmF0dGxlc2hpcC5pc1N1bmsoKSAmJlxuICAgICAgdGhpcy5kZXN0cm95ZXIuaXNTdW5rKCkgJiZcbiAgICAgIHRoaXMuc3VibWFyaW5lLmlzU3VuaygpICYmXG4gICAgICB0aGlzLnBhdHJvbEJvYXQuaXNTdW5rKClcbiAgICApIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIHJhbmRvbVBsYWNlbWVudCgpIHtcbiAgICBsZXQgZmxlZXQgPSBbXG4gICAgICB0aGlzLmNhcnJpZXIsXG4gICAgICB0aGlzLmJhdHRsZXNoaXAsXG4gICAgICB0aGlzLmRlc3Ryb3llcixcbiAgICAgIHRoaXMuc3VibWFyaW5lLFxuICAgICAgdGhpcy5wYXRyb2xCb2F0LFxuICAgIF1cbiAgICBsZXQgYmluZGVyID0gdGhpc1xuICAgIGZ1bmN0aW9uIHRyeVBsYWNlbWVudChmbGVldCkge1xuICAgICAgaWYgKGZsZWV0Lmxlbmd0aCA9PT0gMCkgcmV0dXJuXG4gICAgICBsZXQgcmFuZG9tQ2VsbCA9IGJpbmRlci5maW5kQ2VsbChiaW5kZXIucmFuZG9tWFkoKSlcbiAgICAgIGlmIChiaW5kZXIudmFsaWRQbGFjZW1lbnQoW3JhbmRvbUNlbGwueCwgcmFuZG9tQ2VsbC55XSwgZmxlZXRbMF0pKSB7XG4gICAgICAgIGJpbmRlci5wbGFjZVNoaXAoW3JhbmRvbUNlbGwueCwgcmFuZG9tQ2VsbC55XSwgZmxlZXRbMF0pXG4gICAgICAgIGZsZWV0LnNoaWZ0KClcbiAgICAgICAgdHJ5UGxhY2VtZW50KGZsZWV0KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdHJ5UGxhY2VtZW50KGZsZWV0KVxuICAgICAgfVxuICAgIH1cbiAgICB0cnlQbGFjZW1lbnQoZmxlZXQpXG4gIH1cbiAgcmFuZG9tWFkobWluID0gMCwgbWF4ID0gOSkge1xuICAgIGNvbnN0IHJhbmRvbVggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkgKyBtaW4pXG4gICAgY29uc3QgcmFuZG9tWSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSArIG1pbilcbiAgICByZXR1cm4gW3JhbmRvbVgsIHJhbmRvbVldXG4gIH1cbiAgZmxlZXRQbGFjZWQoKSB7XG4gICAgbGV0IGNvdW50ZXIgPSAwXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmdhbWVCb2FyZC5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHRoaXMuZ2FtZUJvYXJkW2ldLm9jY3VwaWVkICE9PSBudWxsKSB7XG4gICAgICAgIGNvdW50ZXIrK1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoY291bnRlciA9PSAxNykge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICB9XG4gIG1hbnVhbFBsYWNlbWVudChkaXYpIHtcbiAgICBsZXQgZmxlZXQgPSBbXG4gICAgICB0aGlzLmNhcnJpZXIsXG4gICAgICB0aGlzLmJhdHRsZXNoaXAsXG4gICAgICB0aGlzLmRlc3Ryb3llcixcbiAgICAgIHRoaXMuc3VibWFyaW5lLFxuICAgICAgdGhpcy5wYXRyb2xCb2F0LFxuICAgIF1cbiAgICBsZXQgYmluZGVyID0gdGhpc1xuICAgIGZ1bmN0aW9uIG1hbnVhbFBsYWNlbWVudEVhY2goZmxlZXQpIHtcbiAgICAgIGlmIChmbGVldC5sZW5ndGggPT09IDApIHJldHVyblxuICAgICAgLy9UT0RPXG4gICAgfVxuICAgIHRoaXMubWFudWFsUGxhY2VtZW50RWFjaChmbGVldClcbiAgfVxufVxuXG5leHBvcnQgeyBHYW1lYm9hcmQgfVxuIiwiY2xhc3MgUGxheWVyIHtcbiAgY29uc3RydWN0b3IobmFtZSA9ICdDb21wdXRlcicpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lXG4gIH1cbiAgcmFuZG9tQXR0YWNrKGdhbWVCb2FyZCkge1xuICAgIGxldCByYW5kb21DZWxsID0gZ2FtZUJvYXJkLmZpbmRDZWxsKHRoaXMucmFuZG9tWFkoKSlcbiAgICBpZiAocmFuZG9tQ2VsbC5iZWVuSGl0ID09IGZhbHNlKSB7XG4gICAgICByYW5kb21DZWxsLmJlZW5IaXQgPSB0cnVlXG4gICAgICBpZiAocmFuZG9tQ2VsbC5vY2N1cGllZCAhPT0gbnVsbCkge1xuICAgICAgICByYW5kb21DZWxsLm9jY3VwaWVkLmhpdCgpXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmFuZG9tQXR0YWNrKGdhbWVCb2FyZClcbiAgICB9XG4gIH1cbiAgcmFuZG9tWFkobWluID0gMCwgbWF4ID0gOSkge1xuICAgIGNvbnN0IHJhbmRvbVggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkgKyBtaW4pXG4gICAgY29uc3QgcmFuZG9tWSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSArIG1pbilcbiAgICByZXR1cm4gW3JhbmRvbVgsIHJhbmRvbVldXG4gIH1cbn1cblxuZXhwb3J0IHsgUGxheWVyIH1cbiIsImNsYXNzIFNoaXAge1xuICBjb25zdHJ1Y3RvcihsZW5ndGgsIGhpdE51bWJlciA9IDAsIG9yaWVudGF0aW9uID0gdGhpcy5vcmllbnRhdGlvbigpKSB7XG4gICAgdGhpcy5sZW5ndGggPSBsZW5ndGhcbiAgICB0aGlzLmhpdE51bWJlciA9IGhpdE51bWJlclxuICAgIHRoaXMub3JpZW50YXRpb24gPSBvcmllbnRhdGlvblxuICB9XG4gIGhpdCgpIHtcbiAgICB0aGlzLmhpdE51bWJlcisrXG4gIH1cbiAgaXNTdW5rKCkge1xuICAgIGlmICh0aGlzLmxlbmd0aCA8PSB0aGlzLmhpdE51bWJlcikgcmV0dXJuIHRydWVcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuICBvcmllbnRhdGlvbigpIHtcbiAgICByZXR1cm4gTWF0aC5yYW5kb20oKSA8IDAuNSA/ICd2ZXJ0aWNhbCcgOiAnaG9yaXpvbnRhbCdcbiAgfVxufVxuXG5leHBvcnQgeyBTaGlwIH1cbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiYm9keSB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBmb250LWZhbWlseTogJ1JvYm90byBDb25kZW5zZWQnLCBzYW5zLXNlcmlmO1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbn1cXG5oMSB7XFxuICBjb2xvcjogYmxhY2s7XFxuICAtd2Via2l0LXRleHQtZmlsbC1jb2xvcjogd2hpdGU7XFxuICAtd2Via2l0LXRleHQtc3Ryb2tlLXdpZHRoOiAxcHg7XFxuICAtd2Via2l0LXRleHQtc3Ryb2tlLWNvbG9yOiBibGFjaztcXG4gIGZvbnQtc3RyZXRjaDogZXhwYW5kZWQ7XFxufVxcbm1haW4ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXG4gIGZsZXgtd3JhcDogd3JhcDtcXG4gIG92ZXJmbG93OiBhdXRvO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZlZjZlNDtcXG59XFxuXFxuaGVhZGVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBoZWlnaHQ6IDYwcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDBhNzFjO1xcbiAgcGFkZGluZzogMTBweDtcXG4gIGJvcmRlci1ib3R0b206IDNweCBzb2xpZCBibGFjaztcXG4gIHotaW5kZXg6IDE7XFxuICBib3gtc2hhZG93OiAwcHggN3B4IDE0cHggLTRweCByZ2JhKDAsIDAsIDAsIDEpO1xcbn1cXG5cXG5mb290ZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGhlaWdodDogODBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM4YmQzZGQ7XFxuICBwYWRkaW5nOiAxMHB4O1xcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkIGJsYWNrO1xcbiAgYm94LXNoYWRvdzogMHB4IC03cHggMTRweCAtNHB4IHJnYmEoMCwgMCwgMCwgMSk7XFxufVxcblxcbi5hcmVhIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmViYmU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGJvcmRlcjogYmxhY2sgc29saWQgMXB4O1xcbiAgd2lkdGg6IDMwMHB4O1xcbiAgcGFkZGluZzogNXB4O1xcbiAgbWFyZ2luOiAyMHB4O1xcbiAgYm94LXNoYWRvdzogMHB4IDBweCA5cHggNXB4IHJnYmEoMCwgMCwgMCwgMC41KTtcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXG59XFxuXFxuI3BvcHVwIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmViYmU7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDUwJTtcXG4gIGxlZnQ6IDUwJTtcXG4gIHdpZHRoOiAzNTBweDtcXG4gIGhlaWdodDogNjAwcHg7XFxuICBtYXJnaW4tbGVmdDogLTE3NXB4O1xcbiAgbWFyZ2luLXRvcDogLTMwMHB4O1xcbiAgYm94LXNoYWRvdzogMHB4IDBweCA5cHggNXB4IHJnYmEoMCwgMCwgMCwgMC41KTtcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXG4gIGJvcmRlcjogYmxhY2sgc29saWQgMXB4O1xcbiAgcGFkZGluZzogNXB4O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICB6LWluZGV4OiAyO1xcbn1cXG5cXG4jcG9wdXBCdXR0b25BcmVhIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxuICB3aWR0aDogMTAwJTtcXG59XFxuXFxuLmJvYXJkIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBmbGV4LXdyYXA6IHdyYXA7XFxuICB3aWR0aDogMTAwJTtcXG59XFxuXFxuLnBsYXllckNlbGwsXFxuLmNvbXB1dGVyQ2VsbCB7XFxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gIGZsZXg6IDAgOSU7XFxuICB3aWR0aDogMzBweDtcXG4gIGhlaWdodDogMzBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYig3MSwgMjQzLCAyNTUpO1xcbiAgYm9yZGVyLXJhZGl1czogMnB4O1xcbn1cXG5cXG4ucGxheWVyQ2VsbDpob3ZlcixcXG4uY29tcHV0ZXJDZWxsOmhvdmVyLFxcbmJ1dHRvbjpob3ZlciB7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDEuMSk7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbi5wbGF5ZXJDZWxsW2RhdGEtYmVlbi1oaXQ9J3RydWUnXSxcXG4uY29tcHV0ZXJDZWxsW2RhdGEtYmVlbi1oaXQ9J3RydWUnXSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTkwLCAxODksIDE4OSk7XFxufVxcblxcbi5wbGF5ZXJDZWxsW2RhdGEtb2NjdXBpZWQ9J1tvYmplY3QgT2JqZWN0XSddIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyNTUsIDAsIDApO1xcbn1cXG5cXG4ucGxheWVyQ2VsbFtkYXRhLWJlZW4taGl0PSd0cnVlJ10ucGxheWVyQ2VsbFtkYXRhLW9jY3VwaWVkPSdbb2JqZWN0IE9iamVjdF0nXSxcXG4uY29tcHV0ZXJDZWxsW2RhdGEtYmVlbi1oaXQ9J3RydWUnXS5jb21wdXRlckNlbGxbZGF0YS1vY2N1cGllZD0nW29iamVjdCBPYmplY3RdJ10ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxufVxcblxcbiNidXR0b25zIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZWY2ZTQ7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuYnV0dG9uIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwMGE3MWM7XFxuICBib3JkZXI6IG5vbmU7XFxuICBjb2xvcjogd2hpdGU7XFxuICBwYWRkaW5nOiA1cHggMTBweDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIGZvbnQtc2l6ZTogMTZweDtcXG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XFxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXG4gIGJveC1zaGFkb3c6IDBweCAwcHggOXB4IDVweCByZ2JhKDAsIDAsIDAsIDAuNSk7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbiNtYW51YWxCdXR0b24ge1xcbiAgbWFyZ2luLXRvcDogMjBweDtcXG59XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLnNjc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSxrQkFBa0I7RUFDbEIsMkNBQTJDO0VBQzNDLGFBQWE7RUFDYixhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLDhCQUE4QjtBQUNoQztBQUNBO0VBQ0UsWUFBWTtFQUNaLDhCQUE4QjtFQUM5Qiw4QkFBOEI7RUFDOUIsZ0NBQWdDO0VBQ2hDLHNCQUFzQjtBQUN4QjtBQUNBO0VBQ0UsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQiw2QkFBNkI7RUFDN0IsZUFBZTtFQUNmLGNBQWM7RUFDZCxZQUFZO0VBQ1oseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQix1QkFBdUI7RUFDdkIsWUFBWTtFQUNaLHlCQUF5QjtFQUN6QixhQUFhO0VBQ2IsOEJBQThCO0VBQzlCLFVBQVU7RUFDViw4Q0FBOEM7QUFDaEQ7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLHVCQUF1QjtFQUN2QixZQUFZO0VBQ1oseUJBQXlCO0VBQ3pCLGFBQWE7RUFDYiwyQkFBMkI7RUFDM0IsK0NBQStDO0FBQ2pEOztBQUVBO0VBQ0UseUJBQXlCO0VBQ3pCLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtFQUNuQix1QkFBdUI7RUFDdkIsWUFBWTtFQUNaLFlBQVk7RUFDWixZQUFZO0VBQ1osOENBQThDO0VBQzlDLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLHlCQUF5QjtFQUN6QixrQkFBa0I7RUFDbEIsUUFBUTtFQUNSLFNBQVM7RUFDVCxZQUFZO0VBQ1osYUFBYTtFQUNiLG1CQUFtQjtFQUNuQixrQkFBa0I7RUFDbEIsOENBQThDO0VBQzlDLGtCQUFrQjtFQUNsQix1QkFBdUI7RUFDdkIsWUFBWTtFQUNaLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtFQUNuQixVQUFVO0FBQ1o7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLDZCQUE2QjtFQUM3QixXQUFXO0FBQ2I7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLHVCQUF1QjtFQUN2QixlQUFlO0VBQ2YsV0FBVztBQUNiOztBQUVBOztFQUVFLHVCQUF1QjtFQUN2QixVQUFVO0VBQ1YsV0FBVztFQUNYLFlBQVk7RUFDWixtQ0FBbUM7RUFDbkMsa0JBQWtCO0FBQ3BCOztBQUVBOzs7RUFHRSxxQkFBcUI7RUFDckIsZUFBZTtBQUNqQjs7QUFFQTs7RUFFRSxvQ0FBb0M7QUFDdEM7O0FBRUE7RUFDRSxnQ0FBZ0M7QUFDbEM7O0FBRUE7O0VBRUUsdUJBQXVCO0FBQ3pCOztBQUVBO0VBQ0UseUJBQXlCO0VBQ3pCLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsbUJBQW1CO0VBQ25CLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLHlCQUF5QjtFQUN6QixZQUFZO0VBQ1osWUFBWTtFQUNaLGlCQUFpQjtFQUNqQixrQkFBa0I7RUFDbEIscUJBQXFCO0VBQ3JCLHFCQUFxQjtFQUNyQixlQUFlO0VBQ2YsbUJBQW1CO0VBQ25CLHVCQUF1QjtFQUN2QixrQkFBa0I7RUFDbEIsOENBQThDO0VBQzlDLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxnQkFBZ0I7QUFDbEJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiYm9keSB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBmb250LWZhbWlseTogJ1JvYm90byBDb25kZW5zZWQnLCBzYW5zLXNlcmlmO1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbn1cXG5oMSB7XFxuICBjb2xvcjogYmxhY2s7XFxuICAtd2Via2l0LXRleHQtZmlsbC1jb2xvcjogd2hpdGU7XFxuICAtd2Via2l0LXRleHQtc3Ryb2tlLXdpZHRoOiAxcHg7XFxuICAtd2Via2l0LXRleHQtc3Ryb2tlLWNvbG9yOiBibGFjaztcXG4gIGZvbnQtc3RyZXRjaDogZXhwYW5kZWQ7XFxufVxcbm1haW4ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXG4gIGZsZXgtd3JhcDogd3JhcDtcXG4gIG92ZXJmbG93OiBhdXRvO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZlZjZlNDtcXG59XFxuXFxuaGVhZGVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBoZWlnaHQ6IDYwcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDBhNzFjO1xcbiAgcGFkZGluZzogMTBweDtcXG4gIGJvcmRlci1ib3R0b206IDNweCBzb2xpZCBibGFjaztcXG4gIHotaW5kZXg6IDE7XFxuICBib3gtc2hhZG93OiAwcHggN3B4IDE0cHggLTRweCByZ2JhKDAsIDAsIDAsIDEpO1xcbn1cXG5cXG5mb290ZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGhlaWdodDogODBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM4YmQzZGQ7XFxuICBwYWRkaW5nOiAxMHB4O1xcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkIGJsYWNrO1xcbiAgYm94LXNoYWRvdzogMHB4IC03cHggMTRweCAtNHB4IHJnYmEoMCwgMCwgMCwgMSk7XFxufVxcblxcbi5hcmVhIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmViYmU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGJvcmRlcjogYmxhY2sgc29saWQgMXB4O1xcbiAgd2lkdGg6IDMwMHB4O1xcbiAgcGFkZGluZzogNXB4O1xcbiAgbWFyZ2luOiAyMHB4O1xcbiAgYm94LXNoYWRvdzogMHB4IDBweCA5cHggNXB4IHJnYmEoMCwgMCwgMCwgMC41KTtcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXG59XFxuXFxuI3BvcHVwIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmViYmU7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDUwJTtcXG4gIGxlZnQ6IDUwJTtcXG4gIHdpZHRoOiAzNTBweDtcXG4gIGhlaWdodDogNjAwcHg7XFxuICBtYXJnaW4tbGVmdDogLTE3NXB4O1xcbiAgbWFyZ2luLXRvcDogLTMwMHB4O1xcbiAgYm94LXNoYWRvdzogMHB4IDBweCA5cHggNXB4IHJnYmEoMCwgMCwgMCwgMC41KTtcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXG4gIGJvcmRlcjogYmxhY2sgc29saWQgMXB4O1xcbiAgcGFkZGluZzogNXB4O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICB6LWluZGV4OiAyO1xcbn1cXG5cXG4jcG9wdXBCdXR0b25BcmVhIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxuICB3aWR0aDogMTAwJTtcXG59XFxuXFxuLmJvYXJkIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBmbGV4LXdyYXA6IHdyYXA7XFxuICB3aWR0aDogMTAwJTtcXG59XFxuXFxuLnBsYXllckNlbGwsXFxuLmNvbXB1dGVyQ2VsbCB7XFxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gIGZsZXg6IDAgOSU7XFxuICB3aWR0aDogMzBweDtcXG4gIGhlaWdodDogMzBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYig3MSwgMjQzLCAyNTUpO1xcbiAgYm9yZGVyLXJhZGl1czogMnB4O1xcbn1cXG5cXG4ucGxheWVyQ2VsbDpob3ZlcixcXG4uY29tcHV0ZXJDZWxsOmhvdmVyLFxcbmJ1dHRvbjpob3ZlciB7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDEuMSk7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbi5wbGF5ZXJDZWxsW2RhdGEtYmVlbi1oaXQ9J3RydWUnXSxcXG4uY29tcHV0ZXJDZWxsW2RhdGEtYmVlbi1oaXQ9J3RydWUnXSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTkwLCAxODksIDE4OSk7XFxufVxcblxcbi5wbGF5ZXJDZWxsW2RhdGEtb2NjdXBpZWQ9J1tvYmplY3QgT2JqZWN0XSddIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyNTUsIDAsIDApO1xcbn1cXG5cXG4ucGxheWVyQ2VsbFtkYXRhLWJlZW4taGl0PSd0cnVlJ10ucGxheWVyQ2VsbFtkYXRhLW9jY3VwaWVkPSdbb2JqZWN0IE9iamVjdF0nXSxcXG4uY29tcHV0ZXJDZWxsW2RhdGEtYmVlbi1oaXQ9J3RydWUnXS5jb21wdXRlckNlbGxbZGF0YS1vY2N1cGllZD0nW29iamVjdCBPYmplY3RdJ10ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxufVxcblxcbiNidXR0b25zIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZWY2ZTQ7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuYnV0dG9uIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwMGE3MWM7XFxuICBib3JkZXI6IG5vbmU7XFxuICBjb2xvcjogd2hpdGU7XFxuICBwYWRkaW5nOiA1cHggMTBweDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIGZvbnQtc2l6ZTogMTZweDtcXG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XFxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXG4gIGJveC1zaGFkb3c6IDBweCAwcHggOXB4IDVweCByZ2JhKDAsIDAsIDAsIDAuNSk7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbiNtYW51YWxCdXR0b24ge1xcbiAgbWFyZ2luLXRvcDogMjBweDtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdOyAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTsgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcblxuXG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG5cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG5cbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcblxuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblxuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290IHx8IFwiXCIpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cblxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5zY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5zY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsImltcG9ydCAnLi9zdHlsZS5zY3NzJ1xuaW1wb3J0IHsgR2FtZWJvYXJkIH0gZnJvbSAnLi9nYW1lYm9hcmQnXG5pbXBvcnQgeyBQbGF5ZXIgfSBmcm9tICcuL3BsYXllcidcblxuY29uc3QgcGxheWVyQm9hcmQgPSBuZXcgR2FtZWJvYXJkKClcbmNvbnN0IHBsYXllckRpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGxheWVyZGlzcGxheScpXG5cbmNvbnN0IGNvbXB1dGVyQm9hcmQgPSBuZXcgR2FtZWJvYXJkKClcbmNvbnN0IGNvbXB1dGVyRGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjb21wdXRlcmRpc3BsYXknKVxuY29uc3QgY29tcHV0ZXJBSSA9IG5ldyBQbGF5ZXIoKVxuXG5jb21wdXRlckJvYXJkLnJhbmRvbVBsYWNlbWVudCgpXG5cbmZ1bmN0aW9uIHJlbmRlclBsYXllckJvYXJkKCkge1xuICBwbGF5ZXJEaXNwbGF5LmlubmVySFRNTCA9ICcnXG4gIHBsYXllckJvYXJkLmdhbWVCb2FyZC5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgY29uc3QgY2VsbERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgY2VsbERpdi5jbGFzc0xpc3QuYWRkKCdwbGF5ZXJDZWxsJylcbiAgICBjZWxsRGl2LmRhdGFzZXQueCA9IGNlbGwueFxuICAgIGNlbGxEaXYuZGF0YXNldC55ID0gY2VsbC55XG4gICAgY2VsbERpdi5kYXRhc2V0Lm9jY3VwaWVkID0gY2VsbC5vY2N1cGllZFxuICAgIGNlbGxEaXYuZGF0YXNldC5iZWVuSGl0ID0gY2VsbC5iZWVuSGl0XG4gICAgcGxheWVyRGlzcGxheS5hcHBlbmRDaGlsZChjZWxsRGl2KVxuICB9KVxufVxuXG5yZW5kZXJQbGF5ZXJCb2FyZCgpXG5cbmZ1bmN0aW9uIHJlbmRlckNvbXB1dGVyQm9hcmQoKSB7XG4gIGNvbXB1dGVyRGlzcGxheS5pbm5lckhUTUwgPSAnJ1xuICBjb21wdXRlckJvYXJkLmdhbWVCb2FyZC5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgY29uc3QgY2VsbERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgY2VsbERpdi5jbGFzc0xpc3QuYWRkKCdjb21wdXRlckNlbGwnKVxuICAgIGNlbGxEaXYuZGF0YXNldC54ID0gY2VsbC54XG4gICAgY2VsbERpdi5kYXRhc2V0LnkgPSBjZWxsLnlcbiAgICBjZWxsRGl2LmRhdGFzZXQub2NjdXBpZWQgPSBjZWxsLm9jY3VwaWVkXG4gICAgY2VsbERpdi5kYXRhc2V0LmJlZW5IaXQgPSBjZWxsLmJlZW5IaXRcbiAgICBjb21wdXRlckRpc3BsYXkuYXBwZW5kQ2hpbGQoY2VsbERpdilcbiAgfSlcbn1cblxucmVuZGVyQ29tcHV0ZXJCb2FyZCgpXG5cbmZ1bmN0aW9uIHBsYXllclR1cm4oKSB7XG4gIGNvbnN0IGNvbXB1dGVyQm9hcmRDZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb21wdXRlckNlbGwnKVxuICBjb21wdXRlckJvYXJkQ2VsbHMuZm9yRWFjaCgoY2VsbERpdikgPT4ge1xuICAgIGNlbGxEaXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBjb21wdXRlckJvYXJkLnJlY2VpdmVBdHRhY2soW1xuICAgICAgICBOdW1iZXIoY2VsbERpdi5kYXRhc2V0LngpLFxuICAgICAgICBOdW1iZXIoY2VsbERpdi5kYXRhc2V0LnkpLFxuICAgICAgXSlcbiAgICAgIHJlbmRlckNvbXB1dGVyQm9hcmQoKVxuICAgICAgY29tcHV0ZXJBSS5yYW5kb21BdHRhY2socGxheWVyQm9hcmQpXG4gICAgICByZW5kZXJQbGF5ZXJCb2FyZCgpXG4gICAgICBnYW1lTG9vcCgpXG4gICAgfSlcbiAgfSlcbn1cblxuLy9tYWluIGdhbWUgbG9vcFxuXG5mdW5jdGlvbiBnYW1lTG9vcCgpIHtcbiAgaWYgKCFwbGF5ZXJCb2FyZC5mbGVldFN1bmsoKSAmJiAhY29tcHV0ZXJCb2FyZC5mbGVldFN1bmsoKSkge1xuICAgIHBsYXllclR1cm4oKVxuICB9IGVsc2UgaWYgKHBsYXllckJvYXJkLmZsZWV0U3VuaygpKSB7XG4gICAgYWxlcnQoJ1lvdSBMb3NlIScpXG4gIH0gZWxzZSBpZiAoY29tcHV0ZXJCb2FyZC5mbGVldFN1bmsoKSkge1xuICAgIGFsZXJ0KCdZb3UgV2luIScpXG4gIH1cbn1cblxucGxheWVyVHVybigpXG5cbi8vU2hpcCBuYW1lcyBmb3IgbWFudWFsIHBsYWNlbWVudFxubGV0IG1hbnVhbFBsYWNlbWVudERpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxubWFudWFsUGxhY2VtZW50RGlzcGxheS5pZCA9ICdtYW51YWxQbGFjZW1lbnREaXNwbGF5J1xuXG4vL0Nsb25lIHBsYXllciBib2FyZCBmb3IgcGxhY2VtZW50IHBvcHVwXG5sZXQgcGxheWVyRGlzcGxheUNsb25lID0gcGxheWVyRGlzcGxheS5jbG9uZU5vZGUodHJ1ZSlcbmNvbnN0IHBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BvcHVwJylcbnBvcHVwLmFwcGVuZENoaWxkKG1hbnVhbFBsYWNlbWVudERpc3BsYXkpXG5wb3B1cC5hcHBlbmRDaGlsZChwbGF5ZXJEaXNwbGF5Q2xvbmUpXG5cbi8vUG9wdXAgZGl2IGJ1dHRvbiBsaXN0ZW5lcnNcbmNvbnN0IHJhbmRvbUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyYW5kb21CdXR0b24nKVxucmFuZG9tQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBtYW51YWxCdXR0b24uc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICBwbGF5ZXJCb2FyZC5nYW1lQm9hcmQgPSBwbGF5ZXJCb2FyZC5tYWtlR2FtZWJvYXJkKClcbiAgcGxheWVyQm9hcmQucmFuZG9tUGxhY2VtZW50KClcbiAgcmVuZGVyUGxheWVyQm9hcmQoKVxuICBwbGF5ZXJEaXNwbGF5Q2xvbmUuaW5uZXJIVE1MID0gJydcbiAgcGxheWVyRGlzcGxheUNsb25lID0gcGxheWVyRGlzcGxheS5jbG9uZU5vZGUodHJ1ZSlcbiAgcG9wdXAuYXBwZW5kQ2hpbGQocGxheWVyRGlzcGxheUNsb25lKVxuICBwb3B1cC5hcHBlbmRDaGlsZChtYW51YWxCdXR0b24pXG59KVxuY29uc3Qgc3RhcnRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3RhcnRCdXR0b24nKVxuc3RhcnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIGlmIChwbGF5ZXJCb2FyZC5mbGVldFBsYWNlZCgpKSB7XG4gICAgcG9wdXAuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICB9IGVsc2Uge1xuICAgIGFsZXJ0KCdZb3UgbXVzdCBwbGFjZSBhbGwgeW91ciBzaGlwcyEnKVxuICB9XG59KVxuXG4vL0J1dHRvbiBhbmQgYXJyYXlzIHRvIGN5Y2xlIHRocm91Z2ggbWFudWFsIHNoaXAgcGxhY2VtZW50XG5jb25zdCBtYW51YWxCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKVxubWFudWFsQnV0dG9uLmlubmVySFRNTCA9ICcnXG5tYW51YWxCdXR0b24uaWQgPSAnbWFudWFsQnV0dG9uJ1xubWFudWFsQnV0dG9uLnRleHRDb250ZW50ID0gJ01hbnVhbCBTaGlwIFBsYWNlbWVudCdcbnBvcHVwLmFwcGVuZENoaWxkKG1hbnVhbEJ1dHRvbilcblxubGV0IHBsYXllckJvYXJkRmxlZXQgPSBbXG4gIHBsYXllckJvYXJkLmNhcnJpZXIsXG4gIHBsYXllckJvYXJkLmJhdHRsZXNoaXAsXG4gIHBsYXllckJvYXJkLmRlc3Ryb3llcixcbiAgcGxheWVyQm9hcmQuc3VibWFyaW5lLFxuICBwbGF5ZXJCb2FyZC5wYXRyb2xCb2F0LFxuXVxuXG5sZXQgcGxheWVyQm9hcmRGbGVldE5hbWVzID0gW1xuICAnQ2FycmllcicsXG4gICdCYXR0bGVzaGlwJyxcbiAgJ0Rlc3Ryb3llcicsXG4gICdTdWJtYXJpbmUnLFxuICAnUGF0cm9sIEJvYXQnLFxuXVxuXG5mdW5jdGlvbiBtYW51YWxTaGlwQ3ljbGUoKSB7XG4gIG1hbnVhbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICByYW5kb21CdXR0b24uc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICAgIG1hbnVhbFBsYWNlbWVudERpc3BsYXkudGV4dENvbnRlbnQgPSBgUGxhY2UgeW91ciAke3BsYXllckJvYXJkRmxlZXROYW1lc1swXX1gXG4gICAgbGV0IHNoaXAgPSBwbGF5ZXJCb2FyZEZsZWV0WzBdXG4gICAgbGV0IHBsYXllckJvYXJkQ2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucGxheWVyQ2VsbCcpXG4gICAgcGxheWVyQm9hcmRDZWxscy5mb3JFYWNoKChjZWxsRGl2KSA9PiB7XG4gICAgICBjZWxsRGl2LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgIXBsYXllckJvYXJkLnZhbGlkUGxhY2VtZW50KFxuICAgICAgICAgICAgW051bWJlcihjZWxsRGl2LmRhdGFzZXQueCksIE51bWJlcihjZWxsRGl2LmRhdGFzZXQueSldLFxuICAgICAgICAgICAgc2hpcFxuICAgICAgICAgIClcbiAgICAgICAgKSB7XG4gICAgICAgICAgbWFudWFsUGxhY2VtZW50RGlzcGxheS50ZXh0Q29udGVudCA9ICdJbnZhbGlkIHBsYWNlbWVudCwgdHJ5IGFnYWluJ1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgbWFudWFsUGxhY2VtZW50RGlzcGxheS50ZXh0Q29udGVudCA9IGBQbGFjZSB5b3VyICR7cGxheWVyQm9hcmRGbGVldE5hbWVzWzBdfWBcbiAgICAgICAgICB9LCAxMDAwKVxuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIHBsYXllckJvYXJkLnBsYWNlU2hpcChcbiAgICAgICAgICBbTnVtYmVyKGNlbGxEaXYuZGF0YXNldC54KSwgTnVtYmVyKGNlbGxEaXYuZGF0YXNldC55KV0sXG4gICAgICAgICAgc2hpcFxuICAgICAgICApXG4gICAgICAgIHJlbmRlclBsYXllckJvYXJkKClcbiAgICAgICAgcGxheWVyRGlzcGxheUNsb25lLmlubmVySFRNTCA9ICcnXG4gICAgICAgIHBsYXllckRpc3BsYXlDbG9uZSA9IHBsYXllckRpc3BsYXkuY2xvbmVOb2RlKHRydWUpXG4gICAgICAgIHBvcHVwLmFwcGVuZENoaWxkKHBsYXllckRpc3BsYXlDbG9uZSlcbiAgICAgICAgcG9wdXAuYXBwZW5kQ2hpbGQobWFudWFsQnV0dG9uKVxuICAgICAgICBwbGF5ZXJCb2FyZEZsZWV0TmFtZXMuc2hpZnQoKVxuICAgICAgICBwbGF5ZXJCb2FyZEZsZWV0LnNoaWZ0KClcbiAgICAgICAgbWFudWFsQnV0dG9uLnRleHRDb250ZW50ID0gYE5leHQgVXA6ICR7cGxheWVyQm9hcmRGbGVldE5hbWVzWzBdfWBcbiAgICAgICAgaWYgKHBsYXllckJvYXJkRmxlZXROYW1lcy5sZW5ndGggPT0gMCkge1xuICAgICAgICAgIG1hbnVhbEJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gICAgICAgICAgbWFudWFsUGxhY2VtZW50RGlzcGxheS50ZXh0Q29udGVudCA9ICdSZWFkeSB0byBzdGFydCEnXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcbiAgfSlcbn1cbm1hbnVhbFNoaXBDeWNsZSgpXG4iXSwibmFtZXMiOlsiU2hpcCIsIkNlbGwiLCJjb25zdHJ1Y3RvciIsIngiLCJ5Iiwib2NjdXBpZWQiLCJiZWVuSGl0IiwiR2FtZWJvYXJkIiwiZ2FtZUJvYXJkIiwibWFrZUdhbWVib2FyZCIsImNhcnJpZXIiLCJiYXR0bGVzaGlwIiwiZGVzdHJveWVyIiwic3VibWFyaW5lIiwicGF0cm9sQm9hdCIsImkiLCJqIiwicHVzaCIsInBsYWNlU2hpcCIsImNvb3JkaW5hdGVzIiwic2hpcCIsIm9yaWVudGF0aW9uIiwidmFsaWRQbGFjZW1lbnQiLCJsZW5ndGgiLCJ0ZW1wQ29vcmRzIiwiZmluZENlbGwiLCJ1bmRlZmluZWQiLCJmaW5kIiwib2JqIiwicmVjZWl2ZUF0dGFjayIsImhpdCIsImZsZWV0U3VuayIsImlzU3VuayIsInJhbmRvbVBsYWNlbWVudCIsImZsZWV0IiwiYmluZGVyIiwidHJ5UGxhY2VtZW50IiwicmFuZG9tQ2VsbCIsInJhbmRvbVhZIiwic2hpZnQiLCJtaW4iLCJtYXgiLCJyYW5kb21YIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwicmFuZG9tWSIsImZsZWV0UGxhY2VkIiwiY291bnRlciIsIm1hbnVhbFBsYWNlbWVudCIsImRpdiIsIm1hbnVhbFBsYWNlbWVudEVhY2giLCJQbGF5ZXIiLCJuYW1lIiwicmFuZG9tQXR0YWNrIiwiaGl0TnVtYmVyIiwicGxheWVyQm9hcmQiLCJwbGF5ZXJEaXNwbGF5IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiY29tcHV0ZXJCb2FyZCIsImNvbXB1dGVyRGlzcGxheSIsImNvbXB1dGVyQUkiLCJyZW5kZXJQbGF5ZXJCb2FyZCIsImlubmVySFRNTCIsImZvckVhY2giLCJjZWxsIiwiY2VsbERpdiIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJkYXRhc2V0IiwiYXBwZW5kQ2hpbGQiLCJyZW5kZXJDb21wdXRlckJvYXJkIiwicGxheWVyVHVybiIsImNvbXB1dGVyQm9hcmRDZWxscyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJhZGRFdmVudExpc3RlbmVyIiwiTnVtYmVyIiwiZ2FtZUxvb3AiLCJhbGVydCIsIm1hbnVhbFBsYWNlbWVudERpc3BsYXkiLCJpZCIsInBsYXllckRpc3BsYXlDbG9uZSIsImNsb25lTm9kZSIsInBvcHVwIiwicmFuZG9tQnV0dG9uIiwibWFudWFsQnV0dG9uIiwic3R5bGUiLCJkaXNwbGF5Iiwic3RhcnRCdXR0b24iLCJ0ZXh0Q29udGVudCIsInBsYXllckJvYXJkRmxlZXQiLCJwbGF5ZXJCb2FyZEZsZWV0TmFtZXMiLCJtYW51YWxTaGlwQ3ljbGUiLCJwbGF5ZXJCb2FyZENlbGxzIiwic2V0VGltZW91dCJdLCJzb3VyY2VSb290IjoiIn0=