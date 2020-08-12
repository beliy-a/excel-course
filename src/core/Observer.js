export class Observer {
  constructor() {
    this.listeners = {};
  }

  notifySubscribers(eventType, ...args) {
    if (Array.isArray(this.listeners[eventType])) {
      this.listeners[eventType].forEach(listener => listener(...args));
    }
  }

  subscribe(eventType, fn) {
    if (!Array.isArray(this.listeners[eventType])) {
      this.listeners[eventType] = [];
    }
    this.listeners[eventType].push(fn);
    return () => {
      this.listeners[eventType] =
        this.listeners[eventType].filter(listener => listener !== fn);
    };
  }
}


