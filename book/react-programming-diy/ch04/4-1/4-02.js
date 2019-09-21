class MyComponent extends Component {
    render() {
        return <Table columns={COLUMNS} />;
    }
}

const COLUMNS = [
    { id: 1, name: 'phoneNumber', width: 200, color: 'white'},
    { id: 1, name: 'city', width: 100, color: 'gray'},
]