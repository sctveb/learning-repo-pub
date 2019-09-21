const TextInput = React.forwardRef((props, ref) => {
    <div>
        <input type="text" ref={ref} />
        <button>저장</button>
    </div>
});

class Form extends React.Component {
    // ..
    render() {
        return (
            <div>
                <TextInput ref={this.textref} />
                <button onClick={this.setTextFocus}>텍스트로 이동</button>
            </div>
        )
    }
}