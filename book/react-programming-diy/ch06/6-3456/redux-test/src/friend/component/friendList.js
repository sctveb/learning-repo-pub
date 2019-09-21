import React from 'react';
function FriendList({ friends }) {
    console.log(friends)
    return (
        <ul>
            {friends.map(friend => (
                <li key={friend.id}>{friend.name}</li>
            ))}
        </ul>
    );
}

export default FriendList;