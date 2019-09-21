class MyComponent extends Component {
    constructor(props) {
        super(props)
        this.onClickInc = this.onClickInc.bind(this);
    }
    onClickHello(e) {
        e.preventDefault();
        alert('hello world');
    }
    onClickDec(e) {
        const { count } = this.state;
        this.setState({ count: count - 1 });
    }
    onClickInc(e) {
        const { count } = this.state;
        this.setState({ count: count + 1});
    }
    render() {
        return (
            <div>
                <button onClick={this.onClickHello} />
                <button onClick={this.onClickDec.bind(this)} />
                <button onClick={this.onClickInc} />
            </div>
        )
    }
}