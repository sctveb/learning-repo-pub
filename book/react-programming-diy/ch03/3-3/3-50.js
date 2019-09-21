class UserInfo extends React.Component {
    componentDidMount() {
        const { user } = this.props;
        this.setFriends(user);
    }
    componentDidUpdate(prevProps) {
        const { user } = this.props;
        if (prevProps.user.id !== user.id) {
            this.setFriends(user);
        }
    }
    setFriends(user) {
        requestFriends(user).then(friends => this.setState({friends}))
    }
}