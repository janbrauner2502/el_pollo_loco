class Cloud extends MovableObject {
    x = 20;
    y = 20;
    width = 300;
    height = 200;

    constructor() {
        super().loadImage("img/5_background/layers/4_clouds/1.png");

        this.x = 20 + Math.random() * 720;
    }

    
    // constructor() {
    //     super().loadImage("img/5_background/layers/4_clouds/1.png");
    // }
}