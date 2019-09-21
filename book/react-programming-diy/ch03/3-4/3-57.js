class App extends React.Component {
    render() {
        return (
            <div>
                <div>상단 메뉴</div>
                <Profile username="mike" />
                <div>하단 메뉴</div>
            </div>
        )
    }
}

function Profile({ username }) {
    return (
        <div>
            <Greeting username={username} />
        </div>
    )
}

function Greeting({username}) {
    return <p>{`${username}님 안녕하세요`}</p>
}