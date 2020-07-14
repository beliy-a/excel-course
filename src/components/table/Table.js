import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {resizeTable} from '@/components/table/table.resize';


export class Table extends ExcelComponent {
  constructor($root) {
    super($root, {
      listeners: ['mousedown'],
    });
  }
  static className = 'excel__table';

  toHTML() {
    return createTable(30);
  }


  onMousedown(event) {
    const resize = event.target.dataset.resize;

    if (resize) {
      resizeTable(event, this.$root);
    }
  }
}
