// MountEvent.jsx
class MountEvent extends Component {
    componentDidMount() {
        const { name } = this.props;
        sendMountEvent(name);
    } 
    render() {
        const { children } = this.props;
        return children();
    }
}

// MyComponent.jsx
function MyComponent() {
    return (
        <MountEvent name="MyComponent">{() => <div>{/* ... */}</div>}</MountEvent>        
    )
}