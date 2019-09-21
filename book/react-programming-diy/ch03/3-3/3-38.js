class PriceEdit extends React.Component {
    render() {
        const { product } = this.props;
        return <PriceInput key={product.id} price={product.price} />
    }
}

class PriceInput extends React.Component {
    state = {
        price: this.props.price,
    };
    onChange = event => {
        const price = Number(event.target.value);
        if (!Number.isNaN(price)) {
            this.setState({price})
        }
    }
    render() {
        const {price} = this.state;
        return <input onChange={this.onChange} value={price} />;
    }
}