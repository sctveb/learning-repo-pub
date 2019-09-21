const ElementTree = {
    type: 'div',
    props: {
        children: [
            {
                type: 'Title',
                props: { title: "리액트 공부" },
            },
            {
                type: 'p',
                props: { children: "책 열심히 읽기" },
            },
            {
                type: 'p',
                props: { children: "우선순위 높음" },
            },
            {
                type: 'button',
                props: {
                    onClick: function () {
                        // onClick 함수 내용
                        const { priority } = this.state;
                        this.setState({ priority: priority === 'high' ? 'low' : 'high' });
                    },
                    children: "우선순위 변경"
                }
            }
        ]
    },
}