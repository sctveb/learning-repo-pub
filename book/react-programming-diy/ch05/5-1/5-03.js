import React, { useState } from 'react';

function Profile() {
    const [name, setName] = useState('');
    const [age, setAge] = useState(0);
    return (
        <div>
            <p>{`name is ${name}`}</p>
            <p>{`age is ${age}`}</p>
            <input type="text" value={name} onChange={e => setName(e.target.value)} />
            <input type="number" value={age} onChange={e => setAge(e.target.value)} />
        </div>
    );
}