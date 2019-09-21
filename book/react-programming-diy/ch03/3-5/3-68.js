class Form extends React.Component {
    textInputRef = React.createRef();
    onClick = () => {
        this.textInputRef.current.setTextFocus();
    };
    render() {
        return (
            <div>
                <TextInput ref={this.textInputRef} />
                <button onClick={this.onClick}>텍스트로 이동</button>
            </div>
        )
    }
}