const reportCrash = store => next => action => {
    try {
        return next(action)
    } catch(error) {
        // ...
    }
}