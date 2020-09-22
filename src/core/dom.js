class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string' ?
      document.querySelector(selector) :
      selector;
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html;
      return this;
    }

    return this.$el.innerHTML.trim();
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector);
  }

  find(selector) {
    return $(this.$el.querySelector(selector));
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback);
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback);
  }

  clear() {
    this.html('');
    return this;
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el;
    }

    if (Element.prototype.append) {
      this.$el.append(node);
    } else {
      this.$el.appendChild(node);
    }

    return this;
  }

  focus() {
    this.$el.focus();
    return this;
  }

  blur() {
    this.$el.blur();
    return this;
  }

  set text(text) {
    if (typeof text !== 'undefined') {
      this.$el.textContent = text;
    }
  }

  get text() {
    return this.$el.innerText.trim();
  }

  get val() {
    return this.$el.value.trim();
  }

  closest(selector) {
    return $(this.$el.closest(selector));
  }

  get dataset() {
    return this.$el.dataset;
  }

  getClientReacts() {
    return this.$el.getBoundingClientRect();
  }

  css(styles = {}) {
    for (const key in styles) {
      if (Object.prototype.hasOwnProperty.call(styles, key)) {
        this.$el.style[key] = styles[key];
      }
    }
  }

  addClass(className) {
    this.$el.classList.add(className);
  }

  removeClass(className) {
    this.$el.classList.remove(className);
  }

  contains(className) {
    return this.$el.classList.contains(className);
  }
  getStyles(prop) {
    if (Array.isArray(prop)) {
      return prop.reduce((res, style) => {
        res[style] = this.$el.style[style];
        return res;
      }, {});
    }
    return getComputedStyle(this.$el).getPropertyValue(prop);
  }

  id(parse = false) {
    if (parse) {
      return {
        row: +(this.$el.dataset.id.split(':')[0]),
        col: +(this.$el.dataset.id.split(':')[1]),
      };
    }
    return this.$el.dataset.id;
  }

  attr(name, value) {
    if (value) {
      this.$el.setAttribute(name, value);
      return this;
    }
    return this.$el.getAttribute(name);
  }
}

export function $(selector) {
  return new Dom(selector);
}

$.create = (node, ...classes) => {
  const el = document.createElement(node);
  el.classList.add(...classes);
  return $(el);
};
