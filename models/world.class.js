class World {
    character = new Character();
    enemies = [new NormalChicken(), new NormalChicken(), new NormalChicken(),new SmallChickenClass(), new SmallChickenClass(), new SmallChickenClass()];
    clouds = [new Cloud(), new Cloud(), new Cloud()];
    backgroundObjects = (() => {
        let objects = [];
        [1, 2, 3, 4].forEach(index => {
            let xValue = (index - 1) * 720;
            let imgIndex = index % 2 === 0 ? '2' : '1';
            objects.push(new BackgroundObject("img/5_background/layers/air.png", xValue));
            objects.push(new BackgroundObject(`img/5_background/layers/3_third_layer/${imgIndex}.png`, xValue));
            objects.push(new BackgroundObject(`img/5_background/layers/2_second_layer/${imgIndex}.png`, xValue));
            objects.push(new BackgroundObject(`img/5_background/layers/1_first_layer/${imgIndex}.png`, xValue));
        });
        return objects;
    })();
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    
    


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.setWorld();

        this.draw();
    }
    
    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToCanvas(this.backgroundObjects);
        this.addToCanvas(this.character);
        this.addObjectsToCanvas(this.enemies);
        this.addObjectsToCanvas(this.clouds);
        this.ctx.translate(-this.camera_x, 0);



        //draw() wird immer wieder aufgerufen, was die GraKa hergibt
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    };

    addObjectsToCanvas(objects) {
        objects.forEach(object => {
            this.addToCanvas(object);
        });
    }

    addToCanvas(object) {
        if (object.otherDirection) {
            this.ctx.save();
            this.ctx.translate(object.x + object.width / 2, 0);
            this.ctx.scale(-1, 1);
            this.ctx.translate(-object.x - object.width / 2, 0);
        }       
        
        this.ctx.drawImage(object.img, object.x, object.y, object.width, object.height)
        
        if(object.otherDirection) {
            this.ctx.restore();
        }
    }

}