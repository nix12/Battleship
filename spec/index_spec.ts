import { Gameboard } from '../src/gameboard';
import { Ship } from '../src/ship';
import { Ships as ships } from '../src/ships';

describe('Gameboard', () => {
  const gameboard = new Gameboard();
  // const grid: any[] = gameboard.createGrid();
  // let layout;
  // let container: HTMLElement;

  beforeEach(() => {
    // jasmine.getFixtures().fixturesPath = '/base/spec/javascripts/fixtures';
    // loadFixtures('Specvalid jasmineRunner.html');

  //   layout = gameboard.renderGrid();
  //   container = document.querySelector('.container');

    spyOn(gameboard, 'createGrid').and.callThrough();
  });

  describe('createGrid', () => {
    it('should have a grid of 100 cells', () => {
      expect(gameboard.createGrid).toHaveBeenCalled();
    });

    // it('should have a grid of 100 cells', () => {
    //   expect(grid.length).toBe(100);
    // });
  });

  describe('renderGrid', () => {
    // it('should have a representation of 100 cells', () => {
    //   expect(container).toExist();
    //   expect(container.children.length).toBe(100);
    // });

    // it('should have cells of class square', () => {
    //   const cells = container.children.length;

    //   for (let i = 0; i < cells; i = i + 1) {
    //     expect(container.children[i]).toHaveClass('square');
    //   }
    // });
  });
});

describe('Ship', () => {
  const ship = new Ship(5);
  const shipCreation: any[] = ship.createShip();
  // let shipContainer: HTMLElement;

  beforeEach(() => {
    jasmine.getFixtures().fixturesPath = '/base/spec/javascripts/fixtures';
    loadFixtures('SpecRunner.html');

    spyOn(ship, 'renderShip').and.callThrough();
    ship.renderShip();

    // shipContainer = ship.renderShip();
  });

  describe('createShip', () => {
    it('should create a ship with 5 sections', () => {
      expect(shipCreation.length).toBe(5);
    });   
  });

  // describe('renderShip', () => {
  //   // it('should render a ship with 5 sections', () => {
  //   //   expect(shipContainer).toExist();
  //   //   expect(shipContainer.children.length).toBe(5);
  //   // });  
    
  //   it('should be called', () => {
  //     expect(ship.renderShip).toHaveBeenCalled();
  //   });
  // });

  // describe('type', () => {
  //   it('should return ship type based on length', () => {
  //     expect(ship.type()).toBe('carrier');
  //   });   
  // });

  describe('hit', () => {
    
  });
});

// describe('Ships', () => {
//   beforeEach(() => {
//     jasmine.getFixtures().fixturesPath = '/base/spec/javascripts/fixtures';
//     loadFixtures('SpecRunner.html');
//   });

//   describe('should have all ships created', () => {
//     it('carrier', () => {
//       // expect(ships.carrier).toHaveBeenCalled();
//       expect(ships.carrier.length).toBe(5);
//     });
//   });
// });

// describe('Player', () => {
  
// });

// describe('Index', () => {

// });
