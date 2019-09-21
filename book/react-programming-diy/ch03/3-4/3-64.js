function Greeting() {
    return (
        <UserContext.Consumer>
            {value => (
                <React.Fragment>
                    <p>{`${value.username}님 안녕하세요`}</p>
                    <p>{`인사 횟수 : ${value.helloCount}`}</p>
                    <button onClick={value.onHello}>인사하기</button>
                </React.Fragment>
            )}
        </UserContext.Consumer>
    )
}