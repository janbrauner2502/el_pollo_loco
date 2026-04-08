import { DrawableObject } from './drawableObject.class.js';

/**
 * Represents a static background layer image in the game world.
 * @extends DrawableObject
 */
export class BackgroundObject extends DrawableObject {
  width = 720;
  height = 480;

  /**
   * Creates a new BackgroundObject at the given x-position with the specified image.
   * @param {string} imagePath - The file path to the background image.
   * @param {number} x - The x-position of the background object on the canvas.
   */
  constructor(imagePath, x) {
    super();
    this.loadImage(imagePath);

    this.x = x;
    this.y = 480 - this.height;
  }
}
