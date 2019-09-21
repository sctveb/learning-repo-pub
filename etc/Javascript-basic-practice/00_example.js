// 정적 스코프(렉시컬 스코프)
var name = 'zero';
function log() {
    console.log(name); // var name = 'zero' 에 연결됨, 동적 스코프가 아니기 때문에 바뀌지 않음
}

function wrapper() {
    var name = 'nero';
    log();
}
wrapper(); // zero

// 클로저
// 반복문 + 콜백함수 = ????
for(var i = 0; i < 100; i++) {
    setTimeout(() => {
        console.log(i); // 여기의 i는 for문에 담긴 i로 고정
    }, i * 1000);
} //... 100이 반복되는 결과 (콜스택 개념과 함께 이해해야 함)

// 클로저 해결책
for(var i = 0; i < 100; i++) {
    function closer(j) {
        setTimeout(() => {
            console.log(j);
        }, j * 1000);
    }
    closer(i);    
} 

// call stack
function d() {
    console.log('d');
};
function e() {
    console.log('e');
};
function a() {
    function b() {
        function c(){
            console.log('c');
        }
        c();
        console.log('b');
    }
    b();
    console.log('a');    
};

d();
e();
a();

// 비동기 재귀함수를 이용한 호출 스택 overflow 방지
function a() {
    setTimeout(() => {
        a();
    }, 0);    
}
a();
