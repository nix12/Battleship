import { Ship } from './ship';

export module Ships {
  export const patrol: Ship = new Ship(2);
  export const destroyer: Ship = new Ship(3);
  export const submarine: Ship = new Ship(3);
  export const battleship: Ship = new Ship(4);
  export const carrier: Ship = new Ship(5);

  carrier.renderShip();
  battleship.renderShip();
  submarine.renderShip();
  destroyer.renderShip();
  patrol.renderShip();
}
