import { Gameboard } from './gameboard';
import { Ship } from './ship';
import * as Ships from './ships';
import { Player } from './player';

// document.addEventListener('DOMContentLoaded', () => {

const gameboard = new Gameboard();
const grid = gameboard.renderGrid();

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

function checkBoard(grid: any) {
  const game = grid.childNodes;

  game.forEach((value: string, index: number) => {
    const element = game[index].getElementsByClassName('ship');

    if (element.length > 0) {
      game[index].setAttribute('draggable', 'true');
      game[index].classList.add('occupied');
    } else {
      game[index].setAttribute('draggable', 'false');
      game[index].classList.remove('occupied');
    }
  });
}

setInterval(() => checkBoard(grid), 250);

// });
