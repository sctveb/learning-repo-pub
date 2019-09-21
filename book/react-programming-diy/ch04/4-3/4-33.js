function withOnlyLogin(InputComponent) {
    return function({ isLogin, ...rest }) {
        if (isLogin) {
            return <InputComponent {...rest} />;
        } else {
            return <p>권한이 없습니다.</p>
        }
    }
}