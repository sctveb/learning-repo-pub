class MyComponent extends React.Component {
    state = {
        text: '',
    }
    divRef = React.createRef();
    componentDidUpdate() {
        const div = this.divRef.current;
        const rect = div.getBoundingClientRect();
        if (div.scrollWidth > rect.width) {
            alert('스크롤이 가능합니다')
        }
    }
    onChange = event => {
        const text = event.target.value;
        this.setState({text});
    };
    render() {
        const {text} = this.state;
        return (
            <React.Fragment>
                <input onChange={this.onChange} value={text} />
                <div ref={this.divRef} style={{width: 100, height: 100, overflow: 'scroll'}}>
                    {text}
                </div>
            </React.Fragment>
        )
    }
}