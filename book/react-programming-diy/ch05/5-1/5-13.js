import React, { useState } from 'react';
import { useWindowWidth } from './hooks';

function Profile() {
    const width = useWindowWidth();
    const [name, setName] = useState('');
    return (
        <div>
            <p>{`name is ${name}`}</p>
            {width < 600 && <br/>}
            <input type="text" value={name} onChange={e => setName(e.target.value)} />
        </div>
    )
}