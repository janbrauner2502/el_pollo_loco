import { MovableObject } from "./movableObject.class.js";

/**
 * Represents the playable character Pepe with idle, walking, jumping, hurt and dead animations.
 * Handles keyboard-based movement and camera tracking.
 * @extends MovableObject
 */
export class Character extends MovableObject {
  x = 100;
  y = 74;
  height = 200;
  width = 120;
  speed = 5;
  speedY = 0;
  acceleration = 2;
  offsetTop = 80;
  offsetBottom = 40;
  offsetLeft = 20;
  offsetRight = 20;
  endPosition = this.width + this.x;

  collectedBottles = 0;
  collectedCoins = 0;

  IDLE_IMAGES = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  LONG_IDLE_IMAGES = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  WALKING_IMAGES = [
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  JUMPING_IMAGES = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
    "img/2_character_pepe/1_idle/idle/I-1.png",
  ];

  HURT_IMAGES = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];

  DEAD_IMAGES = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  /**
   * Initializes the character by loading all animation images and starting
   * the animation and gravity loops.
   */
  constructor() {
    super().loadImage(this.IDLE_IMAGES[0]);
    this.loadImages(this.WALKING_IMAGES);
    this.loadImages(this.JUMPING_IMAGES);
    this.loadImages(this.HURT_IMAGES);
    this.loadImages(this.DEAD_IMAGES);
    this.loadImages(this.IDLE_IMAGES);
    this.loadImages(this.LONG_IDLE_IMAGES);

    this.animate();
    this.applyGravity();
  }

  /**
   * Starts the movement and animation loops for the character.
   * Handles keyboard input (left, right, jump) and updates the camera position.
   * Selects the appropriate animation based on the current state (dead, hurt, walking, jumping).
   */
  animate() {
    this.intervalManager.setInterval(() => {
      if (this.world) {
        //WALKS RIGHT
        if (
          this.world.keyboard.RIGHT &&
          this.x + this.endPosition < this.world.level.level_end_x
        ) {
          this.moveRight();
          this.setLastKeyTime();
        }
        //WALKS LEFT
        if (this.world.keyboard.LEFT && this.x > 100) {
          this.moveLeft();
          this.otherDirection = true;
          this.setLastKeyTime();
        }
        //JUMP
        if (this.world.keyboard.UP && !this.isAboveGround()) {
          this.jump();
          this.setLastKeyTime();
        }

        this.world.camera_x = Math.max(-this.x + 100, -(3600 - 720));
      }
    }, 1000 / 60);

    this.intervalManager.setInterval(() => {
      if (this.world) {
        if (this.isDead()) {
          //DEAD
          this.playAnimation(this.DEAD_IMAGES);
        } else if (this.isHurt()) {
          //HURT
          this.playAnimation(this.HURT_IMAGES);
        } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
          //WALK ANIMATION
          this.playAnimation(this.WALKING_IMAGES);
        } else if (this.isAboveGround()) {
          this.playAnimation(this.JUMPING_IMAGES);
        } else if (this.longIdle()) {
          this.playAnimation(this.LONG_IDLE_IMAGES);
        } else {
          this.playAnimation(this.IDLE_IMAGES);
        }
      }
    }, 150);
  }
}
