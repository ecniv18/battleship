import Player from "./Player";

export default class GAME {
  static playerOne = new Player("player");
  static playerTwo = new Player("computer");
  static turn = this.playerOne.name;
  static winner = null;

  static #checkWinner() {
    let destroyedShipsOne = 0;
    const shipsOne = this.playerTwo.ships;
    for (let i = 0; i < shipsOne.length; i++) {
      if (shipsOne[i].destroyed) {
        destroyedShipsOne += 1;
      }
    }

    let destroyedShipsTwo = 0;
    const shipsTwo = this.playerOne.ships;
    for (let i = 0; i < shipsTwo.length; i++) {
      if (shipsTwo[i].destroyed) {
        destroyedShipsTwo += 1;
      }
    }
    if (destroyedShipsOne >= this.playerTwo.ships.length) {
      this.winner = this.playerOne.name;
      return;
    }
    if (destroyedShipsTwo >= this.playerOne.ships.length) {
      this.winner = this.playerTwo.name;
      return;
    }
  }

  static selectShip(playerName, shipId) {
    if (playerName === this.playerOne.name) {
      this.playerOne.selectShip(shipId);
    } else {
      this.playerTwo.selectShip(shipId);
    }
  }

  static attack(coor) {
    if (this.turn === this.playerOne.name) {
      this.playerTwo.board.recieveAttack(coor, this.playerTwo.ships);
    } else if (this.turn == this.playerTwo.name) {
      this.playerOne.board.recieveAttack(coor, this.playerOne.ships);
    }
    this.#checkWinner();

    // // Switches turn every attack
    // this.turn =
    //   this.turn === this.playerOne.name
    //     ? this.playerTwo.name
    //     : this.playerOne.name;
  }

  static deployShip(playerName, ship, coor) {
    if (playerName === this.playerOne.name) {
      this.playerOne.board.placeShip(playerName, ship, coor);
    } else if (playerName === this.playerTwo.name) {
      this.playerTwo.board.placeShip(playerName, ship, coor);
    }
  }

  static deployComputerShip() {
    this.playerTwo.ships.forEach((ship) => {
      const rng = Math.floor(Math.random() * 2);
      if (rng === 1) {
        ship.toggleOrientation();
      }

      let placed = false;

      while (!placed) {
        const randX = Math.floor(Math.random() * 10);
        const randY = Math.floor(Math.random() * 10);
        const block = this.playerTwo.board.grid[randX][randY];

        let canPlace = true;

        if (ship.orientation === "horizontal") {
          if (randY + ship.length <= 10) {
            // make sure to choose the block that don't make the ship of length N overflow off the grid | HORIZONTALLY
            for (let i = 0; i < ship.length; i++) {
              if (this.playerTwo.board.grid[randX][randY + i].shipId !== null) {
                canPlace = false; // prevent from placing the ship
                break; // break the loop right away when the block at x and y is already occupied by a different ship
              }
            }
            if (canPlace) {
              this.deployShip(GAME.playerTwo.name, ship, block.coordinates);
              placed = true;
            }
          }
        } else if (ship.orientation === "vertical") {
          if (randX + ship.length <= 10) {
            // VERTICALLY

            for (let i = 0; i < ship.length; i++) {
              if (this.playerTwo.board.grid[randX + i][randY].shipId !== null) {
                canPlace = false;
                break;
              }
            }
            if (canPlace) {
              this.deployShip(GAME.playerTwo.name, ship, block.coordinates);
              placed = true;
            }
          }
        }
      }
    });
  }
}
