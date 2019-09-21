class SpeedIndicator extends React.Component {
    state = { isFaster: false, prevSpeed: 0 };
    static getDerivedStateFromProps(props, state) {
        if (props.speed !== state.prevSpeed) {
            return {
                isFaster: props.speed > state.prevSpeed,
                prevSpeed: props.speed,
            }
        }
        return null;
    }
    render() {
        const { isFaster } = this.state;
        return <p>{isFaster ? 'yes' : 'no'}</p>
    }
}