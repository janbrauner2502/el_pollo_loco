import { DrawableObject } from './drawableObject.class.js';

/**
 * Base class for all collectable items in the game (e.g. bottles, coins).
 * @extends DrawableObject
 */
export class CollectableObject extends DrawableObject {

  /**
   * Creates a new CollectableObject by calling the parent constructor.
   */
  constructor() {
    super();
  }
}
