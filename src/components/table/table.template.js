const CHAR_CODE = {
  A: 65,
  Z: 90,
};

function createRow(content, index) {
  const resize = index ? '<div class="row__resize" data-resize="row"></div>' :
   '';

  return `
     <div class="row" data-type="resizable">
        <div class="row__info">
          ${index ? index : ''}
          ${resize}
        </div>
        <div class="row__data">${content}</div>
    </div>
  `;
}

function getCharCode(index) {
  return String.fromCharCode(CHAR_CODE.A + index);
}

function createCol(_, index) {
  return `
      <div class="column" data-type="resizable" data-col=${getCharCode(index)}>
        ${getCharCode(index)}
        <div class="column__resize" data-resize="col"></div>
      </div>
  `;
}

function createCell(row) {
  return function(_, index) {
    return `
    <div 
      class="cell" 
      contenteditable 
      data-col="${getCharCode(index)}"
      data-type="cell"
      data-id="${row}:${index}">
    </div>
  `;
  };
}


export function createTable(rows = 15) {
  const numberOfColumns = CHAR_CODE.Z - CHAR_CODE.A + 1;
  const numberOfRows = [];

  const columns = new Array(numberOfColumns)
      .fill('')
      .map(createCol)
      .join('');


  numberOfRows.push(createRow(columns));

  for (let i = 0; i < rows; i++) {
    const row = new Array(numberOfColumns)
        .fill('')
        .map(createCell(i))
        .join('');
    numberOfRows.push(createRow(row, i + 1));
  }

  return numberOfRows.join('');
}


