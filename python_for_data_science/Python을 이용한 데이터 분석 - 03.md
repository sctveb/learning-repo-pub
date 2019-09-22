# Python을 이용한 데이터 분석 - 03 - 파이썬 데이터 분석 도구들(상)

## 1. 함수 작성

#### 사용자 정의 함수

함수명과 파라미터, 그리고 표현식을 정의하여 사용자 정의 함수를 사용할 수 있다.

```python
def function_name(parameter):
    expression
    
function_name(parameter1)
```



#### 다중 parameter와 값 return

튜플 자료형 : list와 유사하지만 튜플의 요소는 선언 후 생성, 삭제, 수정이 불가능하다.

```python
tuple_example = ('list처럼 다양한 값을 넣을 수 있음','단 불변성을 가짐','값을 고칠 수 없음')
a,b,c = num
def new_tuple(value1,value2):
    """이 함수는 튜플 생성기"""
    tuples = (value1,value2)
    return tuples
alpha = new_tuple(value3,value4)
```



## 2. 스코프, 기본값, Default arguments, variable-length arguments and scope

#### 스코프

스코프는 객체나 이름이 어디까지 접근가능한지 정의하는 프로그램의 한 부분이다.

1. built-in scope - built-in module에 미리 지정된 이름
2. global scope - 스크립트 전역
3. local scope - 함수 내부

함수 내부에서 전역 스코프에 정의된 값을 원한다면? global x



#### 중첩함수

함수 내부에서 반복을 줄이기 위해 내부에 함수를 정의한 함수

Q: python이 중첩함수 내에서 정의한 x라는 변수가 어디에 정의되었는지 어떻게 찾는가? 

A: 내부함수 -> 외부함수-> 전역 -> bulit-in 순으로 찾는다.

```python
def raise_val(n):
    def inner(x):
        raised = x ** n
        return raised
    return inner
```

nested function 내부 함수에서 외부에 정의된 값을 가져오려면? nonlocal x



#### 기본값과 유연한 매개 변수 사용

```python
def test_function(x="기본값", *args):
    for i in args:
        print(i)
```

*args : 복수의 값을 튜플의 형태로 받는다.

**kwargs : dictionary 형태로 keyword argument (키워드=값). 

args, kwargs는 내부 변수명으로 바뀌어도 상관없다.



## 3. Lambda 함수와 오류 처리

#### Lambda 함수

람다 함수는 함수선언으로 하기엔 간단한 연산을 처리하고 싶을때 사용하는 문법이다.

```python
nums = [2, 4, 6, 8, 10]
result = map(lambda a: a ** 2, nums) 
# map외에도 filter(func,seq), reduce(func,seq)도 많이 사용된다.
```



#### 오류 처리

오류를 감지해야 하는 부분을 try로 감싸고 except로 오류 발생시에 처리할 내용을 작성한다.

필요할 경우, 특정 에러에만 반응하는 내용을 작성할 수 있다.

```python
def sqrt(x):
    if x < 0:
        raise ValueError('x는 0이 아닌 자연수여야 한다')
    try:
        return x ** 0.5
    except TypeError:
        print('x는 int나 float가 아니다')
```

