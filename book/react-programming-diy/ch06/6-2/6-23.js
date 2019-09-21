// 잘못된 예
function reducer(state = INITIAL_STATE, action ) {
    return produce(state, draft => {
        switch (action.type) {
            case SET_SELECTED_PEOPLE:
                draft.selectedPeople = draft.peopleList.find(
                    item => item.id === action.id,
                );
                break;
            case EDIT_PEOPLE_NAME:
                const people = draft.peopleList.find(item => item.id === action.id);
                people.name = action.name;
                break;
            // ...
        }
    })
}