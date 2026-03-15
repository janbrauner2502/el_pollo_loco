class StatusBar extends DrawableObject {
  x = 20;
  y = 0;
  width = 200;
  height = 60;
  percentage = 100;

  STATUSBAR_COIN_IMAGES = [
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png",
  ];

  STATUSBAR_HEART_IMAGES = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
  ];

  STATUSBAR_BOTTLE_IMAGES = [
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png",
  ];

  /**
   * Creates a new StatusBar, loads all status bar images, and sets the initial percentage to 100.
   * @param {string} [type] - The type of status bar (e.g. 'health', 'coin', 'bottle').
   */
  constructor(type) {
    super();

    this.loadImages(this.STATUSBAR_COIN_IMAGES);
    this.loadImages(this.STATUSBAR_HEART_IMAGES);
    this.loadImages(this.STATUSBAR_BOTTLE_IMAGES);
    this.setPercentage(100);
  }

  /**
   * Sets the percentage value of the status bar and updates the displayed image accordingly.
   * @param {number} percentage - The new percentage value (0–100).
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.STATUSBAR_HEART_IMAGES[this.resolveImageIndex(percentage)];
    this.img = this.imageCache[path];
  }

  /**
   * Returns the image index corresponding to the given percentage value.
   * @param {number} percentage - The current percentage value (0–100).
   * @returns {number} An index from 0 to 5 representing the appropriate status bar image.
   */
  resolveImageIndex(percentage) {
    if (percentage === 100) {
      return 5;
    } else if (percentage > 80) {
      return 4;
    } else if (percentage > 60) {
      return 3;
    } else if (percentage > 40) {
      return 2;
    } else if (percentage > 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
