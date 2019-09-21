function Profile() {
    const [age, setAge] = useState(0);
    const [name, setName] = useState('');
    useEffect(() => {
        setAge(23);
    }, []);  
}