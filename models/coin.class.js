/**
 * Represents a collectible coin in the game world.
 * @extends CollectableObject
 */
class Coin extends CollectableObject {
  y;
  x;
  width = 100;
  height = 100;
  offsetTop = 35;
  offsetBottom = 35;
  offsetLeft = 35;
  offsetRight = 35;

  COIN_IMAGES = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];

  /**
   * Creates a new Coin, loads its images, sets a random x-position and starts the animation loop.
   */
  constructor() {
    super();
    this.loadImage(this.COIN_IMAGES[0]);
    this.loadImages(this.COIN_IMAGES);
    this.x = 300 + Math.random() * 2160;
    this.y = 300 - Math.random() * 200;
    this.animate();
  }

  /**
   * Starts an interval that cycles through the coin animation images.
   */
  animate() {
    setInterval(() => {
      this.playAnimation(this.COIN_IMAGES);
    }, 300);
  }
}
