import React from 'react';

class Profile extends React.Component {
    state = {
        name: '',
    };
    render() {
        const {name} = this.state;
        return (
            <div>
                <p>{`name is ${name}`}</p>
                <input type="text" value={name} onChange={e => this.setState({ name: e.target.value })} />
            </div>
        );
    }
}