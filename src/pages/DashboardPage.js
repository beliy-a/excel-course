import {Page} from '@core/Page';
import {$} from '@core/dom';
import {createRecords} from './dashboard.functions';

export class DashboardPage extends Page {
  getRoot() {
    const id = Date.now().toString();
    return $.create('div', 'dashboard').html(`
         <div class="dashboard__header">
                    <h1 class="header__title">Excel Dashboard</h1>
                </div>
                <div class="dashboard__new">
                    <div class="create-container">
                        <a href="#excel/${id}" class="dashboard__create">
                            Новая <br> Таблица
                        </a>
                    </div>

                </div>
                <div class="dashboard__table">
                   ${createRecords()}
                </div>
            </div>
    `);
  }
}
