# Multi Class Classification

1

```python
import tensorflow as tf
import numpy as np

x_data = [[1,2,1,1],
          [2,1,3,2],
         [3,1,3,4],
         [4,1,5,5],
         [1,7,5,5],
         [1,2,5,6]]
y_data = [[0,0,1],
         [0,1,0],
         [1,0,0],
         [0,0,1],
         [0,1,0],
         [1,0,0]]

X = tf.placeholder(tf.float32,shape=[None,4])
Y = tf.placeholder(tf.float32,shape=[None,3])
W = tf.Variable(tf.random_normal([4,3]))
b = tf.Variable(tf.random_normal([3]))

hypothesis = tf.nn.softmax(tf.matmul(X,W)+b)
cost = -tf.reduce_mean(tf.reduce_sum(Y * tf.log(hypothesis),axis=1))
optimizer = tf.train.GradientDescentOptimizer(learning_rate=1e-5)
train = optimizer.minimize(cost)

sess = tf.Session()
sess.run(tf.global_variables_initializer())
for step in range(2001):
    cost_val,hy_val,_ = sess.run([cost,hypothesis,train], feed_dict={X:x_data,Y:y_data})
    if step % 100 == 0:
        print(step,"|", cost_val,"|",hy_val)
        
result = sess.run(hypothesis, feed_dict={X:[[1,2,1,1]]})
print(result)
print(sess.run(tf.argmax(result, axis=1)))
```

2

```python
import tensorflow as tf
import numpy as np

xy = np.loadtxt('zoo.csv', delimiter=",",dtype=np.float32)
x_train = xy[:71,:-1]
y_train = xy[:71,[-1]]
x_test = xy[71:,:-1]
y_test = xy[71:,[-1]]


X = tf.placeholder(tf.float32, shape=[None,16])
Y = tf.placeholder(tf.int32, shape=[None,1])
Y_one_hot = tf.one_hot(Y,7)
Y_one_hot = tf.reshape(Y_one_hot,[-1,7])

W = tf.Variable(tf.random_normal([16,7]))
b = tf.Variable(tf.random_normal([7]))

logits = tf.matmul(X,W)+b
hypothesis = tf.nn.softmax(logits)
cost = tf.reduce_mean(tf.nn.softmax_cross_entropy_with_logits(logits=logits,labels=Y_one_hot))
optimizer = tf.train.GradientDescentOptimizer(learning_rate=0.1).minimize(cost)

prediction = tf.argmax(hypothesis,1)
correct_prediction = tf.equal(prediction,tf.argmax(Y_,1))
accuracy = tf.reduce_mean(tf.cast(correct_prediction, tf.float32))

sess = tf.Session()
sess.run(tf.global_variables_initializer())
for step in range(20001):
    cost_val,_ = sess.run([cost,optimizer], feed_dict={X:x_train,Y:y_train})
    if step % 100 == 0:
        print(step,"|", cost_val)
print(sess.run(accuracy,feed_dict={X:x_test,Y:y_test}))
sess.close()
```

3

```python
import tensorflow as tf
import numpy as np
from tensorflow.examples.tutorials.mnist import input_data
mnist = input_data.read_data_sets('MNIST_data/',one_hot=True) 

X = tf.placeholder(tf.float32,[None, 784])
Y = tf.placeholder(tf.float32,[None, 10])
W = tf.Variable(tf.random_normal([784, 10]))
b = tf.Variable(tf.random_normal([10]))

hypothesis = tf.nn.softmax(tf.matmul(X,W) + b)
cost = tf.reduce_mean(-tf.reduce_sum(Y * tf.log(hypothesis), axis = 1))
optimizer = tf.train.GradientDescentOptimizer(learning_rate = 0.1).minimize(cost)

is_correct = tf.equal(tf.argmax(hypothesis, 1),tf.argmax(Y, 1))
accuracy = tf.reduce_mean(tf.cast(is_correct, tf.float32))

sess = tf.Session()
sess.run(tf.global_variables_initializer())
for step in range(2001):
    c, _ = sess.run([cost,optimizer], feed_dict = {X: mnist.train.images, Y: mnist.train.labels})        
    if step % 100 == 0:
        print(step,c)
            
print("Accuracy: ", accuracy.eval(session=sess, feed_dict={X: mnist.test.images, Y: mnist.test.labels}))
sess.close()
```

4

```python
import tensorflow as tf
import numpy as np
import random
from tensorflow.examples.tutorials.mnist import input_data
import matplotlib.pyplot as plot 
mnist = input_data.read_data_sets('MNIST_data/',one_hot=True) 

X = tf.placeholder(tf.float32,[None, 784])
Y = tf.placeholder(tf.float32,[None, 10])
W = tf.Variable(tf.random_normal([784, 10]))
b = tf.Variable(tf.random_normal([10]))

hypothesis = tf.nn.softmax(tf.matmul(X,W) + b)
cost = tf.reduce_mean(-tf.reduce_sum(Y * tf.log(hypothesis), axis = 1))
optimizer = tf.train.GradientDescentOptimizer(learning_rate = 0.1).minimize(cost)

is_correct = tf.equal(tf.argmax(hypothesis, 1),tf.argmax(Y, 1))
accuracy = tf.reduce_mean(tf.cast(is_correct, tf.float32))

sess = tf.Session()
sess.run(tf.global_variables_initializer())
training_epoch = 15
batch_size = 100

for epoch in range(training_epoch):
    total_batch = int(mnist.train.num_examples/batch_size)
    avg_cost = 0
    for i in range(total_batch):
        batch_xs, batch_ys = mnist.train.next_batch(batch_size)
        c,_ = sess.run([cost,optimizer], feed_dict={X:batch_xs, Y:batch_ys})
        avg_cost += c/total_batch
    print("epoch : ",epoch + 1,"| avg_cost : ",avg_cost)
print("Accuracy: ", sess.run(accuracy, feed_dict={X: mnist.test.images, Y: mnist.test.labels}))

r = random.randint(0, mnist.test.num_examples - 1)
print("Label : ", sess.run(tf.argmax(mnist.test.labels[r:r+1],1)))
print("Prediction: ", sess.run(tf.argmax(hypothesis,1),feed_dict = {X:mnist.test.images[r:r+1]}))
plot.imshow(
    mnist.test.images[r:r+1].reshape(28,28),
    cmap="Greys",
    interpolation="nearest")
sess.close()
```


a

```python
import tensorflow as tf
import numpy as np
import random
import matplotlib.pyplot as plt
from tensorflow.examples.tutorials.mnist import input_data
mnist = input_data.read_data_sets('MNIST_data/',one_hot=True)

X = tf.placeholder(tf.float32,shape=[None,784])
Y = tf.placeholder(tf.float32,shape=[None,10])

W1 = tf.Variable(tf.random_normal([784,1024]))
b1 = tf.Variable(tf.random_normal([1024]))
layer1 = tf.sigmoid(tf.matmul(X,W1) + b1)

W2 = tf.Variable(tf.random_normal([1024,1024]))
b2 = tf.Variable(tf.random_normal([1024]))
layer2 = tf.sigmoid(tf.matmul(layer1,W2) + b2)

W3 = tf.Variable(tf.random_normal([1024, 10]))
b3 = tf.Variable(tf.random_normal([10]))
logits = tf.matmul(layer2,W3) + b3
hypothesis = tf.nn.softmax(logits)

cost = tf.reduce_mean(tf.nn.softmax_cross_entropy_with_logits(logits=logits, labels=Y))
optimizer = tf.train.GradientDescentOptimizer(learning_rate = 0.001).minimize(cost)

is_correct = tf.equal(tf.argmax(hypothesis, 1),tf.argmax(Y, 1))
accuracy = tf.reduce_mean(tf.cast(is_correct, tf.float32))

#learning_rate = 0.001
sess = tf.Session()
sess.run(tf.global_variables_initializer())
training_epoch = 15
batch_size = 100

for epoch in range(training_epoch):
    total_batch = int(mnist.train.num_examples/batch_size)
    avg_cost = 0
    for i in range(total_batch):
        batch_xs, batch_ys = mnist.train.next_batch(batch_size)
        c,_ = sess.run([cost,optimizer], feed_dict={X:batch_xs, Y:batch_ys})
        avg_cost += c/total_batch
    print("epoch : ",epoch + 1,"| avg_cost : ",avg_cost)
print("Accuracy: ", sess.run(accuracy, feed_dict={X: mnist.test.images, Y: mnist.test.labels}))

r = random.randint(0, mnist.test.num_examples - 1)
print("Label : ", sess.run(tf.argmax(mnist.test.labels[r:r+1],1)))
print("Prediction: ", sess.run(tf.argmax(hypothesis,1),feed_dict = {X:mnist.test.images[r:r+1]}))
plt.imshow(
    mnist.test.images[r:r+1].reshape(28,28),
    cmap="Greys",
    interpolation="nearest")
```

a

```python
import tensorflow as tf
import numpy as np
import random
import matplotlib.pyplot as plt
from tensorflow.examples.tutorials.mnist import input_data
mnist = input_data.read_data_sets('MNIST_data/',one_hot=True)

X = tf.placeholder(tf.float32,shape=[None,784])
Y = tf.placeholder(tf.float32,shape=[None,10])

W1 = tf.Variable(tf.random_normal([784,1024]))
b1 = tf.Variable(tf.random_normal([1024]))
layer1 = tf.nn.relu(tf.matmul(X,W1) + b1)

W2 = tf.Variable(tf.random_normal([1024,1024]))
b2 = tf.Variable(tf.random_normal([1024]))
layer2 = tf.nn.relu(tf.matmul(layer1,W2) + b2)

W3 = tf.Variable(tf.random_normal([1024, 10]))
b3 = tf.Variable(tf.random_normal([10]))
logits = tf.matmul(layer2,W3) + b3
hypothesis = tf.nn.softmax(logits)

cost = tf.reduce_mean(tf.nn.softmax_cross_entropy_with_logits(logits=logits, labels=Y))
optimizer = tf.train.AdamOptimizer(learning_rate = 0.001).minimize(cost)

is_correct = tf.equal(tf.argmax(hypothesis, 1),tf.argmax(Y, 1))
accuracy = tf.reduce_mean(tf.cast(is_correct, tf.float32))

#learning_rate = 0.001
sess = tf.Session()
sess.run(tf.global_variables_initializer())
training_epoch = 15
batch_size = 100

for epoch in range(training_epoch):
    total_batch = int(mnist.train.num_examples/batch_size)
    avg_cost = 0
    for i in range(total_batch):
        batch_xs, batch_ys = mnist.train.next_batch(batch_size)
        c,_ = sess.run([cost,optimizer], feed_dict={X:batch_xs, Y:batch_ys})
        avg_cost += c/total_batch
    print("epoch : ",epoch + 1,"| avg_cost : ",avg_cost)
print("Accuracy: ", sess.run(accuracy, feed_dict={X: mnist.test.images, Y: mnist.test.labels}))

r = random.randint(0, mnist.test.num_examples - 1)
print("Label : ", sess.run(tf.argmax(mnist.test.labels[r:r+1],1)))
print("Prediction: ", sess.run(tf.argmax(hypothesis,1),feed_dict = {X:mnist.test.images[r:r+1]}))
plt.imshow(
    mnist.test.images[r:r+1].reshape(28,28),
    cmap="Greys",
    interpolation="nearest")
```

a

```python
import tensorflow as tf
import numpy as np

xy = np.loadtxt('zoo.csv', delimiter=",",dtype=np.float32)

x_train = xy[:71,:-1]
y_train = xy[:71,[-1]]
x_test = xy[71:,:-1]
y_test = xy[71:,[-1]]


X = tf.placeholder(tf.float32, shape=[None,16])
Y = tf.placeholder(tf.int32, shape=[None,1])
Y_one_hot = tf.one_hot(Y,7)
Y_one_hot = tf.reshape(Y_one_hot,[-1,7])

W1 = tf.Variable(tf.random_normal([16,128]))
b1 = tf.Variable(tf.random_normal([128]))
layer1 = tf.nn.relu(tf.matmul(X,W1) + b1)

W2 = tf.Variable(tf.random_normal([128,128]))
b2 = tf.Variable(tf.random_normal([128]))
layer2 = tf.nn.relu(tf.matmul(layer1,W2) + b2)

W3 = tf.Variable(tf.random_normal([128, 128]))
b3 = tf.Variable(tf.random_normal([128]))
layer3 = tf.nn.relu(tf.matmul(layer2,W3) + b3)

W4 = tf.Variable(tf.random_normal([128, 7]))
b4 = tf.Variable(tf.random_normal([7]))

logits = tf.matmul(layer3,W4) + b4
hypothesis = tf.nn.softmax(logits)
cost = tf.reduce_mean(tf.nn.softmax_cross_entropy_with_logits(logits=logits,labels=Y_one_hot))
optimizer = tf.train.AdamOptimizer(learning_rate=0.01).minimize(cost)

prediction = tf.argmax(hypothesis,1)
correct_prediction = tf.equal(prediction,tf.argmax(Y_one_hot,1))
accuracy = tf.reduce_mean(tf.cast(correct_prediction, tf.float32))

sess = tf.Session()
sess.run(tf.global_variables_initializer())
for step in range(20001):
    cost_val,_ = sess.run([cost,optimizer], feed_dict={X:x_train,Y:y_train})
    if step % 5000 == 0:
        print(step,"|", cost_val)
        
print(sess.run(accuracy,feed_dict={X:x_test,Y:y_test}))
sess.close()
```

