function Profile() {
    const [name, setName] = useState('');
    const [age, setAge] = useState(0);
    const onSave = useCallback(() => saveToServer(name, age), [name, age]);
    return (
        <div>
            <p>{`name is ${name}`}</p>
            <p>{`age is ${age}`}</p>
            <UserEdit onSave={onSave} setName={setName} setAge={setAge} />
        </div>
    )
}