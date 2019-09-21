# Binary Class Classification

이진 분류



### Basic

```python
import tensorflow as tf
import numpy as np

x_data = [[1,2],[2,3],[4,5],[6,7]] # 4 * 2
y_data = [[0],[1],[0],[1]] # 4 * 1

X = tf.placeholder(tf.float32, shape=[None,2])
Y = tf.placeholder(tf.float32, shape=[None,1])

W = tf.Variable(tf.random_normal([2,1]))
b = tf.Variable(tf.random_normal([1]))

hypothesis = tf.sigmoid(tf.matmul(X,W)+b)
cost = -tf.reduce_mean(tf.reduce_sum(Y * tf.log(hypothesis) + (1-Y) * tf.log(1-hypothesis)))
optimizer = tf.train.GradientDescentOptimizer(learning_rate=0.01)
train = optimizer.minimize(cost)

predicted = tf.cast(hypothesis > 0.5, dtype=tf.float32)
accuracy = tf.reduce_mean(tf.cast(tf.equal(predicted,Y),dtype=tf.float32))

sess = tf.Session()
sess.run(tf.global_variables_initializer())
for step in range(2001):
    cost_val,hy_val,_ = sess.run([cost,hypothesis,train], feed_dict={X:x_data,Y:y_data})
    if step % 100 == 0:
        print(step,"|", cost_val,"|",hy_val)
print(sess.run(accuracy,feed_dict={X:x_data,Y:y_data}))
print(sess.run(tf.cast(hypothesis > 0.5, dtype=tf.float32),feed_dict={X:[[10,12]]}))
sess.close()
```

### Example : diabetes

```python
xy = np.loadtxt('diabetes.csv', delimiter=",",dtype=np.float32)
x_data = xy[:,:-1]
y_data = xy[:,[-1]]
x_train = xy[:501,:-1]
y_train = xy[:501,[-1]]
x_test = xy[501:,:-1]
y_test = xy[501:,[-1]]

X = tf.placeholder(tf.float32, shape=[None,8])
Y = tf.placeholder(tf.float32, shape=[None,1])

W = tf.Variable(tf.random_normal([8,1]))
b = tf.Variable(tf.random_normal([1]))

hypothesis = tf.sigmoid(tf.matmul(X,W)+b)
cost = -tf.reduce_mean(tf.reduce_sum(Y * tf.log(hypothesis) + (1-Y) * tf.log(1-hypothesis)))
optimizer = tf.train.GradientDescentOptimizer(learning_rate=0.01)
train = optimizer.minimize(cost)

predicted = tf.cast(hypothesis > 0.5, dtype=tf.float32)
accuracy = tf.reduce_mean(tf.cast(tf.equal(predicted,Y),dtype=tf.float32))

sess = tf.Session()
sess.run(tf.global_variables_initializer())
for step in range(2001):
    cost_val,hy_val,_ = sess.run([cost,hypothesis,train], feed_dict={X:x_train,Y:y_train})
    if step % 100 == 0:
        print(step,"|", cost_val,"|",hy_val)
print(sess.run(accuracy,feed_dict={X:x_test,Y:y_test}))
sess.close()
```

