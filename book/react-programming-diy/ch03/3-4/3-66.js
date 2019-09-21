class MyComponent extends React.Component {
    state = {
        userContextValue: {
            name: 'unknown'
        },
    };
    onChangeName = e => {
        const name = e.target.value;
        this.setState({ userContextValue: { name } })
    };
    render() {
        const { userContextValue } = this.state;
        return (
            <div>
                <UserContext.Provider value={userContextValue}>
                    {/* ... */}
                </UserContext.Provider>
            </div>
        )
    }
}