let seconds = 0;
function update() {
    seconds += 1;
    const element = (
        <div>
            <h1>안녕하세요</h1>
            <h2>지금까지 {second}초가 지났습니다.</h2>
        </div>
    );
    ReactDOM.render(element, document.getElementById('root'));
}

setInterval(update, 1000);