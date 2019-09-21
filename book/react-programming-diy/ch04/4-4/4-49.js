onClick = () => {
    const { todos } = this.state;
    const newTodos = [...todos,{ title: 'fix bug', priority: 'high'}]
    this.setState({ todos: newTodos });
}