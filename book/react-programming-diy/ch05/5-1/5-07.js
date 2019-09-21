class Profile extends React.Component {
    state = {
        user: null,
    };
    componentDidMount() {
        const { userId } = this.props;
        getUserApi(userId).then(data => this.setState({ user: data }));
    }
    componentDidUpdate(prevProps) {
        const { userId } = this.props;
        if (userId !== prevProps.userId) {
            getUserApi(userId).then(data => this.setState({ user: data }));
        }
    }
    render() {
        const { user } = this.state;
        return (
            <div>
                {!user && <p>사용자 정보를 가져오는 중...</p>}
                {user && (
                    <>
                        <p>{`name is ${user.name}`}</p>
                        <p>{`age is ${user.age}`}</p>
                    </>
                )}
            </div>
        );
    }
}