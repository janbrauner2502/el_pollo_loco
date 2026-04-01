/**
 * Represents a drawable game object that can be rendered on the canvas.
 * Serves as the base class for all visible objects in the game.
 */
class DrawableObject {
  /** @type {HTMLImageElement} The current image to be drawn. */
  img;
  /** @type {Object<string, HTMLImageElement>} Cache mapping image paths to preloaded Image objects. */
  imageCache = {};
  /** @type {number} The height of the object in pixels. */
  height = 150;
  /** @type {number} The width of the object in pixels. */
  width = 100;
  /** @type {number} The x-position of the object on the canvas. */
  x;
  /** @type {number} The y-position of the object on the canvas. */
  y;
  /** @type {number} The top offset for hitbox collision detection. */
  offsetTop;
  /** @type {number} The bottom offset for hitbox collision detection. */
  offsetBottom;
  /** @type {number} The left offset for hitbox collision detection. */
  offsetLeft;
  /** @type {number} The right offset for hitbox collision detection. */
  offsetRight;
  /** @type {number} The index of the current animation frame. */
  currentImage = 0;

  /**
   * Checks whether this object is colliding with another object using AABB collision detection with offsets.
   * @param {Endboss} object - The other movable object to check collision against.
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
    } catch (error) {
      console.error("Error drawing image:", error);
      console.log(`This image could not be drawn ${this.img.src}`);
    }
  }

  /**
   * Draws a red debug frame around the object.
   * Only applies to instances of Character, NormalChicken, SmallChicken, Endboss and CollectableObject.
   * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
   */
  drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof NormalChicken ||
      this instanceof SmallChicken ||
      this instanceof Endboss ||
      this instanceof CollectableObject
    ) {
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "red";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  /**
   * Draws a blue debug hitbox around the object based on its offset values.
   * Only applies to instances of Character, NormalChicken, SmallChicken, Endboss and CollectableObject.
   * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
   */
  drawHitBox(ctx) {
    if (
      this instanceof Character ||
      this instanceof NormalChicken ||
      this instanceof SmallChicken ||
      this instanceof Endboss ||
      this instanceof CollectableObject
    ) {
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "blue";
      ctx.rect(
        this.x + this.offsetLeft,
        this.y + this.offsetTop,
        this.width - this.offsetRight * 2,
        this.height - this.offsetBottom * 2,
      );
      ctx.stroke();
    }
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
