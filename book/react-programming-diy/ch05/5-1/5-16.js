// 잘못된 예
function MyComponent() {
    const [value, setValue] = useState(0);
    if (value === 0) {
        const [v1, setV1] = useState(0);
    } else {
        const [v1, setV1] = useState(0);
        const [v2, setV2] = useState(0);
    }
    for (let i = 0; i < value; i++) {
        const [num, setNum] = useState(0);
    }
    function func1() {
        const [num, setNum] = useState(0);
    }
}