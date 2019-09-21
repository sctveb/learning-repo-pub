class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: `${props.firstName} ${props.lastName}`,
        };
        callApi();
    }
}