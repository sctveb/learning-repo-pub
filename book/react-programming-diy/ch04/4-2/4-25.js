class MyComponent extends Component {
    state = {
        selectedName : 'mike',
    }
    onClick = selectedName => {
        this.setState({ selectedName });
    };
    render() {
        const { selectedName } = this.state;
        return (
            <div>
                <button onClick={() => this.onClick('mike')}>mike</button>
                <button onClick={() => this.onClick('jone')}>jone</button>
            </div>
        )
    }
}