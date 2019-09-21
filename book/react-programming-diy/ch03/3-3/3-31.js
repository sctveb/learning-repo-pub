// 잘못된 예, setState는 무시됨
class MyComponent extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            count: 0,
        }
        this.setState({ count: 10})
    }
    render() {
        const {count} = this.state;
        return (
            <div>{count}</div>
        )
    }
}