import { MovableObject } from './movableObject.class.js';

/**
 * Represents a cloud in the background that slowly drifts to the left.
 * @extends MovableObject
 */
export class Cloud extends MovableObject {
  x = 20;
  y = 20;
  width = 300;
  height = 200;
  
  CLOUD_IMAGES = [
    "img/5_background/layers/4_clouds/1.png",
    "img/5_background/layers/4_clouds/2.png",
  ];
  
  randomCloud =
    Math.random() > 0.5 ? this.CLOUD_IMAGES[0] : this.CLOUD_IMAGES[1];

  /**
   * Creates a new Cloud, loads a random cloud image, sets a random x-position,
   * and starts the movement loop.
   */
  constructor() {
    super();
    this.loadImage(this.randomCloud);

    this.x = 20 + Math.random() * 2160;
    // console.log(this.x);

    this.animation();
  }

  /**
   * Starts an interval that continuously moves the cloud to the left.
   */
  animation() {
    this.intervalManager.setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }
}
