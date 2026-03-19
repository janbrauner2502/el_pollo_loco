class Cloud extends MovableObject {
  x = 20;
  y = 20;

  width = 300;
  height = 200;

  /**
   * Creates a new Cloud, loads a random cloud image, sets a random x-position,
   * and starts the movement loop.
   */
  constructor() {
    const imgCloud1 = "img/5_background/layers/4_clouds/1.png";
    const imgCloud2 = "img/5_background/layers/4_clouds/1.png";
    const randomCloud = Math.random() > 0.5 ? imgCloud1 : imgCloud2;
    super(randomCloud);
    this.loadImage(randomCloud);

    this.x = 20 + Math.random() * 2160;
    // console.log(this.x);

    this.animation();
  }

  /**
   * Starts an interval that continuously moves the cloud to the left.
   */
  animation() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }
}
