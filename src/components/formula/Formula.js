import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';

export class Formula extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options,
    });
  }
    static className = 'excel__formula';

    toHTML() {
      return `
        <div class="formula__info">fx</div>
        <div id="input" class="formula__input" contenteditable
            spellcheck="false"></div>
      `;
    }

    init() {
      super.init();
      const $formula = this.$root.find('#input');

      this.$on('table:value', value => {
        $formula.text = value;
      });
    }
    onInput(event) {
      this.$emit('formula:value', $(event.target).text);
    }

    onKeydown(event) {
      const keys = ['Enter', 'Tab'];

      if (keys.includes(event.key)) {
        event.preventDefault();
        this.$emit('formula:done');
      }
    }
}
