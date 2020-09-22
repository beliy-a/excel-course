import {setStyles} from './table.functions';
import {toInlineStyles, parse} from '@core/utils';
import {defaultStyles} from '@core/constants';

const CHAR_CODE = {
  A: 65,
  Z: 90,
};

let tableState = null;

function createRow(content, index) {
  const resize = index ? '<div class="row__resize" data-resize="row"></div>' :
    '';
  const dataRow = index ? `data-row=${index}` : '';
  return `
     <div class="row" 
     data-type="resizable" 
     ${dataRow}
     style=${setStyles('height', tableState.height[index], 'px')}>
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
      <div 
        class="column" 
        data-type="resizable" 
        data-col=${getCharCode(index)}
        style=${setStyles('width',
      tableState.width[getCharCode(index)], 'px')}>
        ${getCharCode(index)}
        <div class="column__resize" data-resize="col"></div>
      </div>
  `;
}

function createCell(row) {
  return function(_, index) {
    const id = `${row}:${index}`;
    const setStyle =`${setStyles('width',
        tableState.width[getCharCode(index)], 'px')}`;
    const toInlineStyle =`${toInlineStyles({...defaultStyles,
      ...tableState.inlineStyles[id]})}`;
    return `<div
      class="cell"
      contenteditable
      data-col="${getCharCode(index)}"
      data-type="cell"
      data-id="${id}"
      data-value="${tableState.dataState[id] || ''}"
      style="${setStyle}; ${toInlineStyle};"
      >${parse(tableState.dataState[id]) || ''}</div>`;
  };
}

export function createTable(rows = 15, state) {
  const numberOfColumns = CHAR_CODE.Z - CHAR_CODE.A + 1;
  const numberOfRows = [];

  tableState = {
    width: state?.colState ? state.colState : '',
    height: state?.rowState ? state.rowState : '',
    dataState: state?.dataState ? state.dataState : '',
    inlineStyles: state?.stylesState ? state.stylesState : '',
  };

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

