import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';
import * as actions from '@/redux/actions';

export class Header extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['keydown'],
      ...options,
    });
  }
    static className = 'excel__header';

    toHTML() {
      const title = this.store.getState().tableName;
      return `
      <input type="text" class="header__input" value="${title}">
        <div class="buttons__container">
            <div class="button">
                <i class="material-icons">exit_to_app</i>
            </div>
            <div class="button">
                <i class="material-icons">delete</i>
            </div>
        </div>
      `;
    }

    onKeydown(event) {
      const keyEnter = event.key === 'Enter' ? 'Enter': undefined;
      const input = $(event.target);

      if (keyEnter) {
        this.$dispatch(actions.changeTableName({title: input.val}));
        input.blur();
      }
    }
}

