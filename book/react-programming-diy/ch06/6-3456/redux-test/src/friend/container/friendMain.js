import React from 'react';
import { connect } from 'react-redux';
// import { addFriend } from '../state';
import * as actions from '../state';
// import store from '../../common/store';
import { getNextFriend } from "../../common/mockData";
import FriendList from '../component/friendList';
import NumberSelect from '../component/numberSelect';
import { MAX_AGE_LIMIT, MAX_SHOW_LIMIT } from '../common'
import { getAgeLimit, getShowLimit, getFriendsWithAgeLimit, getFriendsWithAgeShowLimit, makeGetFriendsWithAgeLimit } from '../state/selector';


// class FriendMain extends React.PureComponent {
//     state = {
//         friends: store.getState().friend.friends
//     }
//     componentDidMount() {
//         this.unsubscribe = store.subscribe(() => this.setState({
//             friends: store.getState().friend.friends
//         }));
//     }
//     componentWillUnmount() {
//         this.unsubscribe()
//     }
//     onAdd = () => {
//         const friend = getNextFriend();
//         store.dispatch(addFriend(friend));
//     };
//     render() {
//         console.log('friendMain render');
//         const friends = store.getState().friend.friends;
//         return (
//             <div>
//                 <button onClick={this.onAdd}>친구 추가</button>
//                 <FriendList friends={friends} />
//             </div>
//         );
//     }    
// }

// export default FriendMain;

class FriendMain extends React.Component {
    onAdd = () => {
        const friend = getNextFriend();
        this.props.addFriend(friend);
    };
    render() {
        console.log('friendMain render');
        const {
            friendsWithAgeLimit
        } = this.props;
        return (
            <div>
                <button onClick={this.onAdd}>친구 추가</button>
                {/* <NumberSelect
                onChange={setAgeLimit}
                value={ageLimit}
                options={ageLimitOptions}
                /> */}
                <FriendList friends={friendsWithAgeLimit} />
                {/* <NumberSelect
                onChange={setShowLimit}
                value={showLimit}
                options={showLimitOptions}
                 /> */}
                {/* <FriendList friends={friendsWithAgeShowLimit} /> */}
            </div>
        );
    }    
}

const ageLimitOptions = [15, 20, 25, MAX_AGE_LIMIT];
const showLimitOptions = [2, 4, 6, MAX_SHOW_LIMIT];

// const mapStateToProps = state => {
//     const friends = state.friend.friends;
//     const ageLimit = state.friend.ageLimit;
//     const showLimit = state.friend.showLimit;
//     const friendsWithAgeLimit = friends.filter(friend => friend.age <= ageLimit);
//     const friendsWithAgeShowLimit = friendsWithAgeLimit.slice(0, showLimit);
//     return {
//         friendsWithAgeLimit,
//         friendsWithAgeShowLimit,
//         ageLimit,
//         showLimit
//     };
// };

const makeMapStateToProps = () => {
    const getFriendsWithAgeLimit = makeGetFriendsWithAgeLimit();
    const mapStateToProps = (state, props) => {
        return {
            friendsWithAgeLimit: getFriendsWithAgeLimit(state, props)
        };
    };
    return mapStateToProps;
};

// const mapStateToProps = (state) => {    
//     return {
//         // ageLimit: getAgeLimit(state),
//         // showLimit: getShowLimit(state),
//         friendsWithAgeLimit: getFriendsWithAgeLimit(state, props),
//         // friendsWithAgeShowLimit: getFriendsWithAgeShowLimit(state)
//     };
// };

// const mapDispatchToProps = dispatch => {
//     return {
//         addFriend: friend => {
//             dispatch(addFriend(friend));
//         }
//     }
// }

export default connect(makeMapStateToProps, actions)(FriendMain);