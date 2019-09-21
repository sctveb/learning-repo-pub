import App from 'next/app';
import Link from 'next/link';

class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }
        return { pageProps };
    }
    render() {
        const { Component, pageProps } = this.props;
        return (
                <div>
                    <Link href="/page1">
                        <a>page1</a>
                    </Link>
                    <Link href="/page2">
                        <a>page2</a>
                    </Link>
                    <Component {...pageProps} />
                </div>
        );
    }
}

export default MyApp;