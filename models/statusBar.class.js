/**
 * Represents a status bar (health, bottles or coins) displayed at the top of the screen.
 * @extends DrawableObject
 */
class StatusBar extends DrawableObject {
  x = 20;
  y = 0;
  width = 200;
  height = 60;
  percentage = 100;
  collected = 0;

  STATUSBAR_COIN_IMAGES = [
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png",
  ];

  STATUSBAR_HEART_IMAGES = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
  ];

  STATUSBAR_BOTTLE_IMAGES = [
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png",
  ];

  STATUSBAR_ENDBOSS_IMAGES = [
    "img/7_statusbars/2_statusbar_endboss/orange/orange0.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange20.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange40.png",
    "img/7_statusbars/2_statusbar_endboss/green/green60.png",
    "img/7_statusbars/2_statusbar_endboss/green/green80.png",
    "img/7_statusbars/2_statusbar_endboss/green/green100.png",
  ];

  /**
   * Creates a new StatusBar, loads all images for the given type and sets the initial display.
   * @param {string} type - The type of status bar. Must be 'HEART', 'COIN' or 'BOTTLE'.
   */
  constructor(type) {
    super();
    this.type = type;
    this.loadImages(this[`STATUSBAR_${type}_IMAGES`]);
    this.setStatusbar(type);
    if (type === "HEART" || type === "ENDBOSS") {
      this.setPercentage(100);
    } else if (this.type === "BOTTLE" || this.type === "COIN") {
      this.setCollected(0);
    }
  }

  /**
   * Initializes the status bar image based on the given type.
   * For 'HEART' the percentage is used; for 'BOTTLE' and 'COIN' the collected count is used.
   * @param {string} type - The type of status bar ('HEART', 'COIN' or 'BOTTLE').
   */
  setStatusbar(type) {
    this.type = type;
    if (type === "HEART" || type === "ENDBOSS") {
      this.setPercentage(this.percentage);
    } else if (this.type === "BOTTLE" || this.type === "BOTTLE") {
      this.setCollected(this.collected);
    }
  }

  /**
   * Sets the percentage value of the status bar and updates the displayed image accordingly.
   * @param {number} percentage - The new percentage value (0–100).
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path =
      this[`STATUSBAR_${this.type}_IMAGES`][this.resolveImageIndex(percentage)];
    this.img = this.imageCache[path];
  }

  /**
   * Sets the number of collected items and updates the displayed image accordingly.
   * @param {number} collected - The number of collected items (0–100).
   */
  setCollected(collected) {
    this.collected = collected;
    let path =
      this[`STATUSBAR_${this.type}_IMAGES`][this.resolveImageIndex(collected)];
    this.img = this.imageCache[path];
  }

  /**
   * Returns the image index (0–5) corresponding to the given percentage value.
   * @param {number} percentage - The current percentage value (0–100).
   * @returns {number} An index from 0 to 5 representing the appropriate status bar image.
   */
  resolveImageIndex(percentage) {
    if (percentage === 100) {
      return 5;
    } else if (percentage >= 80) {
      return 4;
    } else if (percentage >= 60) {
      return 3;
    } else if (percentage >= 40) {
      return 2;
    } else if (percentage >= 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
