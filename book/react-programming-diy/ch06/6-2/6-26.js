const reducer = createReducer(INITIAL_STATE, {
    [ADD]: (state, action) => state.todos.push(action.todo),
    [REMOVE_ALL]: state => (state.todos = []),
    [REMOVE]: (state, action) => state.todos.filter(todo => todo.id !== action.id),
})