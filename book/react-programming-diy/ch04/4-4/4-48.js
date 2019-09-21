onClick = () => {
    const { todos } = this.state;
    todos.push({ title: 'fix bug', priority: 'high'})
    this.setState({ todos });
}