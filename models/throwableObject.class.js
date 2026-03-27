class ThrowableObject extends MovableObject {
  acceleration = 3;

  THROW_IMAGES = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  BOTTLE_SPLASH_IMAGES = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  /**
   * Creates a new ThrowableObject at the given position and immediately throws it.
   * @param {number} x - The initial x-position of the bottles.
   * @param {number} y - The initial y-position of the bottles.
   */
  constructor(x, y) {
    super();
    this.loadImage("img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png");
    this.loadImages(this.THROW_IMAGES);
    this.loadImages(this.BOTTLE_SPLASH_IMAGES);
    this.height = 50;
    this.width = 50;
    this.y = y;
    this.x = x;
    this.throw();
    this.isSplashing = false;
    this.offsetTop = 0;
    this.offsetBottom = 0;
    this.offsetLeft = 0;
    this.offsetRight = 0;
  }

  /**
   * Throws the bottles by setting the initial vertical speed, applying gravity,
   * and continuously moving it to the right.
   */
  throw() {
    this.speedY = 30;
    this.applyGravity();
    setInterval(() => {
      if (!this.isSplashing) {
        this.playAnimation(this.THROW_IMAGES);
        return (this.x += 10);
      }
    }, 20);
  }

  /**
   * Triggers the bottles splash animation when the bottles hits an enemy.
   * Stops the flying animation and plays the splash frames instead.
   */
  bottleSplash() {
    if (this.isSplashing) return;
    this.isSplashing = true;
    this.speedY = 0;
    this.acceleration = 0;
    let splashInterval = setInterval(() => {
      this.playAnimation(this.BOTTLE_SPLASH_IMAGES);
    }, 100);
    setTimeout(() => {
      clearInterval(splashInterval);
      this.splashDone = true;
    }, 700);
  }
}
