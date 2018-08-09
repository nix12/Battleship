import { Gameboard } from '../src/gameboard';
import { Ship } from '../src/ship';

describe('Gameboard', () => {
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

  const grid: any[] = [];
  for (let i = 0; i < 100; i = i + 1) {
    grid.push([]);
  }

  const mockCreateGrid = jest.fn().mockReturnValue(grid);
  jest.mock('../src/gameboard', () => {
    return jest.fn().mockImplementation(() => {
      return { createGrid: mockCreateGrid };
    });
  });

  const container: HTMLElement = document.querySelector('.container');
  grid.forEach((value: string, index: number) => {
    const cell: HTMLElement = document.createElement('div');
    container.appendChild(cell);
  });

  const mockRenderGrid = jest.fn().mockReturnValue(container);
  jest.mock('../src/gameboard', () => {
    return jest.fn().mockImplementation(() => {
      return { renderGrid: mockRenderGrid };
    });
  });

  beforeEach(() => {
    mockCreateGrid.mockClear();
    mockRenderGrid.mockClear();
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

  test('should be instantiated', () => {
    const gameboard = new Gameboard();
    
    expect(gameboard).toHaveProperty('createGrid');
    expect(gameboard).toHaveProperty('renderGrid');
    expect(gameboard).toHaveProperty('miss');
    expect(gameboard).toHaveProperty('recieveAttack');
  });

  describe('#createGrid', () => {  
    test('should call createGrid()', () => {  
      mockCreateGrid();

      expect(mockCreateGrid).toHaveBeenCalledTimes(1);
    });

    test('should create 100 cells', () => {
      const gameboard = new Gameboard();

      expect(gameboard.createGrid().length).toBe(100);
    });
  });

  describe('#renderGrid', () => {
    test('should call renderGrid()', () => {
      mockRenderGrid();

      expect(mockRenderGrid).toHaveBeenCalledTimes(1);
    });

    test('should render 100 cells', () => {
      const gameboard = new Gameboard();
      gameboard.renderGrid();
      
      expect(document.querySelectorAll('.container div').length).toBe(100);
    });
  });
});

describe('Drag and drop functions', () => {
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

  const placeShip = (cellId: string): void => {
    const location = cellId.split(',');
    const x = Number(location[0]);
    const y = Number(location[1]);

    for (let i: number = 0; i < 5; i = i + 1) {
      const rangeX = x + i;

      document.getElementById(`${ rangeX },${ y }`)
        .appendChild(document.getElementById('carrier' + i));
    }
  };

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

  test('#checkCollision', () => {
    const gameboard = new Gameboard();
    gameboard.renderGrid();
    const carrier = new Ship(5);
    carrier.renderShip();
    const battleship = new Ship(4);
    battleship.renderShip();

    placeShip('0,0');
    console.log(document.body.innerHTML);
  });
});
