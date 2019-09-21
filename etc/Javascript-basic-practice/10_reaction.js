var screen = document.querySelector('#screen');
var startTime;
var endTime;
var TimeOut;
var timeStatus = [];

// console.time('time');
// var startTime = performance.now();

screen.addEventListener('click', (e) => {    
    // console.timeEnd('time');
    // var endTime = performance.now();
    if (screen.classList.contains('waiting')) {
        screen.classList.remove('waiting');
        screen.classList.add('ready');
        screen.textContent = '초록색 되면 빠르게 클릭하세요';
        TimeOut = setTimeout(() => {
            startTime = new Date();
            screen.click();
        }, Math.floor(Math.random() * 1000) + 2000);
    } else if (screen.classList.contains('ready')) {
        // 부정 클릭
        if (!startTime) {
            clearTimeout(TimeOut);
            screen.classList.remove('ready');
            screen.classList.add('waiting');
            screen.textContent = '너무 빨리 누르셨습니다. 다시 시작하세요';
        } else {
        screen.classList.remove('ready');
        screen.classList.add('now');
        screen.textContent = '지금이에요';
        }
    } else if (screen.classList.contains('now')) {
        var endTime = new Date();
        screen.classList.remove('now');
        screen.classList.add('waiting');
        screen.textContent = '클릭해서 시작하세요';
        console.log('반응속도 : ' + (endTime - startTime) + 'ms');
        timeStatus.push(endTime - startTime);
        startTime = null;
        endTime = null;
    }
})