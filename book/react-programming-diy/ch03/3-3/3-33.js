class MyComponent extends React.Component {
    state = {
        prevSpeed: this.props.speed,
    }
    static getDerivedStateFromProps(props, state) {
        if (props.speed !== state.prevSpeed) {
            return {
                prevSpeed: props.speed,
            };
        }
        return null;
    }
}