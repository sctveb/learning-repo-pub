// widthMountEvent.jsx
function withMountEvent(InputComponent, componentName) {
    return class OutputComponent extends Component {
        componentDidMount() {
            sendMountEvent(componentName);
        }
        render() {
            return <InputComponent {...this.props} />
        }
    }
}

// MyComponent.jsx
function MyComponent {
    // ...
}

export default withMountEvent(MyComponent, 'MyComponent')