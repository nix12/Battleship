"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ships_1 = require("./ships");
var Gameboard = /** @class */ (function () {
    function Gameboard() {
        console.log('SOMETHING', document.getElementById('#battleship'));
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
        var ships2 = __assign({}, ships_1.Ships);
        var target;
        if (location.hasChildNodes()) {
            target = e.currentTarget.children[0].getAttribute('data-ship-type');
        }
        if (location.classList.contains('occupied')) {
            console.log(target);
            console.log('hit', ships2[target]);
            try {
                ships2[target].hit(e.target.id);
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
function drag(e) {
    e.dataTransfer.setData('text/html', e.currentTarget.children[0].id);
}
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
function unFocus() {
    if (document.getSelection()) {
        document.getSelection().empty();
    }
    else {
        window.getSelection().removeAllRanges();
    }
}
//# sourceMappingURL=gameboard.js.map