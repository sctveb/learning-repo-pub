class App extends React.Component {
    state = {
        user: null,
        width: window.innerWidth,
    };
    componentDidMount() {
        const { userId } = this.props;
        getUserApi(userId).then(data => this.setState({user: data}));
        window.addEventListener('resize', this.onResize);
    }
    componentDidUpdate(prevProps) {
        const { userId } = this.props;
        if (userId !== prevProps.userId) {
            getUserApi(userId).then(data => this.setState({user: data}));
        }
    }
    componentWilUnmount() {
        window.removeEventListener('resize', this.onResize);
    }
    onResize = () => {}
    render() {
        return (
            <div></div>
        )
    }
}