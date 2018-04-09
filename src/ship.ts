export class Ship {
  length: number;
  health: number;
  sunk: boolean;

  constructor(length: number) {
    this.length = length;
    this.health = length;
    this.sunk = false;
  }

  type(): string {
    if (this.length === 2) {
      return 'patrol';
    }

    if (this.length === 3 && document.body.contains(document.getElementById('submarine0'))
                          && document.body.contains(document.getElementById('submarine1'))
                          && document.body.contains(document.getElementById('submarine2'))
      ) {
      return 'destroyer';
    }

    if (this.length === 3) {
      return 'submarine';
    }

    if (this.length === 4) {
      return 'battleship';
    }

    if (this.length === 5) {
      return 'carrier';
    }
  }

  hit(target: string): void {
    const location = document.getElementById(target);
    
    location.classList.add('hit');
    this.health = this.health - 1;
  }

  isSunk(): void {
    if (this.health === 0) {
      this.sunk = true;
    }
  }

  createShip(): number[] {
    const ship: number[] = [];

    for (let size = 0; size < this.length; size = size + 1) {
      ship.push(size);
    }

    return ship;
  }

  renderShip(): HTMLElement {
    // const j = jQuery.noConflict();
    const ship: number[] = this.createShip();
    const shipContainer: HTMLElement = document.querySelector(`#${ this.type() }`);
    console.log(this.type());
    // console.log(document);
    // console.log(document.getElementById(this.type()));
    ship.forEach((value: number, index: number) => {
      const section: HTMLElement = document.createElement('div');

      section.setAttribute('draggable', 'true');
      section.setAttribute('aria-grabbed', 'false');
      section.setAttribute('data-direction', 'horizontal');
      section.setAttribute('data-ship-type', this.type());

      section.classList.add('ship');
      section.classList.add(this.type());
      section.id = this.type() + String(index);
      shipContainer.appendChild(section);
    });

    shipContainer.addEventListener('click', () => {
      const ship = shipContainer.children;

      for (let i = 0; i < ship.length; i = i + 1) {
        ship[i].setAttribute('aria-grabbed', 'true');
      }
    });

    shipContainer.setAttribute('data-direction', 'horizontal');

    shipContainer.addEventListener('dragstart', (e: any) => {
      drag(e);
    });

    return shipContainer;
  }
}

function drag(e: any): void {
  e.dataTransfer.setData('text/html', e.target.parentNode.id);
}
