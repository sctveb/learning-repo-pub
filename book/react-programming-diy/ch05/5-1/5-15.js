function withHasMounted(InputComponent) {
    return class OutputComponent extends Component {
        state = {
            hasMounted: false,
        };
        componentDidMount() {
            this.setState({ hasMounted: true });
        }
        render() {
            const { hasMounted } = this.state;
            return (
                <InputComponent {...this.props} hasMounted={hasMounted} />
            )
        }
    }
}