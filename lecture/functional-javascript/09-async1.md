# 함수형 프로그래밍과 ES6+ - 09

## 비동기/동시성 프로그래밍 1

### 1. callback과 Promise

```javascript
function add10(a, callback) {
    setTimeout(() => callback(a+10), 100);
}
add10(5, res => {
    add10(res, res => {
        add10(res, res => {
            console.log(res)
        })
    }) 
});

function add20(a) {
    return new Promise(resolve => setTimeout(() => resolve(a+20), 100));
}
add20(5)
	.then(add20)
	.then(add20)
	.then(console.log);
```



### 2. 비동기를 값으로 만드는 Promise

콜백 함수와 비교 했을 때, Promise가 가지는 가장 큰 차이점은 비동기를 일급 값으로 다룸.
프로미스는 `.then`으로 계속 프로미스 객체를 전달하며 그 자체를 값으로 다뤄짐.




### 3. 값으로서의 Promise 활용

```javascript
const delay100 = a => new Promise(resolve => setTimeout(() => resolve(a), 100));
const go1 = (a, f) => a instanceof Promise ? a.then : f(a);
const add5 = a => a + 5;

// var r1 = go1(10, add5)
// console.log(r1);
const n1 = 10;
go1(go1(n1, add5), console.log);
// var r2 = go1(delay100(10), add5);
// r2.then(console.log);
const n2 = delay100(10);
go1(go1(n2, add5), console.log);
```



### 4. 합성 관점에서의 Promise와 모나드





### 5. Kleisli Composition 관점에서의 Promise



### 6. go, pipe, reduce에서 비동기 제어



### 7. promise.then의 중요한 규칙