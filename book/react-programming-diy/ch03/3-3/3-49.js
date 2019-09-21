class UserInfo extends React.Component {
    componentDidUpdate(prevProps) {
        const { user } = this.props;
        if(prevProps.user.id !== user.id) {
            requestFriends(user).then(friends => this.setState({ friends }));
        }
    }
}
