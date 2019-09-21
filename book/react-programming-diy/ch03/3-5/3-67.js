class TextInput extends React.Component {
    textRef = React.createRef();
    componentDidMount() {
        this.setTextFocus();
    }
    setTextFocus() {
        this.textRef.current.focus();
    }
    render() {
      return(
        <div>
            <input type="text" ref={this.textRef} />
            <button>저장</button>
        </div>
        )
    }
  }