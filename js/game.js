import { Keyboard } from "../models/keyboard.class.js";
import { World } from "../models/world.class.js";

let canvas;
let world;
let keyboard = new Keyboard();
const fullscreen = document.getElementById("fullscreenButton");
const mainContainer = document.getElementsByTagName("main")[0];
const playButton = document.getElementById("startGameButton");
const playAgainButton = document.getElementById("playAgainButton");
const backToStartButton = document.getElementById("backToStartButton");
const gameEndScreen = document.getElementById("gameEndScreen");
const touchBtnSection = document.getElementsByTagName("section")[0];
const mobileMediaQuery = window.matchMedia("(width <= 1440px)");

fullscreen.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    openFullscreen(mainContainer);
  } else {
    closeFullscreen();
  }
});

// Bei Orientierungswechsel prüfen
window.matchMedia("(orientation: landscape)").addEventListener("change", () => {
  checkFullscreenMobile();
});

// Bei Änderung der Bildschirmbreite (z.B. Fenstergröße) prüfen
mobileMediaQuery.addEventListener("change", () => {
  checkFullscreenMobile();
});

/**
 * Opens the browser fullscreen mode for the given element.
 * @param {HTMLElement} elem - The DOM element to display in fullscreen.
 */
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

/**
 * Closes the browser fullscreen mode.
 */
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
 * Initializes the game by checking for touch support.
 * If touch input is available, the mobile control buttons are shown.
 * Then starts the game via {@link startGame}.
 */
function initGame() {
  const isTouch = hasTouchSupport();
  if (isTouch) {
    touchBtnSection.classList.remove("d-none");
    startGame();
  } else {
    startGame();
  }
}

/**
 * Sets up the canvas with fixed dimensions, creates a new {@link World} instance,
 * hides the start screen, and resets the game-end screen for a new game session.
 */
function startGame() {
  canvas = document.getElementById("canvas");
  canvas.width = 720;
  canvas.height = 480;
  world = new World(canvas, keyboard);
  document.querySelector(".start-screen").style.display = "none";
  mainContainer.classList.add("game-active");
  gameEndScreen.classList.remove("game-over-screen", "win-screen");
  gameEndScreen.classList.add("d-none");
}

playButton.addEventListener("click", () => {
  initGame();
});

playAgainButton.addEventListener("click", () => {
  initGame();
});

backToStartButton.addEventListener("click", () => {
  window.location.href = "index.html";
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

/**
 * Registers touchstart and touchend event listeners on the mobile control buttons
 * to set and reset the corresponding keyboard flags.
 */
function mobileBtnTouchEvents() {
  document
    .getElementById("leftButton")
    .addEventListener("touchstart", (event) => {
      event.preventDefault();
      keyboard.LEFT = true;
    });
  document
    .getElementById("rightButton")
    .addEventListener("touchstart", (event) => {
      event.preventDefault();
      keyboard.RIGHT = true;
    });
  document
    .getElementById("jumpButton")
    .addEventListener("touchstart", (event) => {
      event.preventDefault();
      keyboard.UP = true;
    });
  document
    .getElementById("throwButton")
    .addEventListener("touchstart", (event) => {
      event.preventDefault();
      keyboard.THROW = true;
    });

  document
    .getElementById("leftButton")
    .addEventListener("touchend", (event) => {
      event.preventDefault();
      keyboard.LEFT = false;
    });
  document
    .getElementById("rightButton")
    .addEventListener("touchend", (event) => {
      event.preventDefault();
      keyboard.RIGHT = false;
    });
  document
    .getElementById("jumpButton")
    .addEventListener("touchend", (event) => {
      event.preventDefault();
      keyboard.UP = false;
    });
  document
    .getElementById("throwButton")
    .addEventListener("touchend", (event) => {
      event.preventDefault();
      keyboard.THROW = false;
    });
}
/**
 * Checks whether the current device supports touch input.
 * @returns {boolean} True if touch input is supported, false otherwise.
 */
function hasTouchSupport() {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

/**
 * Checks orientation, screen size and touch support and toggles the
 * 'fullscreen-mobile' CSS class on the main container accordingly.
 */
function checkFullscreenMobile() {
  const isLandscape = window.matchMedia("(orientation: landscape)").matches;
  const isLargeScreen = mobileMediaQuery.matches;
  const isTouch = hasTouchSupport();
  if (isLandscape && isLargeScreen && isTouch) {
    mainContainer.classList.add("fullscreen-mobile");
    console.log("fullscreen-mobile aktiviert");
  } else {
    mainContainer.classList.remove("fullscreen-mobile");
    console.log("fullscreen-mobile deaktiviert");
  }
}

mobileBtnTouchEvents();
hasTouchSupport();
checkFullscreenMobile();
