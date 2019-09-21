function ChildComponent() {
    const user = useContext(UserContext);
    console.log(`user: ${user.name}, ${user.age}`);
}