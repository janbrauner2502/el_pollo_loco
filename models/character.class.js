class Character extends MovableObject {
    x = 100;
    // y = 230;
    y = 74;

    height = 200;
    width = 120;
    speed = 2;
    speedY = 0
    acceleration = 2;

    WALKING_IMAGES = [
        "img/2_character_pepe/2_walk/W-21.png",
        "img/2_character_pepe/2_walk/W-22.png",
        "img/2_character_pepe/2_walk/W-23.png",
        "img/2_character_pepe/2_walk/W-24.png",
        "img/2_character_pepe/2_walk/W-25.png",
        "img/2_character_pepe/2_walk/W-26.png"
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
        "img/2_character_pepe/3_jump/J-39.png"
    ];
    
    world;

    // currentImage = 0;

    constructor() {
        super().loadImage("img/2_character_pepe/1_idle/idle/I-1.png");
        this.loadImages(this.WALKING_IMAGES);
        this.loadImages(this.JUMPING_IMAGES);

        this.animate();
        this.applyGravity()
    }

    animate() {
        setInterval(() => {
            if (this.world) {
                //WALKS RIGHT
                if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
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
        }, 1000 / 60)
        
        setInterval(() => {
            if (this.world) {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {                
                    //WALK ANIMATION
                    this.playAnimation(this.WALKING_IMAGES);
                }
                
                if (this.isAboveGround()) {
                    this.playAnimation(this.JUMPING_IMAGES);
                }
            }
        }, 150)
    };
    
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }
    
    isAboveGround(){
        return this.y < 230;
    }
    
    
}