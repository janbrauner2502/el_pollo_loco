/**
 * Manages all game intervals centrally so they can be cleared at once (e.g. on game over).
 */
export class IntervalManager {

  /**
   * Creates a new IntervalManager with an empty set of interval IDs.
   */
  constructor() {
    this.intervals = new Set();
  }

  /**
   * Registers a new interval and tracks its ID.
   * @param {Function} fn - The callback function to execute at each interval tick.
   * @param {number} delay - The interval delay in milliseconds.
   * @returns {number} The interval ID.
   */
  setInterval(fn, delay) {
    const id = window.setInterval(fn, delay);
    this.intervals.add(id);
    return id;
  }

  /**
   * Clears all tracked intervals at once.
   */
  clearAllIntervals() {
    this.intervals.forEach((id) => window.clearInterval(id));
    this.intervals.clear();
  }
  
  /**
   * Clears a single interval by its ID and removes it from the tracked set.
   * @param {number} id - The interval ID to clear.
   */
  clearInterval(id) {
    window.clearInterval(id);
    this.intervals.delete(id);
  }
}

export const intervalManager = new IntervalManager();
