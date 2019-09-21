class Box extends React.Component {
    state = {
        boxWidth: 0,
    };
    divRef = React.createRef();
    componentDidMount() {
        const rect = this.divRef.current.getBoundingClientRect();
        this.setState({ boxWidth: rect.width })
    }
    render() {
        const { boxWidth } = this.state;
        const backgroundColor = boxWidth < 400 ? 'red ' : 'blue';
        return (
            <div ref={this.divRef} style={{ width: '100%', height: '100px', backgroundColor}}>
                box
            </div>
        )
    }
}