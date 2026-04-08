import { NormalChicken } from './normalChicken.class.js';

/**
 * Represents a small chicken enemy. Uses smaller chicken images but inherits behavior from NormalChicken.
 * @extends NormalChicken
 */
export class SmallChicken extends NormalChicken {
  WALKING_IMAGES = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  DEAD_IMAGE = ["img/3_enemies_chicken/chicken_small/2_dead/dead.png"];

  /**
   * Creates a new SmallChicken, loads its specific small chicken images,
   * sets a random x-position, and starts the movement and animation loops.
   */
  constructor() {
    super().loadImage(this.WALKING_IMAGES[0]);
    this.loadImages(this.WALKING_IMAGES);
    this.loadImages(this.DEAD_IMAGE);
    this.animate();
    this.x = 300 + Math.random() * 500;
    this.animation();
  }
}
