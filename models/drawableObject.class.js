class DrawableObject {
  img;
  imageCache = {};
  height = 150;
  width = 100;
  x;
  y;

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
      this instanceof SmallChicken
    ) {
      ctx.beginPath();
      ctx.lineWidth = "2";
      ctx.strokeStyle = "red";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }
}
