import Player from "../class/Player";
import Ship from "../class/Ship";

describe("Methods", () => {
  test("Prorperly select ship", () => {
    const player = new Player("player");
    player.selectShip(0);
    expect(player.selectedShip).toBeInstanceOf(Ship);
  });

  test("Select ship and de-select other ships", () => {
    const player = new Player("player");
    player.selectShip(0);
    const ships = {
      ship1: player.ships[0].selected,
      ship2: player.ships[1].selected,
      ship3: player.ships[2].selected,
      ship4: player.ships[3].selected,
      ship5: player.ships[4].selected,
    };
    expect(ships).toEqual({
      ship1: true,
      ship2: false,
      ship3: false,
      ship4: false,
      ship5: false,
    });
  });
});
