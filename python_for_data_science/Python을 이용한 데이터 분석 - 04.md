# Python을 이용한 데이터 분석 - 04 - 파이썬 데이터 분석 도구들(하)

## 1. 파이썬 iterator 사용법

#### iterators

Iterable : iterator를 생성할 수 있는 객체

Iterator: `next()` 메소드를 통해 내부의 값을 순차적으로 출력할 수 있는 객체



#### iterator를 사용해보기

1. enumerate()

   ```python
   ### enumerate()를 통해 enumerate 객체를 생성할 수 있음
   ### 이를 통해 index와 value를 iterate할 수 있음
   for index, value in enumerate(list,start=1):
       print(index, value)
   ```

   

2. zip()

   ```python
   ### zip()을 사용하면 복수의 배열에서 동일한 index끼리 tuple로 묶은 zip 객체를 생성
   ### 이를 통해 복수의 배열을 한꺼번에 표현하는데 사용 할 수 있음
   list_zip = zip(list1, list2, list3)
   for value1,value2,value3 in list_zip:
       print(value1, value2, value3)
   # *를 이용해서 zip 객체를 unpack
   new_list1, new_list2, new_list3 = zip(*list_zip)
   ```



#### 큰 파일을 불러오기 위한 iterator 사용

```python
import pandas as pd
result = []
for chunk in pd.read_csv('filename.csv', chunksize=1000):
    result.append(sum(chunk['x']))
```



## 2. List comprehension과 generators

#### List comprehensions

리스트를 쉽게 생성하기 위해 사용되는 방법

```python
nums = [12,8,21,3,16]
new_nums1 = []
for num in nums:
    new_nums1.append(num+1)
new_nums2 = [ num + 1 for num in nums ]
print(new_nums2)

paris_1 = []
for num1 in range(0,2):
    for num2 in range(6,8):
        paris_1.append(num1,num2)
paris_2 = [(num1,num2) for num1 in range(0,2) for num2 in range(6,8)]
```



#### comprehensions 심화

```python
# 조건부 comprehensions
a = [num ** 2 if num % 2 == 0 else " " for num in range(10)]
print(a)
# 딕셔너리 comprehensions
b = {index:value for index,value in enumerate(range(10))}
```



#### generator

호출되었을 때 할일하고 바로 끝나버리는 기존의 함수나 표현식과 달리 iterator의 성질을 가지고 있다. return해야 할 모든 값을 메모리에 저장하지 않고 yield를 통해 하나씩 꺼낸다. 이를 통해 메모리 리소스를 절약할 수 있다.

```python
# generator 표현식 예시
(2 * num for num in range(10))
# generator 함수는 일반 함수와 달리 yield로 값을 출력한다
def num_sequence(n):
    i = 0
    while i < n :
        yield i
        i += 1
```