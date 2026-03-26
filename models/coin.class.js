class Coin extends DrawableObject {
  COIN_IMAGES = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];

  y = 300;
  x = 0;
  width = 100;
  height = 100;
  // offsetTop = 10;
  // offsetBottom = 10;
  // offsetLeft = 15;
  // offsetRight = 15;

  constructor() {
    super();
    this.loadImage(this.COIN_IMAGES[0]);
    this.loadImages(this.COIN_IMAGES);
    this.x = 300 + Math.random() * 2160;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.COIN_IMAGES);
    }, 300);
  }
}
