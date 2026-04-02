/**
 * Represents a movable game object that can move, animate, collide and be affected by gravity.
 * @extends DrawableObject
 */
class MovableObject extends DrawableObject {
  /** @type {number} The index of the current animation frame. */
  currentImage = 0;
  /** @type {number} The horizontal movement speed of the object. */
  speed = 0.2;
  /** @type {boolean} Whether the object is facing the opposite (left) direction. */
  otherDirection = false;
  /** @type {number} The vertical speed used for jumping and gravity. */
  speedY;
  /** @type {number} The current energy/health of the object (0–100). */
  energy = 100;
  /** @type {number} Timestamp (ms) of the last time the object was hit. */
  lastHit = 0;
  /** @type {Object<string, HTMLImageElement>} Cache mapping image paths to preloaded Image objects. */
  imageCache = {};
  /** @type {number} Timestamp (ms) of the last key press (used for idle detection). */
  lastKey;

  /**
   * Moves the object to the right by its speed and resets the direction flag.
   */
  moveRight() {
    this.x += this.speed;
    this.otherDirection = false;
  }

  /**
   * Moves the object to the left by its speed.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Makes the object jump by setting speedY to 25.
   * @returns {number} The new value of speedY (25).
   */
  jump() {
    return this.speedY = 25;
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

  hitByBottle() {
    this.energy -= 20;
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
      } else {
        return this.speedY = 0;
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

  /**
   * Records the current timestamp as the time of the last key press.
   * Used to track idle duration.
   */
  setLastKeyTime() {
    this.lastKey = new Date().getTime();
  }

  /**
   * Checks whether the object has been idle (no key press) for more than 10 seconds.
   * @returns {boolean} True if the last key press was more than 10 seconds ago.
   */
  longIdle() {
    let timePassed = (new Date().getTime() - this.lastKey) / 1000;
    return timePassed > 10;
  }
}
