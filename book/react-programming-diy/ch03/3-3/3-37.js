class PriceInput extends React.Component {
    static getDerivedStateFromProps(props, state) {
        if (props.price !== state.prevPrice) {
            return {
                price: props.price,
                prevPrice: props.price,
            }
        }
        return null;
    }
    onChange = event => {
        const price = Number(event.target.value);
        if (!Number.isNaN(price)) {
            this.setState({price});
        }
    }
    render() {
        const {price} = this.state;
        return <input onChange={this.onChange} value={price} />;
    }
}