class Level {
  enemies;
  clouds;
  backgroundObjects;
  level_end_x = 720 * 3;
  collectables;
  coins;

  /**
   * Creates a new Level with the given game objects.
   * @param {MovableObject[]} enemies - Array of enemy objects in the level.
   * @param {Cloud[]} clouds - Array of cloud objects in the level.
   * @param {BackgroundObject[]} backgroundObjects - Array of background layer objects.
   * @param {Collectables[]} collectables - Array of bottles on the ground in the level.
   * @param {Coin[]} coins - Array of coins in the level.
   */
  constructor(enemies, clouds, backgroundObjects, collectables, coins) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.collectables = collectables;
    this.coins = coins;
  }
}
