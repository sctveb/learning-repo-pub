// import hoistNonReactStatic from 'hoist-non-react-statics';

const withRouter = Component => {
    const C = props => {
        const { wrappedComponentRef, ...remainingProps } = props;
        return (
            <Route
                render={routeComponentProps => (
                    <Component
                        {...remainingProps}
                        {...routeComponentProps}
                        ref={wrappedComponentRef}
                    />
                )}
            />
        );
    };
    C.displayName = `withRouter(${Component.displayName || Component.name})`;
    C.WrappedComponent = Component;
    C.propTypes = {
        wrappedComponentRef: PropTypes.func,
    };
    return hoistStatics(C, Component);
};

export default withRouter;