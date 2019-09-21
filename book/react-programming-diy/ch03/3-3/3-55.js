onClick = () => {
    try {
        this.setState({ name: 'mike'});
        throw new Error('some error');
        this.setState({ age: 23 });
    } catch (e) {
        
    }
}