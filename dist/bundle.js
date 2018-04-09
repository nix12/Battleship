/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/gameboard.ts":
/*!**************************!*\
  !*** ./src/gameboard.ts ***!
  \**************************/
/*! exports provided: Gameboard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Gameboard\", function() { return Gameboard; });\n/* harmony import */ var _ships__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ships */ \"./src/ships.ts\");\nvar __assign = (undefined && undefined.__assign) || Object.assign || function(t) {\n    for (var s, i = 1, n = arguments.length; i < n; i++) {\n        s = arguments[i];\n        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n            t[p] = s[p];\n    }\n    return t;\n};\n\nvar Gameboard = /** @class */ (function () {\n    function Gameboard() {\n    }\n    Gameboard.prototype.createGrid = function () {\n        var grid = [];\n        var row;\n        var column;\n        for (row = 0; row < 10; row = row + 1) {\n            for (column = 0; column < 10; column = column + 1) {\n                grid.push([column, row]);\n            }\n        }\n        return grid;\n    };\n    Gameboard.prototype.renderGrid = function () {\n        var _this = this;\n        var grid = this.createGrid();\n        var container = document.querySelector('.container');\n        grid.forEach(function (value, index) {\n            var cell = document.createElement('div');\n            cell.addEventListener('drop', function (e) {\n                drop(e);\n            });\n            cell.addEventListener('dragover', function (e) {\n                allowDrop(e);\n            });\n            cell.addEventListener('dragstart', function (e) {\n                drag(e);\n            });\n            cell.addEventListener('dblclick', function (e) {\n                change_direction(e);\n            });\n            cell.addEventListener('click', function (e) {\n                _this.recieveAttack(e);\n            });\n            cell.setAttribute('draggable', 'false');\n            cell.classList.add('square');\n            cell.id = grid[index];\n            // cell.innerHTML = grid[index];\n            container.appendChild(cell);\n        });\n        container.addEventListener('mouseup', unFocus);\n        container.addEventListener('mousemove', unFocus);\n        return container;\n    };\n    Gameboard.prototype.miss = function (target) {\n        var location = document.getElementById(target);\n        location.classList.add('miss');\n    };\n    Gameboard.prototype.recieveAttack = function (e) {\n        var location = document.getElementById(e.target.id);\n        var ships2 = __assign({}, _ships__WEBPACK_IMPORTED_MODULE_0__[\"Ships\"]);\n        var target;\n        if (location.hasChildNodes()) {\n            target = e.currentTarget.children[0].getAttribute('data-ship-type');\n        }\n        if (location.classList.contains('occupied')) {\n            console.log(target);\n            console.log('hit', ships2[target]);\n            try {\n                ships2[target].hit(e.target.id);\n            }\n            catch (error) {\n                alert('runtime error ' + error.message);\n            }\n        }\n        else {\n            this.miss(e.target.id);\n        }\n    };\n    return Gameboard;\n}());\n\nfunction allowDrop(e) {\n    e.preventDefault();\n}\nfunction drop(e) {\n    e.preventDefault();\n    var data = e.dataTransfer.getData('text/html');\n    var horizontal = document.getElementById(data);\n    var coordinate = e.target.id;\n    var sections = document.getElementsByClassName(horizontal.className);\n    var x = Number(coordinate[0]);\n    var y = Number(coordinate[coordinate.length - 1]);\n    var len;\n    var id;\n    var outOfBounds;\n    if (horizontal.hasChildNodes()) {\n        len = horizontal.children.length;\n        id = horizontal.children[0].id.slice(0, -1);\n        outOfBounds = horizontal.children;\n    }\n    else {\n        len = sections.length;\n        id = horizontal.id.slice(0, -1);\n        outOfBounds = sections;\n    }\n    if (horizontal.getAttribute('data-direction') === 'horizontal') {\n        if (!preventOutOfBounds(outOfBounds, x, y) && !illegalPlacement(outOfBounds, x, y)) {\n            for (var i = 0; i < len; i = i + 1) {\n                var rangeX = x + i;\n                document.getElementById(rangeX + \",\" + y)\n                    .appendChild(document.getElementById(String(id + i)));\n            }\n        }\n    }\n    else {\n        if (!preventOutOfBounds(outOfBounds, x, y) && !illegalPlacement(outOfBounds, x, y)) {\n            for (var i = 0; i < len; i = i + 1) {\n                var rangeY = y - i;\n                document.getElementById(x + \",\" + rangeY)\n                    .appendChild(document.getElementById(String(id + i)));\n            }\n        }\n    }\n    e.dataTransfer.clearData();\n}\nfunction drag(e) {\n    e.dataTransfer.setData('text/html', e.currentTarget.children[0].id);\n}\nfunction change_direction(e) {\n    var targets = document.getElementsByClassName(e.currentTarget.children[0].className);\n    var coordinate = e.target.id;\n    var x = Number(coordinate[0]);\n    var y = Number(coordinate[coordinate.length - 1]);\n    if (targets[0].getAttribute('data-direction') === 'horizontal') {\n        if (!preventOutOfBounds(targets, x, y) && !check_collision(targets, x, y)) {\n            for (var i = 0; i < targets.length; i = i + 1) {\n                var rangeY = y - i;\n                document.getElementById(x + \",\" + rangeY)\n                    .appendChild(document.querySelector(\"#\" + String(targets[i].id.slice(0, -1) + i) + \".ship\"));\n                document.querySelector(String(\"#\" + (targets[i].id.slice(0, -1) + i) + \".ship\"))\n                    .setAttribute('data-direction', 'vertical');\n            }\n        }\n    }\n    else {\n        if (!preventOutOfBounds(targets, x, y) && !check_collision(targets, x, y)) {\n            for (var i = 0; i < targets.length; i = i + 1) {\n                var rangeX = x + i;\n                document.getElementById(rangeX + \",\" + y)\n                    .appendChild(document.querySelector(\"#\" + String(targets[i].id.slice(0, -1) + i) + \".ship\"));\n                document.querySelector(String(\"#\" + (targets[i].id.slice(0, -1) + i) + \".ship\"))\n                    .setAttribute('data-direction', 'horizontal');\n            }\n        }\n    }\n}\nfunction check_collision(ship, x, y) {\n    for (var i = 0; i < ship.length - 1; i = i + 1) {\n        if (ship[0].getAttribute('data-direction') === 'horizontal') {\n            var location_1 = document.getElementById(String(x) + \",\" + String(y - i - 1));\n            var feedback = document.querySelector('.feedback');\n            if (location_1.classList.contains('occupied')) {\n                feedback.innerHTML = 'Illegal Move';\n                return true;\n            }\n        }\n        else {\n            var location_2 = document.getElementById(String(x + i + 1) + \",\" + String(y));\n            var feedback = document.querySelector('.feedback');\n            if (location_2.classList.contains('occupied')) {\n                feedback.innerHTML = 'Illegal Move';\n                return true;\n            }\n        }\n    }\n}\nfunction preventOutOfBounds(ship, x, y) {\n    for (var i = 0; i < ship.length; i = i + 1) {\n        if (ship[0].getAttribute('data-direction') === 'horizontal') {\n            var location_3 = document.getElementById(String(x + i) + \",\" + String(y));\n            var feedback = document.querySelector('.feedback');\n            if (Number(location_3.id[0]) > 9) {\n                return true;\n            }\n        }\n        else {\n            var location_4 = document.getElementById(String(x) + \",\" + String(y - i));\n            var feedback = document.querySelector('.feedback');\n            if (Number(location_4.id[location_4.id.length - 1]) < 0) {\n                return true;\n            }\n        }\n    }\n}\nfunction illegalPlacement(ship, x, y) {\n    for (var i = 0; i < ship.length; i = i + 1) {\n        if (ship[0].getAttribute('data-direction') === 'horizontal') {\n            var location_5 = document.getElementById(String(x + i) + \",\" + String(y));\n            var feedback = document.querySelector('.feedback');\n            if (location_5.classList.contains('occupied')) {\n                feedback.innerHTML = 'Illegal placement';\n                return true;\n            }\n        }\n        else {\n            var location_6 = document.getElementById(String(x) + \",\" + String(y - i));\n            var feedback = document.querySelector('.feedback');\n            if (location_6.classList.contains('occupied')) {\n                feedback.innerHTML = 'Illegal placement';\n                return true;\n            }\n        }\n    }\n}\nfunction unFocus() {\n    if (document.getSelection()) {\n        document.getSelection().empty();\n    }\n    else {\n        window.getSelection().removeAllRanges();\n    }\n}\n\n\n//# sourceURL=webpack:///./src/gameboard.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ \"./src/gameboard.ts\");\n/* harmony import */ var _ships__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ships */ \"./src/ships.ts\");\n\n\nvar gameboard = new _gameboard__WEBPACK_IMPORTED_MODULE_0__[\"Gameboard\"]();\nvar grid = gameboard.renderGrid();\n_ships__WEBPACK_IMPORTED_MODULE_1__[\"Ships\"].carrier;\n_ships__WEBPACK_IMPORTED_MODULE_1__[\"Ships\"].battleship;\n_ships__WEBPACK_IMPORTED_MODULE_1__[\"Ships\"].submarine;\n_ships__WEBPACK_IMPORTED_MODULE_1__[\"Ships\"].destroyer;\n_ships__WEBPACK_IMPORTED_MODULE_1__[\"Ships\"].patrol;\nfunction checkBoard(grid) {\n    var game = grid.childNodes;\n    game.forEach(function (value, index) {\n        var element = game[index].getElementsByClassName('ship');\n        if (element.length > 0) {\n            game[index].setAttribute('draggable', 'true');\n            game[index].classList.add('occupied');\n        }\n        else {\n            game[index].setAttribute('draggable', 'false');\n            game[index].classList.remove('occupied');\n        }\n    });\n}\nsetInterval(function () { return checkBoard(grid); }, 250);\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "./src/ship.ts":
/*!*********************!*\
  !*** ./src/ship.ts ***!
  \*********************/
/*! exports provided: Ship */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Ship\", function() { return Ship; });\nvar Ship = /** @class */ (function () {\n    function Ship(length) {\n        this.length = length;\n        this.health = length;\n        this.sunk = false;\n    }\n    Ship.prototype.type = function () {\n        if (this.length === 2) {\n            return 'patrol';\n        }\n        if (this.length === 3 && document.body.contains(document.getElementById('submarine0'))\n            && document.body.contains(document.getElementById('submarine1'))\n            && document.body.contains(document.getElementById('submarine2'))) {\n            return 'destroyer';\n        }\n        if (this.length === 3) {\n            return 'submarine';\n        }\n        if (this.length === 4) {\n            return 'battleship';\n        }\n        if (this.length === 5) {\n            return 'carrier';\n        }\n    };\n    Ship.prototype.hit = function (target) {\n        var location = document.getElementById(target);\n        location.classList.add('hit');\n        this.health = this.health - 1;\n    };\n    Ship.prototype.isSunk = function () {\n        if (this.health === 0) {\n            this.sunk = true;\n        }\n    };\n    Ship.prototype.createShip = function () {\n        var ship = [];\n        for (var size = 0; size < this.length; size = size + 1) {\n            ship.push(size);\n        }\n        return ship;\n    };\n    Ship.prototype.renderShip = function () {\n        var _this = this;\n        // const j = jQuery.noConflict();\n        var ship = this.createShip();\n        var shipContainer = document.querySelector(\"#\" + this.type());\n        console.log(this.type());\n        // console.log(document);\n        // console.log(document.getElementById(this.type()));\n        ship.forEach(function (value, index) {\n            var section = document.createElement('div');\n            section.setAttribute('draggable', 'true');\n            section.setAttribute('aria-grabbed', 'false');\n            section.setAttribute('data-direction', 'horizontal');\n            section.setAttribute('data-ship-type', _this.type());\n            section.classList.add('ship');\n            section.classList.add(_this.type());\n            section.id = _this.type() + String(index);\n            shipContainer.appendChild(section);\n        });\n        shipContainer.addEventListener('click', function () {\n            var ship = shipContainer.children;\n            for (var i = 0; i < ship.length; i = i + 1) {\n                ship[i].setAttribute('aria-grabbed', 'true');\n            }\n        });\n        shipContainer.setAttribute('data-direction', 'horizontal');\n        shipContainer.addEventListener('dragstart', function (e) {\n            drag(e);\n        });\n        return shipContainer;\n    };\n    return Ship;\n}());\n\nfunction drag(e) {\n    e.dataTransfer.setData('text/html', e.target.parentNode.id);\n}\n\n\n//# sourceURL=webpack:///./src/ship.ts?");

/***/ }),

/***/ "./src/ships.ts":
/*!**********************!*\
  !*** ./src/ships.ts ***!
  \**********************/
/*! exports provided: Ships */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Ships\", function() { return Ships; });\n/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ \"./src/ship.ts\");\n\nvar Ships;\n(function (Ships) {\n    Ships.patrol = new _ship__WEBPACK_IMPORTED_MODULE_0__[\"Ship\"](2);\n    Ships.destroyer = new _ship__WEBPACK_IMPORTED_MODULE_0__[\"Ship\"](3);\n    Ships.submarine = new _ship__WEBPACK_IMPORTED_MODULE_0__[\"Ship\"](3);\n    Ships.battleship = new _ship__WEBPACK_IMPORTED_MODULE_0__[\"Ship\"](4);\n    Ships.carrier = new _ship__WEBPACK_IMPORTED_MODULE_0__[\"Ship\"](5);\n    Ships.carrier.renderShip();\n    Ships.battleship.renderShip();\n    Ships.submarine.renderShip();\n    Ships.destroyer.renderShip();\n    Ships.patrol.renderShip();\n})(Ships || (Ships = {}));\n\n\n//# sourceURL=webpack:///./src/ships.ts?");

/***/ })

/******/ });