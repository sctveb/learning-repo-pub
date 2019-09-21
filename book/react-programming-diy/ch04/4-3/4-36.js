export function withDiv(InputComponent) {
    return class OutputComponent extends InputComponent {
        render() {
            const rendered = super.render();
            if (rendered && rendered.type !== 'div') {
                return React.createElement('div', null, rendered);
            }
            return rendered;
        }
    }
}