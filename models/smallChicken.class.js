class SmallChickenClass extends NormalChicken {

    WALKING_IMAGES = [
        "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
        "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
        "img/3_enemies_chicken/chicken_small/1_walk/3_w.png"
    ];

    constructor() {
        // const imgNormalChicken = "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png";
        const imgSmallChicken = "img/3_enemies_chicken/chicken_small/1_walk/1_w.png";
        // const randomChicken = Math.random() > 0.5 ? imgNormalChicken : imgSmallChicken;

        super().loadImage(imgSmallChicken);

        this.loadImages(this.WALKING_IMAGES);

        this.animate();

        this.x = 200 + Math.random() * 500;

        this.animation()
    }

    animation() {
        setInterval(() => {
            this.moveLeft()
        }, 1000 / 60);
    }

    animate() {

        setInterval(() => {
            this.playAnimation(this.WALKING_IMAGES);
        }, 150)
    }
}