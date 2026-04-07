/**
 * Represents a collectible salsa bottle lying on the ground.
 * @extends CollectableObject
 */
class GroundBottle extends CollectableObject {
  y = 370;
  x = 0;
  width = 60;
  height = 60;
  offsetTop = 10;
  offsetBottom = 10;
  offsetLeft = 15;
  offsetRight = 15;

  BOTTLES_GROUND_IMAGES = [
    "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];

  /**
   * Creates a new GroundBottle, loads its images, sets a random x-position
   * and starts the animation loop.
   */
  constructor() {
    super();
    this.loadImage(this.BOTTLES_GROUND_IMAGES[0]);
    this.loadImages(this.BOTTLES_GROUND_IMAGES);
    this.x = 300 + Math.random() * 2000;
    this.animate();
  }

  /**
   * Starts an interval that cycles through the bottle ground animation images.
   */
  animate() {
    this.intervalManager.setInterval(() => {
      this.playAnimation(this.BOTTLES_GROUND_IMAGES);
    }, 500);
  }
}
