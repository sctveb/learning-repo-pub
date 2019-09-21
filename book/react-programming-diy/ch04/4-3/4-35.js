function withDebug(InputComponent) {
    return class OutputComponent extends InputComponent {
        render() {
            return (
                <React.Fragment>
                    <p>props: {JSON.stringify(this.props)}</p>
                    <p>state: {JSON.stringify(this.state)}</p>
                    {super.render()}
                </React.Fragment>
            )
        }
    }
}