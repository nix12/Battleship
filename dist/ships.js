"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ship_1 = require("./ship");
var Ships;
(function (Ships) {
    Ships.patrol = new ship_1.Ship(2);
    Ships.destroyer = new ship_1.Ship(3);
    Ships.submarine = new ship_1.Ship(3);
    Ships.battleship = new ship_1.Ship(4);
    Ships.carrier = new ship_1.Ship(5);
    Ships.carrier.renderShip();
    Ships.battleship.renderShip();
    Ships.submarine.renderShip();
    Ships.destroyer.renderShip();
    Ships.patrol.renderShip();
})(Ships = exports.Ships || (exports.Ships = {}));
//# sourceMappingURL=ships.js.map