import {$} from '@core/dom';
import {ActiveRoute} from './ActiveRoute';

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('Selector is not provided in Router');
    }

    this.$placeholder = $(selector);
    this.routes = routes;
    this.page = null;
    this.changePageHandler = this.changePageHandler.bind(this);

    this.init();
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler);
    this.changePageHandler();
  }

  setRoute(path) {
    if (path.includes('excel')) {
      return this.routes.excel;
    } else {
      return this.routes.dashboard;
    }
  }

  changePageHandler() {
    if (this.page) {
      this.page.destroy();
    }
    this.$placeholder.clear();
    const Page = this.setRoute(ActiveRoute.path);
    this.page = new Page(ActiveRoute.param);
    this.$placeholder.append(this.page.getRoot());

    this.page.afterRender();
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler);
  }
}
