import {$} from '@core/dom';
import {Observer} from '@core/Observer';
import {StoreSubscriber} from '@core/StoreSubscriber';
import * as actions from '@/redux/actions';

export class Excel {
  constructor(options) {
    this.components = options.components || [];
    this.observer = new Observer();
    this.store = options.store;
    this.subscriber = new StoreSubscriber(this.store);
  }

  getRoot() {
    const $excel = $.create('div', 'excel');
    const $sharedContainer = $.create('div', 'shared-container');
    const componentOptions = {observer: this.observer, store: this.store};

    this.components = this.components.map(Component => {
      const $el = $.create('div', Component.className);
      const component = new Component($el, componentOptions);
      $el.html(component.toHTML());

      $sharedContainer.append($el);
      $excel.append($sharedContainer);
      return component;
    });

    return $excel;
  }

  init() {
    this.store.dispatch(actions.openedDate());
    this.subscriber.subscribeComponents(this.components);
    this.components.forEach(component => component.init());
  }

  destroy() {
    this.subscriber.unsubscribeFromStore();
    this.components.forEach(component => component.destroy());
  }
}
