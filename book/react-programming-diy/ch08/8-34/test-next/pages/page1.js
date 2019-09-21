import Head from 'next/head';
import Link from 'next/link';
import Icon from '../static/icon.png';
import { add } from '../src/util';
import styled from 'styled-components';

const MyP = styled.div`
color: red;
font-size: 18pt;
`

function Page1() {
    return (
        <div>
            <MyP>이건 styled component 썻다 아이가</MyP>
            <p>This is home page</p>
            <p>{`10 + 20 = ${add(10,20)}`}</p>
            <img src={Icon} />
            <Head>
                <title>page1</title>
            </Head>
            <Head>
                <meta name="description" contnet="hello world" />
            </Head>
            <style jsx>
                {`
                p {
                    color: blue;
                    font-size: 18pt;
                }
                `}
            </style>
        </div>
    );
}

export default Page1;