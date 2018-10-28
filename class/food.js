class Food {
  constructor(x, y) {
    this.x  = x;
    this.y  = y;
    this.size  = 8;
    this.id = Math.random() * Math.floor(500);
    this.r = Math.floor(Math.random() * Math.floor(255));
    this.g = Math.floor(Math.random() * Math.floor(255));
    this.b = Math.floor(Math.random() * Math.floor(255));

  }
}

module.exports = Food;