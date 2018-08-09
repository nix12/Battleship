import { Ship } from '../src/ship';

describe('Ship', () => {
  let html = `<div class="feedback"></div>
    <section class="game">
      <div class="container"></div>
        <section class="ships">
        <div class="ship_container" id="carrier"></div>
        <div class="ship_container" id="battleship"></div>
        <div class="ship_container" id="submarine"></div>
        <div class="ship_container" id="destroyer"></div>
        <div class="ship_container" id="patrol"></div>
      </section> 
    </section>
    <script type="text/javascript" src="../dist/bundle.js"></script>`;
  document.body.innerHTML = html;

  const shipLength: any[] = [];
  for (let i = 0; i < 5; i = i + 1) {
    shipLength.push([]);
  }

  const mockCreateShip = jest.fn().mockReturnValue(shipLength);
  jest.mock('../src/ship', () => {
    return jest.fn().mockImplementation(() => {
      return { createShip: mockCreateShip };
    });
  });

  const shipContainer: HTMLElement = document.getElementById('carrier');
  shipLength.forEach((value: string, index: number) => {
    const cell: HTMLElement = document.createElement('div');
    shipContainer.appendChild(cell);
  });

  const mockRenderShip = jest.fn().mockReturnValue(shipContainer);
  jest.mock('../src/ship', () => {
    return jest.fn().mockImplementation(() => {
      return { renderShip: mockRenderShip };
    });
  });

  beforeEach(() => {
    mockCreateShip.mockClear();
    mockRenderShip.mockClear();
  });

  afterEach(() => {
    html = `<div class="feedback"></div>
      <section class="game">
        <div class="container"></div>
          <section class="ships">
          <div class="ship_container" id="carrier"></div>
          <div class="ship_container" id="battleship"></div>
          <div class="ship_container" id="submarine"></div>
          <div class="ship_container" id="destroyer"></div>
          <div class="ship_container" id="patrol"></div>
        </section> 
      </section>
      <script type="text/javascript" src="../dist/bundle.js"></script>`;
    document.body.innerHTML = html;
  });

  test('should instantiated', () => {
    const ship = new Ship(5);

    expect(ship.length).toBe(5);
    expect(ship.health).toBe(5);
    expect(ship.sunk).toBe(false);

    expect(ship).toHaveProperty('type');
    expect(ship).toHaveProperty('hit');
    expect(ship).toHaveProperty('isSunk');
    expect(ship).toHaveProperty('createShip');
    expect(ship).toHaveProperty('renderShip');
  });  

  describe('#createShip', () => {
    test('should call createShip()', () => {  
      mockCreateShip();

      expect(mockCreateShip).toHaveBeenCalledTimes(1);
    });

    test('should be called', () => {
      expect(mockCreateShip().length).toBe(5);
    });

    test('should create ship', () => {
      const ship = new Ship(5);

      expect(ship.createShip().length).toBe(5);
    });
  });

  describe('#renderShip', () => {
    test('should call renderShip()', () => {
      mockRenderShip();
      
      expect(mockRenderShip).toHaveBeenCalledTimes(1);
    });

    test('should render a ship of 5 cells', () => {
      const ship = new Ship(5);
      const renderedShip = ship.renderShip();

      expect(renderedShip).toEqual(document.querySelector('.ship_container'));
      expect(document.querySelectorAll('#carrier div').length).toBe(5);
    });

    test('should have data-direction horizontal', () => {
      const ship = new Ship(5);
      ship.renderShip();

      for (let i: number; i < ship.length; i = i + 1) {
        expect(document.getElementById(`${ ship.type() }${ i }`).getAttribute('data-direction'))
          .toBe('horizontal'); 
      }
    });

    // test('should have aria-grabbed of true', () => {
    //   const ship = new Ship(5);
    //   ship.renderShip();
      
    //   for (let i: number; i < ship.length; i = i + 1) {
    //     expect(document.getElementById(`${ ship.type() }${ i }`).getAttribute('aria-grabbed'))
    //       .toBe(true); 
    //   }
    // });
  });

  describe('#type', () => {
    test('should return carrier if ship length equals 5', () => {
      const carrier = new Ship(5);
      const battleship = new Ship(4);
      const submarine = new Ship(3);      
      const destroyer = new Ship(3);
      const patrol = new Ship(2);

      expect(carrier.type()).toBe('carrier');
      expect(battleship.type()).toBe('battleship');
      expect(submarine.type()).toBe('submarine');
      submarine.renderShip();
      expect(destroyer.type()).toBe('destroyer');
      expect(patrol.type()).toBe('patrol');
    });
  });
});
