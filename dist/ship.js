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
        return 'undefined';
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
        // console.log('document', document);
        var shipContainer = document.body.querySelector("#" + this.type());
        // const shipContainer
        // console.log('type', this.type());
        // console.log('shipContainer', shipContainer);
        // console.log('body', document.body);
        // console.log('type', document.body.querySelectorAll('*'));
        ship.forEach(function (value, index) {
            var section = document.createElement('div');
            section.setAttribute('draggable', 'true');
            section.setAttribute('aria-grabbed', 'false');
            section.setAttribute('data-direction', 'horizontal');
            section.setAttribute('data-ship-type', _this.type());
            section.classList.add('ship');
            section.classList.add(_this.type());
            section.id = _this.type() + String(index);
            // console.log('shipContainer', shipContainer);
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
//# sourceMappingURL=ship.js.map