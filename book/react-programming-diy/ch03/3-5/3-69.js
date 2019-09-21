function TextInput ({ textRef }) {
    return (
        <div>
            <input type="text" ref={textRef}/>
            <button>저장</button>
        </div>
    )
}

class Form extends React.Component {
    textRef = React.createRef();
    componentDidMount() {
        this.setTextFocus();
    }
    setTextFocus = () => {
        this.textRef.current.focus();
    };
    render() {
        return (
            <div>
                <TextInput textRef={this.textRef} />
                <button onClick={this.setTextFocus}>텍스트로 이동</button>
            </div>
        )
    }
}