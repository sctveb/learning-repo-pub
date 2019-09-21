function Profile({ userId }) {
    const [user, setUser] = useState(null);
    useEffect(
        () => {
            getUserApi(userId).then(data => setUser(data));
        },
        [userId],
    );
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(
        () => {
            const onResize = () => setWidth(window.innerHeight);
        window.addEventListener('resize', onResize);
        return () => {
            window.removeEventListener('resize', onResize);
        };
    }, []);
    return <div></div>
}