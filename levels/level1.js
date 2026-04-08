import { Level } from '../models/level.class.js';
import { Endboss } from '../models/endboss.class.js';
import { NormalChicken } from '../models/normalChicken.class.js';
import { SmallChicken } from '../models/smallChicken.class.js';
import { Cloud } from '../models/cloud.class.js';
import { BackgroundObject } from '../models/backgroundObject.class.js';
import { GroundBottle } from '../models/groundBottle.class.js';
import { Coin } from '../models/coin.class.js';

/**
 * Level 1 configuration. Creates enemies, clouds, background layers, collectable bottles and coins.
 * @type {Level}
 */
export const level1 = new Level(
  new Endboss,
  [
    new NormalChicken(),
    new NormalChicken(),
    new NormalChicken(),
    new SmallChicken(),
    new SmallChicken(),
    new SmallChicken(),
  ],
  [new Cloud(), new Cloud(), new Cloud(), new Cloud()],
  (function () {
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
  })(),

  [
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
  ],
);
