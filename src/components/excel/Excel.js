import {$} from '@core/dom';
import {Observer} from '@core/Observer';

export class Excel {
  constructor(selector, {components}) {
    this.$elNode = $(selector);
    this.components = components || [];
    this.observer = new Observer();
  }

  getRoot() {
    const $excel = $.create('div', 'excel');
    const $sharedContainer = $.create('div', 'shared-container');
    const componentOptions = {observer: this.observer};

    this.components = this.components.map(Component => {
      const $el = $.create('div', Component.className);
      const component = new Component($el, componentOptions);
      $el.html(component.toHTML());

      if (Component.name === 'Table') {
        $excel.append($el);
      } else {
        $sharedContainer.append($el);
        $excel.append($sharedContainer);
      }
      return component;
    });

    return $excel;
  }

  render() {
    this.$elNode.append(this.getRoot());
    this.components.forEach(component => component.init());
  }

  destroy() {
    this.components.forEach(component => component.destroy());
  }
}
