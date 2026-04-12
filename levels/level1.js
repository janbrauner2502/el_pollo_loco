import { Level } from "../models/level.class.js";
import { Endboss } from "../models/endboss.class.js";
import { NormalChicken } from "../models/normalChicken.class.js";
import { SmallChicken } from "../models/smallChicken.class.js";
import { Cloud } from "../models/cloud.class.js";
import { BackgroundObject } from "../models/backgroundObject.class.js";
import { GroundBottle } from "../models/groundBottle.class.js";
import { Coin } from "../models/coin.class.js";

/**
 * Level 1 configuration. Creates enemies, clouds, background layers, collectable bottles and coins.
 * @type {Level}
 */
export function createNewLevel() {
  return new Level(
    createEndboss(),
    createEnemies(),
    createClouds(),
    createBackgroundObjects(),
    createCollectables(),
  );

  /**
   * Creates the endboss instance for this level.
   * @returns {Endboss} The endboss object.
   */
  function createEndboss() {
    return new Endboss();
  }

  /**
   * Creates an array of normal and small chicken enemies.
   * @returns {MovableObject[]} Array of enemy chicken objects.
   */
  function createEnemies() {
    return [
      new NormalChicken(),
      new NormalChicken(),
      new NormalChicken(),
      new SmallChicken(),
      new SmallChicken(),
      new SmallChicken(),
    ];
  }

  /**
   * Creates an array of cloud objects for the background.
   * @returns {Cloud[]} Array of cloud objects.
   */
  function createClouds() {
    return [new Cloud(), new Cloud(), new Cloud(), new Cloud()];
  }

  /**
   * Creates all background layer objects (air, third, second and first layer) for each screen segment.
   * @returns {BackgroundObject[]} Array of background objects.
   */
  function createBackgroundObjects() {
    let objects = [];
    [1, 2, 3, 4, 5].forEach((index) => {
      let xValue = (index - 1) * 720;
      let imgIndex = index % 2 === 0 ? "2" : "1";
      objects.push(
        new BackgroundObject("img/5_background/layers/air.png", xValue),
      );
      objects.push(
        new BackgroundObject(
          `img/5_background/layers/3_third_layer/${imgIndex}.png`,
          xValue,
        ),
      );
      objects.push(
        new BackgroundObject(
          `img/5_background/layers/2_second_layer/${imgIndex}.png`,
          xValue,
        ),
      );
      objects.push(
        new BackgroundObject(
          `img/5_background/layers/1_first_layer/${imgIndex}.png`,
          xValue,
        ),
      );
    });
    return objects;
  }

  /**
   * Creates an array of collectable items (ground bottles and coins).
   * @returns {CollectableObject[]} Array of collectable objects.
   */
  function createCollectables() {
    return [
      new GroundBottle(),
      new GroundBottle(),
      new GroundBottle(),
      new GroundBottle(),
      new GroundBottle(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
    ];
  }
}
