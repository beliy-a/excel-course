export class CreateStore {
  constructor(rootReducer, initialState = {}) {
    this.rootReducer = rootReducer;
    this.initialState = initialState;
    this.initState();
  }

  static state = null;
  static listeners = [];

  initState() {
    CreateStore.state =
      this.rootReducer({...this.initialState}, {type: '__INIT__'});
  }

  subscribe(fn) {
    CreateStore.listeners.push(fn);

    return {
      unsubscribe() {
        CreateStore.listeners =
          CreateStore.listeners.filter(listener => listener !== fn);
      },
    };
  }

  dispatch(action) {
    console.log('listeners', CreateStore.listeners);
    CreateStore.state = this.rootReducer(CreateStore.state, action);
    CreateStore.listeners.forEach(listener => listener(CreateStore.state));
  }

  getState() {
    return JSON.parse(JSON.stringify(CreateStore.state));
  }
}
