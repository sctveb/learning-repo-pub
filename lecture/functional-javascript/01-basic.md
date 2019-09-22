# 함수형 프로그래밍과 ES6+ - 01

## 함수형 자바스크립트 기본기

### 1. 평가와 일급 

#### 평가

- 코드가 계산(Evaluation) 되어 값을 만드는 것

#### 일급

- 값으로 다룰 수 있다.

- 변수에 담을 수 있다.

- 함수의 인자로 사용될 수 있다.

- 함수의 결과로 사용될 수 있다.



### 2. 일급 함수 & 고차 함수 & 순수 함수

#### 일급 함수

- 함수를 값으로 다룰 수 있다.
- 조합성과 추상화의 도구

#### 고차 함수

- 함수를 값으로 다루는 함수

#### 순수 함수

- 동일한 인자 => 동일한 결과 리턴
- 부수 효과가 없음



```javascript
// 순수 함수
const add5 = a => a + 5;
console.log(add5);
console.log(add5(5));

// 고차 함수
const f1 = () => () => 1;
console.log(f1());

const f2 = f1();
console.log(f2);
console.log(f2());
```



```javascript
// 함수를 인자로 받아서 실행하는 함수
// - apply1
// - times
const apply1 = f => f(1);
const add2 = a => a + 2;
console.log(apply1(add2));
console.log(apply1(a => a - 1));

const times = (f, n) => {
    let i = -1;
    while (++i < n) f(i);
};

times(console.log, 3);

times(a => console.log(a + 10), 3);

// 함수를 만들어 리턴하는 함수 (클로저를 만들어 리턴하는 함수)
// - addMaker

const addMaker = a => b => a + b;
const add10 = addMaker(10);
console.log(add10(5));
console.log(add10(10));
```



#### 결과적으로 함수형 프로그래밍은

#### 1. 함수의 부수 효과를 지양함으로써 오류를 줄이고 안정성을 높인다.

#### 2. 모듈화 수준을 높여 생산성을 높인다.