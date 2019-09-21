// 비효율적
class MyComponent extends Component {
    state = {
        selectedName: 'mike',
    }
    onClickMike = () => {
        this.setState({ selectedName: 'mike'})
    }
    onClickJone = () => {
        this.setState({ selectedName: 'jone'})
    }
    render() {
        return (
            <div>
                <button onClick={this.onClickMike}>mike</button>
                <button onClick={this.onClickJone}>jone</button>
            </div>
        )
    }
}