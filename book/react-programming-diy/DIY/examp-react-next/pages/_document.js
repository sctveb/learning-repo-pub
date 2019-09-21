import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components';

class MyDocument extends Document {
    static getInitialProps({ renderPage }) {
        const sheet = new ServerStyleSheet();
        const page = renderPage(App => props => sheet.collectStyles(<App {...props} />));
        const styles = sheet.getStyleElement();
        return { ...page, styles }
    }
    render() {
        return (
            <Html>
                <Head>
                    <link rel="stylesheet" href="/static/web.css" />
                    <link rel="stylesheet" media="(max-width: 480px)" href="/static/moblie.css" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument;