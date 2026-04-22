import { Character } from "./character.class.js";
import { StatusBar } from "./statusBar.class.js";
import { ThrowableObject } from "./throwableObject.class.js";
import { GroundBottle } from "./groundBottle.class.js";
import { Coin } from "./coin.class.js";
import { intervalManager } from "./intervalManager.class.js";
import { createNewLevel } from "../levels/level1.js";
import {
  bgm,
  characterDeath,
  chickenHit,
  collect_bottle,
  collect_coin,
  endbossDeath,
  endbossHit,
  hit,
  playSound,
  throwBottle,
  buyBottle,
} from "../js/audio.js";

export const gameEndScreen = document.getElementById("gameEndScreen");
export const header = document.querySelector("header");
export const touchBtnSection = document.getElementsByTagName("section")[0];

/**
 * Represents the game world. Manages all game objects, collision detection,
 * rendering and the main game loop.
 */
export class World {
  character = new Character();
  statusBar = {};
  statusBarType = ["BOTTLE", "COIN", "HEART"];
  bottles = [];
  level = createNewLevel();
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  canThrow = true;
  gameOver = false;

  /**
   * Creates the game world, initializes canvas, keyboard, drawing and game logic.
   * @param {HTMLCanvasElement} canvas - The canvas element used for rendering.
   * @param {Keyboard} keyboard - The keyboard object used for input handling.
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.statusBarType.forEach((type, index) => {
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
    this.level.endboss.world = this;
  }

  /**
   * Starts the main game loop, running collision checks and throw object checks at a fixed interval.
   */
  run() {
    intervalManager.setInterval(() => {
      this.checkCollisions();
      this.checkThrowObject();
      this.checkGameResult();
      this.changeCoinsToBottle();
    }, 30);
  }

  /**
   * Checks whether the game is over (character dead or endboss dead) and shows the appropriate end screen.
   */
  checkGameResult() {
    if (this.character.isDead() && !this.gameOver) {
      this.generateGameOver();
    } else if (this.level.endboss.isDead() && !this.gameOver) {
      this.generateGameWin();
    }
  }

  /**
   * Handles the game-over sequence when the character has died.
   * Pauses and resets the background music, plays the character death sound,
   * sets the game-over flag, clears all intervals and shows the game-over screen.
   */
  generateGameOver() {
    bgm.pause();
    bgm.currentTime = 0;
    setTimeout(() => {
      characterDeath.play();
      this.gameOver = true;
      intervalManager.clearAllIntervals();
      this.showGameOverScreen();
    }, 500);
  }

  /**
   * Handles the win sequence when the endboss has been defeated.
   * Pauses and resets the background music, plays the endboss death sound,
   * sets the game-over flag, clears all intervals and shows the win screen.
   */
  generateGameWin() {
    bgm.pause();
    bgm.currentTime = 0;
    setTimeout(() => {
      endbossDeath.play();
      this.gameOver = true;
      intervalManager.clearAllIntervals();
      this.showWinScreen();
    }, 1300);
  }

  /**
   * Displays the game-over screen when the character has died.
   */
  showGameOverScreen() {
    header.classList.add("d-none");
    gameEndScreen.classList.remove("d-none");
    gameEndScreen.classList.add("game-over-screen");
    touchBtnSection.classList.add("d-none");
  }

  /**
   * Displays the win screen when the endboss has been defeated.
   */
  showWinScreen() {
    header.classList.add("d-none");
    gameEndScreen.classList.remove("d-none");
    gameEndScreen.classList.add("win-screen");
    touchBtnSection.classList.add("d-none");
  }

  /**
   * Checks whether the throw key is pressed and creates a new ThrowableObject if so.
   */
  checkThrowObject() {
    if (
      this.keyboard.THROW &&
      this.character.collectedBottles > 0 &&
      this.canThrow
    ) {
      this.throwCollectedBottle();
    }
    if (!this.keyboard.THROW) {
      this.canThrow = true;
    }
  }

  /**
   * Creates and throws a new bottle, updating the bottle count and status bar.
   */
  throwCollectedBottle() {
    this.canThrow = false;
    this.character.setLastKeyTime();
    playSound(throwBottle);
    let bottle = new ThrowableObject(
      this.character.x + this.character.width / 2,
      this.character.y + this.character.height / 2,
      this.character.otherDirection,
    );
    this.bottles.push(bottle);
    this.character.collectedBottles -= 20;
    this.statusBar["BOTTLE"].setCollected(this.character.collectedBottles);
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
    this.detectCollisionCharEnemy();

    // Character vs. Endboss
    this.detectCollisionCharEndboss();

    // Bottle vs. Enemies
    this.detectCollisionBottleEnemy();

    //Character vs. CollectableObject
    this.detectCollisionCharCollectables();
  }

  /**
   * Detects collisions between the character and regular enemies.
   * If the character is falling onto a living enemy from above, the enemy
   * is hit and the character bounces upward. Otherwise, the character takes damage.
   */
  detectCollisionCharEnemy() {
    const isFallingDown = this.character.speedY;
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && !this.character.isDead()) {
        if (isFallingDown < 0 && !enemy.isDead()) {
          this.hitEnemy(enemy);
          this.character.speedY = 15;
        } else if (!enemy.isDead()) {
          this.getHitByEnemy();
        }
      }
    });
  }

  /**
   * Handles the character hitting an enemy from above.
   * Sets the character's vertical speed upward, plays the hit sound,
   * damages the enemy, and removes it from the level after a delay.
   * @param {Object} enemy - The enemy object that is being hit.
   */
  hitEnemy(enemy) {
    enemy.hit();
    chickenHit.play();
    setTimeout(() => {
      this.level.enemies = this.level.enemies.filter((e) => e !== enemy);
    }, 1500);
  }

  /**
   * Handles the character getting hit by an enemy.
   * Plays the hit sound effect, applies damage to the character,
   * and updates the health status bar.
   */
  getHitByEnemy() {
    hit.play();
    this.character.hit();
    this.statusBar["HEART"].setPercentage(this.character.energy);
  }

  /**
   * Handles collisions between the character and the endboss.
   * If they collide and the endboss is alive, the character takes damage
   * and the heart status bar is updated.
   */
  detectCollisionCharEndboss() {
    if (
      this.character.isColliding(this.level.endboss) &&
      !this.level.endboss.isDead()
    ) {
      hit.play();
      this.character.hitByEndboss();
      this.statusBar["HEART"].setPercentage(this.character.energy);
    }
  }

  /**
   * Detects collisions between thrown bottles and enemies or the endboss.
   * When a bottle collides with an enemy, it triggers a splash animation.
   * When a bottle collides with the endboss, it plays the hit sound,
   * damages the endboss, and triggers a splash animation.
   * Removes bottles that have finished their splash animation.
   */
  detectCollisionBottleEnemy() {
    this.bottles.forEach((bottle) => {
      this.level.enemies.forEach((enemy) => {
        if (bottle.isColliding(enemy)) {
          bottle.bottleSplash();
          this.hitEnemy(enemy);
        }
      });
      if (bottle.isColliding(this.level.endboss) && !bottle.isSplashing) {
        endbossHit.play();
        this.level.endboss.hitByBottle();
        bottle.bottleSplash();
      }
      this.bottles = this.bottles.filter((bottle) => !bottle.splashDone);
    });
  }

  /**
   * Detects collisions between the character and collectable objects (bottles and coins).
   * When a collision is detected, handles the collection of bottles or coins accordingly.
   */
  detectCollisionCharCollectables() {
    this.level.collectables.forEach((collectable) => {
      if (this.character.isColliding(collectable)) {
        //Bottles
        this.collectBottle(collectable);
        //Coins
        this.collectCoin(collectable);
      }
    });
  }

  /**
   * Handles the collection of bottles by the character.
   * When a GroundBottle is collected, it plays the collection sound,
   * increases the character's bottle count by 20 (up to a maximum of 100),
   * updates the bottle status bar, and removes the bottle from the level.
   * @param {Object} collectable - The collectable object to check.
   */
  collectBottle(collectable) {
    if (
      collectable instanceof GroundBottle &&
      this.character.collectedBottles < 100 &&
      !collectable.collected
    ) {
      collect_bottle.play();
      this.character.collectedBottles += 20;
      this.statusBar["BOTTLE"].setCollected(this.character.collectedBottles);

      this.level.collectables = this.level.collectables.filter(
        (collected) => collected !== collectable,
      );
    }
  }

  /**
   * Converts 2 collected coins into 1 bottles when the change key is pressed
   * and the character has enough coins without exceeding the bottle limit.
   */
  changeCoinsToBottle() {
    if (
      this.keyboard.BUY &&
      this.character.collectedCoins >= 40 &&
      this.character.collectedBottles <= 80
    ) {
      buyBottle.play();
      this.character.collectedCoins -= 40;
      this.statusBar["COIN"].setCollected(this.character.collectedCoins);
      this.character.collectedBottles += 20;
      this.statusBar["BOTTLE"].setCollected(this.character.collectedBottles);
    }
    this.keyboard.BUY = false;
  }

  /**
   * Handles the collection of coins by the character.
   * When a Coin is collected, it plays the collection sound,
   * increases the character's coin count by 20 (up to a maximum of 100),
   * updates the coin status bar, and removes the coin from the level.
   * @param {Object} collectable - The collectable object to check.
   */
  collectCoin(collectable) {
    if (collectable instanceof Coin && this.character.collectedCoins < 100) {
      collect_coin.play();
      this.character.collectedCoins += 20;
      this.statusBar["COIN"].setCollected(this.character.collectedCoins);

      this.level.collectables = this.level.collectables.filter(
        (collected) => collected !== collectable,
      );
    }
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
    this.addToCanvas(this.level.endboss);
    this.addObjectsToCanvas(this.bottles);
    this.addObjectsToCanvas(this.level.clouds);
    this.addObjectsToCanvas(this.level.collectables);
    this.ctx.translate(-this.camera_x, 0);

    this.addToCanvas(this.statusBar["BOTTLE"]);
    this.addToCanvas(this.statusBar["HEART"]);
    this.addToCanvas(this.statusBar["COIN"]);
    this.generateEndbossStatusbar();
    this.requestNextFrame();
  }

  /**
   * Draws the endboss status bar on the canvas when the boss is first encountered.
   * Only displays the status bar if the boss has been seen by the character.
   */
  generateEndbossStatusbar() {
    if (this.level.endboss.bossFirstSeen === true) {
      this.addToCanvas(this.level.endboss.statusBar);
    }
  }

  /**   * Requests the next animation frame if the game is not over.   */
  requestNextFrame() {
    if (!this.gameOver) {
      let self = this;
      requestAnimationFrame(function () {
        self.draw();
      });
    }
  }

  /**
   * Adds an array of drawable objects to the canvas.
   * @param {DrawableObject[]} objects - The array of objects to be drawn.
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
