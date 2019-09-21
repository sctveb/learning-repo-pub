class Profile extends React.Component {
    state = { name: this.props.name };
    componentDidUpdate(prevProps) {
        const { userId, name } = this.props;
        if (prevProps.userId !== userId) {
            this.setState({ name });
        }
    }
}