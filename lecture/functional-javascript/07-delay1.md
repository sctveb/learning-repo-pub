# 함수형 프로그래밍과 ES6+ - 7

##    지연성 1

###    1. range와 느긋한 L.range

```javascript
// range
const add = (a,b) => a + b;

const range = l => {
    let i = -1;
    let res = [];
    while (++i < l) {
        res.push(i)
    }
    return res;
}

var list = range(4);
console.log(list);
console.log(reduce(add, list));

// 느긋한 L.range
const L = {};
L.range = function *(l) {
    let i = -1;
    while(++i < l) {
        yield i;
    }
};

var list = L.range(4);
console.log(list);
console.log(reduce(add, list));

/// 차이점 : Array vs iterator 
/// (배열을 바로 내놓는 것과 지연평가로 기다렸다가 처리하는 차이)
```



###    2. range와 느긋한 L.range 테스트

```javascript
function test(name, time, f) {
    console.time(name);
    while (time--) f();
    console.timeEnd(name);
}

test('L.range', 10, () => reduce(add, L.range(1000000)));
test('range', 10, () => reduce(add, range(1000000)));
```



###   3. take

```javascript
const take = (l, iter) => {
    let res = [];
    for (const a of iter) {
        res.push(a);
        if (res.length == l) return res;
    }
    return res;
}
console.time('');
//console.log(take(5, range(Infinity)));
console.timeEnd('');

console.time('');
console.log(take(5, L.range(Infinity)));
console.timeEnd('');

/// 지연평가가 이뤄지는 함수로 얻을 수 있는 이점
/// 1. Infinity같은 값을 활용하는데 문제가 없다
/// 2. 기존의 코드보다 더 빠른 연산이 가능하다
/// 2-1. 연산과정에서 큰 규모의 값을 계속 만들 필요가 없음
/// 2-2. 연산값이 필요한 시점까지 지연시킬 수 있다
```



###    4. L.map

```javascript
L.map = function *(f, iter) {
    for (const a of iter) yield f(a);
}
var it = L.map(a => a + 10, [1,2,3]);
console.log(it.next());
console.log(it.next());
console.log(it.next());
```



###    5. L. filter

```javascript
L.filter = function *(f, iter) {
    for (const a of iter) if(f(a)) yield a;
}
var it = L.map(a => a % 2, [1,2,3,4]);

console.log(it.next());
console.log(it.next());
console.log(it.next());
```



###    6. range, map, filter, take, reduce 중첩 사용

```javascript
go(range(10),
  map(n => n + 10),
  filter(n => n & 2),
  take(2),
  console.log
  );

go(L.range(10),
  map(n => n + 10),
  L.filter(n => n & 2),
  take(2),
  console.log
  );
```



###   7. 엄격한 계산과 느긋한 계산의 효율성 비교

기존의 함수들이 순서대로 모든 연산을 처리하고 다음 차례로 넘긴 것과 달리 지연평가로 작성한 함수는 필요로 하는 함수가 호출할때 그때그때 하나씩 넘긴다. 그렇기 때문에 지연평가를 도입한 함수가 더 효율적으로 동작한다.



###    8. map, filter 계열 함수들이 가지는 결합 법칙
사용하는 데이터가 무엇이든지, 사용하는 보조 함수가 순수 함수라면 무엇이든지, 아래와 같은 방식으로 결합한다면 둘 다 결과가 같다.

[[map, map]], [filter, filter], [map, map]]

= [[map, filter, map], [map, filter, map]]

###    
