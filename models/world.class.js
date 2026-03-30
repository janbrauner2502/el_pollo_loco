/**
 * Represents the game world. Manages all game objects, collision detection,
 * rendering and the main game loop.
 */
class World {
  character = new Character();
  endboss = new Endboss();
  statusBar = {};
  bottles = [];
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;

  /**
   * Creates the game world, initializes canvas, keyboard, drawing and game logic.
   * @param {HTMLCanvasElement} canvas - The canvas element used for rendering.
   * @param {Keyboard} keyboard - The keyboard object used for input handling.
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    ["BOTTLE", "COIN", "HEART"].forEach((type, index) => {
      this.statusBar[type] = new StatusBar(type);
      this.statusBar[type].y = index * 40;
    });
    this.draw();
    this.setWorld();
    this.run();
  }

  /**
   * Sets the world reference on the character object so it can access game state.
   */
  setWorld() {
    this.character.world = this;
    // this.endboss.world = this;
  }

  /**
   * Starts the main game loop, running collision checks and throw object checks at a fixed interval.
   */
  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkThrowObject();
    }, 200);
  }

  /**
   * Checks whether the throw key is pressed and creates a new ThrowableObject if so.
   */
  checkThrowObject() {
    if (this.keyboard.THROW && this.character.collectedBottles > 0) {
      this.character.setLastKeyTime();
      let bottle = new ThrowableObject(
        this.character.x + this.character.width / 2,
        this.character.y + this.character.height / 2,
        this.character.otherDirection,
      );
      this.bottles.push(bottle);
      this.character.collectedBottles -= 20;
      this.statusBar["BOTTLE"].setCollected(this.character.collectedBottles);
      console.log(`Bottles thrown: ${this.bottles.length}`);
    }
  }

  /**
   * Checks all collisions in the game:
   * - Character vs. enemies (reduces character energy).
   * - Thrown bottles vs. enemies and endboss (damages enemy, triggers splash).
   * - Character vs. collectable bottles (collects bottle, updates bottle status bar).
   * - Character vs. coins (collects coin, updates coin status bar).
   */
  checkCollisions() {
    //Character vs. Enemies
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hit();
        this.statusBar["HEART"].setPercentage(this.character.energy);
      }
    });
    // Bottle vs. Enemies
    this.bottles.forEach((bottle) => {
      this.level.enemies.forEach((enemy) => {
        if (bottle.isColliding(enemy)) {
          enemy.hit();
          bottle.bottleSplash();
        }
      });
      if (bottle.isColliding(this.endboss)) {
        this.endboss.hit();
        bottle.bottleSplash();
        console.log(`Endboss energy: ${this.endboss.energy}`);
      }
      this.bottles = this.bottles.filter((bottle) => !bottle.splashDone);
    });
    //Character vs. CollectableObject
    this.level.collectables.forEach((collectable) => {
      if (this.character.isColliding(collectable)) {
        //Bottles
        if (
          collectable instanceof GroundBottle &&
          this.character.collectedBottles < 100 &&
          !collectable.collected
        ) {
          this.character.collectedBottles += 20;
          console.log(`Bottles collected: ${this.character.collectedBottles}`);
          this.statusBar["BOTTLE"].setCollected(
            this.character.collectedBottles,
          );

          this.level.collectables = this.level.collectables.filter(
            (c) => c !== collectable,
          );
        }
        //Coins
        if (
          collectable instanceof Coin &&
          this.character.collectedCoins < 100
        ) {
          this.character.collectedCoins += 20;
          console.log(`Coins collected: ${this.character.collectedCoins}`);
          this.statusBar["COIN"].setCollected(this.character.collectedCoins);

          this.level.collectables = this.level.collectables.filter(
            (c) => c !== collectable,
          );
        }
      }
    });
  }

  /**
   * Clears and redraws all game objects onto the canvas each frame.
   * Calls itself recursively via requestAnimationFrame.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToCanvas(this.level.backgroundObjects);
    this.addObjectsToCanvas(this.level.enemies);
    this.addToCanvas(this.character);
    this.addToCanvas(this.endboss);
    this.addObjectsToCanvas(this.bottles);
    this.addObjectsToCanvas(this.level.clouds);
    this.addObjectsToCanvas(this.level.collectables);
    this.ctx.translate(-this.camera_x, 0);

    this.addToCanvas(this.statusBar["BOTTLE"]);
    this.addToCanvas(this.statusBar["HEART"]);
    this.addToCanvas(this.statusBar["COIN"]);

    //draw() wird immer wieder aufgerufen, was die GraKa hergibt
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
   * Adds an array of drawable objects to the canvas.
   * @param {DrawableObject[]} objects - The objects to be drawn.
   */
  addObjectsToCanvas(objects) {
    objects.forEach((object) => {
      this.addToCanvas(object);
    });
  }

  /**
   * Adds a single drawable object to the canvas, applying mirroring if needed.
   * @param {DrawableObject} object - The object to be drawn.
   */
  addToCanvas(object) {
    if (object.otherDirection) {
      this.mirrorImage(object);
    }
    object.draw(this.ctx);
    object.drawFrame(this.ctx);
    object.drawHitBox(this.ctx);

    if (object.otherDirection) {
      this.ctx.restore();
    }
  }

  /**
   * Mirrors an object's image horizontally by applying a canvas transformation.
   * @param {DrawableObject} object - The object whose image should be mirrored.
   */
  mirrorImage(object) {
    this.ctx.save();
    this.ctx.translate(object.x + object.width / 2, 0);
    this.ctx.scale(-1, 1);
    this.ctx.translate(-object.x - object.width / 2, 0);
  }
}
