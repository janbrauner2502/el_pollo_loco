export const collect_coin = new Audio("assets/audio/coin.wav");
export const collect_bottle = new Audio("assets/audio/collect_bottle.wav");
export const hit = new Audio("assets/audio/hurt.flac");
export const walk = new Audio("assets/audio/walk.wav");
export const endbossHit = new Audio("assets/audio/c_throw_2.wav");
export const endbossDeath = new Audio("assets/audio/game_win.wav");
export const characterDeath = new Audio("assets/audio/game_over.wav");
export const throwBottle = new Audio("assets/audio/throw.wav");
export const jump = new Audio("assets/audio/jump.wav");
export const chickenHit = new Audio("assets/audio/c_hit_5.wav");
export const bgm = new Audio("assets/audio/bgm.ogg");

let isMuted = localStorage.getItem("isMuted") === "true";
const soundButton = document.getElementById("soundButton");
const allSounds = [
  collect_coin,
  collect_bottle,
  hit,
  walk,
  endbossHit,
  endbossDeath,
  characterDeath,
  throwBottle,
  jump,
  chickenHit,
  bgm,
];

bgm.loop = true;
walk.loop = true;

soundButton.addEventListener("click", () => {
  toggleSound();
});

/**
 * Plays the given sound from the beginning, unless the game is currently muted.
 * @param {HTMLAudioElement} sound - The sound element to play.
 */
export function playSound(sound) {
  if (isMuted) return;
  sound.currentTime = 0;
  sound.play();
}

/**
 * Toggles the global mute state, mutes or unmutes all audio elements,
 * pauses or resumes the background music, and persists the setting in localStorage.
 */
function toggleSound() {
  isMuted = !isMuted;
  muteAllSounds(isMuted);
  !isMuted ? bgm.play() : bgm.pause();
  localStorage.setItem("isMuted", isMuted);
  toggleSoundButton(isMuted);
}

/**
 * Updates the sound button icon based on the current mute state.
 * @param {boolean} isMuted - Whether the game is currently muted.
 */
function toggleSoundButton(isMuted) {
  if (!soundButton) return;
  isMuted
    ? (soundButton.style.backgroundImage = "url('assets/icons/sound_off.svg')")
    : (soundButton.style.backgroundImage = "url('assets/icons/sound_on.svg')");
}

/**
 * Sets the muted property on all audio elements.
 * @param {boolean} muted - Whether to mute (true) or unmute (false) all audio.
 */
function muteAllSounds(muted) {
  allSounds.forEach((sound) => (sound.muted = muted));
}

muteAllSounds(isMuted);
toggleSoundButton(isMuted);
