class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.checkCollisions();
  }

  setWorld() {
    this.character.world = this;
  }

  checkCollisions() {
    setInterval(() => {
      this.level.enemies.forEach((enemy) => {
        if (this.character.isColliding(enemy)) {
          console.log(`Collision with ${enemy.constructor.name}!`);
        }
      });
    }, 500);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToCanvas(this.level.backgroundObjects);
    this.addToCanvas(this.character);
    this.addObjectsToCanvas(this.level.enemies);
    this.addObjectsToCanvas(this.level.clouds);
    this.ctx.translate(-this.camera_x, 0);

    //draw() wird immer wieder aufgerufen, was die GraKa hergibt
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectsToCanvas(objects) {
    objects.forEach((object) => {
      this.addToCanvas(object);
    });
  }

  addToCanvas(object) {
    if (object.otherDirection) {
      this.mirrorImage(object);
    }
    object.draw(this.ctx);
    object.drawFrame(this.ctx);

    if (object.otherDirection) {
      this.ctx.restore();
    }
  }

  mirrorImage(object) {
    this.ctx.save();
    this.ctx.translate(object.x + object.width / 2, 0);
    this.ctx.scale(-1, 1);
    this.ctx.translate(-object.x - object.width / 2, 0);
  }
}
