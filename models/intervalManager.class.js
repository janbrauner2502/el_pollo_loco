class IntervalManager {
  
  constructor() {
    this.intervals = new Set();
  }

  setInterval(fn, delay) {
    const id = window.setInterval(fn, delay);
    this.intervals.add(id);
    return id;
  }

  clearAllIntervals() {
    this.intervals.forEach((id) => window.clearInterval(id));
    this.intervals.clear();
  }
  
  clearInterval(id) {
    window.clearInterval(id);
    this.intervals.delete(id);
  }
}

let intervalManager = new IntervalManager();