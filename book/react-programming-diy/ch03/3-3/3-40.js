class MyComponent extends React.Component {
    state = {
        prevSpeed: this.props.speed,
        isMovingFaster : false,
    }
    static getDerivedStateFromProps(props, state) {
        if (props.speed !== state.prevSpeed) {
            return {
                isMovingFaster: state.prevSpeed < props.speed,
                prevSpeed: props.speed,
            }
        }
        return null
    }
}