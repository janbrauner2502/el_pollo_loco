class Level {
  enemies;
  clouds;
  backgroundObjects;
  level_end_x = 720 * 3;
  collectables;

  constructor(enemies, clouds, backgroundObjects, collectables) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    // this.collectables = this.collectables;
  }
}
