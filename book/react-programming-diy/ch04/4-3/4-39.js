// import hoistNonReactStatic from 'hoist-non-react-statics';

function withSomething(InputComponent) {
    class OutputComponent extends Component {
        // ...
    }
    hoistNonReactStatic(OutputComponent, InputComponent);
    return OutputComponent
}