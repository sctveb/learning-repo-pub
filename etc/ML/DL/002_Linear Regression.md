# Linear Regression

선형 회귀 - 

### element wise multiplication

이해를 돕기 위한 원시적인 형태의 계산. 실제로는 아래의 matrix multiplication을 활용한 구조를 활용한다.

```python
# data, variable, placeholder 설정
x_train = [1,2,3]
y_train = [11,20,29]
# W = 9, b = 2
W = tf.Variable(tf.random_normal([1]), name = "Weight")
b = tf.Variable(tf.random_normal([1]), name = "bias")
X = tf.placeholder(tf.float32, shape=[None])
Y = tf.placeholder(tf.float32, shape=[None])

# hypothesis, cost, loss 함수 수동 설정(수식 이해를 위한)
hypothesis = X * W + b
cost = tf.reduce_mean(tf.square(hypothesis-Y))
learning_rate = 0.01
gradient = tf.reduce_mean((W * X - Y) * X)
descent = W - learning_rate*gradient
update = W.assign(descent)

# optimizer 사용할 경우
##optimizer = tf.train.GradientDescentOptimizer(learning_rate=0.01)
##train = optimizer.minimize(cost)

# Session 구동 및 값 출력
sess = tf.Session()
sess.run(tf.global_variables_initializer())
for step in range(2001):
    _, c_val = sess.run([update,cost],feed_dict={X:x_train,Y:y_train})
    if step % 100 == 0:
        print(step,c_val)
sess.close()
```

### matrix multiplication 실제 사용

```python
# data, variable, placeholder 설정
import tensorflow as tf
import numpy as np
x1_data = [10.,12.,15.,16.,85.]
x2_data = [13.,22.,45.,22.,85.]
x3_data = [85.,95.,16.,25.,20.]
y_data = [152.,168.,210.,156.,126.]

X1 = tf.placeholder(tf.float32)
X2 = tf.placeholder(tf.float32)
X3 = tf.placeholder(tf.float32)
Y = tf.placeholder(tf.float32)

W1 = tf.Variable(tf.random_normal([1]), name = "weight1")
W2 = tf.Variable(tf.random_normal([1]), name = "weight2")
W3 = tf.Variable(tf.random_normal([1]), name = "weight3")
b = tf.Variable(tf.random_normal([1]), name = "bias")

hypothesis = W1 * X1 + W2 * X2 + W3 * X3 + b
cost = tf.reduce_mean(tf.square(hypothesis-Y))
optimizer = tf.train.GradientDescentOptimizer(learning_rate = 1e-5)
train = optimizer.minimize(cost)

sess = tf.Session()
sess.run(tf.global_variables_initializer())

for step in range(20001):
    cost_val, hy_val, _ = sess.run([cost,hypothesis,train],feed_dict={X1:x1_data,X2:x2_data,X3:x3_data,Y:y_data})
    if step % 100 == 0:
        print(step,"|",cost_val,"|",hy_val)
sess.close()
```

## matrix multiplication

```python
import tensorflow as tf
import numpy as np

# 메소드를 만들어 자료의 정규화 구현
def MinMaxScalar(data):
    a = data - np.min(data,0)
    b = np.max(data,0) - np.min(data,0)
    return a/(b+1e-10)
xy = np.array([[828.659973, 833.450012, 908100, 828.349976, 831.659973],
               [823.02002, 828.070007, 1828100, 821.655029, 828.070007],
               [819.929993, 824.400024, 1438100, 818.97998, 824.159973],
               [816, 820.958984, 1008100, 815.48999, 819.23999],
               [819.359985, 823, 1188100, 818.469971, 818.97998],
               [819, 823, 1198100, 816, 820.450012],
               [811.700012, 815.25, 1098100, 809.780029, 813.669983],
               [809.51001, 816.659973, 1398100, 804.539978, 809.559998]])
xy = MinMaxScalar(xy)
x_data = xy[:,0:-1]
y_data = xy[:,[-1]]


X = tf.placeholder(tf.float32,shape=[None,4])
Y = tf.placeholder(tf.float32,shape=[None,1])
W = tf.Variable(tf.random_normal([4,1]),name="weight")
b = tf.Variable(tf.random_normal([1]),name="bias")

hypothesis = tf.matmul(X,W)+b
cost = tf.reduce_mean(tf.square(hypothesis - Y))
optimizer = tf.train.GradientDescentOptimizer(learning_rate=1e-5)
train = optimizer.minimize(cost)

sess = tf.Session()
sess.run(tf.global_variables_initializer())
for step in range(2000):
    c, _ = sess.run([cost,train],feed_dict={X:x_data,Y:y_data})
    if step % 100 == 0:
        print(step,"|",c)
        
sess.close()
```

### Example : simple

```python
import tensorflow as tf
import numpy as np

x_data = [[10.,12.,15.,16.],[13.,22.,45.,26.],[85.,95.,16.,25.,],[152.,168.,210.,156.],[112.,58.,213.,96.]]
y_data = [[20.],[30.],[150.],[95.],[153.]]

X = tf.placeholder(tf.float32, shape=[None,4])
Y = tf.placeholder(tf.float32, shape=[None,1])

W = tf.Variable(tf.random_normal([4,1]),name="weight")
b = tf.Variable(tf.random_normal([1]),name="bias")

hypothesis = tf.matmul(X,W) + b
cost = tf.reduce_mean(tf.square(hypothesis - Y))
optimizer = tf.train.GradientDescentOptimizer(learning_rate=1e-5)
train = optimizer.minimize(cost)

sess = tf.Session()
sess.run(tf.global_variables_initializer())
for step in range(2001):
    cost_val,hy_val,_ = sess.run([cost,hypothesis,train], feed_dict={X:x_data,Y:y_data})
    if step % 100 == 0:
        print(step,"|", cost_val,"|",hy_val)
sess.close()
```

### Example : test-score


```python
import tensorflow as tf
import numpy as np
xy = np.loadtxt('test-score.csv', delimiter=",",dtype=np.float32)
x_data = xy[:,:-1]
y_data = xy[:,[-1]]

X = tf.placeholder(tf.float32, shape=[None,3])
Y = tf.placeholder(tf.float32, shape=[None,1])

W = tf.Variable(tf.random_normal([3,1]),name="weight")
b = tf.Variable(tf.random_normal([1]),name="bias")

hypothesis = tf.matmul(X,W) + b
cost = tf.reduce_mean(tf.square(hypothesis - Y))
optimizer = tf.train.GradientDescentOptimizer(learning_rate=1e-5)
train = optimizer.minimize(cost)

sess = tf.Session()
sess.run(tf.global_variables_initializer())
for step in range(2001):
    cost_val,hy_val,_ = sess.run([cost,hypothesis,train], feed_dict={X:x_data,Y:y_data})
    if step % 100 == 0:
        print(step,"|", cost_val,"|",hy_val)
print(sess.run(hypothesis,feed_dict={X:[[100,120,130]]}))
sess.close()
```

### Example : boston

```python
import tensorflow as tf
import numpy as np

train = np.loadtxt('boston_train.csv',delimiter=",",dtype=np.float32,skiprows=1)
test = np.loadtxt('boston_test.csv',delimiter=",",dtype=np.float32,skiprows=1)

x_train = train[:,:-1]
y_train = train[:,[-1]]
x_test = test[:,:-1]
y_test = test[:,[-1]]

X = tf.placeholder(tf.float32, shape=[None,9])
Y = tf.placeholder(tf.float32, shape=[None,1])

W = tf.Variable(tf.random_normal([9,1]),name="weight")
b = tf.Variable(tf.random_normal([1]),name="bias")

hypothesis = tf.matmul(X,W) + b
cost = tf.reduce_mean(tf.square(hypothesis - Y))
optimizer = tf.train.GradientDescentOptimizer(learning_rate=1e-6)
train = optimizer.minimize(cost)

sess = tf.Session()
sess.run(tf.global_variables_initializer())
for step in range(50001):
    cost_val,hy_val,_ = sess.run([cost,hypothesis,train], feed_dict={X:x_train,Y:y_train})
    if step % 100 == 0:
        print(step,"|", cost_val)
        
opt = []
for i in range(len(test)):
    opt.append((sum(sum(sess.run(hypothesis,feed_dict={X:x_test[i:i+1,:]})))-sum(sum(y_test[i:i+1,:])))**2)
    print(sess.run(hypothesis,feed_dict={X:x_test[i:i+1,:]})," | ",y_test[i:i+1,:])
print((sum(opt)/float(len(opt)))**0.5)
```

