function Parent() {
    const profileRef = useRef();
    const onClick = () => {
        if (profileRef.currnet) {
            console.log(profileRef.current.getNameLength());
            profileRef.current.addAge(5);
        }
    };
    return (
        <div>
            <Profile ref={profileRef} />
            <button onClick={onClick}>add age 5</button>
        </div>
    )
}