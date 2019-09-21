// 잘못된 예

function reducer(state = INITIAL_STATE, action ) {
    return produce(state, draft => {
        switch (action.type) {
            case SAY_HELLO:
                const random = Math.floor(Math.random() * 10 + 1);
                draft.msg = `안녕하세요, ${action.name}님의 행운의 숫자는 ${random}입니다`;
                break;
                case INCREMENT:
                    callApi({url: '/sendActionLog', data: action });
                    draft.value += 1;
                    break;
            // ...
        }
    })
}