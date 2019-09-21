class MyComponent extends Component {
    state = {
        doneList: this.props.todos.filter(item => item.done),
    }
    onChangeName = (index, name) => {
        this.setState(
            produce(state => {
                state.doneList[index].name = name;
            }),
        );
    }
}