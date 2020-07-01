import {ExcelComponent} from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
  constructor($root) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click'],
    });
  }
    static className = 'excel__formula';

    toHTML() {
      return `
        <div class="formula__info">fx</div>
        <div class="formula__input" contenteditable
            spellcheck="false"></div>
      `;
    }

    onInput(event) {
      console.log('input');
    }

    onClick() {
      console.log('Click Formula');
    }
}
