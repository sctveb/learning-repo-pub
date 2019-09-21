const UserContext = React.createContext('unknown');
const ThemeContext = React.createContext('dark');

class MyComponent extends React.Component {
    componentDidMount() {
        const { username, theme } = this.props;
        // ...
    }
   // ...
}

export default props => (
    <UserContext.Consumer>
        {username => (
            <ThemeContext.Consumer>
                {theme => <MyComponent {...props} username={username} theme={theme} />}
            </ThemeContext.Consumer>
        )}
    </UserContext.Consumer>
)
