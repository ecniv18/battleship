import GAME from "./GAME";

export default class Gameboard {
  constructor() {
    this.grid = this.#generateGrid(10);
    this.stats = { hit: 0, miss: 0 };
  }

  recieveAttack(coor, targetPlayerShips) {
    const block = this.grid[coor.x][coor.y];
    if (block.destroyed) return;
    if (block.shipId !== null) {
      targetPlayerShips[this.grid[coor.x][coor.y].shipId].hit();
      this.stats.hit += 1;
    } else {
      this.stats.miss += 1;
    }

    block.destroyed = true;
  }

  placeShip(playerName, ship, coor) {
    if (ship.orientation === "horizontal") {
      if (coor.y + ship.length <= 10) {
        for (let i = 0; i < ship.length; i++) {
          this.grid[coor.x][coor.y + i].shipId = ship.id;
        }
      }
    } else if (ship.orientation === "vertical") {
      if (coor.x - ship.length <= 10) {
        for (let i = 0; i < ship.length; i++) {
          this.grid[coor.x + i][coor.y].shipId = ship.id;
        }
      }
    }
    if (playerName === "player") {
      GAME.playerOne.ships[ship.id].placed = true;
    } else if (playerName === "computer") {
      GAME.playerTwo.ships[ship.id].placed = true;
    }
  }

  #generateGrid(size) {
    const arr = [];
    for (let i = 0; i < size; i++) {
      const row = [];
      for (let j = 0; j < size; j++) {
        row.push(new Block({ x: i, y: j }));
      }
      arr.push(row);
    }
    return arr;
  }
}

class Block {
  constructor(coor) {
    this.shipId = null;
    this.coordinates = coor;
    this.destroyed = false;
  }
}
