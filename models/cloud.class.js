class Cloud extends MovableObject {
    x = 20;
    y = 20;

    width = 300;
    height = 200;

    constructor() {
        const imgCloud1 = "img/5_background/layers/4_clouds/1.png";
        const imgCloud2 = "img/5_background/layers/4_clouds/1.png";
        const randomCloud = Math.random() > 0.5 ? imgCloud1 : imgCloud2;
        super().loadImage(randomCloud);
        
        this.x = 20 + Math.random() * 720;
        console.log(this.x)

        this.animation()

    }

    animation() {
        setInterval(() => {this.x -= 0.2;}, 1000 / 60);
        
    }

    // startInterval() {
    //     intervalId = setInterval(() => {
    //
    //         console.log("Running...");
    //     }, 1000);
    // }
    //
    //
    // stopInterval() {
    //     clearInterval(intervalId);
    //     intervalId = null; // Optional: reset for safety
    // }


}