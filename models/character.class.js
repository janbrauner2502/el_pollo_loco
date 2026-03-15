class Character extends MovableObject {
  x = 100;
  // y = 230;
  y = 74;

  height = 200;
  width = 120;
  speed = 5;
  speedY = 0;
  acceleration = 2;

  WALKING_IMAGES = [
    "img/2_character_pepe/2_walk/W-21.png",
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

  world;

  // currentImage = 0;

  /**
   * Initializes the character by loading all animation images and starting
   * the animation and gravity loops.
   */
  constructor() {
    super().loadImage("img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadImages(this.WALKING_IMAGES);
    this.loadImages(this.JUMPING_IMAGES);
    this.loadImages(this.HURT_IMAGES);
    this.loadImages(this.DEAD_IMAGES);

    this.animate();
    this.applyGravity();
  }

  /**
   * Starts the movement and animation loops for the character.
   * Handles keyboard input (left, right, jump) and updates the camera position.
   * Selects the appropriate animation based on the current state (dead, hurt, walking, jumping).
   */
  animate() {
    setInterval(() => {
      if (this.world) {
        //WALKS RIGHT
        if (
          this.world.keyboard.RIGHT &&
          this.x < this.world.level.level_end_x
        ) {
          this.moveRight();
        }

        //WALKS LEFT
        if (this.world.keyboard.LEFT && this.x > 100) {
          this.moveLeft();
          this.otherDirection = true;
        }
        //JUMP
        if (this.world.keyboard.UP && !this.isAboveGround()) {
          this.jump();
        }

        this.world.camera_x = -this.x + 100;
      }
    }, 1000 / 60);

    setInterval(() => {
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
        }
      }
    }, 150);
  }
}
