import { Gameboard } from './gameboard';
import { Ship } from './ship';
import { Ships as ships } from './ships';
import { Player } from './player';

// document.addEventListener('DOMContentLoaded', () => {

const gameboard = new Gameboard();
const grid = gameboard.renderGrid();

ships.carrier;
ships.battleship;
ships.submarine;
ships.destroyer;
ships.patrol;

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
