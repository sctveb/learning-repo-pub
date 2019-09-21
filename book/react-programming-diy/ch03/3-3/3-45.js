class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.dataPromise = requestData();
    }
    componentDidMount() {
        this.dataPromise.then(data => this.setState({ data }));
    }
}