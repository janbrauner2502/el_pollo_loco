class DrawableObject {
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
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Draws a red debug frame around the object.
   * Only applies to instances of Character, NormalChicken, and SmallChicken.
   * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
   */
  drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof NormalChicken ||
      this instanceof SmallChicken ||
      this instanceof Endboss
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
   * Only applies to instances of Character, NormalChicken, SmallChicken, and Endboss.
   * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
   */
  drawHitBox(ctx) {
    if (
      this instanceof Character ||
      this instanceof NormalChicken ||
      this instanceof SmallChicken ||
      this instanceof Endboss
    ) {
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "blue";
      ctx.rect(this.x + this.offsetLeft, this.y + this.offsetTop, this.width - this.offsetRight * 2, this.height - this.offsetBottom * 2);
      ctx.stroke();
    }
  }
}
