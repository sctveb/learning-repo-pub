function useDebounce({ callback, ms, args }) {
    useEffect(() => {
        const id = setTimeout(callback, ms);
        return () => clearTimeout(id);
    }, args);
}

function Profile() {
    let [name, setName] = useState('');
    let [nameTemp, setNameTemp] = useState('');
    useDebounce({
        callback: () => setName(nameTemp),
        ms: 1000,
        args: [nameTemp],
    });
    return (
        <div>
            <p>{name}</p>
            <input
            type="text"
            onChange={e => setNameTemp(e.currentTarget.value)}
            value={nameTemp} 
            />
        </div>
    )
}