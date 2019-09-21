function Profile({ firstName, lastName }) {
    const [name, setName] = useState(`${firstName} ${lastName}`);
    const isFristRef = useRef(true);
    if (isFristRef.current) {
        isFristRef.current = false;
        callApi();
    }
}