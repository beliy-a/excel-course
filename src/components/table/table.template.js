const CHAR_CODE = {
  A: 65,
  Z: 90,
};

function createRow(content, index) {
  return `
     <div class="row">
        <div class="row__info">${index ? index : ''}</div>
        <div class="row__data">${content}</div>
    </div>
  `;
}

function getCharCode() {
  return String.fromCharCode(CHAR_CODE.A++);
}

function createCol() {
  return `
      <div class="column">${getCharCode()}</div>
  `;
}

function createCell() {
  return `
    <div class="cell" contenteditable></div>
  `;
}


export function createTable(rows = 15) {
  const numberOfColumns = CHAR_CODE.Z - CHAR_CODE.A + 1;
  const numberOfRows = [];

  const columns = new Array(numberOfColumns)
      .fill('')
      .map(createCol)
      .join('');

  const row = new Array(numberOfColumns)
      .fill('')
      .map(createCell)
      .join('');

  numberOfRows.push(createRow(columns));

  for (let i = 0; i < rows; i++) {
    numberOfRows.push(createRow(row, i + 1));
  }

  return numberOfRows.join('');
}


