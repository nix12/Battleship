import { Gameboard } from '../src/gameboard';

describe('Gameboard', () => {
  // window.__html__ = __html__['SpecRunner.html'];
  // (<any>window).__html__ = __html__['SpecRunner.html'];
  const gameboard: Gameboard = new Gameboard();
  // const grid: any[] = gameboard.createGrid();
  // let layout;
  // let container: HTMLElement;

  beforeEach(() => {
    const fixture = '<div class="feedback"></div>' +
		
		'<section class="game">' +
			'<div class="container"></div>' +
			
			'<section class="ships">' +
				'<div class="ship_container" id="carrier"></div>' +
				'<div class="ship_container" id="battleship"></div>' +
  			'<div class="ship_container" id="submarine"></div>' +
				'<div class="ship_container" id="destroyer"></div>' +
				'<div class="ship_container" id="patrol"></div>' +
			'</section>' +
    '</section>';
    
    document.body.insertAdjacentHTML('afterbegin', fixture);

    // layout = gameboard.renderGrid();
    // container = document.querySelector('.container');

    // spyOn(gameboard, 'createGrid');
  });

  describe('createGrid', () => {
    it('should have a grid of 100 cells', () => {
      // expect(gameboard.createGrid).toHaveBeenCalled();
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
