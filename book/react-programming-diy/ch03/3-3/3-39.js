class PriceEdit extends React.Component {
    state = {
        currentPrice: this.props.product.price,
    }
    onChangePrice = event => {
        const currentPrice = Number(event.target.value);
        if (!Number.isNaN(currentPrice)) {
            this.setState({currentPrice})
        }
    }
    render() {
        const { currentPrice } = this.state;
        return <PriceInput onChange={this.onChangePrice} price={currentPrice} />
    }
}

function PriceInput({ price, onChange}) {
    return <input onChange={onChange} value={price} />
}