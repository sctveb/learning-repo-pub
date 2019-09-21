class Profile extends React.Component {
    state = { name: '', nameTemp: '' };
    render() {
        const { name, nameTemp } = this.state;
        return (
            <Debounce
            callback={() => this.setState({ name: nameTemp })}
            ms={1000}
            args={[nameTemp]}
            ><div>
                <p>{name}</p>
                <input type="text" 
                onChange={e => this.setState({ nameTemp: e.currentTarget.value })}
                value={nameTemp}
                />
            </div>
            </Debounce>
        )
    }
}