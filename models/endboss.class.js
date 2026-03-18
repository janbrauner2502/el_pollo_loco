class Endboss extends MovableObject {
  x = 2000;
  y = 50;
  height = 400;
  width = 300;
  speed = 0.15;
  offsetTop = 20;
  offsetBottom = 20;
  offsetLeft = 20;
  offsetRight = 20;

  ENDBOSS_IMAGES = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  /**
   * Creates a new Endboss, loads its alert animation images, and starts the animation loop.
   */
  constructor() {
    super().loadImage(this.ENDBOSS_IMAGES[0]);
    this.loadImages(this.ENDBOSS_IMAGES);
    this.animate();
  }

  /**
   * Starts an interval that plays the alert animation of the endboss.
   */
  animate() {
    setInterval(() => {
      this.playAnimation(this.ENDBOSS_IMAGES);
    }, 150);
  }
}
