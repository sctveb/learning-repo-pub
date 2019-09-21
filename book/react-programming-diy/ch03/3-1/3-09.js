class MyComponent extends React.Component {
    state = {
        count1: 0,
        count2: 0,
    }

    onClick = () => {
        const { count1 } = this.state;
        this.setState({ count1: count1 + 1 })
    }
}