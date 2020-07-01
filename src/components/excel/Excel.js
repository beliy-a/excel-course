import {$} from '@core/dom';

export class Excel {
  constructor(selector, {components}) {
    this.$elNode = $(selector);
    this.components = components || [];
  }

  getRoot() {
    const $excel = $.create('div', 'excel');
    const $sharedContainer = $.create('div', 'shared-container');

    this.components = this.components.map(Component => {
      const $el = $.create('div', Component.className);
      const component = new Component($el);
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
}
