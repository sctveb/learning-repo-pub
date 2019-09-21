function addTodo({ title, priority }) {
    return { type: 'todo/ADD', title, priority };
}

function removeTodo({ id }) {
    return { type: 'todo/REMOVE', id }
}

function removeAllTodo() {
    return { type: 'todo/REMOVE_ALL'}
}

store.dispatch(addTodo({title: '영화 보기', priority: 'high'}));
store.dispatch(removeTodo({id: 123}));
store.dispatch(removeAllTodo());
