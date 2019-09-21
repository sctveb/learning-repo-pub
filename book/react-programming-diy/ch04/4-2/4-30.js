class Parent extends React.Component {
    childRef = React.createRef();
    onClick = () => {
        this.childRef.current.increaseCount()
    }
    render() {
        return (
            <div>
                <button onClick={this.onClick}>increase count</button>
                <Child ref={this.childRef} /> 
            </div>
        )
    }
}

class Child extends React.Component {
    state = {
        count: 0,
    }
    increaseCount = () => {
        const { count } = this.state;
        this.setState({ count : count + 1});
    };
    render() {
        const { count } = this.state;
        return <div>{`current count is ${count}`}</div>
    }
}