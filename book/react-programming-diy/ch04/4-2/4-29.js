class Parent extends Component {
    state = {
        name: '',
    };
    onChangeName = name => {
        this.setState(
            product(state => {
                state.name = name;
            }),
        );
    };
    render() {
        const { name } = this.state;
        return (
            <div>
                {`name is ${name}`}
                <Child name={name} onChange={this.onChangeName} maxLength={20} />
            </div>
        )
    }
}

function Child({ name, onChange }) {
    return <input value={name} onChange={onChange} />
}