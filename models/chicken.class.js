class Chicken extends MovableObject {
    width = 50;
    height = 50;
    y = 380;
    

    constructor() {
       const imgNormalChicken = "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png";
       const imgSmallChicken = "img/3_enemies_chicken/chicken_small/1_walk/1_w.png";
       const randomChicken = Math.random() > 0.5 ? imgNormalChicken : imgSmallChicken;
        
        super().loadImage(randomChicken);
        
        this.x = 200 + Math.random() * 500;
    }
}