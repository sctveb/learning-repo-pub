return <MyComponent title="안녕하세요" />;
return <p>안녕하세요</p>;
return '안녕하세요';
return 123;
return [<p key="a">안녕하세요</p>,<p key="b">반갑습니다</p>,];
return (
    <React.Fragment>
        <p>안녕하세요</p>
        <p>반갑습니다</p>
    </React.Fragment>
);
return null;
return false;
return ReactDOM.createPortal(<p>안녕하세요</p>, domNode);