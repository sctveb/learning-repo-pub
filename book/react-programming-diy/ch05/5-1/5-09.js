import React from 'react';

class WidthPrinter extends React.Component {
    state = {
        width: window.innerWidth,
    };
    componentDidMount() {
        window.addEventListener('resize', this.onResize);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.onResize);
    }
    onResize = () => {
        this.setState({ width: window.innerWidth });
    }
    render() {
        const { width } = this.state;
        return <div>{`width is ${width}`}</div>
    }
}