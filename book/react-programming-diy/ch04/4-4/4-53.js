function Parent() {
    return <Child name="mike" age={23} />
}

function Parent() {
    return React.createElement(Child, {name: 'mike', age: 23});
}