import { Keyboard } from "../models/keyboard.class.js";
import { World } from "../models/world.class.js";

let canvas;
let world;
let keyboard = new Keyboard();
const fullscreen = document.getElementById("fullscreenButton");
const mainContainer = document.getElementsByTagName("main")[0];
const playButton = document.getElementById("playButton");

fullscreen.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    openFullscreen(mainContainer);
  } else {
    closeFullscreen();
  }
});

/* Open fullscreen */
function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE11 */
    elem.msRequestFullscreen();
  }
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE11 */
    document.msExitFullscreen();
  }
}

/**
 * Initializes the game once the DOM is fully loaded.
 * Sets up the canvas dimensions and creates a new World instance.
 */
playButton.addEventListener("click", () => {
  canvas = document.getElementById("canvas");
  canvas.width = 720;
  canvas.height = 480;
  world = new World(canvas, keyboard);
  document.querySelector(".start-screen").style.display = "none";
  mainContainer.classList.add("game-active");
});

/**
 * Listens for keydown events and sets the corresponding keyboard flags to true.
 * Mapped keys: A (LEFT), D (RIGHT), Space (UP/Jump), F (THROW).
 */
window.addEventListener("keydown", (event) => {
  if (event.code === "KeyA") {
    keyboard.LEFT = true;
  }
  if (event.code === "KeyD") {
    keyboard.RIGHT = true;
  }
  if (event.code === "Space") {
    event.preventDefault();
    keyboard.UP = true;
  }
  if (event.code === "KeyF") {
    keyboard.THROW = true;
  }
});

/**
 * Listens for keyup events and sets the corresponding keyboard flags to false.
 * Mapped keys: A (LEFT), D (RIGHT), Space (UP/Jump), F (THROW).
 */
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
