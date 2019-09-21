class MyComponent extends React.Component {
    render() {
        const { hasMounted } = this.props;
        return <p>{hasMounted ? 'yes' : 'no'}</p>
    }
}

export default withHasMounted(MyComponent)