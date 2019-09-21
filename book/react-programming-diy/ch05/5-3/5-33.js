// useOnFirstRender.js

function useOnFirstRender(func) {
    const isFirstRef = useRef(true);
    if (isFirstRef.current) {
        isFirstRef.current = false;
        func();
    }
}

// Profile.js

function Profile({ firstName, lastName }) {
    const [name, setName] = useState(`${firstName} ${lastName}`);
    useOnFirstRender(callApi);
}