class NormalChicken extends MovableObject {
  width = 50;
  height = 50;
  y = 380;
  offsetTop = 5;
  offsetBottom = 5;
  offsetLeft = 5;
  offsetRight = 5;

  WALKING_IMAGES = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  /**
   * Creates a new NormalChicken, loads its images, sets a random x-position and speed,
   * and starts the movement and animation loops.
   */
  constructor() {
    const imgNormalChicken =
      "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png";
    // const imgSmallChicken = "img/3_enemies_chicken/chicken_small/1_walk/1_w.png";
    // const randomChicken = Math.random() > 0.5 ? imgNormalChicken : imgSmallChicken;

    super().loadImage(imgNormalChicken);

    this.loadImages(this.WALKING_IMAGES);

    this.animate();

    this.x = 200 + Math.random() * 500;
    this.speed = 0.2 + Math.random() * 0.25;

    this.animation();
  }

  /**
   * Starts an interval that continuously moves the chicken to the left.
   */
  animation() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }

  /**
   * Starts an interval that plays the walking animation.
   */
  animate() {
    setInterval(() => {
      this.playAnimation(this.WALKING_IMAGES);
    }, 150);
  }
}
