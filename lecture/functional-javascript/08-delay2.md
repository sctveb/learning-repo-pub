# 함수형 프로그래밍과 ES6+ - 8

## 지연성 2

### 1. 결과를 만드는 함수 reduce, take

map, filter가 지연성을 가지는 것과 달리 reduce, take는 값을 꺼내서 활용해야 하기 때문에 마지막 단에 일반적으로 놓게 됨.



### 2. queryStr 함수 만들기

```javascript
const queryStr = obj => go(
    obj,
    Object.entries,
    map(([k, v]) => `${k}=${v}`),
    reduce((a,b) => `${a}&${b}`)
);
console.log(queryStr({ limit: 10, offset: 10, type: 'notice'}));
```



### 3. Array.prototype.join 보다 다형성이 높은 join 함수

```javascript
L.entries = function *(obj) {
    for (const k in obj) yield [k, obj[k]];
}

const join = curry((sep = ',', iter) =>
                  reduce((a,b) => `${a}${sep}${b}`, iter));

const queryStr = pipe(
    L.entries,
    L.map(([k,v]) => `${k}=${v}`),
    join('&')
);
function *a() {
    yield 10;
    yield 11;
    yield 12;
    yield 13;
}
a.join() // 에러
console.log(join(' - ', a()));
```



### 4. take, find
```javascript
const users = [
    { age: 32 },
    { age: 31 },
    { age: 37 },
    { age: 28 },
    { age: 25 },
    { age: 32 },
    { age: 31 },
    { age: 37 }
]

const find = (f, iter) => go(
    iter,
    L.filter(f),
    take(1),
    ([a]) => a
);

console.log(find(u => u.age < 30, users));

go(users,
  L.map(u => u.age),
  find(n => n  < 30),
  console.log);
```



### 5. L.map, L.filter로 map과 filter 만들기

```javascript
const map = curry(pipe(
  L.map,
  take(Infinity)
));

const map = curry(pipe(
  L.filter,
  take(Infinity)
));
```



### 6. L.flatten, flatten

```javascript
const isIterable = a => a && a[Symbol.iterator];

L.flatten = function *(iter) {
  for (const a of iter) {
    if (isIterable(a)) {
      for (const b of a) {
        yield b;
      } 
    } else {
      yield a;
    }
  }
};
var it = L.flatten([1,2],3,4,[5,6],[7,8,9]);
console.log([it]);
const flatten = pipe(L.flatten, take(Infinity));
console.log(flatten([1,2],3,4,[5,6],[7,8,9]));

// yield *iterable === for (const val of iterable) yield val

L.flatten = function *(iter) {
  for (const a of iter) {
    if (isIterable(a)) {
      yield *a
      } 
    } else {
      yield a;
    }
  }
};

// 깊은 iterable을 펼치기 위한 deepflat 메소드
L.deepflat = function *f(iter) {
    for (const a of iter) {
        if (isIterable(a)) {
            yield *f(a)
        } else {
            yield a;
        }
    }
}
```



### 7. L.flatMap, flatMap

```javascript
L.flatMap = curry(pipe(L.map, L.flatten));

var it = L.flatMap(a => a, [[1,2], 3, [5,6,7]]);
console.log([it]);
const flatMap = pipe(L.flatMap, flatten);
console.log(flatMap(range, [1,2,3]));
```



### 8. 2차원 배열 다루기

```javascript
const arr = [
    [1,2],
    [3,4,5],
    [6,7,8],
    [9,10]
];

go(arr,
    L.flatten,
    L.filter(a => a % 2),
    take(3),
    console.log);
```



### 9. 지연성 / 이터러블 중심 프로그래밍 실무적인 코드

데이터를 우선적으로 정리 후 프로그래밍 메소드 작성을 하는 객체 지향 프로그래밍과 달리 함수 조합에 맞는 데이터를 구성

