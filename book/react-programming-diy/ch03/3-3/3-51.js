class MyComponent extends React.Component {
    componentDidMount() {
        const domNode = document.getElementById('someNode');
        domNode.addEventListener('change', this.onChange);
        domNode.addEventListener('dragstart', this.onDragStart);
    }
    componentWillUnmount() {
        const domNode = document.getElementById('someNode');
        domNode.removeEventListener('change', this.onChange);
        domNode.removeEventListener('dragstart', this.onDragStart);
    }
}