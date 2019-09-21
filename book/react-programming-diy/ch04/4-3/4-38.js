// import getDisplayName From 'recompose/getDisplayName';

function withSomething (InputComponent) {
    class OutputComponent extends Component {
        // ...
    }
    OutputComponent.displayName = `withSomething(${getDisplayName(
        InputComponent,
    )})`
    return OutputComponent;
}