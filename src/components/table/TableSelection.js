export class TableSelection {
  constructor() {
    this.group = [];
    this.current = null;
  }

  #className = 'selected';

  select($el) {
    this.clear();
    this.group.push($el);
    $el.focus().addClass(this.#className);
    this.current = $el;
  }

  selectGroup($group = []) {
    this.clear();
    this.group = $group;
    $group.forEach($el => $el.addClass(this.#className));
  }

  clear() {
    this.group.forEach($el => $el.removeClass(this.#className));
    this.group = [];
  }
}
