const cancel = store.dispatch({
    type: 'SomeAction',
    meta: { delay: 1000 },
});
// ...

cancel();