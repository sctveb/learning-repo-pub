class MyComponent extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        const { price } = this.state;
        return price !== nextState.price;
    }
}