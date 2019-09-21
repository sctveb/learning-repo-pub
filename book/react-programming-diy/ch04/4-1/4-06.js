class MyComponent extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        title: PropTypes.string,
        age: PropTypes.number,
        editable: PropTypes.bool,
        onChangeName: PropTypes.func,
        onChangeTitle: PropTypes.func.isRequired,
    }
    // ...
}