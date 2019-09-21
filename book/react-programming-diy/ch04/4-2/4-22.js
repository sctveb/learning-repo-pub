class MyComponent extends Component {
    // ...
    onChangeAge(e) {
        this.setState({ age: e.currentTarget.value });
    }
    render() {
        const { name, onChange } = this.props;
        const { age } = this.state;
        return (
            <div>
                <input value={name} onChange={e => onChange(e.currentTarget.value)} />
                <input value={age} onChange={this.onChangeAge.bind(this)} />
            </div>
        )
    }
}
