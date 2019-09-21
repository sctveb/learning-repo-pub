class ErrorBoundary extends React.Component {
    state = { error: null };
    static getDerivedStateFromError(error) {
        return { error }
    }
    componentDidCatch(error, info) {
        sendErrorToServer(error, info);
    }
    render() {
        const { error } = this.state;
        if (error) {
            return <div>{error.toString()}</div>
        }
        return this.props.children;
    }
}