# Machine Learning Basic

### Critical Process + a

1. Initialization(초기화, 학습하고자 하는 파라미터를 초기값으로 임의로 선정)
2. Cost Function(학습의 기준이 되는 함수 정의)
3. Optimizer(Cost Function를 최소화하는 방향으로 파라미터를 변경하는 적절한 학습방식)

Regression : real number or vector | Classification : class label

Actual Usage: Supervised 2:8 Unsupervised

### Tensorflow & numpy basic

#### 기본 tensorflow 구동 3단계
1. 구조를 만든다

 2. 구조를 실행한다

3. 실행된 결과 중 Variable 등을 다음 process에 반영한다


#### constant 상수, Variable 변수, Placeholder 구동시 값을 집어넣을 공간



#### tf.Session()을 사용하는 3가지 방법

1. sess = tf.InteractiveSession()을 통해 대화용 세션으로 구동 (test용)
2. sess = tf.Session()을 통해 일반적인 구동 (구동 후 sess.close()를 통해 세션 종료를 명시해야 함)
3. with tf.Session() as sess: 구문을 통해 with문 내부에서만 구동(sess.close()를 쓸 필요가 없음)

```python
import tensorflow as tf
import numpy as np

# 버전 확인
tf.__version__

sess = tf.Session()
hello = tf.constant("hello world")
sess.run(hello)

a = tf.constant(10)
b = tf.constant(20)
sess.run(a+b)
sess.close()

node1 = tf.constant(3.0, tf.float32)
node2 = tf.constant(5.0, tf.float32)
node3 = tf.add(node1,node2)

print(node1)
print(node2)
print(node3)

sess = tf.Session()
print(sess.run([node1,node2,node3]))

ph1 = tf.placeholder(tf.float32)
ph2 = tf.placeholder(tf.float32)
adder = ph1 + ph2

print(sess.run(adder,feed_dict={ph1:[3,4,5], ph2:[4,5,6]}))

v1 = tf.Variable(tf.random_normal([10,10], stddev=0.35))
v2 = tf.Variable(tf.random_normal([10,10], stddev=0.35))
sess.run(tf.global_variables_initializer())

sess.close()
```

#### 입력하는 내용에 대한 이해

```python
import tensorflow as tf
import numpy as np

# matrix의 shape를 판별하고 reduce_mean등의 함수를 사용하기
sess = tf.InteractiveSession()
t = tf.constant([[[1,2,3,4],[1,2,3,4]],[[1,2,3,4],[1,2,3,4]]])
print(tf.shape(t).eval())

mat1 = tf.constant([[1,2],[3,4]])
mat2 = tf.constant([[1],[3]])
print(tf.shape(mat1).eval())
print(tf.shape(mat2).eval())

print(mat1.eval())
print(mat2.eval())
print((mat1*mat2).eval())


x = [[1.,2.],[3.,4.]]
tf.reduce_sum(x,axis=0).eval()
tf.reduce_sum(x,axis=1).eval()
tf.reduce_mean(tf.reduce_sum(x, axis=-1)).eval()


# tf.argmax는 지정한 값과 axis에 맞는 최대값의 인덱스를 출력
x = [[0,1,2],[3,4,5]]
tf.argmax(x, axis=1).eval()

# tf.reshape는 지정한 값을 지정한 shape로 변환
x = [1,2,3,4,5,6,7,8,9]
tf.reshape(x,[3,3]).eval()

# tf.one_hot은 지정한 값을 [0,0,1]와 같이 수치로 구분되는 값으로 변경
# 단 tensorflow 자체 문제로 one_hot 사용시 차원이 추가되기 때문에 reshape의 연동은 사실상 필수
t = tf.one_hot([[0],[1],[2],[3]],depth=4).eval()
tf.reshape(t, [-1,4]).eval()

# tf.cast는 지정한 값을 지정한 데이터 타입으로 변환
tf.cast([1.8,3.9,3.01,39.09],tf.int32).eval()

tf.reduce_mean(tf.cast([True,False,1==1,1!=1],tf.float32)).eval()


# tf.stack은 matrix나 data를 지정한 matrix 구조로 쌓기
x = [1,4]
y = [2,5]
z = [3,6]
tf.stack([x,y,z]).eval()

# tf.ones_like(tf.zeros_like)는 지정한 행렬을 1(0)으로 채우는 새로운 행렬을 생성
x = [[1,2,3],[4,5,6],[7,8,9]] #(3,3)
tf.ones_like(x).eval()
tf.zeros_like(x).eval()
```

#### numpy와 함께 동작

```python
import tensorflow as tf
import numpy as np

x = np.array([[1,2,3],[4,5,6]])
print(x.shape)
print(np.ndim(x))

a = np.zeros([10,10])
print(a)
b = np.ones([10,10])
print(b)
c = np.full((3,3,3,3),7)
print(c)
d = np.eye(3)
print(d)
# 5*3 X 3*1 = 5*1
# exp,log, 편미분(몰라도 사용은 가능)

np.random.random((3,3))
#tf.random_normal : stddev
#tf.random_uniform :


np.linspace(0,20,20)

x = np.array([[1,2,3],[4,5,6],[7,8,9]])


print(x[:2,1:])

y = x[:]

y = x # 주소값
y = x[:] # value
z = x[-1:-1]

print(x[:,2:])

arr = np.arange(12).reshape(4,3)
print(arr)

row_mean = arr.mean(axis=1).reshape(4,1)
print(row_mean)

k = arr-row_mean
print(k)
```

