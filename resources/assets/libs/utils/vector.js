export default class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  equals(other) {
    return this.x === other.x && this.y === other.y;
  }

  addVector(other) {
    return new Vector(this.x + other.x, this.y + other.y);
  }

  add(x, y) {
    return new Vector(this.x + x, this.y + y);
  }
}
