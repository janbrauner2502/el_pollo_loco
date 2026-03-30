/**
 * Represents a normal-sized chicken enemy that walks to the left.
 * @extends MovableObject
 */
class NormalChicken extends MovableObject {
  width = 50;
  height = 50;
  y = 380;
  offsetTop = 5;
  offsetBottom = 5;
  offsetLeft = 5;
  offsetRight = 5;
  
  WALKING_IMAGES = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  /** @type {string[]} Image path for the dead chicken image. */
  DEAD_IMAGE = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  /**
   * Creates a new NormalChicken, loads its images, sets a random x-position and speed,
   * and starts the movement and animation loops.
   */
  constructor() {
    super().loadImage(this.WALKING_IMAGES[0]);
    this.loadImages(this.WALKING_IMAGES);
    this.loadImages(this.DEAD_IMAGE);
    this.animate();
    this.x = 300 + Math.random() * 500;
    this.speed = 0.2 + Math.random() * 0.25;
    this.animation();
  }

  /**
   * Starts an interval that continuously moves the chicken to the left.
   */
  animation() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }

  /**
   * Starts an interval that plays the walking animation.
   */
  animate() {
    setInterval(() => {
      this.playAnimation(this.WALKING_IMAGES);
    }, 150);
  }
}
