import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.observer = options.observer;
    this.unsubscribers = [];
    this.subscribe = options.subscribe || [];
    this.store = options.store;

    this.prepare();
  }

  toHTML() {
    return '';
  }

  $emit(eventType, ...args) {
    this.observer.notifySubscribers(eventType, ...args);
  }

  $on(eventType, fn) {
    const unsub = this.observer.subscribe(eventType, fn);
    this.unsubscribers.push(unsub);
  }

  $dispatch(action) {
    this.store.dispatch(action);
  }

  storeChanged() {}

  isSubscribed(key) {
    return this.subscribe.includes(key);
  }

  prepare() {}

  init() {
    this.initDomListeners();
  }

  destroy() {
    this.removeDomListeners();
    this.unsubscribers.forEach(unsub => unsub());
  }
}
