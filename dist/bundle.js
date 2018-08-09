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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// import * as Ships from './ships';
var ship_1 = __webpack_require__(/*! ./ship */ "./src/ship.ts");
var Gameboard = /** @class */ (function () {
    function Gameboard() {
    }
    Gameboard.prototype.createGrid = function () {
        var grid = [];
        var row;
        var column;
        for (row = 0; row < 10; row = row + 1) {
            for (column = 0; column < 10; column = column + 1) {
                grid.push([column, row]);
            }
        }
        return grid;
    };
    Gameboard.prototype.renderGrid = function () {
        var _this = this;
        var grid = this.createGrid();
        var container = document.querySelector('.container');
        grid.forEach(function (value, index) {
            var cell = document.createElement('div');
            cell.addEventListener('drop', function (e) {
                drop(e);
            });
            cell.addEventListener('dragover', function (e) {
                allowDrop(e);
            });
            cell.addEventListener('dragstart', function (e) {
                drag(e);
            });
            cell.addEventListener('dblclick', function (e) {
                change_direction(e);
            });
            cell.addEventListener('click', function (e) {
                _this.recieveAttack(e);
            });
            cell.setAttribute('draggable', 'false');
            cell.classList.add('square');
            cell.id = grid[index];
            container.appendChild(cell);
        });
        container.addEventListener('mouseup', unFocus);
        container.addEventListener('mousemove', unFocus);
        return container;
    };
    Gameboard.prototype.miss = function (target) {
        var location = document.getElementById(target);
        location.classList.add('miss');
    };
    Gameboard.prototype.recieveAttack = function (e) {
        var location = document.getElementById(e.target.id);
        // type ships = { [key: string]: Ship };
        // const ships2: ships = { ...ships }; -> Importing and calling module functions
        // causes trests to break
        var patrol = new ship_1.Ship(2);
        var destroyer = new ship_1.Ship(3);
        var submarine = new ship_1.Ship(3);
        var battleship = new ship_1.Ship(4);
        var carrier = new ship_1.Ship(5);
        var ships = {
            patrol: ship_1.Ship,
            destroyer: ship_1.Ship,
            submarine: ship_1.Ship,
            battleship: ship_1.Ship,
            carrier: ship_1.Ship,
        };
        var target;
        console.log('ships2', ships);
        if (location.hasChildNodes()) {
            target = e.currentTarget.children[0].getAttribute('data-ship-type');
        }
        if (location.classList.contains('occupied')) {
            console.log(target);
            console.log('hit', ships[target]);
            try {
                ships[target].hit(e.target.id);
            }
            catch (error) {
                alert('runtime error ' + error.message);
            }
        }
        else {
            this.miss(e.target.id);
        }
    };
    return Gameboard;
}());
exports.Gameboard = Gameboard;
function allowDrop(e) {
    e.preventDefault();
}
exports.allowDrop = allowDrop;
function drop(e) {
    e.preventDefault();
    var data = e.dataTransfer.getData('text/html');
    var horizontal = document.getElementById(data);
    var coordinate = e.target.id;
    var sections = document.getElementsByClassName(horizontal.className);
    var x = Number(coordinate[0]);
    var y = Number(coordinate[coordinate.length - 1]);
    var len;
    var id;
    var outOfBounds;
    if (horizontal.hasChildNodes()) {
        len = horizontal.children.length;
        id = horizontal.children[0].id.slice(0, -1);
        outOfBounds = horizontal.children;
    }
    else {
        len = sections.length;
        id = horizontal.id.slice(0, -1);
        outOfBounds = sections;
    }
    if (horizontal.getAttribute('data-direction') === 'horizontal') {
        if (!preventOutOfBounds(outOfBounds, x, y) && !illegalPlacement(outOfBounds, x, y)) {
            for (var i = 0; i < len; i = i + 1) {
                var rangeX = x + i;
                document.getElementById(rangeX + "," + y)
                    .appendChild(document.getElementById(String(id + i)));
            }
        }
    }
    else {
        if (!preventOutOfBounds(outOfBounds, x, y) && !illegalPlacement(outOfBounds, x, y)) {
            for (var i = 0; i < len; i = i + 1) {
                var rangeY = y - i;
                document.getElementById(x + "," + rangeY)
                    .appendChild(document.getElementById(String(id + i)));
            }
        }
    }
    e.dataTransfer.clearData();
}
exports.drop = drop;
function drag(e) {
    e.dataTransfer.setData('text/html', e.currentTarget.children[0].id);
}
exports.drag = drag;
function change_direction(e) {
    var targets = document.getElementsByClassName(e.currentTarget.children[0].className);
    var coordinate = e.target.id;
    var x = Number(coordinate[0]);
    var y = Number(coordinate[coordinate.length - 1]);
    if (targets[0].getAttribute('data-direction') === 'horizontal') {
        if (!preventOutOfBounds(targets, x, y) && !check_collision(targets, x, y)) {
            for (var i = 0; i < targets.length; i = i + 1) {
                var rangeY = y - i;
                document.getElementById(x + "," + rangeY)
                    .appendChild(document.querySelector("#" + String(targets[i].id.slice(0, -1) + i) + ".ship"));
                document.querySelector(String("#" + (targets[i].id.slice(0, -1) + i) + ".ship"))
                    .setAttribute('data-direction', 'vertical');
            }
        }
    }
    else {
        if (!preventOutOfBounds(targets, x, y) && !check_collision(targets, x, y)) {
            for (var i = 0; i < targets.length; i = i + 1) {
                var rangeX = x + i;
                document.getElementById(rangeX + "," + y)
                    .appendChild(document.querySelector("#" + String(targets[i].id.slice(0, -1) + i) + ".ship"));
                document.querySelector(String("#" + (targets[i].id.slice(0, -1) + i) + ".ship"))
                    .setAttribute('data-direction', 'horizontal');
            }
        }
    }
}
exports.change_direction = change_direction;
function check_collision(ship, x, y) {
    for (var i = 0; i < ship.length - 1; i = i + 1) {
        if (ship[0].getAttribute('data-direction') === 'horizontal') {
            var location_1 = document.getElementById(String(x) + "," + String(y - i - 1));
            var feedback = document.querySelector('.feedback');
            if (location_1.classList.contains('occupied')) {
                feedback.innerHTML = 'Illegal Move';
                return true;
            }
        }
        else {
            var location_2 = document.getElementById(String(x + i + 1) + "," + String(y));
            var feedback = document.querySelector('.feedback');
            if (location_2.classList.contains('occupied')) {
                feedback.innerHTML = 'Illegal Move';
                return true;
            }
        }
    }
}
exports.check_collision = check_collision;
function preventOutOfBounds(ship, x, y) {
    for (var i = 0; i < ship.length; i = i + 1) {
        if (ship[0].getAttribute('data-direction') === 'horizontal') {
            var location_3 = document.getElementById(String(x + i) + "," + String(y));
            var feedback = document.querySelector('.feedback');
            if (Number(location_3.id[0]) > 9) {
                return true;
            }
        }
        else {
            var location_4 = document.getElementById(String(x) + "," + String(y - i));
            var feedback = document.querySelector('.feedback');
            if (Number(location_4.id[location_4.id.length - 1]) < 0) {
                return true;
            }
        }
    }
}
exports.preventOutOfBounds = preventOutOfBounds;
function illegalPlacement(ship, x, y) {
    for (var i = 0; i < ship.length; i = i + 1) {
        if (ship[0].getAttribute('data-direction') === 'horizontal') {
            var location_5 = document.getElementById(String(x + i) + "," + String(y));
            var feedback = document.querySelector('.feedback');
            if (location_5.classList.contains('occupied')) {
                feedback.innerHTML = 'Illegal placement';
                return true;
            }
        }
        else {
            var location_6 = document.getElementById(String(x) + "," + String(y - i));
            var feedback = document.querySelector('.feedback');
            if (location_6.classList.contains('occupied')) {
                feedback.innerHTML = 'Illegal placement';
                return true;
            }
        }
    }
}
exports.illegalPlacement = illegalPlacement;
function unFocus() {
    if (document.getSelection()) {
        document.getSelection().empty();
    }
    else {
        window.getSelection().removeAllRanges();
    }
}
exports.unFocus = unFocus;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var gameboard_1 = __webpack_require__(/*! ./gameboard */ "./src/gameboard.ts");
var ship_1 = __webpack_require__(/*! ./ship */ "./src/ship.ts");
// document.addEventListener('DOMContentLoaded', () => {
var gameboard = new gameboard_1.Gameboard();
var grid = gameboard.renderGrid();
var patrol = new ship_1.Ship(2);
var destroyer = new ship_1.Ship(3);
var submarine = new ship_1.Ship(3);
var battleship = new ship_1.Ship(4);
var carrier = new ship_1.Ship(5);
carrier.renderShip();
battleship.renderShip();
submarine.renderShip();
destroyer.renderShip();
patrol.renderShip();
function checkBoard(grid) {
    var game = grid.childNodes;
    game.forEach(function (value, index) {
        var element = game[index].getElementsByClassName('ship');
        if (element.length > 0) {
            game[index].setAttribute('draggable', 'true');
            game[index].classList.add('occupied');
        }
        else {
            game[index].setAttribute('draggable', 'false');
            game[index].classList.remove('occupied');
        }
    });
}
setInterval(function () { return checkBoard(grid); }, 250);
// });


/***/ }),

/***/ "./src/ship.ts":
/*!*********************!*\
  !*** ./src/ship.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Ship = /** @class */ (function () {
    function Ship(length) {
        this.length = length;
        this.health = length;
        this.sunk = false;
    }
    Ship.prototype.type = function () {
        if (this.length === 2) {
            return 'patrol';
        }
        if (this.length === 3 && document.body.contains(document.getElementById('submarine0'))
            && document.body.contains(document.getElementById('submarine1'))
            && document.body.contains(document.getElementById('submarine2'))) {
            return 'destroyer';
        }
        if (this.length === 3) {
            return 'submarine';
        }
        if (this.length === 4) {
            return 'battleship';
        }
        if (this.length === 5) {
            return 'carrier';
        }
    };
    Ship.prototype.hit = function (target) {
        var location = document.getElementById(target);
        location.classList.add('hit');
        this.health = this.health - 1;
    };
    Ship.prototype.isSunk = function () {
        if (this.health === 0) {
            this.sunk = true;
        }
    };
    Ship.prototype.createShip = function () {
        var ship = [];
        for (var size = 0; size < this.length; size = size + 1) {
            ship.push(size);
        }
        return ship;
    };
    Ship.prototype.renderShip = function () {
        var _this = this;
        var ship = this.createShip();
        var shipContainer = document.getElementById(this.type());
        ship.forEach(function (value, index) {
            var section = document.createElement('div');
            section.setAttribute('draggable', 'true');
            section.setAttribute('aria-grabbed', 'false');
            section.setAttribute('data-direction', 'horizontal');
            section.setAttribute('data-ship-type', _this.type());
            section.classList.add('ship');
            section.classList.add(_this.type());
            section.id = _this.type() + String(index);
            shipContainer.appendChild(section);
        });
        shipContainer.addEventListener('click', function () {
            var ship = shipContainer.children;
            for (var i = 0; i < ship.length; i = i + 1) {
                ship[i].setAttribute('aria-grabbed', 'true');
            }
        });
        shipContainer.setAttribute('data-direction', 'horizontal');
        shipContainer.addEventListener('dragstart', function (e) {
            drag(e);
        });
        return shipContainer;
    };
    return Ship;
}());
exports.Ship = Ship;
function drag(e) {
    e.dataTransfer.setData('text/html', e.target.parentNode.id);
}
exports.drag = drag;


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map