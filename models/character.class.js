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
            //WALKS RIGHT
            if (this.world.keyboard.RIGHT) {
                this.x += this.speed;
                this.otherDirection = false;
            }
            
            if (this.world.keyboard.LEFT) {
                this.x -= this.speed;
                this.otherDirection = true;
            }
            this.world.camera_x = -this.x;
            
            
        }, 1000 / 60)
        
        setInterval(() => {

            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {                
                //WALK ANIMATION
                let i = this.currentImage % this.WALKING_IMAGES.length;
                let path = this.WALKING_IMAGES[i];
                this.img = this.imageCache[path];
                this.currentImage++;
            }
        }, 150)
    };
    
    jump() {}
}