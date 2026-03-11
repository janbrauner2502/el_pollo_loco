class Character extends MovableObject {
    x = 100;
    y = 230;

    height = 200;
    width = 120;
    speed = 2;

    WALKING_IMAGES = [
        "img/2_character_pepe/2_walk/W-21.png",
        "img/2_character_pepe/2_walk/W-22.png",
        "img/2_character_pepe/2_walk/W-23.png",
        "img/2_character_pepe/2_walk/W-24.png",
        "img/2_character_pepe/2_walk/W-25.png",
        "img/2_character_pepe/2_walk/W-26.png"
    ];
    world;

    // currentImage = 0;

    constructor() {
        super().loadImage("img/2_character_pepe/1_idle/idle/I-1.png");
        this.loadImages(this.WALKING_IMAGES);

        this.animate();
    }

    animate() {
        setInterval(() => {
            if (this.world) {
                //WALKS RIGHT
                if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                    this.x += this.speed;
                    this.otherDirection = false;
                }
                
                //WALKS LEFT
                if (this.world.keyboard.LEFT && this.x > 100) {
                    this.x -= this.speed;
                    this.otherDirection = true;
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
            }
        }, 150)
    };
    
    jump() {}
}