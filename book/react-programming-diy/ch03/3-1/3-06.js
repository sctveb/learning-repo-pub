class Todo extends React.Component {
    state = { count: 0 }
    onClick = () => {
        const { count } = this.state;
        this.setState({ count: count + 1})
    }
    render() {
        const { count } = this.state;
        return (
            <div>
                <Title title={`현재 카운트: ${count}`}/>
            </div>
        )
    }
}