class MyComponent extends Component {
    onClickHello = e => {
        e.preventDefault();
        alert('hello world');
    }
    onClickDec = () => {
        const { count } = this.state;
        this.setState({ count: count - 1});
    }
    onClickInc = () => {
        const { count } = this.state;
        this.setState({ count: count + 1});
    }
    render() {
        return (
            <div>
                <button onClick={this.onClickHello} />
                <button onClick={this.onClickDec} />
                <button onClick={this.onClickInc} />
            </div>
        )
    }
}