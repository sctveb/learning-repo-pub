class MyComponent extends Component {
    onClick = e => {
        const {title, age} = this.props;
        const msg = `title: ${title}, age: ${age ? age : '알수없음'}`
        // ...
    };
    onChange = e => {
        const { editable, onChangeName } = this.props;
        if(onChangeName) {
            // ...
        }
        // ...
    };
    render() {
        const { name, title, onChangeTitle } = this.props;
        // ...
    }
}