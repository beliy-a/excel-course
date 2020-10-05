import {storage} from '@core/utils';

function toHTML(key) {
  const keyParse = key.split(':').join('/');
  const title = storage(key).tableName;
  const date = storage(key).openedDate;

  return `
    <li class="table-list__record">
         <a href="#${keyParse}" class="table-list__record--item">
         ${title}
         </a>
          <strong>
            ${new Date(date).toLocaleDateString()}
            ${new Date(date).toLocaleTimeString()}
          </strong>                  
    </li>
    `;
}

function getKeysInStorage() {
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key.includes('excel')) {
      continue;
    }
    keys.push(key);
  }
  return keys;
}

export function createRecords() {
  const keys = getKeysInStorage();

  if (!keys.length) {
    return `<p>Вы пока не создали ни одной таблицы</p>`;
  }

  return `
     <div class="table-header">
        <span class="table-header__name">Название</span>
        <span class="table-header__date">Дата открытия</span>
    </div>

    <ul class="table-list">
        ${keys.map(excelKey => {
    return toHTML(excelKey);
  }).join('')}
    </ul>
    `;
}
