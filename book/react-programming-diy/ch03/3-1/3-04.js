class MyComponent extends React.Component {
    state = { color: 'red' }
    onClick = () => {
        this.setState({ color: 'blue'})
    }
    render() {
        return (
            <button style={{ bakcgroundColor: this.state.color}} onClick={this.onClick}>
                좋아요
            </button>
        )
    }
}