class Level {
  enemies;
  clouds;
  backgroundObjects;
  level_end_x = 720 * 3;
  collectables;

  /**
   * Creates a new Level with the given game objects.
   * @param {MovableObject[]} enemies - Array of enemy objects in the level.
   * @param {Cloud[]} clouds - Array of cloud objects in the level.
   * @param {BackgroundObject[]} backgroundObjects - Array of background layer objects.
   * @param {DrawableObject[]} collectables - Array of collectable objects (coins, bottles).
   */
  constructor(enemies, clouds, backgroundObjects, collectables) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    // this.collectables = this.collectables;
  }
}
