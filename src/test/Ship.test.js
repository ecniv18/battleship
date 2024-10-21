import Ship from "../class/Ship";

describe("Methods", () => {
  test("Get destroy when hitpoints reaches down 0", () => {
    const ship = new Ship(1, 0);
    ship.hit();
    expect(ship.destroyed).toBe(true);
  });
});
