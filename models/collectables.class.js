class Collectables extends DrawableObject {
  BOTTLES_GROUND_IMAGES = [
    "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];

  y = 370;
  x = 0;
  width = 60;
  height = 60;
  offsetTop = 10;
  offsetBottom = 10;
  offsetLeft = 15;
  offsetRight = 15;

  // randomCloud =
  //   Math.random() > 0.5
  //     ? this.BOTTLES_GROUND_IMAGES[0]
  //     : this.BOTTLES_GROUND_IMAGES[1];

  constructor() {
    super();
    this.loadImage(this.BOTTLES_GROUND_IMAGES[0]);
    this.loadImages(this.BOTTLES_GROUND_IMAGES);
    this.x = 300 + Math.random() * 2160;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.BOTTLES_GROUND_IMAGES);
    }, 500);
  }
}
