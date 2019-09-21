import React, { useState } from 'react';

function Profile() {
    const [name, setName] = useState('');
    return (
        <div>
            <p>{`name is ${name}`}</p>
            <input type="text" value={name} onChange={e => setName(e.target.value)} />
        </div>
    );
}