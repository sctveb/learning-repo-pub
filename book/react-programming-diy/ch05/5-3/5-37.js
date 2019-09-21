function useOnUpdate(func) {
    const isMountedRef = useRef(false);
    useEffect(() => {
        if (isMountedRef.current) {
            func();
        } else {
            isMountedRef.current = true;
        }
    })
}