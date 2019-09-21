function MyComponent() {
    return (
        <MountEvent name="MyComponent">
            {() => (
                <DataFetcher
                url="https://api.github.com/repos/facebook/react"
                parseData={parseRepoData}
                >
                    {({data}) => (
                        <div>
                        <MouseTracer>
                            {({x,y}) => <p>{`(x,y): (${x}, ${y})`}</p>}
                        </MouseTracer>
                        <p>{`name: ${data.name}`}</p>
                        <p>{`starts: ${data.starts}`}</p>
                        <p>{`open issues: ${data.openIssues}`}</p>
                        </div>
                    )}
                </DataFetcher>
            )}
        </MountEvent>
    );
}