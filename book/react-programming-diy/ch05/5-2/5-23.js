import React, { useMemo } from 'react';
import { runExpensiveJob } from './util';

function MyComponent({ v1, v2}) {
    const value = useMemo(() => runExpensiveJob(v1, v2), [v1, v2]);
    return <p>{`value is ${value}`}</p>
}