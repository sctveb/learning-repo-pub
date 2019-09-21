import { createStore, combineReducers } from 'redux';
import testCaseReducer from './testCase/state';

const reducer = combineReducers({
    testCase: testCaseReducer,
});

const store = createStore(reducer);
export default store;