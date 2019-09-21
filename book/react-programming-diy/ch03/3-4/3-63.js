const UserContext = React.createContext({
    username: 'unknown',
    helloCount: 0,
    onHello: () => { },
})

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'mike',
            helloCount: 0,
            onHello: this.onHello,
        };
    }
    onHello = () => {
        const { helloCount } = this.state;
        this.setState({ helloCount: helloCount + 1 });
    };
    render() {
        return (
            <div>
                <UserContext.Provider value={this.state}>
                    <div>상단 메뉴</div>
                    <Profile />
                    <div>하단 메뉴</div>
                </UserContext.Provider>
            </div>
        )
    }
}