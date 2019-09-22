# Python을 이용한 데이터 분석 - 02 - 데이터 분석을 위한 Python (Level 2)

## 1. Matplotlib

Matplotlib는 파이썬의 2차원 시각화 패키지이다. 데이터를 대중적인 시각화 기법에 맞춰서 표현이 가능하다.

#### Matplotlib를 이용한 기본 plot 작성

```python
import matplotlib.pyplot as plt
plt.plot(x,y) # Line plot
# plt.scatter(x,y) # Scatter plot
# plt.hist(values,bins) ## Histogram plot
plt.show()
plt.clf() # 다른 plot 작성을 위한 clear 작업
```



#### Plot에 추가할 수 있는 요소들

```python
import matplotlib.pyplot as plt
plt.scatter(x, y, s = size, c = color) # 크기와 색상을 지정가능
plt.xlabel("xlabel") # x축 라벨명
plt.ylabel("ylabel") # y축 라벨명
plt.xticks(xtick_value,xtick_label) # 축 간격 & 간격 라벨링
plt.text(text_x,text_y,string,[options...]) # plot내 특정위치에 글자 작성
plt.grid(True) # 격자 생성
plt.title("title") # plot명
plt.show()
```



## 2. 딕셔너리와 Pandas

#### 딕셔너리

dict = {key:value} : key, value 쌍으로 이뤄진 자료형

```python
list01 = [30.55, 12.32, 1] # list
dict01 = {1:"hi", "test": 1.5, "another_dict": {"test": True}} # dictionary
## dictionary 자료형의 key는 변하지 않는 값으로 입력해야 한다.
### list가 index로 값의 위치를 구분짓는 반면에, dictionary는 key값으로 value를 가져온다.
```

dict[key] = value : 딕셔너리 값 추가 또는 수정

del(dict[key]) : 딕셔너리 값 삭제



#### Pandas

Pandas는 데이터 분석을 위한 오픈소스 라이브러리이다. numpy는 이름(numeric python)에서 나오듯이 수치 연산에 치중되어 있어서 복합적인 자료형을 가진 데이터셋을 다루는데 어려움이 많은데 Pandas는 이를 DataFrame이라는 자료형을 통해 극복할 수 있도록 한다.

기본적인 dataframe 생성

```python
import pandas as pd
### 가로(horizontal) = row = 관측치(observations)
### 세로(horizontal) = column = 변수(variable)

df01_base = {
    "column1": ["value1","value2","value3"],
    "column2": [1,2,3],
    "column3": [True,False,True]
}
df01 = pd.DataFrame(df_base) # DataFrame 생성
## 하나의 column에는 동일한 data type이어야 함
df01.index = ["1","2","3"] # 기본적으로 생성된 index를 변경
```



csv파일을 dataframe으로 불러오기

```python
import pandas as pd

df02 = pd.read_csv('filename', index_col=0) # 0번째 column을 index로 지정하고 filename을 불러와서 dataframe으로 생성
```



dataframe에서 값 가져오기

```python
import pandas as pd
### dataframe은 series의 모음집이다
### value를 가져올 경우 이 부분을 유의해서 가져올 필요가 있음

""" 위에서 만든 df01을 그대로 사용한다는 전제로 작성된 코드 """
type(df01["column1"]) # pd.Series
type(df01[["column1"]]) # pd.DataFrame

df01[["column1"]] # column 단위로 선택
df01[1:2] # row 단위로 선택(slicing으로만 선택할 것)

df01.loc["column1"] # label 기반 선택
df01.iloc[:, [0:1]] # index 기반 선택
### 예전에 사용되던 ix는 deprecated될 예정임으로 사용에 유의
```



## 3. 논리적 연산 및 필터링

#### 비교연산자

<, <=, >, >=, ==, !=

#### 논리연산자

and, or, not, np.logical_and(), np.logical_or(), np.logical_not()

배열단위로 사용하고자 할 경우에는 위의 numpy method를 활용할 것

#### if, elif, else

#### Pandas DataFrame 필터링 방법

1. column 선택
2. 원하는 조건으로 비교
3. pd.DataFrame.loc에 사용해서 결과를 조회



## 4. 순환작업

#### while 루프문

```python
while(condition):
    expression    
```



#### for 루프문

```python
### 반복이 가능한 자료형(iterator)에 사용하는 for 루프문
for index, variable in enumerate(sequence):
    expression
```



#### 데이터 구조에 따라 다른 루프문

```python
### 딕셔너리
for k, v in dict.items():
    print("dictionary's expression")
### numpy 배열
for val in np.nditer(nparray):
    print("np.array's expression")
### pandas DataFrame
for lab, row in dataframe.iterrows():
    print("pd.DataFrame's expression")
### pandas DataFrame에 함수를 범위로 적용한 결과를 새로운 column으로 삽입
pd.DataFrame["new column"] = pd.DataFrame["column"].apply(function)
```

