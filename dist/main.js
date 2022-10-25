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
___CSS_LOADER_EXPORT___.push([module.id, "body {\n  font-family: 'Roboto Condensed', sans-serif;\n  height: 100vh;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n}\nh1 {\n  color: black;\n  -webkit-text-fill-color: white;\n  -webkit-text-stroke-width: 1px;\n  -webkit-text-stroke-color: black;\n  font-stretch: expanded;\n}\nmain {\n  display: flex;\n  align-items: center;\n  justify-content: space-around;\n  flex-wrap: wrap;\n  overflow: auto;\n  height: 100%;\n  background-color: #fef6e4;\n}\n\nheader {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 60px;\n  background-color: #00a71c;\n  padding: 10px;\n  border-bottom: 3px solid black;\n  z-index: 1;\n  box-shadow: 0px 7px 14px -4px rgba(0, 0, 0, 1);\n}\n\nfooter {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 80px;\n  background-color: #8bd3dd;\n  padding: 10px;\n  border-top: 1px solid black;\n  box-shadow: 0px -7px 14px -4px rgba(0, 0, 0, 1);\n}\n\n.area {\n  background-color: #ffebbe;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  border: black solid 1px;\n  width: 300px;\n  padding: 5px;\n  margin: 20px;\n  box-shadow: 0px 0px 9px 5px rgba(0, 0, 0, 0.5);\n  border-radius: 5px;\n}\n\n.board {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-wrap: wrap;\n  width: 100%;\n}\n\n.playerCell,\n.computerCell {\n  border: 1px solid black;\n  flex: 0 9%;\n  width: 30px;\n  height: 30px;\n  background-color: rgb(71, 243, 255);\n  border-radius: 2px;\n}\n\n.playerCell:hover,\n.computerCell:hover,\nbutton:hover {\n  transform: scale(1.1);\n  cursor: pointer;\n}\n\n.playerCell[data-been-hit='true'],\n.computerCell[data-been-hit='true'] {\n  background-color: rgb(190, 189, 189);\n}\n\n.playerCell[data-occupied='[object Object]'] {\n  background-color: rgb(255, 0, 0);\n}\n\n.playerCell[data-been-hit='true'].playerCell[data-occupied='[object Object]'],\n.computerCell[data-been-hit='true'].computerCell[data-occupied='[object Object]'] {\n  background-color: black;\n}\n\n#buttons {\n  background-color: #fef6e4;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n}\n\nbutton {\n  background-color: #00a71c;\n  border: none;\n  color: white;\n  padding: 15px 32px;\n  text-align: center;\n  text-decoration: none;\n  display: inline-block;\n  font-size: 16px;\n  margin-bottom: 20px;\n  border: 1px solid black;\n  border-radius: 5px;\n  box-shadow: 0px 0px 9px 5px rgba(0, 0, 0, 0.5);\n  cursor: pointer;\n}\n", "",{"version":3,"sources":["webpack://./src/style.scss"],"names":[],"mappings":"AAAA;EACE,2CAA2C;EAC3C,aAAa;EACb,aAAa;EACb,sBAAsB;EACtB,8BAA8B;AAChC;AACA;EACE,YAAY;EACZ,8BAA8B;EAC9B,8BAA8B;EAC9B,gCAAgC;EAChC,sBAAsB;AACxB;AACA;EACE,aAAa;EACb,mBAAmB;EACnB,6BAA6B;EAC7B,eAAe;EACf,cAAc;EACd,YAAY;EACZ,yBAAyB;AAC3B;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,YAAY;EACZ,yBAAyB;EACzB,aAAa;EACb,8BAA8B;EAC9B,UAAU;EACV,8CAA8C;AAChD;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,YAAY;EACZ,yBAAyB;EACzB,aAAa;EACb,2BAA2B;EAC3B,+CAA+C;AACjD;;AAEA;EACE,yBAAyB;EACzB,aAAa;EACb,sBAAsB;EACtB,uBAAuB;EACvB,mBAAmB;EACnB,uBAAuB;EACvB,YAAY;EACZ,YAAY;EACZ,YAAY;EACZ,8CAA8C;EAC9C,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,eAAe;EACf,WAAW;AACb;;AAEA;;EAEE,uBAAuB;EACvB,UAAU;EACV,WAAW;EACX,YAAY;EACZ,mCAAmC;EACnC,kBAAkB;AACpB;;AAEA;;;EAGE,qBAAqB;EACrB,eAAe;AACjB;;AAEA;;EAEE,oCAAoC;AACtC;;AAEA;EACE,gCAAgC;AAClC;;AAEA;;EAEE,uBAAuB;AACzB;;AAEA;EACE,yBAAyB;EACzB,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,uBAAuB;AACzB;;AAEA;EACE,yBAAyB;EACzB,YAAY;EACZ,YAAY;EACZ,kBAAkB;EAClB,kBAAkB;EAClB,qBAAqB;EACrB,qBAAqB;EACrB,eAAe;EACf,mBAAmB;EACnB,uBAAuB;EACvB,kBAAkB;EAClB,8CAA8C;EAC9C,eAAe;AACjB","sourcesContent":["body {\n  font-family: 'Roboto Condensed', sans-serif;\n  height: 100vh;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n}\nh1 {\n  color: black;\n  -webkit-text-fill-color: white;\n  -webkit-text-stroke-width: 1px;\n  -webkit-text-stroke-color: black;\n  font-stretch: expanded;\n}\nmain {\n  display: flex;\n  align-items: center;\n  justify-content: space-around;\n  flex-wrap: wrap;\n  overflow: auto;\n  height: 100%;\n  background-color: #fef6e4;\n}\n\nheader {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 60px;\n  background-color: #00a71c;\n  padding: 10px;\n  border-bottom: 3px solid black;\n  z-index: 1;\n  box-shadow: 0px 7px 14px -4px rgba(0, 0, 0, 1);\n}\n\nfooter {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 80px;\n  background-color: #8bd3dd;\n  padding: 10px;\n  border-top: 1px solid black;\n  box-shadow: 0px -7px 14px -4px rgba(0, 0, 0, 1);\n}\n\n.area {\n  background-color: #ffebbe;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  border: black solid 1px;\n  width: 300px;\n  padding: 5px;\n  margin: 20px;\n  box-shadow: 0px 0px 9px 5px rgba(0, 0, 0, 0.5);\n  border-radius: 5px;\n}\n\n.board {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-wrap: wrap;\n  width: 100%;\n}\n\n.playerCell,\n.computerCell {\n  border: 1px solid black;\n  flex: 0 9%;\n  width: 30px;\n  height: 30px;\n  background-color: rgb(71, 243, 255);\n  border-radius: 2px;\n}\n\n.playerCell:hover,\n.computerCell:hover,\nbutton:hover {\n  transform: scale(1.1);\n  cursor: pointer;\n}\n\n.playerCell[data-been-hit='true'],\n.computerCell[data-been-hit='true'] {\n  background-color: rgb(190, 189, 189);\n}\n\n.playerCell[data-occupied='[object Object]'] {\n  background-color: rgb(255, 0, 0);\n}\n\n.playerCell[data-been-hit='true'].playerCell[data-occupied='[object Object]'],\n.computerCell[data-been-hit='true'].computerCell[data-occupied='[object Object]'] {\n  background-color: black;\n}\n\n#buttons {\n  background-color: #fef6e4;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n}\n\nbutton {\n  background-color: #00a71c;\n  border: none;\n  color: white;\n  padding: 15px 32px;\n  text-align: center;\n  text-decoration: none;\n  display: inline-block;\n  font-size: 16px;\n  margin-bottom: 20px;\n  border: 1px solid black;\n  border-radius: 5px;\n  box-shadow: 0px 0px 9px 5px rgba(0, 0, 0, 0.5);\n  cursor: pointer;\n}\n"],"sourceRoot":""}]);
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
playerBoard.randomPlacement();
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
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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dHRsZXNoaXBqcy8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcGpzLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcGpzLy4vc3JjL3N0eWxlLnNjc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcGpzLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwanMvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwanMvLi9zcmMvc3R5bGUuc2Nzcz84NDZhIiwid2VicGFjazovL2JhdHRsZXNoaXBqcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwanMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBqcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwanMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcGpzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcGpzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcGpzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXBqcy93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwanMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXBqcy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXBqcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXBqcy93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcGpzLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNoaXAgfSBmcm9tICcuL3NoaXAnXG5cbmNsYXNzIENlbGwge1xuICBjb25zdHJ1Y3Rvcih4LCB5LCBvY2N1cGllZCA9IG51bGwsIGJlZW5IaXQgPSBmYWxzZSkge1xuICAgIHRoaXMueCA9IHhcbiAgICB0aGlzLnkgPSB5XG4gICAgdGhpcy5vY2N1cGllZCA9IG9jY3VwaWVkXG4gICAgdGhpcy5iZWVuSGl0ID0gYmVlbkhpdFxuICB9XG59XG5cbmNsYXNzIEdhbWVib2FyZCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuZ2FtZUJvYXJkID0gdGhpcy5nYW1lQm9hcmQgfHwgdGhpcy5tYWtlR2FtZWJvYXJkKClcbiAgICB0aGlzLmNhcnJpZXIgPSB0aGlzLmNhcnJpZXIgfHwgbmV3IFNoaXAoNSlcbiAgICB0aGlzLmJhdHRsZXNoaXAgPSB0aGlzLmJhdHRsZXNoaXAgfHwgbmV3IFNoaXAoNClcbiAgICB0aGlzLmRlc3Ryb3llciA9IHRoaXMuZGVzdHJveWVyIHx8IG5ldyBTaGlwKDMpXG4gICAgdGhpcy5zdWJtYXJpbmUgPSB0aGlzLnN1Ym1hcmluZSB8fCBuZXcgU2hpcCgzKVxuICAgIHRoaXMucGF0cm9sQm9hdCA9IHRoaXMucGF0cm9sQm9hdCB8fCBuZXcgU2hpcCgyKVxuICB9XG5cbiAgbWFrZUdhbWVib2FyZCgpIHtcbiAgICBsZXQgZ2FtZUJvYXJkID0gW11cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgICBnYW1lQm9hcmQucHVzaChuZXcgQ2VsbChpLCBqKSlcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGdhbWVCb2FyZFxuICB9XG4gIHBsYWNlU2hpcChjb29yZGluYXRlcywgc2hpcCkge1xuICAgIGlmIChzaGlwLm9yaWVudGF0aW9uID09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgIGlmICh0aGlzLnZhbGlkUGxhY2VtZW50KGNvb3JkaW5hdGVzLCBzaGlwKSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBsZXQgdGVtcENvb3JkcyA9IFtjb29yZGluYXRlc1swXSArIGksIGNvb3JkaW5hdGVzWzFdXVxuICAgICAgICAgIHRoaXMuZmluZENlbGwodGVtcENvb3Jkcykub2NjdXBpZWQgPSBzaGlwXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMudmFsaWRQbGFjZW1lbnQoY29vcmRpbmF0ZXMsIHNoaXApKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGxldCB0ZW1wQ29vcmRzID0gW2Nvb3JkaW5hdGVzWzBdLCBjb29yZGluYXRlc1sxXSArIGldXG4gICAgICAgICAgdGhpcy5maW5kQ2VsbCh0ZW1wQ29vcmRzKS5vY2N1cGllZCA9IHNoaXBcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICB2YWxpZFBsYWNlbWVudChjb29yZGluYXRlcywgc2hpcCkge1xuICAgIGlmIChzaGlwLm9yaWVudGF0aW9uID09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgdGVtcENvb3JkcyA9IFtjb29yZGluYXRlc1swXSArIGksIGNvb3JkaW5hdGVzWzFdXVxuICAgICAgICBpZiAoXG4gICAgICAgICAgdGhpcy5maW5kQ2VsbCh0ZW1wQ29vcmRzKSA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICB0aGlzLmZpbmRDZWxsKHRlbXBDb29yZHMpLm9jY3VwaWVkICE9PSBudWxsXG4gICAgICAgICkge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IHRlbXBDb29yZHMgPSBbY29vcmRpbmF0ZXNbMF0sIGNvb3JkaW5hdGVzWzFdICsgaV1cbiAgICAgICAgaWYgKFxuICAgICAgICAgIHRoaXMuZmluZENlbGwodGVtcENvb3JkcykgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgdGhpcy5maW5kQ2VsbCh0ZW1wQ29vcmRzKS5vY2N1cGllZCAhPT0gbnVsbFxuICAgICAgICApIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gIH1cbiAgZmluZENlbGwoY29vcmRpbmF0ZXMpIHtcbiAgICByZXR1cm4gdGhpcy5nYW1lQm9hcmQuZmluZChcbiAgICAgIChvYmopID0+IG9iai54ID09PSBjb29yZGluYXRlc1swXSAmJiBvYmoueSA9PT0gY29vcmRpbmF0ZXNbMV1cbiAgICApXG4gIH1cbiAgcmVjZWl2ZUF0dGFjayhjb29yZGluYXRlcykge1xuICAgIGlmICh0aGlzLmZpbmRDZWxsKGNvb3JkaW5hdGVzKS5iZWVuSGl0ID09PSB0cnVlKSByZXR1cm4gZmFsc2VcbiAgICB0aGlzLmZpbmRDZWxsKGNvb3JkaW5hdGVzKS5iZWVuSGl0ID0gdHJ1ZVxuICAgIGlmICh0aGlzLmZpbmRDZWxsKGNvb3JkaW5hdGVzKS5vY2N1cGllZCAhPT0gbnVsbClcbiAgICAgIHRoaXMuZmluZENlbGwoY29vcmRpbmF0ZXMpLm9jY3VwaWVkLmhpdCgpXG4gIH1cbiAgZmxlZXRTdW5rKCkge1xuICAgIGlmIChcbiAgICAgIHRoaXMuY2Fycmllci5pc1N1bmsoKSAmJlxuICAgICAgdGhpcy5iYXR0bGVzaGlwLmlzU3VuaygpICYmXG4gICAgICB0aGlzLmRlc3Ryb3llci5pc1N1bmsoKSAmJlxuICAgICAgdGhpcy5zdWJtYXJpbmUuaXNTdW5rKCkgJiZcbiAgICAgIHRoaXMucGF0cm9sQm9hdC5pc1N1bmsoKVxuICAgICkge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbiAgcmFuZG9tUGxhY2VtZW50KCkge1xuICAgIGxldCBmbGVldCA9IFtcbiAgICAgIHRoaXMuY2FycmllcixcbiAgICAgIHRoaXMuYmF0dGxlc2hpcCxcbiAgICAgIHRoaXMuZGVzdHJveWVyLFxuICAgICAgdGhpcy5zdWJtYXJpbmUsXG4gICAgICB0aGlzLnBhdHJvbEJvYXQsXG4gICAgXVxuICAgIGxldCBiaW5kZXIgPSB0aGlzXG4gICAgZnVuY3Rpb24gdHJ5UGxhY2VtZW50KGZsZWV0KSB7XG4gICAgICBpZiAoZmxlZXQubGVuZ3RoID09PSAwKSByZXR1cm5cbiAgICAgIGxldCByYW5kb21DZWxsID0gYmluZGVyLmZpbmRDZWxsKGJpbmRlci5yYW5kb21YWSgpKVxuICAgICAgaWYgKGJpbmRlci52YWxpZFBsYWNlbWVudChbcmFuZG9tQ2VsbC54LCByYW5kb21DZWxsLnldLCBmbGVldFswXSkpIHtcbiAgICAgICAgYmluZGVyLnBsYWNlU2hpcChbcmFuZG9tQ2VsbC54LCByYW5kb21DZWxsLnldLCBmbGVldFswXSlcbiAgICAgICAgZmxlZXQuc2hpZnQoKVxuICAgICAgICB0cnlQbGFjZW1lbnQoZmxlZXQpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0cnlQbGFjZW1lbnQoZmxlZXQpXG4gICAgICB9XG4gICAgfVxuICAgIHRyeVBsYWNlbWVudChmbGVldClcbiAgfVxuICByYW5kb21YWShtaW4gPSAwLCBtYXggPSA5KSB7XG4gICAgY29uc3QgcmFuZG9tWCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSArIG1pbilcbiAgICBjb25zdCByYW5kb21ZID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpICsgbWluKVxuICAgIHJldHVybiBbcmFuZG9tWCwgcmFuZG9tWV1cbiAgfVxufVxuXG5leHBvcnQgeyBHYW1lYm9hcmQgfVxuIiwiY2xhc3MgUGxheWVyIHtcbiAgY29uc3RydWN0b3IobmFtZSA9ICdDb21wdXRlcicpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lXG4gIH1cbiAgcmFuZG9tQXR0YWNrKGdhbWVCb2FyZCkge1xuICAgIGxldCByYW5kb21DZWxsID0gZ2FtZUJvYXJkLmZpbmRDZWxsKHRoaXMucmFuZG9tWFkoKSlcbiAgICBpZiAocmFuZG9tQ2VsbC5iZWVuSGl0ID09IGZhbHNlKSB7XG4gICAgICByYW5kb21DZWxsLmJlZW5IaXQgPSB0cnVlXG4gICAgICBpZiAocmFuZG9tQ2VsbC5vY2N1cGllZCAhPT0gbnVsbCkge1xuICAgICAgICByYW5kb21DZWxsLm9jY3VwaWVkLmhpdCgpXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmFuZG9tQXR0YWNrKGdhbWVCb2FyZClcbiAgICB9XG4gIH1cbiAgcmFuZG9tWFkobWluID0gMCwgbWF4ID0gOSkge1xuICAgIGNvbnN0IHJhbmRvbVggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkgKyBtaW4pXG4gICAgY29uc3QgcmFuZG9tWSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSArIG1pbilcbiAgICByZXR1cm4gW3JhbmRvbVgsIHJhbmRvbVldXG4gIH1cbn1cblxuZXhwb3J0IHsgUGxheWVyIH1cbiIsImNsYXNzIFNoaXAge1xuICBjb25zdHJ1Y3RvcihsZW5ndGgsIGhpdE51bWJlciA9IDAsIG9yaWVudGF0aW9uID0gdGhpcy5vcmllbnRhdGlvbigpKSB7XG4gICAgdGhpcy5sZW5ndGggPSBsZW5ndGhcbiAgICB0aGlzLmhpdE51bWJlciA9IGhpdE51bWJlclxuICAgIHRoaXMub3JpZW50YXRpb24gPSBvcmllbnRhdGlvblxuICB9XG4gIGhpdCgpIHtcbiAgICB0aGlzLmhpdE51bWJlcisrXG4gIH1cbiAgaXNTdW5rKCkge1xuICAgIGlmICh0aGlzLmxlbmd0aCA8PSB0aGlzLmhpdE51bWJlcikgcmV0dXJuIHRydWVcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuICBvcmllbnRhdGlvbigpIHtcbiAgICByZXR1cm4gTWF0aC5yYW5kb20oKSA8IDAuNSA/ICd2ZXJ0aWNhbCcgOiAnaG9yaXpvbnRhbCdcbiAgfVxufVxuXG5leHBvcnQgeyBTaGlwIH1cbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiYm9keSB7XFxuICBmb250LWZhbWlseTogJ1JvYm90byBDb25kZW5zZWQnLCBzYW5zLXNlcmlmO1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbn1cXG5oMSB7XFxuICBjb2xvcjogYmxhY2s7XFxuICAtd2Via2l0LXRleHQtZmlsbC1jb2xvcjogd2hpdGU7XFxuICAtd2Via2l0LXRleHQtc3Ryb2tlLXdpZHRoOiAxcHg7XFxuICAtd2Via2l0LXRleHQtc3Ryb2tlLWNvbG9yOiBibGFjaztcXG4gIGZvbnQtc3RyZXRjaDogZXhwYW5kZWQ7XFxufVxcbm1haW4ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXG4gIGZsZXgtd3JhcDogd3JhcDtcXG4gIG92ZXJmbG93OiBhdXRvO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZlZjZlNDtcXG59XFxuXFxuaGVhZGVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBoZWlnaHQ6IDYwcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDBhNzFjO1xcbiAgcGFkZGluZzogMTBweDtcXG4gIGJvcmRlci1ib3R0b206IDNweCBzb2xpZCBibGFjaztcXG4gIHotaW5kZXg6IDE7XFxuICBib3gtc2hhZG93OiAwcHggN3B4IDE0cHggLTRweCByZ2JhKDAsIDAsIDAsIDEpO1xcbn1cXG5cXG5mb290ZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGhlaWdodDogODBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM4YmQzZGQ7XFxuICBwYWRkaW5nOiAxMHB4O1xcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkIGJsYWNrO1xcbiAgYm94LXNoYWRvdzogMHB4IC03cHggMTRweCAtNHB4IHJnYmEoMCwgMCwgMCwgMSk7XFxufVxcblxcbi5hcmVhIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmViYmU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGJvcmRlcjogYmxhY2sgc29saWQgMXB4O1xcbiAgd2lkdGg6IDMwMHB4O1xcbiAgcGFkZGluZzogNXB4O1xcbiAgbWFyZ2luOiAyMHB4O1xcbiAgYm94LXNoYWRvdzogMHB4IDBweCA5cHggNXB4IHJnYmEoMCwgMCwgMCwgMC41KTtcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXG59XFxuXFxuLmJvYXJkIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBmbGV4LXdyYXA6IHdyYXA7XFxuICB3aWR0aDogMTAwJTtcXG59XFxuXFxuLnBsYXllckNlbGwsXFxuLmNvbXB1dGVyQ2VsbCB7XFxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gIGZsZXg6IDAgOSU7XFxuICB3aWR0aDogMzBweDtcXG4gIGhlaWdodDogMzBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYig3MSwgMjQzLCAyNTUpO1xcbiAgYm9yZGVyLXJhZGl1czogMnB4O1xcbn1cXG5cXG4ucGxheWVyQ2VsbDpob3ZlcixcXG4uY29tcHV0ZXJDZWxsOmhvdmVyLFxcbmJ1dHRvbjpob3ZlciB7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDEuMSk7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbi5wbGF5ZXJDZWxsW2RhdGEtYmVlbi1oaXQ9J3RydWUnXSxcXG4uY29tcHV0ZXJDZWxsW2RhdGEtYmVlbi1oaXQ9J3RydWUnXSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTkwLCAxODksIDE4OSk7XFxufVxcblxcbi5wbGF5ZXJDZWxsW2RhdGEtb2NjdXBpZWQ9J1tvYmplY3QgT2JqZWN0XSddIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyNTUsIDAsIDApO1xcbn1cXG5cXG4ucGxheWVyQ2VsbFtkYXRhLWJlZW4taGl0PSd0cnVlJ10ucGxheWVyQ2VsbFtkYXRhLW9jY3VwaWVkPSdbb2JqZWN0IE9iamVjdF0nXSxcXG4uY29tcHV0ZXJDZWxsW2RhdGEtYmVlbi1oaXQ9J3RydWUnXS5jb21wdXRlckNlbGxbZGF0YS1vY2N1cGllZD0nW29iamVjdCBPYmplY3RdJ10ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxufVxcblxcbiNidXR0b25zIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZWY2ZTQ7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuYnV0dG9uIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwMGE3MWM7XFxuICBib3JkZXI6IG5vbmU7XFxuICBjb2xvcjogd2hpdGU7XFxuICBwYWRkaW5nOiAxNXB4IDMycHg7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBmb250LXNpemU6IDE2cHg7XFxuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xcbiAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICBib3gtc2hhZG93OiAwcHggMHB4IDlweCA1cHggcmdiYSgwLCAwLCAwLCAwLjUpO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuc2Nzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLDJDQUEyQztFQUMzQyxhQUFhO0VBQ2IsYUFBYTtFQUNiLHNCQUFzQjtFQUN0Qiw4QkFBOEI7QUFDaEM7QUFDQTtFQUNFLFlBQVk7RUFDWiw4QkFBOEI7RUFDOUIsOEJBQThCO0VBQzlCLGdDQUFnQztFQUNoQyxzQkFBc0I7QUFDeEI7QUFDQTtFQUNFLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsNkJBQTZCO0VBQzdCLGVBQWU7RUFDZixjQUFjO0VBQ2QsWUFBWTtFQUNaLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsdUJBQXVCO0VBQ3ZCLFlBQVk7RUFDWix5QkFBeUI7RUFDekIsYUFBYTtFQUNiLDhCQUE4QjtFQUM5QixVQUFVO0VBQ1YsOENBQThDO0FBQ2hEOztBQUVBO0VBQ0UsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQix1QkFBdUI7RUFDdkIsWUFBWTtFQUNaLHlCQUF5QjtFQUN6QixhQUFhO0VBQ2IsMkJBQTJCO0VBQzNCLCtDQUErQztBQUNqRDs7QUFFQTtFQUNFLHlCQUF5QjtFQUN6QixhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLHVCQUF1QjtFQUN2QixtQkFBbUI7RUFDbkIsdUJBQXVCO0VBQ3ZCLFlBQVk7RUFDWixZQUFZO0VBQ1osWUFBWTtFQUNaLDhDQUE4QztFQUM5QyxrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLHVCQUF1QjtFQUN2QixlQUFlO0VBQ2YsV0FBVztBQUNiOztBQUVBOztFQUVFLHVCQUF1QjtFQUN2QixVQUFVO0VBQ1YsV0FBVztFQUNYLFlBQVk7RUFDWixtQ0FBbUM7RUFDbkMsa0JBQWtCO0FBQ3BCOztBQUVBOzs7RUFHRSxxQkFBcUI7RUFDckIsZUFBZTtBQUNqQjs7QUFFQTs7RUFFRSxvQ0FBb0M7QUFDdEM7O0FBRUE7RUFDRSxnQ0FBZ0M7QUFDbEM7O0FBRUE7O0VBRUUsdUJBQXVCO0FBQ3pCOztBQUVBO0VBQ0UseUJBQXlCO0VBQ3pCLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsbUJBQW1CO0VBQ25CLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLHlCQUF5QjtFQUN6QixZQUFZO0VBQ1osWUFBWTtFQUNaLGtCQUFrQjtFQUNsQixrQkFBa0I7RUFDbEIscUJBQXFCO0VBQ3JCLHFCQUFxQjtFQUNyQixlQUFlO0VBQ2YsbUJBQW1CO0VBQ25CLHVCQUF1QjtFQUN2QixrQkFBa0I7RUFDbEIsOENBQThDO0VBQzlDLGVBQWU7QUFDakJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiYm9keSB7XFxuICBmb250LWZhbWlseTogJ1JvYm90byBDb25kZW5zZWQnLCBzYW5zLXNlcmlmO1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbn1cXG5oMSB7XFxuICBjb2xvcjogYmxhY2s7XFxuICAtd2Via2l0LXRleHQtZmlsbC1jb2xvcjogd2hpdGU7XFxuICAtd2Via2l0LXRleHQtc3Ryb2tlLXdpZHRoOiAxcHg7XFxuICAtd2Via2l0LXRleHQtc3Ryb2tlLWNvbG9yOiBibGFjaztcXG4gIGZvbnQtc3RyZXRjaDogZXhwYW5kZWQ7XFxufVxcbm1haW4ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXG4gIGZsZXgtd3JhcDogd3JhcDtcXG4gIG92ZXJmbG93OiBhdXRvO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZlZjZlNDtcXG59XFxuXFxuaGVhZGVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBoZWlnaHQ6IDYwcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDBhNzFjO1xcbiAgcGFkZGluZzogMTBweDtcXG4gIGJvcmRlci1ib3R0b206IDNweCBzb2xpZCBibGFjaztcXG4gIHotaW5kZXg6IDE7XFxuICBib3gtc2hhZG93OiAwcHggN3B4IDE0cHggLTRweCByZ2JhKDAsIDAsIDAsIDEpO1xcbn1cXG5cXG5mb290ZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGhlaWdodDogODBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM4YmQzZGQ7XFxuICBwYWRkaW5nOiAxMHB4O1xcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkIGJsYWNrO1xcbiAgYm94LXNoYWRvdzogMHB4IC03cHggMTRweCAtNHB4IHJnYmEoMCwgMCwgMCwgMSk7XFxufVxcblxcbi5hcmVhIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmViYmU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGJvcmRlcjogYmxhY2sgc29saWQgMXB4O1xcbiAgd2lkdGg6IDMwMHB4O1xcbiAgcGFkZGluZzogNXB4O1xcbiAgbWFyZ2luOiAyMHB4O1xcbiAgYm94LXNoYWRvdzogMHB4IDBweCA5cHggNXB4IHJnYmEoMCwgMCwgMCwgMC41KTtcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXG59XFxuXFxuLmJvYXJkIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBmbGV4LXdyYXA6IHdyYXA7XFxuICB3aWR0aDogMTAwJTtcXG59XFxuXFxuLnBsYXllckNlbGwsXFxuLmNvbXB1dGVyQ2VsbCB7XFxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gIGZsZXg6IDAgOSU7XFxuICB3aWR0aDogMzBweDtcXG4gIGhlaWdodDogMzBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYig3MSwgMjQzLCAyNTUpO1xcbiAgYm9yZGVyLXJhZGl1czogMnB4O1xcbn1cXG5cXG4ucGxheWVyQ2VsbDpob3ZlcixcXG4uY29tcHV0ZXJDZWxsOmhvdmVyLFxcbmJ1dHRvbjpob3ZlciB7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDEuMSk7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbi5wbGF5ZXJDZWxsW2RhdGEtYmVlbi1oaXQ9J3RydWUnXSxcXG4uY29tcHV0ZXJDZWxsW2RhdGEtYmVlbi1oaXQ9J3RydWUnXSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTkwLCAxODksIDE4OSk7XFxufVxcblxcbi5wbGF5ZXJDZWxsW2RhdGEtb2NjdXBpZWQ9J1tvYmplY3QgT2JqZWN0XSddIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyNTUsIDAsIDApO1xcbn1cXG5cXG4ucGxheWVyQ2VsbFtkYXRhLWJlZW4taGl0PSd0cnVlJ10ucGxheWVyQ2VsbFtkYXRhLW9jY3VwaWVkPSdbb2JqZWN0IE9iamVjdF0nXSxcXG4uY29tcHV0ZXJDZWxsW2RhdGEtYmVlbi1oaXQ9J3RydWUnXS5jb21wdXRlckNlbGxbZGF0YS1vY2N1cGllZD0nW29iamVjdCBPYmplY3RdJ10ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxufVxcblxcbiNidXR0b25zIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZWY2ZTQ7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuYnV0dG9uIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwMGE3MWM7XFxuICBib3JkZXI6IG5vbmU7XFxuICBjb2xvcjogd2hpdGU7XFxuICBwYWRkaW5nOiAxNXB4IDMycHg7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBmb250LXNpemU6IDE2cHg7XFxuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xcbiAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICBib3gtc2hhZG93OiAwcHggMHB4IDlweCA1cHggcmdiYSgwLCAwLCAwLCAwLjUpO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcblxuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuXG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgXCJcIikuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLnNjc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLnNjc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcblxuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gdXBkYXRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cblxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuXG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cblxuICBjc3MgKz0gb2JqLmNzcztcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0ICcuL3N0eWxlLnNjc3MnXG5pbXBvcnQgeyBHYW1lYm9hcmQgfSBmcm9tICcuL2dhbWVib2FyZCdcbmltcG9ydCB7IFBsYXllciB9IGZyb20gJy4vcGxheWVyJ1xuXG5jb25zdCBwbGF5ZXJCb2FyZCA9IG5ldyBHYW1lYm9hcmQoKVxuY29uc3QgcGxheWVyRGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwbGF5ZXJkaXNwbGF5JylcblxuY29uc3QgY29tcHV0ZXJCb2FyZCA9IG5ldyBHYW1lYm9hcmQoKVxuY29uc3QgY29tcHV0ZXJEaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NvbXB1dGVyZGlzcGxheScpXG5jb25zdCBjb21wdXRlckFJID0gbmV3IFBsYXllcigpXG5cbnBsYXllckJvYXJkLnJhbmRvbVBsYWNlbWVudCgpXG5jb21wdXRlckJvYXJkLnJhbmRvbVBsYWNlbWVudCgpXG5cbmZ1bmN0aW9uIHJlbmRlclBsYXllckJvYXJkKCkge1xuICBwbGF5ZXJEaXNwbGF5LmlubmVySFRNTCA9ICcnXG4gIHBsYXllckJvYXJkLmdhbWVCb2FyZC5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgY29uc3QgY2VsbERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgY2VsbERpdi5jbGFzc0xpc3QuYWRkKCdwbGF5ZXJDZWxsJylcbiAgICBjZWxsRGl2LmRhdGFzZXQueCA9IGNlbGwueFxuICAgIGNlbGxEaXYuZGF0YXNldC55ID0gY2VsbC55XG4gICAgY2VsbERpdi5kYXRhc2V0Lm9jY3VwaWVkID0gY2VsbC5vY2N1cGllZFxuICAgIGNlbGxEaXYuZGF0YXNldC5iZWVuSGl0ID0gY2VsbC5iZWVuSGl0XG4gICAgcGxheWVyRGlzcGxheS5hcHBlbmRDaGlsZChjZWxsRGl2KVxuICB9KVxufVxuXG5yZW5kZXJQbGF5ZXJCb2FyZCgpXG5cbmZ1bmN0aW9uIHJlbmRlckNvbXB1dGVyQm9hcmQoKSB7XG4gIGNvbXB1dGVyRGlzcGxheS5pbm5lckhUTUwgPSAnJ1xuICBjb21wdXRlckJvYXJkLmdhbWVCb2FyZC5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgY29uc3QgY2VsbERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgY2VsbERpdi5jbGFzc0xpc3QuYWRkKCdjb21wdXRlckNlbGwnKVxuICAgIGNlbGxEaXYuZGF0YXNldC54ID0gY2VsbC54XG4gICAgY2VsbERpdi5kYXRhc2V0LnkgPSBjZWxsLnlcbiAgICBjZWxsRGl2LmRhdGFzZXQub2NjdXBpZWQgPSBjZWxsLm9jY3VwaWVkXG4gICAgY2VsbERpdi5kYXRhc2V0LmJlZW5IaXQgPSBjZWxsLmJlZW5IaXRcbiAgICBjb21wdXRlckRpc3BsYXkuYXBwZW5kQ2hpbGQoY2VsbERpdilcbiAgfSlcbn1cblxucmVuZGVyQ29tcHV0ZXJCb2FyZCgpXG5cbmZ1bmN0aW9uIHBsYXllclR1cm4oKSB7XG4gIGNvbnN0IGNvbXB1dGVyQm9hcmRDZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb21wdXRlckNlbGwnKVxuICBjb21wdXRlckJvYXJkQ2VsbHMuZm9yRWFjaCgoY2VsbERpdikgPT4ge1xuICAgIGNlbGxEaXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBjb21wdXRlckJvYXJkLnJlY2VpdmVBdHRhY2soW1xuICAgICAgICBOdW1iZXIoY2VsbERpdi5kYXRhc2V0LngpLFxuICAgICAgICBOdW1iZXIoY2VsbERpdi5kYXRhc2V0LnkpLFxuICAgICAgXSlcbiAgICAgIHJlbmRlckNvbXB1dGVyQm9hcmQoKVxuICAgICAgY29tcHV0ZXJBSS5yYW5kb21BdHRhY2socGxheWVyQm9hcmQpXG4gICAgICByZW5kZXJQbGF5ZXJCb2FyZCgpXG4gICAgICBnYW1lTG9vcCgpXG4gICAgfSlcbiAgfSlcbn1cblxuLy9tYWluIGdhbWUgbG9vcFxuXG5mdW5jdGlvbiBnYW1lTG9vcCgpIHtcbiAgaWYgKCFwbGF5ZXJCb2FyZC5mbGVldFN1bmsoKSAmJiAhY29tcHV0ZXJCb2FyZC5mbGVldFN1bmsoKSkge1xuICAgIHBsYXllclR1cm4oKVxuICB9IGVsc2UgaWYgKHBsYXllckJvYXJkLmZsZWV0U3VuaygpKSB7XG4gICAgYWxlcnQoJ1lvdSBMb3NlIScpXG4gIH0gZWxzZSBpZiAoY29tcHV0ZXJCb2FyZC5mbGVldFN1bmsoKSkge1xuICAgIGFsZXJ0KCdZb3UgV2luIScpXG4gIH1cbn1cblxucGxheWVyVHVybigpXG4iXSwibmFtZXMiOlsiU2hpcCIsIkNlbGwiLCJjb25zdHJ1Y3RvciIsIngiLCJ5Iiwib2NjdXBpZWQiLCJiZWVuSGl0IiwiR2FtZWJvYXJkIiwiZ2FtZUJvYXJkIiwibWFrZUdhbWVib2FyZCIsImNhcnJpZXIiLCJiYXR0bGVzaGlwIiwiZGVzdHJveWVyIiwic3VibWFyaW5lIiwicGF0cm9sQm9hdCIsImkiLCJqIiwicHVzaCIsInBsYWNlU2hpcCIsImNvb3JkaW5hdGVzIiwic2hpcCIsIm9yaWVudGF0aW9uIiwidmFsaWRQbGFjZW1lbnQiLCJsZW5ndGgiLCJ0ZW1wQ29vcmRzIiwiZmluZENlbGwiLCJ1bmRlZmluZWQiLCJmaW5kIiwib2JqIiwicmVjZWl2ZUF0dGFjayIsImhpdCIsImZsZWV0U3VuayIsImlzU3VuayIsInJhbmRvbVBsYWNlbWVudCIsImZsZWV0IiwiYmluZGVyIiwidHJ5UGxhY2VtZW50IiwicmFuZG9tQ2VsbCIsInJhbmRvbVhZIiwic2hpZnQiLCJtaW4iLCJtYXgiLCJyYW5kb21YIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwicmFuZG9tWSIsIlBsYXllciIsIm5hbWUiLCJyYW5kb21BdHRhY2siLCJoaXROdW1iZXIiLCJwbGF5ZXJCb2FyZCIsInBsYXllckRpc3BsYXkiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJjb21wdXRlckJvYXJkIiwiY29tcHV0ZXJEaXNwbGF5IiwiY29tcHV0ZXJBSSIsInJlbmRlclBsYXllckJvYXJkIiwiaW5uZXJIVE1MIiwiZm9yRWFjaCIsImNlbGwiLCJjZWxsRGl2IiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTGlzdCIsImFkZCIsImRhdGFzZXQiLCJhcHBlbmRDaGlsZCIsInJlbmRlckNvbXB1dGVyQm9hcmQiLCJwbGF5ZXJUdXJuIiwiY29tcHV0ZXJCb2FyZENlbGxzIiwicXVlcnlTZWxlY3RvckFsbCIsImFkZEV2ZW50TGlzdGVuZXIiLCJOdW1iZXIiLCJnYW1lTG9vcCIsImFsZXJ0Il0sInNvdXJjZVJvb3QiOiIifQ==