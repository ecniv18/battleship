export default class Ship {
  constructor(length, id) {
    this.length = length;
    this.id = id;
    this.hitpoints = length;
    this.destroyed = false;
    this.orientation = "horizontal";
    this.selected = false;
    this.placed = false;
  }

  hit() {
    this.hitpoints -= 1;
    if (this.hitpoints <= 0) {
      this.destroyed = true;
    }
  }

  select() {
    this.selected = true;
  }

  deSelect() {
    this.selected = false;
  }

  toggleOrientation() {
    this.orientation =
      this.orientation === "horizontal" ? "vertical" : "horizontal";
  }
}
