class Player {
  constructor(x, y, id) {
    this.x  = x;
    this.y  = y;
    this.size  = 20;
    this.id = id;
    this.r = Math.floor(Math.random() * Math.floor(255));
    this.g = Math.floor(Math.random() * Math.floor(255));
    this.b = Math.floor(Math.random() * Math.floor(255));

  }
}

module.exports = Player;