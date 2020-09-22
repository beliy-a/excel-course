import {ExcelComponent} from '@core/ExcelComponent';
import {range, parse} from '@core/utils';
import {$} from '@core/dom';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.resize';
import {TableSelection} from '@/components/table/TableSelection';
import {
  getSelectGroup,
  isKey,
  nextSelector,
} from '@/components/table/table.functions';
import * as actions from '@/redux/actions';
import {defaultStyles} from '@core/constants';


export class Table extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input', 'keyup'],
      ...options,
    });
    this.keys = [];
  }
  static className = 'excel__table';

  toHTML() {
    return createTable(30, this.store.getState());
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();
    const $cell = this.$root.find('[data-id="0:0"]');
    const currentStyles = $cell.getStyles(Object.keys(defaultStyles));
    this.selection.select($cell);

    this.$on('formula:value', value => {
      this.selection.current.attr('data-value', value);
      this.selection.current.text = parse(value);
      this.updateTextInStore(value);
    });
    this.$on('formula:done', () => {
      this.selection.current.focus();
    });
    this.$on('toolbar:applyStyle', value => {
      this.selection.applyStyles(value);
      this.$dispatch(actions.applyStyle({
        value,
        ids: this.selection.ids,
      }));
    });

    this.$emit('table:value', this.selection.current);
    this.updateCurrentStylesInStore(currentStyles);
  }

  async resizeTable() {
    try {
      const data = await resizeHandler(event, this.$root);
      this.$dispatch(actions.tableResize(data));
    } catch (error) {
      console.warn('Resize error', error.message);
    }
  }

  updateTextInStore(value) {
    this.$dispatch(actions.changeText({
      id: this.selection.current.id(),
      value,
    }));
  }

  updateCurrentStylesInStore(style = {}) {
    this.$dispatch(actions.changeStyles(style));
  }

  onMousedown(event) {
    const resize = event.target.dataset.resize;
    const $cell = $(event.target);

    if (resize) {
      this.resizeTable();
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
        const styles = $cell.getStyles(Object.keys(defaultStyles));
        this.selection.select($cell);
        this.updateCurrentStylesInStore(styles);
        this.$emit('table:value', this.selection.current);
      }
    }
  }

  onKeydown(event) {
    const {key, shiftKey: isShift, keyCode} = event;
    const keyToggle = {control: 86, v: 17};
    this.keys.push(keyCode);

    if (isKey(key) && !isShift) {
      event.preventDefault();
      const id = this.selection.current.id(true);
      const $next = this.$root.find(nextSelector(key, id));
      this.selection.select($next);

      this.$emit('table:value', this.selection.current);
    }

    if (this.keys.includes(keyToggle.control) &&
        this.keys.includes(keyToggle.v)) {
      this.updateTextInStore(this.selection.current.text);
    }
  }

  onInput() {
    this.updateTextInStore(this.selection.current.text);
  }

  onKeyup() {
    this.keys.length = 0;
  }
}


