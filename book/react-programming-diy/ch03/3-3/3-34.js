class MyComponent extends React.Component {
    componentDidUpdate(prevProps) {
        const { productId } = this.props;
        if (prevProps.productId !== productId) {
            this.requestData(productId)
        }
    }
}