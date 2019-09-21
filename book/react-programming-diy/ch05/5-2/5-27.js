export const ProfileDispatch = React.createContext(null);

function Profile() {
    const [state, setState] = useReducer(reducer, INITIAL_STATE);
    return (
        <div>
            <p>{`name is ${state.name}`}</p>
            <p>{`age is ${state.age}`}</p>
            <ProfileDispatch.Provider value={dispatch}>
                <SomeComponent />
            </ProfileDispatch.Provider>
        </div>
    );
}