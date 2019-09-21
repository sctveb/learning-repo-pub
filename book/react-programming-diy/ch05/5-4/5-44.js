function HasMounted({ children }) {
    const hasmounted = useHasMounted();
    return children(hasmounted);
}

function withHasMounted(Component) {
    return function(props) {
        const hasMounted = useHasMounted();
        return <Component {...props} hasMounted={hasMounted} />
    }
}
