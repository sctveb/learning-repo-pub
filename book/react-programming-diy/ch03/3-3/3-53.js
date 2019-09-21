class Counter extends React.Component {
    state = { count : 0 }
    onClick = () => {
        const { count } = this.state;
        this.setState({ count: count + 1})
    }
    render() {
        const { count } = this.state;
        if (count >= 3) {
            throw new Error('error')
        }
        return <div onClick={this.onClick}>{`클릭하세요(${count})`}</div>
    }
}

function App() {
    return (
        <ErrorBoundary>
            <Counter />
        </ErrorBoundary>
    )
}