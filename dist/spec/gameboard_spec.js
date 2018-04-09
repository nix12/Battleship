// const grid = require('../src/gameboard');
import { Grid } from '../src/gameboard';
describe('Gameboard testing suite', function () {
    var grid = new Grid();
    it('should have a grid of 100 cells', function () {
        expect(grid.create_grid.length).toBe(100);
    });
});
