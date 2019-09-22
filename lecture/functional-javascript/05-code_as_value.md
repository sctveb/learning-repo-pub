# 함수형 프로그래밍과 ES6+ - 05

## 코드를 값으로 다루어 표현력 높이기

### 1. go

```javascript
const go = (...args) => {
    reduce((a, f) => f(a), args);
};
go(0, a => a+1, a => a+10, a=> a+100, console.log())
```



### 2. pipe

```javascript
const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);

const f = pipe((a,b) => a+b, a => a+10, a => a+100);

console.log(f(0,1));
```



### 3. go를 사용하여 읽기 좋은 코드로 만들기

```javascript
go(products,
   products => fitler(p => p.price < 20000, products),
   products => map(p => p.price, products),
   prices => reduce(add, prices),
   console.log
  )
```



### 4. go+curry를 사용하여 더 읽기 좋은 코드로 만들기

```javascript
const curry = f => (a, ..._) => _.length ? f(a, ..._) : () => (..._) => f(a, ..._);

const mult = curry((a, b) => a * b);
console.log(mult(3)(2));
const mult3 = mult(3);
console.log(mult3(10));
console.log(mult3(5));
console.log(mult3(3));

// go + curry
const map = curry((f, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(f(a));
  }
  return res;
});

const filter = curry((f, iter) => {
  let res = [];
  for (const a of iter) {
    if (f(a)) res.push(a);
  }
  return res;
});

const reduce = curry((f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const a of iter) {
    acc = f(acc, a);
  }
  return acc;
});

// 1차 변경
go(products,
   products => fitler(p => p.price < 20000)(products),
   products => map(p => p.price)(products),
   prices => reduce(add)(prices),
   console.log
  )

// 2차 변경
go(products,
   fitler(p => p.price < 20000),
   map(p => p.price),
   reduce(add),
   console.log
  )
```



### 5. 함수 조합으로 함수 만들기

```javascript
const total_price = pipe(
    map(p => p.price),
    reduce(add)
);

const base_total_price = predi => pipe(
    filter(predi),
    total_price,
)

// 3차 변경
go(products,
  filter(p => p.price < 20000),
  total_price,
  console.log
  );

//4차 변경
go(products,
   base_total_price(p => p.price < 20000),
   console.log
  );

```

