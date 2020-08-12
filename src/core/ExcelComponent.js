import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.observer = options.observer;
    this.unsubscribers = [];

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

  prepare() {}

  init() {
    this.initDomListeners();
  }

  destroy() {
    this.removeDomListeners();
    this.unsubscribers.forEach(unsub => unsub());
  }
}
