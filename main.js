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
    if (this.validPlacement(coordinates, ship)) {
      for (let i = 0; i < ship.length; i++) {
        let tempCoords = [coordinates[0] + i, coordinates[1]];
        this.findCell(tempCoords).occupied = ship;
      }
    }
  }
  validPlacement(coordinates, ship) {
    for (let i = 0; i < ship.length; i++) {
      let tempCoords = [coordinates[0] + i, coordinates[1]];
      if (this.findCell(tempCoords) == undefined || this.findCell(tempCoords).occupied !== null) {
        return false;
      }
    }
    return true;
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
    this.length = length;
    this.hitNumber = hitNumber;
  }
  hit() {
    this.hitNumber++;
  }
  isSunk() {
    if (this.length <= this.hitNumber) return true;
    return false;
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
___CSS_LOADER_EXPORT___.push([module.id, "body {\n  font-family: 'Roboto Condensed', sans-serif;\n  height: 100vh;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n}\nh1 {\n  color: black;\n  -webkit-text-fill-color: white;\n  -webkit-text-stroke-width: 1px;\n  -webkit-text-stroke-color: black;\n  font-stretch: expanded;\n}\nmain {\n  display: flex;\n  align-items: center;\n  justify-content: space-around;\n  flex-wrap: wrap;\n  overflow: auto;\n  height: 100%;\n  background-color: #fef6e4;\n}\n\nheader {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 60px;\n  background-color: #00a71c;\n  padding: 10px;\n  border-bottom: 3px solid black;\n  z-index: 1;\n  box-shadow: 0px 7px 14px -4px rgba(0, 0, 0, 1);\n}\n\nfooter {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 80px;\n  background-color: #8bd3dd;\n  padding: 10px;\n  border-top: 1px solid black;\n  box-shadow: 0px -7px 14px -4px rgba(0, 0, 0, 1);\n}\n\n.area {\n  background-color: #ffebbe;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  border: black solid 1px;\n  width: 300px;\n  padding: 5px;\n  margin: 20px;\n  box-shadow: 0px 0px 9px 5px rgba(0, 0, 0, 0.5);\n  border-radius: 5px;\n}\n\n.board {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-wrap: wrap;\n  width: 100%;\n}\n\n.cell {\n  border: 1px solid black;\n  flex: 0 9%;\n  width: 30px;\n  height: 30px;\n  background-color: rgb(71, 243, 255);\n  border-radius: 2px;\n}\n\n.cell:hover {\n  transform: scale(1.1);\n  cursor: pointer;\n}\n", "",{"version":3,"sources":["webpack://./src/style.scss"],"names":[],"mappings":"AAAA;EACE,2CAA2C;EAC3C,aAAa;EACb,aAAa;EACb,sBAAsB;EACtB,8BAA8B;AAChC;AACA;EACE,YAAY;EACZ,8BAA8B;EAC9B,8BAA8B;EAC9B,gCAAgC;EAChC,sBAAsB;AACxB;AACA;EACE,aAAa;EACb,mBAAmB;EACnB,6BAA6B;EAC7B,eAAe;EACf,cAAc;EACd,YAAY;EACZ,yBAAyB;AAC3B;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,YAAY;EACZ,yBAAyB;EACzB,aAAa;EACb,8BAA8B;EAC9B,UAAU;EACV,8CAA8C;AAChD;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,YAAY;EACZ,yBAAyB;EACzB,aAAa;EACb,2BAA2B;EAC3B,+CAA+C;AACjD;;AAEA;EACE,yBAAyB;EACzB,aAAa;EACb,sBAAsB;EACtB,uBAAuB;EACvB,mBAAmB;EACnB,uBAAuB;EACvB,YAAY;EACZ,YAAY;EACZ,YAAY;EACZ,8CAA8C;EAC9C,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,eAAe;EACf,WAAW;AACb;;AAEA;EACE,uBAAuB;EACvB,UAAU;EACV,WAAW;EACX,YAAY;EACZ,mCAAmC;EACnC,kBAAkB;AACpB;;AAEA;EACE,qBAAqB;EACrB,eAAe;AACjB","sourcesContent":["body {\n  font-family: 'Roboto Condensed', sans-serif;\n  height: 100vh;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n}\nh1 {\n  color: black;\n  -webkit-text-fill-color: white;\n  -webkit-text-stroke-width: 1px;\n  -webkit-text-stroke-color: black;\n  font-stretch: expanded;\n}\nmain {\n  display: flex;\n  align-items: center;\n  justify-content: space-around;\n  flex-wrap: wrap;\n  overflow: auto;\n  height: 100%;\n  background-color: #fef6e4;\n}\n\nheader {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 60px;\n  background-color: #00a71c;\n  padding: 10px;\n  border-bottom: 3px solid black;\n  z-index: 1;\n  box-shadow: 0px 7px 14px -4px rgba(0, 0, 0, 1);\n}\n\nfooter {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 80px;\n  background-color: #8bd3dd;\n  padding: 10px;\n  border-top: 1px solid black;\n  box-shadow: 0px -7px 14px -4px rgba(0, 0, 0, 1);\n}\n\n.area {\n  background-color: #ffebbe;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  border: black solid 1px;\n  width: 300px;\n  padding: 5px;\n  margin: 20px;\n  box-shadow: 0px 0px 9px 5px rgba(0, 0, 0, 0.5);\n  border-radius: 5px;\n}\n\n.board {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-wrap: wrap;\n  width: 100%;\n}\n\n.cell {\n  border: 1px solid black;\n  flex: 0 9%;\n  width: 30px;\n  height: 30px;\n  background-color: rgb(71, 243, 255);\n  border-radius: 2px;\n}\n\n.cell:hover {\n  transform: scale(1.1);\n  cursor: pointer;\n}\n"],"sourceRoot":""}]);
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
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ship */ "./src/ship.js");




const playerBoard = new _gameboard__WEBPACK_IMPORTED_MODULE_1__.Gameboard();
const playerDisplay = document.querySelector('#playerdisplay');
const computerBoard = new _gameboard__WEBPACK_IMPORTED_MODULE_1__.Gameboard();
const computerDisplay = document.querySelector('#computerdisplay');
playerBoard.gameBoard.forEach(cell => {
  const cellDiv = document.createElement('div');
  cellDiv.classList.add('cell');
  cellDiv.dataset.x = cell.x;
  cellDiv.dataset.y = cell.y;
  cellDiv.dataset.occupied = cell.occupied;
  cellDiv.dataset.beenHit = cell.beenHit;
  playerDisplay.appendChild(cellDiv);
});
computerBoard.gameBoard.forEach(cell => {
  const cellDiv = document.createElement('div');
  cellDiv.classList.add('cell');
  computerDisplay.appendChild(cellDiv);
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LE9BQU8sQ0FBRUMsSUFBSSxJQUFLO0VBQ3RDLE1BQU1DLE9BQU8sR0FBR04sUUFBUSxDQUFDTyxhQUFhLENBQUMsS0FBSyxDQUFDO0VBQzdDRCxPQUFPLENBQUNFLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLE1BQU0sQ0FBQztFQUM3QkgsT0FBTyxDQUFDSSxPQUFPLENBQUN0RCxDQUFDLEdBQUdpRCxJQUFJLENBQUNqRCxDQUFDO0VBQzFCa0QsT0FBTyxDQUFDSSxPQUFPLENBQUNyRCxDQUFDLEdBQUdnRCxJQUFJLENBQUNoRCxDQUFDO0VBQzFCaUQsT0FBTyxDQUFDSSxPQUFPLENBQUNwRCxRQUFRLEdBQUcrQyxJQUFJLENBQUMvQyxRQUFRO0VBQ3hDZ0QsT0FBTyxDQUFDSSxPQUFPLENBQUNuRCxPQUFPLEdBQUc4QyxJQUFJLENBQUM5QyxPQUFPO0VBQ3RDd0MsYUFBYSxDQUFDWSxXQUFXLENBQUNMLE9BQU8sQ0FBQztBQUNwQyxDQUFDLENBQUM7QUFFRkosYUFBYSxDQUFDekMsU0FBUyxDQUFDMkMsT0FBTyxDQUFFQyxJQUFJLElBQUs7RUFDeEMsTUFBTUMsT0FBTyxHQUFHTixRQUFRLENBQUNPLGFBQWEsQ0FBQyxLQUFLLENBQUM7RUFDN0NELE9BQU8sQ0FBQ0UsU0FBUyxDQUFDQyxHQUFHLENBQUMsTUFBTSxDQUFDO0VBQzdCTixlQUFlLENBQUNRLFdBQVcsQ0FBQ0wsT0FBTyxDQUFDO0FBQ3RDLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcGpzLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwanMvLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBqcy8uL3NyYy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBqcy8uL3NyYy9zdHlsZS5zY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXBqcy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcGpzLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcGpzLy4vc3JjL3N0eWxlLnNjc3M/ODQ2YSIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwanMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcGpzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwanMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcGpzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBqcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBqcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBqcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwanMvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcGpzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwanMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwanMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwanMvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL2JhdHRsZXNoaXBqcy8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTaGlwIH0gZnJvbSAnLi9zaGlwJ1xuXG5jbGFzcyBDZWxsIHtcbiAgY29uc3RydWN0b3IoeCwgeSwgb2NjdXBpZWQgPSBudWxsLCBiZWVuSGl0ID0gZmFsc2UpIHtcbiAgICB0aGlzLnggPSB4XG4gICAgdGhpcy55ID0geVxuICAgIHRoaXMub2NjdXBpZWQgPSBvY2N1cGllZFxuICAgIHRoaXMuYmVlbkhpdCA9IGJlZW5IaXRcbiAgfVxufVxuXG5jbGFzcyBHYW1lYm9hcmQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmdhbWVCb2FyZCA9IHRoaXMuZ2FtZUJvYXJkIHx8IHRoaXMubWFrZUdhbWVib2FyZCgpXG4gICAgdGhpcy5jYXJyaWVyID0gdGhpcy5jYXJyaWVyIHx8IG5ldyBTaGlwKDUpXG4gICAgdGhpcy5iYXR0bGVzaGlwID0gdGhpcy5iYXR0bGVzaGlwIHx8IG5ldyBTaGlwKDQpXG4gICAgdGhpcy5kZXN0cm95ZXIgPSB0aGlzLmRlc3Ryb3llciB8fCBuZXcgU2hpcCgzKVxuICAgIHRoaXMuc3VibWFyaW5lID0gdGhpcy5zdWJtYXJpbmUgfHwgbmV3IFNoaXAoMylcbiAgICB0aGlzLnBhdHJvbEJvYXQgPSB0aGlzLnBhdHJvbEJvYXQgfHwgbmV3IFNoaXAoMilcbiAgfVxuXG4gIG1ha2VHYW1lYm9hcmQoKSB7XG4gICAgbGV0IGdhbWVCb2FyZCA9IFtdXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgICAgZ2FtZUJvYXJkLnB1c2gobmV3IENlbGwoaSwgaikpXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBnYW1lQm9hcmRcbiAgfVxuICBwbGFjZVNoaXAoY29vcmRpbmF0ZXMsIHNoaXApIHtcbiAgICBpZiAodGhpcy52YWxpZFBsYWNlbWVudChjb29yZGluYXRlcywgc2hpcCkpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgdGVtcENvb3JkcyA9IFtjb29yZGluYXRlc1swXSArIGksIGNvb3JkaW5hdGVzWzFdXVxuICAgICAgICB0aGlzLmZpbmRDZWxsKHRlbXBDb29yZHMpLm9jY3VwaWVkID0gc2hpcFxuICAgICAgfVxuICAgIH1cbiAgfVxuICB2YWxpZFBsYWNlbWVudChjb29yZGluYXRlcywgc2hpcCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IHRlbXBDb29yZHMgPSBbY29vcmRpbmF0ZXNbMF0gKyBpLCBjb29yZGluYXRlc1sxXV1cbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy5maW5kQ2VsbCh0ZW1wQ29vcmRzKSA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgdGhpcy5maW5kQ2VsbCh0ZW1wQ29vcmRzKS5vY2N1cGllZCAhPT0gbnVsbFxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZVxuICB9XG4gIGZpbmRDZWxsKGNvb3JkaW5hdGVzKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2FtZUJvYXJkLmZpbmQoXG4gICAgICAob2JqKSA9PiBvYmoueCA9PT0gY29vcmRpbmF0ZXNbMF0gJiYgb2JqLnkgPT09IGNvb3JkaW5hdGVzWzFdXG4gICAgKVxuICB9XG4gIHJlY2VpdmVBdHRhY2soY29vcmRpbmF0ZXMpIHtcbiAgICBpZiAodGhpcy5maW5kQ2VsbChjb29yZGluYXRlcykuYmVlbkhpdCA9PT0gdHJ1ZSkgcmV0dXJuIGZhbHNlXG4gICAgdGhpcy5maW5kQ2VsbChjb29yZGluYXRlcykuYmVlbkhpdCA9IHRydWVcbiAgICBpZiAodGhpcy5maW5kQ2VsbChjb29yZGluYXRlcykub2NjdXBpZWQgIT09IG51bGwpXG4gICAgICB0aGlzLmZpbmRDZWxsKGNvb3JkaW5hdGVzKS5vY2N1cGllZC5oaXQoKVxuICB9XG4gIGZsZWV0U3VuaygpIHtcbiAgICBpZiAoXG4gICAgICB0aGlzLmNhcnJpZXIuaXNTdW5rKCkgJiZcbiAgICAgIHRoaXMuYmF0dGxlc2hpcC5pc1N1bmsoKSAmJlxuICAgICAgdGhpcy5kZXN0cm95ZXIuaXNTdW5rKCkgJiZcbiAgICAgIHRoaXMuc3VibWFyaW5lLmlzU3VuaygpICYmXG4gICAgICB0aGlzLnBhdHJvbEJvYXQuaXNTdW5rKClcbiAgICApIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbmV4cG9ydCB7IEdhbWVib2FyZCB9XG4iLCJjbGFzcyBQbGF5ZXIge1xuICBjb25zdHJ1Y3RvcihuYW1lID0gJ0NvbXB1dGVyJykge1xuICAgIHRoaXMubmFtZSA9IG5hbWVcbiAgfVxuICByYW5kb21BdHRhY2soZ2FtZUJvYXJkKSB7XG4gICAgbGV0IHJhbmRvbUNlbGwgPSBnYW1lQm9hcmQuZmluZENlbGwodGhpcy5yYW5kb21YWSgpKVxuICAgIGlmIChyYW5kb21DZWxsLmJlZW5IaXQgPT0gZmFsc2UpIHtcbiAgICAgIHJhbmRvbUNlbGwuYmVlbkhpdCA9IHRydWVcbiAgICAgIGlmIChyYW5kb21DZWxsLm9jY3VwaWVkICE9PSBudWxsKSB7XG4gICAgICAgIHJhbmRvbUNlbGwub2NjdXBpZWQuaGl0KClcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yYW5kb21BdHRhY2soZ2FtZUJvYXJkKVxuICAgIH1cbiAgfVxuICByYW5kb21YWShtaW4gPSAwLCBtYXggPSA5KSB7XG4gICAgY29uc3QgcmFuZG9tWCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSArIG1pbilcbiAgICBjb25zdCByYW5kb21ZID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpICsgbWluKVxuICAgIHJldHVybiBbcmFuZG9tWCwgcmFuZG9tWV1cbiAgfVxufVxuXG5leHBvcnQgeyBQbGF5ZXIgfVxuIiwiY2xhc3MgU2hpcCB7XG4gIGNvbnN0cnVjdG9yKGxlbmd0aCwgaGl0TnVtYmVyID0gMCkge1xuICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoXG4gICAgdGhpcy5oaXROdW1iZXIgPSBoaXROdW1iZXJcbiAgfVxuICBoaXQoKSB7XG4gICAgdGhpcy5oaXROdW1iZXIrK1xuICB9XG4gIGlzU3VuaygpIHtcbiAgICBpZiAodGhpcy5sZW5ndGggPD0gdGhpcy5oaXROdW1iZXIpIHJldHVybiB0cnVlXG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxuZXhwb3J0IHsgU2hpcCB9XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcImJvZHkge1xcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8gQ29uZGVuc2VkJywgc2Fucy1zZXJpZjtcXG4gIGhlaWdodDogMTAwdmg7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG59XFxuaDEge1xcbiAgY29sb3I6IGJsYWNrO1xcbiAgLXdlYmtpdC10ZXh0LWZpbGwtY29sb3I6IHdoaXRlO1xcbiAgLXdlYmtpdC10ZXh0LXN0cm9rZS13aWR0aDogMXB4O1xcbiAgLXdlYmtpdC10ZXh0LXN0cm9rZS1jb2xvcjogYmxhY2s7XFxuICBmb250LXN0cmV0Y2g6IGV4cGFuZGVkO1xcbn1cXG5tYWluIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxuICBmbGV4LXdyYXA6IHdyYXA7XFxuICBvdmVyZmxvdzogYXV0bztcXG4gIGhlaWdodDogMTAwJTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZWY2ZTQ7XFxufVxcblxcbmhlYWRlciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgaGVpZ2h0OiA2MHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwYTcxYztcXG4gIHBhZGRpbmc6IDEwcHg7XFxuICBib3JkZXItYm90dG9tOiAzcHggc29saWQgYmxhY2s7XFxuICB6LWluZGV4OiAxO1xcbiAgYm94LXNoYWRvdzogMHB4IDdweCAxNHB4IC00cHggcmdiYSgwLCAwLCAwLCAxKTtcXG59XFxuXFxuZm9vdGVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBoZWlnaHQ6IDgwcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjOGJkM2RkO1xcbiAgcGFkZGluZzogMTBweDtcXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCBibGFjaztcXG4gIGJveC1zaGFkb3c6IDBweCAtN3B4IDE0cHggLTRweCByZ2JhKDAsIDAsIDAsIDEpO1xcbn1cXG5cXG4uYXJlYSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZlYmJlO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBib3JkZXI6IGJsYWNrIHNvbGlkIDFweDtcXG4gIHdpZHRoOiAzMDBweDtcXG4gIHBhZGRpbmc6IDVweDtcXG4gIG1hcmdpbjogMjBweDtcXG4gIGJveC1zaGFkb3c6IDBweCAwcHggOXB4IDVweCByZ2JhKDAsIDAsIDAsIDAuNSk7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxufVxcblxcbi5ib2FyZCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgZmxleC13cmFwOiB3cmFwO1xcbiAgd2lkdGg6IDEwMCU7XFxufVxcblxcbi5jZWxsIHtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcbiAgZmxleDogMCA5JTtcXG4gIHdpZHRoOiAzMHB4O1xcbiAgaGVpZ2h0OiAzMHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDcxLCAyNDMsIDI1NSk7XFxuICBib3JkZXItcmFkaXVzOiAycHg7XFxufVxcblxcbi5jZWxsOmhvdmVyIHtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMS4xKTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLnNjc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSwyQ0FBMkM7RUFDM0MsYUFBYTtFQUNiLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsOEJBQThCO0FBQ2hDO0FBQ0E7RUFDRSxZQUFZO0VBQ1osOEJBQThCO0VBQzlCLDhCQUE4QjtFQUM5QixnQ0FBZ0M7RUFDaEMsc0JBQXNCO0FBQ3hCO0FBQ0E7RUFDRSxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLDZCQUE2QjtFQUM3QixlQUFlO0VBQ2YsY0FBYztFQUNkLFlBQVk7RUFDWix5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLHVCQUF1QjtFQUN2QixZQUFZO0VBQ1oseUJBQXlCO0VBQ3pCLGFBQWE7RUFDYiw4QkFBOEI7RUFDOUIsVUFBVTtFQUNWLDhDQUE4QztBQUNoRDs7QUFFQTtFQUNFLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsdUJBQXVCO0VBQ3ZCLFlBQVk7RUFDWix5QkFBeUI7RUFDekIsYUFBYTtFQUNiLDJCQUEyQjtFQUMzQiwrQ0FBK0M7QUFDakQ7O0FBRUE7RUFDRSx5QkFBeUI7RUFDekIsYUFBYTtFQUNiLHNCQUFzQjtFQUN0Qix1QkFBdUI7RUFDdkIsbUJBQW1CO0VBQ25CLHVCQUF1QjtFQUN2QixZQUFZO0VBQ1osWUFBWTtFQUNaLFlBQVk7RUFDWiw4Q0FBOEM7RUFDOUMsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQix1QkFBdUI7RUFDdkIsZUFBZTtFQUNmLFdBQVc7QUFDYjs7QUFFQTtFQUNFLHVCQUF1QjtFQUN2QixVQUFVO0VBQ1YsV0FBVztFQUNYLFlBQVk7RUFDWixtQ0FBbUM7RUFDbkMsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UscUJBQXFCO0VBQ3JCLGVBQWU7QUFDakJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiYm9keSB7XFxuICBmb250LWZhbWlseTogJ1JvYm90byBDb25kZW5zZWQnLCBzYW5zLXNlcmlmO1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbn1cXG5oMSB7XFxuICBjb2xvcjogYmxhY2s7XFxuICAtd2Via2l0LXRleHQtZmlsbC1jb2xvcjogd2hpdGU7XFxuICAtd2Via2l0LXRleHQtc3Ryb2tlLXdpZHRoOiAxcHg7XFxuICAtd2Via2l0LXRleHQtc3Ryb2tlLWNvbG9yOiBibGFjaztcXG4gIGZvbnQtc3RyZXRjaDogZXhwYW5kZWQ7XFxufVxcbm1haW4ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXG4gIGZsZXgtd3JhcDogd3JhcDtcXG4gIG92ZXJmbG93OiBhdXRvO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZlZjZlNDtcXG59XFxuXFxuaGVhZGVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBoZWlnaHQ6IDYwcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDBhNzFjO1xcbiAgcGFkZGluZzogMTBweDtcXG4gIGJvcmRlci1ib3R0b206IDNweCBzb2xpZCBibGFjaztcXG4gIHotaW5kZXg6IDE7XFxuICBib3gtc2hhZG93OiAwcHggN3B4IDE0cHggLTRweCByZ2JhKDAsIDAsIDAsIDEpO1xcbn1cXG5cXG5mb290ZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGhlaWdodDogODBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM4YmQzZGQ7XFxuICBwYWRkaW5nOiAxMHB4O1xcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkIGJsYWNrO1xcbiAgYm94LXNoYWRvdzogMHB4IC03cHggMTRweCAtNHB4IHJnYmEoMCwgMCwgMCwgMSk7XFxufVxcblxcbi5hcmVhIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmViYmU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGJvcmRlcjogYmxhY2sgc29saWQgMXB4O1xcbiAgd2lkdGg6IDMwMHB4O1xcbiAgcGFkZGluZzogNXB4O1xcbiAgbWFyZ2luOiAyMHB4O1xcbiAgYm94LXNoYWRvdzogMHB4IDBweCA5cHggNXB4IHJnYmEoMCwgMCwgMCwgMC41KTtcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXG59XFxuXFxuLmJvYXJkIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBmbGV4LXdyYXA6IHdyYXA7XFxuICB3aWR0aDogMTAwJTtcXG59XFxuXFxuLmNlbGwge1xcbiAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxuICBmbGV4OiAwIDklO1xcbiAgd2lkdGg6IDMwcHg7XFxuICBoZWlnaHQ6IDMwcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNzEsIDI0MywgMjU1KTtcXG4gIGJvcmRlci1yYWRpdXM6IDJweDtcXG59XFxuXFxuLmNlbGw6aG92ZXIge1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgxLjEpO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcblxuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuXG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgXCJcIikuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLnNjc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLnNjc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcblxuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gdXBkYXRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cblxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuXG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cblxuICBjc3MgKz0gb2JqLmNzcztcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0ICcuL3N0eWxlLnNjc3MnXG5pbXBvcnQgeyBHYW1lYm9hcmQgfSBmcm9tICcuL2dhbWVib2FyZCdcbmltcG9ydCB7IFBsYXllciB9IGZyb20gJy4vcGxheWVyJ1xuaW1wb3J0IHsgU2hpcCB9IGZyb20gJy4vc2hpcCdcblxuY29uc3QgcGxheWVyQm9hcmQgPSBuZXcgR2FtZWJvYXJkKClcbmNvbnN0IHBsYXllckRpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGxheWVyZGlzcGxheScpXG5cbmNvbnN0IGNvbXB1dGVyQm9hcmQgPSBuZXcgR2FtZWJvYXJkKClcbmNvbnN0IGNvbXB1dGVyRGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjb21wdXRlcmRpc3BsYXknKVxuXG5wbGF5ZXJCb2FyZC5nYW1lQm9hcmQuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICBjb25zdCBjZWxsRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgY2VsbERpdi5jbGFzc0xpc3QuYWRkKCdjZWxsJylcbiAgY2VsbERpdi5kYXRhc2V0LnggPSBjZWxsLnhcbiAgY2VsbERpdi5kYXRhc2V0LnkgPSBjZWxsLnlcbiAgY2VsbERpdi5kYXRhc2V0Lm9jY3VwaWVkID0gY2VsbC5vY2N1cGllZFxuICBjZWxsRGl2LmRhdGFzZXQuYmVlbkhpdCA9IGNlbGwuYmVlbkhpdFxuICBwbGF5ZXJEaXNwbGF5LmFwcGVuZENoaWxkKGNlbGxEaXYpXG59KVxuXG5jb21wdXRlckJvYXJkLmdhbWVCb2FyZC5mb3JFYWNoKChjZWxsKSA9PiB7XG4gIGNvbnN0IGNlbGxEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICBjZWxsRGl2LmNsYXNzTGlzdC5hZGQoJ2NlbGwnKVxuICBjb21wdXRlckRpc3BsYXkuYXBwZW5kQ2hpbGQoY2VsbERpdilcbn0pXG4iXSwibmFtZXMiOlsiU2hpcCIsIkNlbGwiLCJjb25zdHJ1Y3RvciIsIngiLCJ5Iiwib2NjdXBpZWQiLCJiZWVuSGl0IiwiR2FtZWJvYXJkIiwiZ2FtZUJvYXJkIiwibWFrZUdhbWVib2FyZCIsImNhcnJpZXIiLCJiYXR0bGVzaGlwIiwiZGVzdHJveWVyIiwic3VibWFyaW5lIiwicGF0cm9sQm9hdCIsImkiLCJqIiwicHVzaCIsInBsYWNlU2hpcCIsImNvb3JkaW5hdGVzIiwic2hpcCIsInZhbGlkUGxhY2VtZW50IiwibGVuZ3RoIiwidGVtcENvb3JkcyIsImZpbmRDZWxsIiwidW5kZWZpbmVkIiwiZmluZCIsIm9iaiIsInJlY2VpdmVBdHRhY2siLCJoaXQiLCJmbGVldFN1bmsiLCJpc1N1bmsiLCJQbGF5ZXIiLCJuYW1lIiwicmFuZG9tQXR0YWNrIiwicmFuZG9tQ2VsbCIsInJhbmRvbVhZIiwibWluIiwibWF4IiwicmFuZG9tWCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInJhbmRvbVkiLCJoaXROdW1iZXIiLCJwbGF5ZXJCb2FyZCIsInBsYXllckRpc3BsYXkiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJjb21wdXRlckJvYXJkIiwiY29tcHV0ZXJEaXNwbGF5IiwiZm9yRWFjaCIsImNlbGwiLCJjZWxsRGl2IiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTGlzdCIsImFkZCIsImRhdGFzZXQiLCJhcHBlbmRDaGlsZCJdLCJzb3VyY2VSb290IjoiIn0=