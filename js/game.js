import { Keyboard } from "../models/keyboard.class.js";
import {
  World,
  gameEndScreen,
  header,
  touchBtnSection,
} from "../models/world.class.js";

/** @type {HTMLCanvasElement} The main game canvas element. */
let canvas;
/** @type {World} The current game world instance. */
let world;
/** @type {Keyboard} Tracks the current state of keyboard and touch input. */
let keyboard = new Keyboard();
/** @type {HTMLElement} The fullscreen toggle button. */
const fullscreen = document.getElementById("fullscreenButton");
/** @type {HTMLElement} The main container element used for fullscreen mode. */
const mainContainer = document.getElementsByTagName("main")[0];
/** @type {HTMLElement} The start game button on the start screen. */
const playButton = document.getElementById("startGameButton");
/** @type {HTMLElement} The "Play Again" button on the game-end screen. */
const playAgainButton = document.getElementById("playAgainButton");
/** @type {HTMLElement} The "Back to Start" button on the game-end screen. */
const backToStartButton = document.getElementById("backToStartButton");
/** @type {MediaQueryList} Media query that matches viewports up to 1440px wide. */
const mobileMediaQuery = window.matchMedia("(width <= 1440px)");
/** @type {HTMLElement} The dialog prompting the user to rotate their screen. */
const rotateScreenDialog = document.getElementById("rotateScreen");
/** @type {boolean} Whether the current device supports touch input. */
const isTouch = hasTouchSupport();
/** @type {MediaQueryList} Media query that matches landscape orientation. */
const screenOrientation = window.matchMedia("(orientation: landscape)");

/**
 * Toggles browser fullscreen mode on click of the fullscreen button.
 * Opens fullscreen if not active, closes it otherwise.
 */
fullscreen.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    openFullscreen(mainContainer);
  } else {
    closeFullscreen();
  }
});

/**
 * Re-evaluates the mobile fullscreen state whenever the device orientation changes.
 */
screenOrientation.addEventListener("change", () => {
  checkFullscreenMobile();
  checkScreenOrientation();
});

/**
 * Re-evaluates the mobile fullscreen state whenever the viewport width crosses the 1440px threshold.
 */
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
  header.classList.remove("d-none");
}

/**
 * Starts a new game when the play button on the start screen is clicked.
 */
playButton.addEventListener("click", () => {
  initGame();
});

/**
 * Restarts the game when the "Play Again" button on the end screen is clicked.
 */
playAgainButton.addEventListener("click", () => {
  initGame();
});

/**
 * Navigates back to the start page when the "Back to Start" button is clicked.
 */
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
  const isLandscape = screenOrientation.matches;
  const isLargeScreen = mobileMediaQuery.matches;
  if (isLandscape && isLargeScreen && isTouch) {
    mainContainer.classList.add("fullscreen-mobile");
  } else {
    mainContainer.classList.remove("fullscreen-mobile");
  }
}

/**
 * Checks the current screen orientation and touch support.
 * If the device is in portrait mode and supports touch input,
 * a dialog prompting the user to rotate the screen is shown.
 * In landscape mode, the dialog is closed.
 */
function checkScreenOrientation() {
  const isLandscape = screenOrientation.matches;
  if (!isLandscape && isTouch) {
    rotateScreenDialog.showModal();
  } else {
    rotateScreenDialog.close();
  }
}

mobileBtnTouchEvents();
hasTouchSupport();
checkFullscreenMobile();
checkScreenOrientation();
