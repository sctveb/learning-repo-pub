import { createStore, appltMiddleware } from 'redux';

const middleware1 = store => next => action => {
    console.log('middleware1 start');
    const result = next(action)
    console.log('middleware1 ended');
    return result
};

const middleware2 = store => next => action => {
    console.log('middleware2 start');
    const result = next(action)
    console.log('middleware2 ended');
    return result
};

const myReducer = (state, action) => {
    console.log('myReducer');
    return state;
}

const store = createStore(myReducer, appltMiddleware(middleware1, middleware2));
store.dispatch({ type: 'someAction' });