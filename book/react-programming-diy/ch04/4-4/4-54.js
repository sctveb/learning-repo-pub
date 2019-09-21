class SelectFruit extends PureComponent {
    render() {
        const { selectedFruit, onChange } = this.prop;
        return (
            <div>
                <Select
                options={['apple','banana','orange']}
                selected={selectedFruit}
                onChange={onChange}
                />
            </div>
        )
    }
}

class Parent extends PureComponent {
    state = {
        count: 0,
        selectedFruit: 'apple',
    };
    onClick = () => {
        const { count } = this.state;
        this.setState({ count: count + 1});
    }
    render() {
        const { selectedFruit, count } = this.state;
        return (
            <div>
                <p>{`count: ${count}`}</p>
                <button onClick={this.onClick}>increase count</button>
                <SelectFruit
                selected={selectedFruit}
                onChange={fruit => {
                    if (fruit !== selectedFruit) {
                        this.setState({ selectedFruit: fruit});
                    }
                }}
                />
            </div>
        )
    }
}