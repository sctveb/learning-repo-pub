class MyComponent extends React.Component {
    state = {
        count1: 0,
        count2: 0,
    }

    onClick = () => {
        const { count1, count2 } = this.state;
        this.setState({count1: count1 + 1});
        this.setState({count2: count2 + 1});
    };
    render() {
        const { count1, count2 } = this.state;
        const result = count1 >= count2;
        return (
            <div>{result}</div>
        )
    }
}