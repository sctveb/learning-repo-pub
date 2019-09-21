function useHasMounded() {
    const [hasMounted, setHasMounted] = useState(false);
    useEffect(() => setHasMounted(true), []);
    return hasMounted;
}