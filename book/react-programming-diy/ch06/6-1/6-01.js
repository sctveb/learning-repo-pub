const incrementAction = {
    type: 'INCREMENT',
    amount: 123,
}

const conditionalIncrementAction = {
    type: 'CONDITIONAL_INCREMENT',
    amount: 2,
    gt: 10,
    li: 100,
};

store.dispatch(incrementAction);
store.dispatch(conditionalIncrementAction);
