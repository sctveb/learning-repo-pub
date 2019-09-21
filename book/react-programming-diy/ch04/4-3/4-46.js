// Layout.jsx
function Layout({ children }) {
    return (
        <div>
            <div>여기는 Header입니다.</div>
            {children}
            <div>여기는 Footer입니다.</div>
        </div>
    )
}

// MyComponent.jsx
function MyComponent() {
    return (
        <Layout>
            <div>{/* ... */}</div>
        </Layout>
    )
}