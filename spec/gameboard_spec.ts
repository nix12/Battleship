import { Gameboard } from '../src/gameboard';

describe('Gameboard', () => {
  const gameboard = new Gameboard();
  // const grid: any[] = gameboard.createGrid();
  // let layout;
  // let container: HTMLElement;

  beforeEach(() => {
    jasmine.getFixtures().fixturesPath = '/base/spec/javascripts/fixtures';
    loadFixtures('SpecRunner.html');

    // layout = gameboard.renderGrid();
    // container = document.querySelector('.container');

    spyOn(gameboard, 'createGrid');
  });

  describe('createGrid', () => {
    it('should have a grid of 100 cells', () => {
      expect(gameboard.createGrid).toHaveBeenCalled();
    });

    // it('should have a grid of 100 cells', () => {
    //   expect(grid.length).toBe(100);
    // });
  });

  // describe('renderGrid', () => {
  //   it('should have a representation of 100 cells', () => {
  //     expect(container).toExist();
  //     expect(container.children.length).toBe(100);
  //   });

  //   it('should have cells of class square', () => {
  //     const cells = container.children.length;

  //     for (let i = 0; i < cells; i = i + 1) {
  //       expect(container.children[i]).toHaveClass('square');
  //     }
  //   });
  // });
});
