import memoize from 'lodash/memoize';
class MyComponent extends React.Component {
    getFilteredProducts = memoize(function(products) {
        return products.filter(product => product.price < 1000)
    });
    render() {
        const {products} = this.props;
        const filteredProducts = this.getFilteredProducts(products);
        return <div>{filteredProducts.map(/* ... */)}</div>
    }
}