import 'jest';
import { Gameboard } from '../src/gameboard';

describe('Gameboard', () => {
  const gameboard: Gameboard = new Gameboard();
  const grid: any[] = gameboard.createGrid();

  describe('createGrid', () => {
    it('should have a grid of 100 cells', () => {
      expect(gameboard.createGrid).toHaveBeenCalled();
    });

    it('should have a grid of 100 cells', () => {
      expect(grid.length).toBe(100);
    });
  });
});
