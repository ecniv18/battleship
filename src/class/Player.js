import Gameboard from "./Gameboard";
import Ship from "./Ship";

export default class Player {
  constructor(name) {
    this.name = name;
    this.ships = this.#generateShips();
    this.board = new Gameboard();
    this.selectedShip = null;
  }

  #generateShips() {
    return [
      new Ship(2, 0),
      new Ship(2, 1),
      new Ship(3, 2),
      new Ship(3, 3),
      new Ship(4, 4),
    ];
  }
  s;
  selectShip(shipId) {
    for (let i = 0; i < this.ships.length; i++) {
      if (this.ships[i].id === shipId) {
        if (this.ships[i].selected) {
          this.selectedShip = null;
          this.ships[i].deSelect();
        } else {
          this.selectedShip = this.ships[i];
          this.ships[i].select();
        }
      } else {
        this.ships[i].deSelect();
      }
    }
  }

  getGrid() {
    return this.board.grid;
  }
}
