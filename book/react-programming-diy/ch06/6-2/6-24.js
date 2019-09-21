function reducer(state = INITIAL_STATE, action ) {
    return produce(state, draft => {
        switch (action.type) {
            case SET_SELECTED_PEOPLE:
                draft.selectedPeople = action.id;
                break;
            // ...
        }
    })
}