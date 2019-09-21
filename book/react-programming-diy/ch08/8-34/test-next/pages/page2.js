import Router from 'next/router';
import { callApi } from '../src/api';

class Page2 extends React.Component {
    static async getInitialProps({query}) {
        // throw new Error('exception in getInitialProps');
        const { sayHello } = await import('../src/sayHello');
        console.log(sayHello());
        const text = query.text || 'none';
        const data = await callApi();
        return { text, data };
    }
    onClick = () => {
        // Router.push('/page1');
        // import('../src/sayHello').then(({ sayHello }) => console.log(sayHello())); 
    }
    render() {
        const { text, data } = this.props;
        return (
            <div>
            {/* <button onClick={this.onClick}>sayHello</button> */}
            <p>this is home page2</p>
            <p>{`text: ${text}`}</p>
            <p>{`data is ${data}`}</p>
            </div>
        );
    }
}

export default Page2;