import {ExcelStateComponent} from '@core/ExcelStateComponent';
import {createToolbar} from './toolbar.template';
import {defaultStyles} from '@core/constants';
import {$} from '@core/dom';
// import {initialState} from '../../redux/initialState';


export class Toolbar extends ExcelStateComponent {
  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribe: ['currentStyles'],
      ...options,
    });
  }
    static className = 'excel__toolbar';

    prepare() {
      this.initState(defaultStyles);
    }

    get template() {
      return createToolbar(this.state);
    }

    toHTML() {
      return this.template;
    }

    storeChanged(changes) {
      this.setState(changes['currentStyles']);
    }

    onClick(event) {
      const $button = $(event.target);
      if ($button.dataset.type === 'button') {
        const value = JSON.parse($button.dataset.value);
        this.$emit('toolbar:applyStyle', value);
      }
    }
}
