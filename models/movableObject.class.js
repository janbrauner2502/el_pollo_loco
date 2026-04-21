import { DrawableObject } from "./drawableObject.class.js";

/**
 * Represents a movable game object that can move, animate, collide and be affected by gravity.
 * @extends DrawableObject
 */
export class MovableObject extends DrawableObject {
  currentImage = 0;
  speed = 0.2;
  otherDirection = false;
  speedY;
  energy = 100;
  lastHit = 0;
  imageCache = {};
  lastKey;
  groundLevel = 230;

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
    return (this.speedY = 25);
  }

  /**
   * Reduces the object's energy by 10 and records the time of the hit.
   * Energy cannot drop below 0.
   */
  hit() {
    if (this.isHurt()) return;
    this.energy -= 10;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Reduces the object's energy by 20 when hit by a thrown bottle.
   * Energy cannot drop below 0.
   */
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
    this.intervalManager.setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0 || this.isDead()) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      } else {
        return (this.speedY = 0);
      }
    }, 1000 / 25);
  }

  /**
   * Checks whether the object is above the ground level.
   * @returns {boolean} True if the object is above the ground.
   */
  isAboveGround() {
    return this.y < this.groundLevel;
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
