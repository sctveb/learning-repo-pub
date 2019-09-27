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

모나드 : 안전한 함수 합성을 위한 도구

```javascript
const g = a => a + 1;
const f = a => a * a;

console.log(f(g(1)));
console.log(f(g()));
// 값의 유무와 상관없이 안전한 함수의 합성이 가능할까?
[1].map(g).map(f).forEach(r => console.log(r));
[].map(g).map(f).forEach(r => console.log(r));
// 제일 앞단에서 값의 유무에 따라 연산을 하는 여부가 달라짐.
[1, 2, 3].map(g).filter(a => a % 2).map(f).forEach(r => console.log(r));
Array.of(1).map(g).map(f).forEach(r => console.log(r));
Promise.resolve(1).then(g).then(f).then(r => console.log(r));

new Promise(resolve =>
            setTimeout(() => resolve(2), 100)
           ).then(g).then(f).then(r => console.log(r));
```



### 5. Kleisli Composition 관점에서의 Promise

Kleisli Composition : 오류가 있을 수 있는 상황에서 함수 합성을 안전하게 하는 규칙

오류가 발생할 경우 다음 합성이 이뤄지지 않도록 간주

```javascript
var users = [
    { id: 1, name: 'aa'},
    { id: 2, name: 'bb'},
    { id: 3, name: 'cc'},
];

const getUserById = id => find(u => u.id == id, users);

const f = ({name}) => name;
const g = getUserById;

// 변경 전
const fg = id => f(g(id));

const r = fg(2);
console.log(r);

users.pop();
users.pop();

const r2 = fg(2); // Error
console.log(r2);

// 변경 후
const getUserById2 = id => find(u => u.id == id, users) || Promise.reject('d없음');

const fg2 = id => Promise.resolve(id).then(g).then(f).catch(a => a);

fg2(1).then(console.log);

fg2(2).then(console.log);
```



### 6. go, pipe, reduce에서 비동기 제어

```javascript
go(Promise.resolve(1),
   a => a + 10,
   a => Promise.reject('error~~'),
   a => console.log('----'),
   a => a + 1000,
   console.log).catch(a => console.log(a));
```



### 7. Promise.then의 중요한 규칙

아무리 Promise를 중첩시켜도 `Promise.then`을 수행하면 Promise가 아닌 값이 나온다.

```javascript
Promise.resolve(Promise.resolve(Promise.resolve(1))).then(console.log);

new Promise(resolve => resolve(new Promise(resolve => resolve(1)))).then(console.log);
```

