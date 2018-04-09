var Ship = /** @class */ (function () {
    function Ship(length) {
        this.length = length;
        console.log("Ships");
    }
    Ship.prototype.hit = function () {
    };
    Ship.prototype.isSunk = function () {
    };
    Ship.prototype.orientation = function () {
        return Math.floor(Math.random() * 10);
    };
    Ship.prototype.place_ship = function () {
        var location = Math.floor(Math.random() * 100);
        if (this.orientation() <= 4) {
            for (var row = 0; row < this.length; row++) {
                if ((location + row) % 10 === 0 || location + row > 99) {
                    var cell = document.getElementById(String(location - row));
                    cell.classList.add('ship');
                }
                else {
                    var cell = document.getElementById(String(location + row));
                    cell.classList.add('ship');
                }
            }
        }
        else {
            for (var column = 0; column < this.length + 10; column = column + 10) {
                if (location + column > 99) {
                    var cell = document.getElementById(String(location - column));
                    cell.classList.add('ship');
                }
                else {
                    var cell = document.getElementById(String(location + column));
                    cell.classList.add('ship');
                }
            }
        }
    };
    Ship.prototype.print_length = function () {
        console.log(this.length);
    };
    return Ship;
}());
export { Ship };
