// 잘못된 컴포넌트 위치

const UserContext = React.createContext('unknown');

class App extends React.Component {
    render() {
        return (
            <div>
                <UserContext.Provider value="me">
                    {/* ... */}
                </UserContext.Provider>
                <Profile />
            </div>
        )
    }
}