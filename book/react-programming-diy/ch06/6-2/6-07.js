export const ADD = 'todo/ADD';
export const REMOVE = 'todo/REMOVE';
export const REMOVE_ALL = 'todo/REMOVE_ALL';

export function addTodo({ title, priority }) {
    return { type: 'todo/ADD', title, priority };
}

export function removeTodo({ id }) {
    return { type: 'todo/REMOVE', id }
}

export function removeAllTodo() {
    return { type: 'todo/REMOVE_ALL'}
}