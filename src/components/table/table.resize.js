import {$} from '@core/dom';

export function resizeTable(event, $root) {
  const $resizer = $(event.target);
  const $parent = $resizer.closest('[data-type="resizable"]');
  const domRect = $parent.getClientReacts();
  const isColumn = $resizer.dataset.resize === 'col' ? true : false;
  const cellProperty = isColumn ? 'min-width' : 'min-height';
  const minCellValue = parseInt($parent.getStyles(cellProperty));
  let colElements;
  let value;

  if (isColumn) {
    const heightRoot = $root.getClientReacts().bottom;
    $resizer.css({
      'opacity': '1px',
      'bottom': `-${heightRoot}px`,
    });
    const dataCol = $parent.closest('[data-col]').dataset.col;
    colElements = $root.findAll(`[data-col="${dataCol}"]`);
  } else {
    const widthRoot = $root.getClientReacts().right;
    $resizer.css({
      'opacity': '1px',
      'right': `-${widthRoot}px`,
    });
  }


  document.onmousemove = e => {
    e.preventDefault();

    if (isColumn) {
      const difference = e.pageX - domRect.right;
      value = difference + domRect.width;
      value = value < minCellValue ? minCellValue : value;
      $resizer.css({'left': `${value}px`});
    } else {
      const difference = e.pageY - domRect.bottom;
      value = difference + domRect.height;
      value = value < minCellValue ? minCellValue : value;
      $resizer.css({'top': `${value}px`});
    }
  };

  document.onmouseup = e => {
    e.preventDefault();
    document.onmousemove = null;

    if (isColumn) {
      $resizer.css({'bottom': '0px'});
      colElements
          .forEach(column => $(column).css({'width': `${value}px`}));
    } else {
      const row = $parent;
      row.css({'height': `${value}px`});
      $resizer.css({'right': '0px'});
    }

    document.onmouseup = null;
  };
}
