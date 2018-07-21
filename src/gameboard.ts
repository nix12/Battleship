import { Ship } from './ship';
import { Ships as ships } from './ships';

export class Gameboard {
  createGrid(): any[] {
    const grid: any[] = [];
    let row: number;
    let column: number;

    for (row = 0; row < 10; row = row + 1) {
      for (column = 0; column < 10; column = column + 1) {
        grid.push([column, row]);
      }
    }

    return grid;
  }

  renderGrid(): HTMLElement {
    const grid: any[] = this.createGrid();
    const container: HTMLElement = document.querySelector('.container');

    grid.forEach((value: string, index: number) => {
      const cell: HTMLElement = document.createElement('div');

      cell.addEventListener('drop', (e: any) => {
        drop(e);
      });

      cell.addEventListener('dragover', (e: any) => {
        allowDrop(e);
      });

      cell.addEventListener('dragstart', (e: any) => {
        drag(e);
      });

      cell.addEventListener('dblclick', (e: any) => {
        change_direction(e);
      });

      cell.addEventListener('click', (e: any) => {
        this.recieveAttack(e);
      });

      cell.setAttribute('draggable', 'false');
      cell.classList.add('square');
      cell.id = grid[index];

      container.appendChild(cell);
    });

    container.addEventListener('mouseup', unFocus);
    container.addEventListener('mousemove', unFocus);

    return container;
  }

  miss(target: string): void {
    const location = document.getElementById(target);

    location.classList.add('miss');
  }

  recieveAttack(e: any): void {
    const location: HTMLElement = document.getElementById(e.target.id);
    type ships = { [key: string]: Ship };
    const ships2: ships = { ...ships };
    let target: number;

    if (location.hasChildNodes()) {
      target = e.currentTarget.children[0].getAttribute('data-ship-type');
    }

    if (location.classList.contains('occupied')) {
      console.log(target);
      console.log('hit', ships2[target]);

      try {
        ships2[target].hit(e.target.id);
      } catch (error) {
        alert('runtime error ' + error.message);
      }

    } else {
      this.miss(e.target.id);
    }
  }
}

function allowDrop(e: Event): void {
  e.preventDefault();
}

function drop(e: any): void {
  e.preventDefault();
  const data = e.dataTransfer.getData('text/html');
  const horizontal = document.getElementById(data);
  const coordinate = e.target.id;
  const sections = document.getElementsByClassName(horizontal.className);
  const x = Number(coordinate[0]);
  const y = Number(coordinate[coordinate.length - 1]);
  let len;
  let id;
  let outOfBounds;

  if (horizontal.hasChildNodes()) {
    len = horizontal.children.length;
    id = horizontal.children[0].id.slice(0, -1);
    outOfBounds = horizontal.children;
  } else {
    len = sections.length;
    id = horizontal.id.slice(0, -1);
    outOfBounds = sections;
  }

  if (horizontal.getAttribute('data-direction') === 'horizontal') {
    if (!preventOutOfBounds(outOfBounds, x, y) && !illegalPlacement(outOfBounds, x, y)) {
      for (let i = 0; i < len ; i = i + 1) {
        const rangeX = x + i;

        document.getElementById(`${ rangeX },${ y }`)
          .appendChild(document.getElementById(String(id + i)));
      }
    }
  } else {
    if (!preventOutOfBounds(outOfBounds, x, y) && !illegalPlacement(outOfBounds, x, y)) {
      for (let i = 0; i < len; i = i + 1) {
        const rangeY = y - i;

        document.getElementById(`${ x },${ rangeY }`)
          .appendChild(document.getElementById(String(id + i)));
      }
    }
  }

  e.dataTransfer.clearData();
}

function drag(e: any): void {
  e.dataTransfer.setData('text/html', e.currentTarget.children[0].id);
}

function change_direction(e: any): void {
  const targets = document.getElementsByClassName(e.currentTarget.children[0].className);
  const coordinate = e.target.id;
  const x = Number(coordinate[0]);
  const y = Number(coordinate[coordinate.length - 1]);

  if (targets[0].getAttribute('data-direction') === 'horizontal') {
    if (!preventOutOfBounds(targets, x, y) && !check_collision(targets, x, y)) {
      for (let i = 0; i < targets.length; i = i + 1) {
        const rangeY = y - i;

        document.getElementById(`${ x },${ rangeY }`)
          .appendChild(document.querySelector(`#${ String(targets[i].id.slice(0, -1) + i) }.ship`));
        document.querySelector(String(`#${ targets[i].id.slice(0, -1) + i }.ship`))
          .setAttribute('data-direction', 'vertical');
      }
    }
  } else {
    if (!preventOutOfBounds(targets, x, y) && !check_collision(targets, x, y)) {
      for (let i = 0; i < targets.length; i = i + 1) {
        const rangeX = x + i;

        document.getElementById(`${ rangeX },${ y }`)
          .appendChild(document.querySelector(`#${ String(targets[i].id.slice(0, -1) + i) }.ship`));
        document.querySelector(String(`#${ targets[i].id.slice(0, -1) + i }.ship`))
          .setAttribute('data-direction', 'horizontal');
      }
    }
  }
}

function check_collision(ship: any, x: number, y: number): boolean {
  for (let i = 0; i < ship.length - 1; i = i + 1) {
    if (ship[0].getAttribute('data-direction') === 'horizontal') {
      const location = document.getElementById(`${ String(x) },${ String(y - i - 1) }`);
      const feedback = document.querySelector('.feedback');

      if (location.classList.contains('occupied')) {
        feedback.innerHTML = 'Illegal Move';
        return true;
      }
    } else {
      const location = document.getElementById(`${ String(x + i + 1) },${ String(y) }`);
      const feedback = document.querySelector('.feedback');

      if (location.classList.contains('occupied')) {
        feedback.innerHTML = 'Illegal Move';
        return true;
      }
    }
  }
}

function preventOutOfBounds(ship: any, x: number, y: number): boolean {
  for (let i = 0; i < ship.length; i = i + 1) {
    if (ship[0].getAttribute('data-direction') === 'horizontal') {
      const location = document.getElementById(`${ String(x + i) },${ String(y) }`);
      const feedback = document.querySelector('.feedback');

      if (Number(location.id[0]) > 9) {
        return true;
      }
    } else {
      const location = document.getElementById(`${ String(x) },${ String(y - i) }`);
      const feedback = document.querySelector('.feedback');

      if (Number(location.id[location.id.length - 1]) < 0) {
        return true;
      }
    }
  }
}

function illegalPlacement(ship: any, x: number, y: number): boolean {
  for (let i = 0; i < ship.length; i = i + 1) {
    if (ship[0].getAttribute('data-direction') === 'horizontal') {
      const location = document.getElementById(`${ String(x + i) },${ String(y) }`);
      const feedback = document.querySelector('.feedback');

      if (location.classList.contains('occupied')) {
        feedback.innerHTML = 'Illegal placement';
        return true;
      }
    } else {
      const location = document.getElementById(`${ String(x) },${ String(y - i) }`);
      const feedback = document.querySelector('.feedback');

      if (location.classList.contains('occupied')) {
        feedback.innerHTML = 'Illegal placement';
        return true;
      }
    }
  }
}

function unFocus(): void {
  if (document.getSelection()) {
    document.getSelection().empty();
  } else {
    window.getSelection().removeAllRanges();
  }
}
