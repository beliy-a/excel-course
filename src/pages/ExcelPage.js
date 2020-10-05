import {Page} from '@core/Page';
import {Excel} from '@/components/excel/Excel';
import {Header} from '@/components/header/Header';
import {Toolbar} from '@/components/toolbar/Toolbar';
import {Formula} from '@/components/formula/Formula';
import {Table} from '@/components/table/Table';
import {CreateStore} from '@core/CreateStore';
import {rootReducer} from '@/redux/rootReducer';
import {storage, debounce} from '@core/utils';
import {normalizeInitialState} from '@/redux/initialState';

function setStorageName(param) {
  return `excel:${param}`;
}

export class ExcelPage extends Page {
  getRoot() {
    const param = this.params ? this.params : Date.now().toString();
    const state = storage(setStorageName(param));
    const store = new CreateStore(rootReducer, normalizeInitialState(state));
    const stateListeners = debounce(state => {
      storage(setStorageName(param), state);
    }, 300);
    this.unsub = store.subscribe(stateListeners);

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store,
    });

    return this.excel.getRoot();
  }

  afterRender() {
    this.excel.init();
  }

  destroy() {
    this.excel.destroy();
    this.unsub.unsubscribe();
  }
}
