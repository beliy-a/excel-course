
export function capitalize(string) {
  if (typeof string !== 'string') {
    return '';
  }

  return `${string[0].toUpperCase()}${string.slice(1)}`;
}


export function range(start, end) {
  const arrayOfElements = [];
  if (start > end) {
    [start, end] = [end, start];
  }

  for (let i = start; i <= end; i++) {
    arrayOfElements.push(i);
  }

  return arrayOfElements;
}

export function storage(key, data = null) {
  if (!data && typeof key === 'string') {
    return JSON.parse(localStorage.getItem(key));
  } else {
    localStorage.setItem(key, JSON.stringify(data));
  }
}

export function isEqual(firstItem, secondItem) {
  if (typeof firstItem === 'object' && typeof secondItem === 'object') {
    return JSON.stringify(firstItem) === JSON.stringify(secondItem);
  }
  return firstItem === secondItem;
}

export function toInlineStyles(styles = {}) {
  return Object.keys(styles)
      .map(key => `${styleHyphenFormat(key)}:${styles[key]}`)
      .join(';');
}

function styleHyphenFormat(prop) {
  const upperToHyphenLower = `-${prop.match('[A-Z]')[0].toLowerCase()}`;
  return prop.replace(/[A-Z]/, upperToHyphenLower);
}


export function debounce(fn, ms) {
  let isCooldown = false;

  return function() {
    if (isCooldown) {
      return;
    }
    // eslint-disable-next-line
    fn.apply(this, arguments);
    isCooldown = true;

    setTimeout(() => isCooldown = false, ms);
  };
}

export function parse(value = '') {
  const reg = /^[=]([-|+|*|/\d]{0,})$/g;
  if (reg.test(value)) {
    try {
      return eval(value.slice(1));
    } catch (e) {
      console.warn('Parse error', e.message);
    }
  }
  return value;
}


export function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}
