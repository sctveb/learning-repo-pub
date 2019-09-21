class MyComponent extends React.Component {
    static propTypes = {};
    state = {};
    constructor(props) {};
    componentDidMount() {};
    componentWillUnmount() {};
    requestData() {};
    onClick = () => {};
    render() {
        const {prop1, prop2} = this.props;
        const {state1, state2} = this.state;
        return (
            <div>
                {/* ... */}
            </div>
        )
    }
}

const URL_PRODUCT_LIST = '/api/products';
function getTotalPrice({ price, total }) {};

export default MyComponent;