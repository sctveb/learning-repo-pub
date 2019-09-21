class App extends React.Component {
    state = {
        username: ''
    };
    onChangeName = e => {
        const username = e.target.value;
        this.setState({ username });
    };
    render() {
        const {username} = this.state;
        return (
            <div>
                <UserContext.Provider value={username}>
                    <Profile />
                </UserContext.Provider>
                <input type="text" value={username} onChange={this.onChangeName} />
            </div>
        )
    }
}

class Profile extends React.PureComponent {
    // ...
}

function Greeting() {
    return (
        <UserContext.Consumer>
            {username => <p>{`${username}님 안녕하세요`}</p>}
        </UserContext.Consumer>
    )
}