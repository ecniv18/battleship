import Gameboard from "../class/Gameboard";
import Ship from "../class/Ship";
import GAME from "../class/GAME";

describe("10x10 grid array", () => {
  test("Correctly get 10x10 grid", () => {
    const gameboard = new Gameboard();
    gameboard.grid.forEach((row) => {
      row.forEach((block) => {
        expect(block).toBeInstanceOf(Object);
      });
    });
  });
});

describe("Ship Deployment", () => {
  test("Successfully deploy ship", () => {
    const board = new Gameboard();
    const ship = new Ship(2, 0);

    board.placeShip(ship, { x: 1, y: 0 });
    expect(board.grid[1][0]).toHaveProperty("shipId", 0);
  });

  test("Deploy ship horizontally", () => {
    const board = new Gameboard();
    const ship = new Ship(3, 2); // default orientation is horizontal
    board.placeShip(ship, { x: 2, y: 1 });
    const occupiedBlock = {
      block1: board.grid[2][0].shipId,
      block2: board.grid[2][1].shipId,
      block3: board.grid[2][2].shipId,
      block4: board.grid[2][3].shipId,
      block5: board.grid[2][4].shipId,
    };

    expect(occupiedBlock).toEqual({
      block1: null,
      block2: 2,
      block3: 2,
      block4: 2,
      block5: null,
    });
  });

  test("Deply ship vertically", () => {
    const board = new Gameboard();
    const ship = new Ship(3, 2);
    ship.toggleOrientation(); // switch to vertical
    board.placeShip(ship, { x: 5, y: 1 });
    const occupiedBlock = {
      block1: board.grid[6][1].shipId,
      block2: board.grid[5][1].shipId,
      block3: board.grid[4][1].shipId,
      block4: board.grid[3][1].shipId,
      block5: board.grid[2][1].shipId,
    };

    expect(occupiedBlock).toEqual({
      block1: null,
      block2: 2,
      block3: 2,
      block4: 2,
      block5: null,
    });
  });

  test("Prevent from deploying beyond the grid // horizontal", () => {
    const board = new Gameboard();
    const ship = new Ship(3, 2);
    board.placeShip(ship, { x: 5, y: 6 });

    const occupiedBlock = {
      block1: board.grid[6][3].shipId,
      block2: board.grid[5][4].shipId,
      block3: board.grid[4][5].shipId,
      block4: board.grid[3][6].shipId,
      block5: board.grid[2][7].shipId,
    };

    expect(occupiedBlock).toEqual({
      block1: null,
      block2: null,
      block3: null,
      block4: null,
      block5: null,
    });
  });
});

describe("Record hits and misses", () => {
  GAME.deployComputerShip();

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      GAME.turn = GAME.playerOne.name;

      GAME.attack({ x: i, y: j });
    }
  }

  //  make sure every block is attack including the ships deployed
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      expect(GAME.playerTwo.board.grid[i][j].destroyed).toBeTrue;
    }
  }

  expect(GAME.playerTwo.board.stats).toEqual({
    hit: 14,
    miss: 86,
  });
});
