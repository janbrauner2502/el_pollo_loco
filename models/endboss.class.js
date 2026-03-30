/**
 * Represents the end boss enemy chicken with alert, attack, hurt and dead animations.
 * @extends MovableObject
 */
class Endboss extends MovableObject {
  x = 2000;
  y = 50;
  height = 400;
  width = 300;
  speed = 0.15;
  offsetTop = 70;
  offsetBottom = 50;
  offsetLeft = 20;
  offsetRight = 20;
  energy = 125;

  ENDBOSS_WALK_IMAGES = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  ENDBOSS_ALERT_IMAGES = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  ENDBOSS_ATTACK_IMAGES = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  ENDBOSS_HURT_IMAGES = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  ENDBOSS_DEAD_IMAGES = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  /**
   * Creates a new Endboss, loads its alert animation images, and starts the animation loop.
   */
  constructor() {
    super().loadImage(this.ENDBOSS_ALERT_IMAGES[0]);
    this.loadImages(this.ENDBOSS_WALK_IMAGES);
    this.loadImages(this.ENDBOSS_ALERT_IMAGES);
    this.loadImages(this.ENDBOSS_ATTACK_IMAGES);
    this.loadImages(this.ENDBOSS_HURT_IMAGES);
    this.loadImages(this.ENDBOSS_DEAD_IMAGES);
    this.animate();
  }

  /**
   * Starts the animation loop for the endboss.
   * Selects the appropriate animation based on the current state (dead, hurt or alert).
   */
  animate() {
    setInterval(() => {
      if (this.world) {
        this.playAnimation(this.ENDBOSS_ALERT_IMAGES);
      } else if (this.isDead()) {
        this.playAnimation(this.ENDBOSS_DEAD_IMAGES);
      } else if (this.isHurt()) {
        this.playAnimation(this.ENDBOSS_HURT_IMAGES);
      } else this.playAnimation(this.ENDBOSS_ALERT_IMAGES);
    }, 150);
  }
}
