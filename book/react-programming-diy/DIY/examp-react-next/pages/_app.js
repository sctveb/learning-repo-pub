import App from 'next/app';
import { Provider } from 'react-redux';
import store from '../redux/store';
class Myapp extends App {
    render() {
        const { Component } = this.props;
        return (
            <Provider store={store}>
            <div> 
                <Component />
            </div>
            </Provider>
        )
    }
}

export default Myapp;