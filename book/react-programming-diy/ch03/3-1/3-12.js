const actions = {
    init() {
        return { count : 0 }
    },
    increment(state) {
        return { count : state.count + 1 }
    },
    decrement(state) {
        return { count : state.count - 1 }
    },
};

class MyComponent extends React.Component {
    state = actions.init();

    onIncrement = () => {
        this.setState(actions.increment);
    };
    onDecrement = () => {
        this.setState(actions.decrement);
    };
}