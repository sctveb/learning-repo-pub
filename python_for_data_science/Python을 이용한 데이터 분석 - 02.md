# Python을 이용한 데이터 분석 - 02 - 데이터 과학을 위한 초급 파이썬

## 1. Matplotlib

Matplotlib는 파이썬의 2차원 시각화 패키지이다. 데이터를 대중적인 시각화 기법에 맞춰서 표현이 가능하다.

Line plot, Scatter plot

```python
import matplotlib.pyplot as plt
plt.plot(x,y) # Line plot
# plt.scatter(x,y) # Scatter plot
plt.show()
```

Histograms

```python
import matplotlib.pyplot as plt
plt.hist(values,bins)
plt.show()
plt.clf() # clean a plot for starting other plot
```

단순한 시각화 뿐만 아니라 사용자의 입맛에 맞는 형태로 조절이 가능하다.

```python
import matplotlib.pyplot as plt
plt.scatter(x, y, s = size, c = color) # 필수값에 값들의 크기, 색까지 지정
plt.xlabel(xlabel) # x,y축의 라벨명 
plt.ylabel(ylabel)
plt.xticks(xtick_value,xtick_label) # x축의 눈금값 조절(값과 라벨명)
plt.text(text_x,text_y,string,[options...]) # 특정 좌표에 특정 텍스트 입력
plt.grid(True) # 격자 추가
plt.show()
```



## 2. 딕셔너리 & Pandas

딕셔너리 자료형은 key값과 value값으로 구성된 비정렬 컬렉션이다. 이 말을 풀어 말하자면 기존의 배열과 달리 순서가 정해져 있지 않으며 원하는 value를 key를 통해 가져올 수 있다. 리스트와 마찬가지로 모든 타입을 사용가능하며 리스트와 딕셔너리 자료형도 포함할 수 있다.

```python
a = {"a":0, 1:"b", "c":True, 2:[1,2,3,4], 3:{1:'시작값'}}
a[3][1] # "시작값"
a["c"] # True
a["key"] = "value" # 딕셔너리 내 값의 추가 및 변경
del(a["key"]) # 딕셔너리 내 값의 삭제
```



Pandas는 데이터 분석을 위한 오픈소스 라이브러리이다. numpy는 이름(numeric python)에서 나오듯이 수치 연산에 치중되어 있어서 복합적인 자료형을 가진 데이터셋을 다루는데 어려움이 많은데 Pandas는 이를 DataFrame이라는 자료형을 통해 극복할 수 있도록 한다.

```python
import pandas as pd
a = pd.DataFrame(data) # 임의의 데이터셋을 DataFrame으로 변경(다양한 자료형 지원)
```



pd.DataFrame은 복수의 pd.Series로 구성되어 있으며 pd.Series는 단일 자료형으로 구성되어 있다.  Pandas는 pd.read_csv를 통해 손쉽게 csv파일을 DataFrame으로 불러올 수 있다.

```python
import pandas as pd
a = pd.read_csv('filename.csv', index_col=0) # index column 위치를 지정하고 csv파일 load
```



Pandas는 다양한 방식으로 DataFrame을 활용할 수 있다.

```python
pd.DataFrame[["column1","column4"]] # column 단위로 dataframe 탐색
pd.DataFrame[1:3] # row 단위로 dataframe 탐색 (단, slicing만을 사용할 것)
pd.DataFrame.loc[['column1']] # label-based access
pd.DataFrame.iloc[[4, 1]] # index-based access
```



## 3. Logic, Control Flow and Filtering

### Comparison Operators

<, <=, >, >=, ==, !=

### Boolean Operators

and, or, not, np.logical_and(), np.logical_or(), np.logical_not()

### if, elif, else

### Filtering Pandas DataFrame

select column -> comparison -> use result to select pd.DataFrame



## 4. Loops

### while loop

while(condition):

​	expression

### for loop

for index, variable in enumerate(sequence):

​	expression

### Looping Data Structures

for k, v in dict.items():

​	dictionary's expression

for val in np.nditer(nparray):

​	np.array's expression

for lab, row in dataframe.iterrows():

​	pd.DataFrame's expression

pd.DataFrame["new column"] = pd.DataFrame["column"].apply(function)