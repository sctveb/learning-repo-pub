// ref 객체의 current 속성이 없는 경우 -> 에러 발생
class Form extends React.Component {
    state = {
        showText: true,
    }
    textRef = null;
    onClickFocus = () => {
        if (this.textRef) {
            this.textRef.focus();
        }
    };
    onClickVisible = () => {
        const { showText } = this.state;
        this.setState({ showText: !showText });
    };
    render() {
        const { showText } = this.state;
        return (
            <div>
                {showText && <input type="text" ref={this.textRef} />}
                <button onClick={this.onClickFocus}>텍스트로 이동</button>
                <button onClick={this.onClickVisible}>텍스트 보이기/가리기</button>
            </div>
        )
    }
}