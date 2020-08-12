
export function getSelectGroup(rows, cols, $root) {
  const $cells = [];

  for (let row = 0; row < rows.length; row++) {
    for (let col = 0; col < cols.length; col++) {
      const $cell = $root.find(`[data-id="${rows[row]}:${cols[col]}"]`);
      $cells.push($cell);
    }
  }

  return $cells;
}


export function isKey(key) {
  const keys = [
    'Enter',
    'Tab',
    'ArrowUp',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
  ];

  if (keys.includes(key)) {
    return true;
  }

  return false;
}


function createCellId(row, col) {
  return `[data-id="${row}:${col}"]`;
}


export function nextSelector(key, {row, col}) {
  const MIN_VALUE = 0;
  let id = null;
  switch (key) {
    case 'Enter':
      id = createCellId(++row, col * 0);
      break;
    case 'Tab':
    case 'ArrowRight':
      id = createCellId(row, ++col);
      break;
    case 'ArrowLeft':
      col = col - 1 < MIN_VALUE ? MIN_VALUE : col - 1;
      id = createCellId(row, col);
      break;
    case 'ArrowUp':
      row = row - 1 < MIN_VALUE ? MIN_VALUE : row - 1;
      id = createCellId(row, col);
      break;
    case 'ArrowDown':
      id = createCellId(++row, col);
      break;
  }

  return id;
}
