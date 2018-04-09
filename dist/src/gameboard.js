var Grid = /** @class */ (function () {
    function Grid() {
    }
    Grid.prototype.create_grid = function () {
        var grid = [];
        var row;
        var column;
        for (row = 0; row < 10; row++) {
            for (column = 0; column < 10; column++) {
                grid.push([row, column]);
            }
        }
        return grid;
    };
    Grid.prototype.render = function () {
        var grid = this.create_grid();
        var container = document.querySelector('.container');
        grid.forEach(function (value, index) {
            var cell = document.createElement('div');
            cell.classList.add('square');
            cell.id = index;
            cell.innerHTML = index;
            container.appendChild(cell);
        });
    };
    return Grid;
}());
export { Grid };
