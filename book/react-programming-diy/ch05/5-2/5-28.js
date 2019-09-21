import React, { forawrdRef, useState, useImperativeHandle } from 'react';
 
function Profile(props, ref) {
    const [name, setName] = useState('');
    const [name, setAge] = useState(0);

    useImperativeHandle(ref, () => ({
        addAge: value => setAge(age + value),
        getNameLength: () => name.length,
    }));

    return (
        <div>
            <p>{`name is ${name}`}</p>
            <p>{`age is ${age}`}</p>
        </div>
    )
}

export default forawrdRef(Profile);