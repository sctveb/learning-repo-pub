class MyComponent extends React.Component {
    getCurrentMovie() {
        const { age } = this.props;
        return age < 10 ? '뽀로로' : '어벤져스'
    };
}