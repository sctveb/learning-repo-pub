function TestList ({ tests }) {
    return (
        <ul>
            {tests.map(test => <li key={test.id}>{test.test1} & {test.test2}</li>)}
        </ul>
    );
}

export default TestList;