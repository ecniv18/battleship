import Gameboard from "./Gameboard";
import Ship from "./Ship";

export default class Player {
  constructor(name) {
    this.name = name;
    this.ships = this.#generateShips();
    this.board = new Gameboard();
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
}
