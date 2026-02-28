let canvas;
let world;


document.addEventListener('DOMContentLoaded', () => {
    canvas = document.getElementById('canvas');
    canvas.width = 720;
    canvas.height = 480;
    world = new World(canvas);
    
    console.log('My character is', world.character);
    console.log('My enemies are', world.enemies);
    console.log(world.character.width, world.character.height);
    console.log(world.enemies[0].width, world.enemies[0].height);


})

// function init() {
//     canvas = document.getElementById('canvas');
//     world = new World(canvas);
//     
//     console.log('My character is', world.character);
//     console.log('My enemies are', world.enemies);
//     console.log(world.character.width, world.character.height);
//     console.log(world.enemies[0].width, world.enemies[0].height);
//    
// }