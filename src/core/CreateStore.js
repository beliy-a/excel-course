export class CreateStore {
  constructor(rootReducer, initialState = {}) {
    this.rootReducer = rootReducer;
    this.initialState = initialState;
    this.initState();
  }

    #state = null;
    #listeners = [];

    initState() {
      this.#state =
        this.rootReducer({...this.initialState}, {type: '__INIT__'});
    }

    subscribe(fn) {
      this.#listeners.push(fn);

      return {
        unsubscribe() {
          this.#listeners =
          this.#listeners.filter(listener => listener !== fn);
        },
      };
    }

    dispatch(action) {
      this.#state = this.rootReducer(this.#state, action);
      this.#listeners.forEach(listener => listener(this.#state));
    }

    getState() {
      return JSON.parse(JSON.stringify(this.#state));
    }
}
