import createReducer from '../common/createReducer';

const ADD = "testCase/ADD";
const REMOVE = "testCase/REMOVE";
const EDIT = "testCase/EDIT";

export const addTest = test => ({ type: ADD, test });
export const removeTest = test => ({ type: REMOVE, test });
export const editTest = test => ({ type: EDIT, test });

const INITIAL_STATE = { tests: [] };

const reducer = createReducer(INITIAL_STATE, {
    [ADD] : (state, action) => state.tests.push(action.test),
    [REMOVE] : (state, action) => {
        state.tests = state.tests.filter(test => test.id !== action.test.id)
    },
    [EDIT] : (state, action) => {
        const index = state.tests.findIndex(
            test => test.id === action.test.id
        );
        if (index >= 0) {
            state.tests[index] = action.test;
        }
    },
});

export default reducer;