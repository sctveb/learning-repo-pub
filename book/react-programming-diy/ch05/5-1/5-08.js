import React, { useState, useEffect } from 'react';

function WidthPrinter() {
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        const onResize = () => setWidth(window.innerHeight);
        window.addEventListener('resize', onResize);
        return () => {
            window.removeEventListener('resize', onResize);
        };
    }, []);
    return <div>{`width is ${width}`}</div>;
}