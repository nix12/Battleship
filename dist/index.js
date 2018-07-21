"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gameboard_1 = require("./gameboard");
var ships_1 = require("./ships");
document.addEventListener('DOMContentLoaded', function () {
    var gameboard = new gameboard_1.Gameboard();
    var grid = gameboard.renderGrid();
    ships_1.Ships.carrier;
    ships_1.Ships.battleship;
    ships_1.Ships.submarine;
    ships_1.Ships.destroyer;
    ships_1.Ships.patrol;
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
});
//# sourceMappingURL=index.js.map