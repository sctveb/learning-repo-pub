const saveToLocalStorage = store => next => action => {
    if (action.type === 'SET_NAME') {
        localStorage.setItem('name', action.name);
    }
    return next(action);
}