import {ExcelComponent} from '@core/ExcelComponent';
import {range} from '@core/utils';
import {$} from '@core/dom';
import {createTable} from '@/components/table/table.template';
import {resizeTable} from '@/components/table/table.resize';
import {TableSelection} from '@/components/table/TableSelection';
import {
  getSelectGroup,
  isKey,
  nextSelector,
} from '@/components/table/table.functions';


export class Table extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    });
  }
  static className = 'excel__table';

  toHTML() {
    return createTable(30);
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();
    const $cell = this.$root.find('[data-id="0:0"]');
    this.selection.select($cell);

    this.$on('formula:value', value => {
      this.selection.current.text = value;
    });
    this.$on('formula:done', () => {
      this.selection.current.focus();
    });

    this.$emit('table:value', this.selection.current.text);
  }


  onMousedown(event) {
    const resize = event.target.dataset.resize;
    const $cell = $(event.target);

    if (resize) {
      resizeTable(event, this.$root);
    }

    if ($cell.dataset.type === 'cell') {
      const isShift = event.shiftKey;
      if (isShift) {
        const currentID = this.selection.current.id(true);
        const targetID = $cell.id(true);
        const rows = range(currentID.row, targetID.row);
        const cols = range(currentID.col, targetID.col);
        this.selection.selectGroup(getSelectGroup(rows, cols, this.$root));
      } else {
        this.selection.select($cell);
      }
    }
  }

  onKeydown(event) {
    const {key, shiftKey: isShift} = event;

    if (isKey(key) && !isShift) {
      event.preventDefault();
      const id = this.selection.current.id(true);
      const $next = this.$root.find(nextSelector(key, id));
      this.selection.select($next);

      this.$emit('table:value', this.selection.current.text);
    }
  }

  onInput() {
    this.$emit('table:value', this.selection.current.text);
  }
}


