# 함수형 프로그래밍과 ES6+

## 비동기/동시성 프로그래밍 2

### 1. 지연 평가 + Promise - L.map, map, take

```javascript
go([Promise.resolve(1),Promise.resolve(2),Promise.resolve(3)],
   L.map(a => a + 10),
   take(2),
   console.log);
```



### 2. Kleisli Composition - L.filter, filter, nop, take

```javascript
go([1,2,3,4,5,6],
  L.filter(a => Promise.resolve(a % 2)),
  L.map(a => a * a),
  take(4),
  console.log);
```





### 3. reduce에서 nop 지원



### 4. 지연 평가 + Promise의 효율성



### 5. 지연된 함수열을 병렬적으로 평가하기 - C.reduce, C.take 1



### 6. 지연된 함수열을 병렬적으로 평가하기 - C.reduce, C.take 2



### 7. 즉시 병렬적으로 평가하기 - C.map, C.filter



### 8. 즉시, 지연, Promise, 병렬적 조합하기



### 9. 코드 간단히 정리



### 10. Node.js에서 SQL 병렬 평가로 얻은 효율

