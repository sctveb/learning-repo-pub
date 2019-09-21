// 불필요한 렌더링 발생
const UserContext = React.createContext({ name: 'unknown' });

class MyComponent extends React.Component {
    onChangeName = e => {
        const name = e.target.value;
        this.setState({name});
    };
    render() {
        const { name } = this.state;
        return (
            <div>
                <UserContext.Provider value={{ name }}>
                    {/* ... */}
                </UserContext.Provider>
            </div>
        )
    }
}