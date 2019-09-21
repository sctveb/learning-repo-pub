const UserContext = React.createContext('unknown');
const ThemeContext = React.createContext('dark');

class App extends React.Component {
    render() {
        return (
            <div>
                <ThemeContext.Provider value="light">
                    <UserContext.Provider value="mike">
                    <div>상단 메뉴</div>
                    <Profile />
                    <div>하단 메뉴</div> 
                    </UserContext.Provider>
                </ThemeContext.Provider>
            </div>
        );
    }
}

function Profile() {
    return (
        <div>
            <Greeting />
            {/* ... */}
        </div>
    )
}

function Greeting() {
    return (
        <ThemeContext.Consumer>
            {theme => (
                <UserContext.Consumer>
                    {username => (
                        <p style={{color: theme === 'dark' ? 'gray' : 'green'}}>
                            {`${username}님 안녕하세요`}
                        </p>
                    )}
                </UserContext.Consumer>
            )}
        </ThemeContext.Consumer>
    )
}