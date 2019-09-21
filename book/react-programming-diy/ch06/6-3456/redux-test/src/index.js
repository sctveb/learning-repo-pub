import React from "react";
import ReactDOM from 'react-dom';
import TimelineMain from './timeline/container/timelineMain';
import FriendMain from './friend/container/friendMain';

// import { createStore, combineReducers } from 'redux';
// import friendReducer, {
//     addFriend,
//     removeFriend,
//     editFriend,
// } from './friend/state';
// import timelineReducer, {
//     addTimeline,
//     removeTimeline,
//     editTimeline,
//     increaseNextPage,
// } from './timeline/state';

import store from "./common/store";
import { Provider } from 'react-redux';


ReactDOM.render(
    <Provider store={store}>
        <div>
            <FriendMain ageLimit={30}/>
            <FriendMain ageLimit={15}/>
            <TimelineMain />
        </div>
    </Provider>,
    document.getElementById("root")
);

// const reducer = combineReducers({
//     timeline: timelineReducer,
//     friend: friendReducer,
// });

// const store = createStore(reducer);
// store.subscribe(() => {
//     const state = store.getState();
//     console.log(state);
// });

// store.dispatch(addTimeline({ id:1, desc: '코딩은 즐거워' }));
// store.dispatch(addTimeline({ id:2, desc: '해피해피' }));
// store.dispatch(increaseNextPage());
// store.dispatch(editTimeline({ id:2, desc: '방구뿡뿡' }));
// store.dispatch(removeTimeline({ id:1, desc: '코딩은 즐거워' }));

// store.dispatch(addFriend({ id:1, name: '케인' }));
// store.dispatch(addFriend({ id:2, name: '연두' }));
// store.dispatch(editFriend({ id:2, name: '트수지' }));
// store.dispatch(removeFriend({ id:1, name: '케인' }));