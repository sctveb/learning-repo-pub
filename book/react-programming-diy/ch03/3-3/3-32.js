// 안좋은 예
class MyComponent extends React.Component {
    state = {
        products: [],
    }
    constructor(props) {
        super(props);
        callApi('/products').then(data => {
            //...
            this.setState({products: data})
        });
    }
}