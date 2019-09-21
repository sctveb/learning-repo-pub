class MyComponent extends Component {
    state = {
        selectedName : 'mike',
    }
    onClick = e => {
        const selectedName = e.currentTarget.dataset.name;
        this.setState({ selectedName });
    };
    render() {
        const { selectedName } = this.state;
        return (
            <div>
                <button onClick={this.onClick} data-name="mike">mike</button>
                <button onClick={this.onClick} data-name="jone">jone</button>
            </div>
        )
    }
}