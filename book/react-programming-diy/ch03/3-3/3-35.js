class MyComponent extends React.Component {
    static getDerivedStateFromProps(props, state) {
        const {products} = props;
        if (products !== state.prevProducts) {
            return {
                filteredProducts: products.filter(product => product.price < 1000),
                prevProducts: products,
            };
        }
        return null;
    }
    render() {
        const { filteredProducts } = this.state;
        return <div>{filteredProducts.map(/*...*/)}</div>
    }
}