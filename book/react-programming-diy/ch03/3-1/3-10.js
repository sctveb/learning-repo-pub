class MyComponent extends React.Component {
    state = {
        count1: 0,
    }

    onClick = () => {
        this.setState({ count1: this.state.count1 + 1 });
        this.setState({ count1: this.state.count1 + 1 });
    }
}