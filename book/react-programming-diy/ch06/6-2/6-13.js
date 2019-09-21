function dispatch(action) {
    currentState = currentReducer(currentState, action);
    for (let i = 0; i < listeners.length; i++) {
        listeners[i]()
    }
    return action
}