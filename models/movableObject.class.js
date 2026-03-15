class MovableObject extends DrawableObject {
  constructor() {
    super();
  }

  currentImage = 0;
  speed = 0.2;
  otherDirection = false;
  speedY;
  energy = 100;
  lastHit = 0;
  imageCache = {};

  /**
   * Moves the object to the right by its speed and resets the direction flag.
   */
  moveRight() {
    this.x += this.speed;
    this.otherDirection = false;
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

  /**
   * Moves the object to the left by its speed.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Makes the object jump by setting speedY to 30.
   * @returns {number} The new value of speedY (30).
   */
  jump() {
    return (this.speedY = 30);
  }

  /**
   * Checks whether this object is colliding with another object using AABB collision detection.
   * @param {DrawableObject} object - The object to check collision against.
   * @returns {boolean} True if the objects are colliding, false otherwise.
   */
  isColliding(object) {
    return (
      this.x + this.width > object.x &&
      this.y + this.height > object.y &&
      this.x < object.x + object.width &&
      this.y < object.y + object.height
    );
  }

  /**
   * Reduces the object's energy by 5 and records the time of the hit.
   * Energy cannot drop below 0.
   */
  hit() {
    this.energy -= 5;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Checks whether the object is dead (energy equals 0).
   * @returns {boolean} True if energy is 0.
   */
  isDead() {
    return this.energy === 0;
  }

  /**
   * Checks whether the object was hurt within the last second.
   * @returns {boolean} True if the last hit occurred less than 1 second ago.
   */
  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    timePassed = timePassed / 1000;
    return timePassed < 1;
  }

  /**
   * Applies gravity to the object by updating its y-position and speedY at a fixed interval.
   * Uses the object's acceleration property to decrease speedY over time.
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  /**
   * Checks whether the object is above the ground level.
   * ThrowableObjects are always considered above the ground.
   * @returns {boolean} True if the object is above the ground.
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else return this.y < 230;
  }
}
