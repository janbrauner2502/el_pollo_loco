import { intervalManager } from "./intervalManager.class.js";

/**
 * Represents a drawable game object that can be rendered on the canvas.
 * Serves as the base class for all visible objects in the game.
 */
export class DrawableObject {
  img;
  imageCache = {};
  height = 150;
  width = 100;
  x;
  y;
  offsetTop;
  offsetBottom;
  offsetLeft;
  offsetRight;
  currentImage = 0;
  intervalManager = intervalManager;

  /**
   * Checks whether this object is colliding with another object using AABB collision detection with offsets.
   * @param {DrawableObject} object - The other drawable object to check collision against.
   * @returns {boolean} True if the objects' hitboxes are overlapping, false otherwise.
   */
  isColliding(object) {
    return (
      this.x + this.width - this.offsetRight > object.x + object.offsetLeft &&
      this.y + this.height - this.offsetBottom > object.y + object.offsetTop &&
      this.x + this.offsetLeft < object.x + object.width - object.offsetRight &&
      this.y + this.offsetTop < object.y + object.height - object.offsetBottom
    );
  }

  /**
   * Loads a single image and sets it as the current image of the object.
   * @param {string} path - The file path to the image.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Loads multiple images and stores them in the imageCache.
   * @param {string[]} arr - Array of file paths to the images.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Draws the object onto the canvas.
   * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
   */
  draw(ctx) {
    try {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    } catch (_) {}
  }

  /**
   * Plays an animation by cycling through the provided image array.
   * @param {string[]} images - Array of image paths for the animation.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }
}
