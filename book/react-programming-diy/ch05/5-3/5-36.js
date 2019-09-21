function Profile(props) {
    const [name, setName] = useState(props.name);
    const prevUserId = usePrevious(props.userId);
    const isMountedRef = useRef(false);
    useEffect(() => {
        if (isMountedRef.current) {
            if (prevUserId !== props.userId) {
                setName(props.name);
            }
        } else {
            isMountedRef.current = true;
        }
    });
}