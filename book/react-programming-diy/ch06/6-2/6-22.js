function reducer(state = INITIAL_STATE, action) {
    return produce(state, draft => {
        switch (action.type) {
            case ADD:
               draft.todos.push(action.todo);
               break;
            case REMOVE_ALL:
                draft.todos = [];
                break;
            case REMOVE:
                draft.todos = draft.todos.filter(todo => todo.id !== action.id);
            default:
                break;
        }
    })
    
}