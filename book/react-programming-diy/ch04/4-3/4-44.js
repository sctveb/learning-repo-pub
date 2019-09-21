// MouseTracer.jsx
import React from 'react';

class MouseTracer extends React.Component {
    state = {
        x: null,
        y: null,
    };
    onMouseMove = e => {
        this.setState({
            x: e.clientX,
            y: e.clientY,
        });
    };
    render() {
        const { children } = this.props;
        const { x, y } = this.state;
        return <div onMouseMove={this.onMouseMove}>{children({x,y})}</div>
    }
}