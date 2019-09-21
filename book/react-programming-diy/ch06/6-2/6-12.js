const applyMiddleware = (...middlewares) => createStore => (...args) => {
    const store = createStore(...args);
    const funcWithStore = middlewares.map(middleware => middleware(store));
    const chainedFunc = funcWithStore.reduce((a,b) => next => a(b(next)));
    return {
        ...store,
        dispatch: chainedFunc(store.dispatch),
    }
}