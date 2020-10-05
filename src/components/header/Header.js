import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';
import * as actions from '@/redux/actions';
import {ActiveRoute} from '@core/router/ActiveRoute';

export class Header extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['click', 'keydown'],
      ...options,
    });
    this.options = options;
  }
    static className = 'excel__header';

    toHTML() {
      const title = this.store.getState().tableName;
      return `
      <input type="text" class="header__input" value="${title}">
        <div class="buttons__container">
            <div class="button" data-button="exit">
                <i class="material-icons" data-button="exit">exit_to_app</i>
            </div>
            <div class="button" data-button="remove">
                <i class="material-icons" data-button="remove">delete</i>
            </div>
        </div>
      `;
    }

    onKeydown(event) {
      const key = event.key;
      const $input = $(event.target);

      if (key === 'Enter') {
        this.$dispatch(actions.changeTableName({title: $input.val}));
        $input.blur();
      }
    }

    onClick(event) {
      const button = $(event.target).dataset.button;

      if (button === 'exit') {
        ActiveRoute.path = '';
      }

      if (button === 'remove') {
        const currentTable = ActiveRoute.path.split('/').join(':');
        if (confirm('Вы действительно хотите удалить таблицу?')) {
          localStorage.removeItem(currentTable);
          ActiveRoute.path = '';
        }
      }
    }
}

