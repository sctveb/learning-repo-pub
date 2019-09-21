class MyComponent extends React.Component {
    state = {
        count1: 0,
    }

    onClick = () => {
        this.setState(prevState => ({ count1: prevState.count1 + 1 }));
        this.setState(prevState => ({ count1: prevState.count1 + 1 }));
    }
}