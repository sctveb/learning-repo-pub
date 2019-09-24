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
### 4. take, find
### 5. L.map, L.filter로 map과 filter 만들기
### 6. L.flatten, flatten
### 7. L.flatMap, flatMap
### 8. 2차원 배열 다루기
### 9. 지연성 / 이터러블 중심 프로그래밍 실무적인 코드

