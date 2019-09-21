// DataFetcher.jsx
import React from 'react';
import axios from 'axios';

class DataFetcher extends React.Component {
    state = {
        data: null,
    }
    componentDidMount() {
        const { url, parseData } = this.props;
        axios(url).then(response => {
            const data = parseData(response.data);
            this.setState({ data });
        });
    }
    render() {
        const { children } = this.props;
        const { data } = this.state;
        if (data == null) {
            return <p>데이터 로딩 중...</p>
        } else {
            return children({data})
        }
    }
}

// MyComponent.jsx

export default function MyComponent() {
    return (
        <DataFetcher
        url="https://api.github.com//repos/facebook/react"
        parseData={parseRepoData}>
            {({data}) => (
                <div>
                    <p>{`name: ${data.name}`}</p>
                    <p>{`stars: ${data.stars}`}</p>
                    <p>{`open issues: ${data.openIssues}`}</p>
                </div>
            )}
        </DataFetcher>
    );
}

function parseRepoData(data) {
    return {
        name: data.name,
        stars: data.stargazers_count,
        openIssues: data.open_issues,
    }
}