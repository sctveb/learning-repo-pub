const ThemeContext = React.createContext('dark');

class MyComponent extends React.Component {
    componentDidMount() {
        const theme = this.context;
    }
}

MyComponent.contextType = ThemeContext;