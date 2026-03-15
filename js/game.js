let canvas;
let world;
let keyboard = new Keyboard();

document.addEventListener("DOMContentLoaded", () => {
  canvas = document.getElementById("canvas");
  canvas.width = 720;
  canvas.height = 480;
  world = new World(canvas, keyboard);

  // console.log("My character is", world.character);
  // console.log("My enemies are", world.enemies);
  // console.log(world.character.width, world.character.height);
  // console.log(keyboard);
});

window.addEventListener("keydown", (event) => {
  if (event.code === "KeyA") {
    keyboard.LEFT = true;
  }
  if (event.code === "KeyD") {
    keyboard.RIGHT = true;
  }
  if (event.code === "Space") {
    keyboard.UP = true;
  }
  if (event.code === "KeyF") {
    keyboard.THROW = true;
  }

  // console.log(keyboard);
});

window.addEventListener("keyup", (event) => {
  if (event.code === "KeyA") {
    keyboard.LEFT = false;
  }
  if (event.code === "KeyD") {
    keyboard.RIGHT = false;
  }
  if (event.code === "Space") {
    keyboard.UP = false;
  }
  if (event.code === "KeyF") {
    keyboard.THROW = false;
  }
});
