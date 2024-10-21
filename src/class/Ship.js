export default class Ship {
  constructor(length, id) {
    this.length = length;
    this.id = id;
    this.hitpoints = length;
    this.destroyed = false;
    this.orientation = "horizontal";
  }

  hit() {
    this.hitpoints -= 1;
    if (this.hitpoints <= 0) {
      this.destroyed = true;
    }
  }

  toggleOrientation() {
    this.orientation =
      this.orientation === "horizontal" ? "vertical" : "horizontal";
  }
}
