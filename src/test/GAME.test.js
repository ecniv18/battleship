import GAME from "../class/GAME";
import Ship from "../class/Ship";

describe("Game mechanics", () => {
  test("Correctly attack the opponents board", () => {
    GAME.attack({ x: 0, y: 0 });
    expect(GAME.playerTwo.board.grid[0][0].destroyed).toBe(true);
  });

  test.skip("Correctly switch turn", () => {
    expect(GAME.turn).toBe(GAME.playerTwo.name); // attack has been made on ln:5 so turn should switch to playerTwo's name
  });

  test("Correctly get the winner", () => {
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

    expect(GAME.winner).toBe("player");
  });
});
