import { Ship } from './ship';

const patrol: Ship = new Ship(2);
const destroyer: Ship = new Ship(3);
const submarine: Ship = new Ship(3);
const battleship: Ship = new Ship(4);
const carrier: Ship = new Ship(5);

carrier.renderShip();
battleship.renderShip();
submarine.renderShip();
destroyer.renderShip();
patrol.renderShip();
