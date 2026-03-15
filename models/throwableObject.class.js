class ThrowableObject extends MovableObject {
  acceleration = 3;

  /**
   * Creates a new ThrowableObject at the given position and immediately throws it.
   * @param {number} x - The initial x-position of the bottle.
   * @param {number} y - The initial y-position of the bottle.
   */
  constructor(x, y) {
    super().loadImage("img/6_salsa_bottle/all_sequences.gif");
    this.height = 50;
    this.width = 50;
    this.y = y;
    this.x = x;
    this.throw();
  }

  /**
   * Throws the bottle by setting the initial vertical speed, applying gravity,
   * and continuously moving it to the right.
   */
  throw() {
    this.speedY = 30;
    this.applyGravity();
    setInterval(() => {
      this.x += 10;
    }, 20);
  }
}
