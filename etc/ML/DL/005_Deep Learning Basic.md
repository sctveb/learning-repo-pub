# Deep Learning Basic

b

```python
import tensorflow as tf
import numpy as np

x_data = [[0,0],[0,1],[1,0],[1,1]]
y_data = [[0],[1],[1],[0]]

X = tf.placeholder(tf.float32,shape=[None,2])
Y = tf.placeholder(tf.float32,shape=[None,1])

W1 = tf.Variable(tf.random_normal([2,2]))
b1 = tf.Variable(tf.random_normal([2]))
layer1 = tf.sigmoid(tf.matmul(X,W1)+b1)

W2 = tf.Variable(tf.random_normal([2,1]))
b2 = tf.Variable(tf.random_normal([1]))
hypothesis = tf.sigmoid(tf.matmul(layer1,W2)+b2)

cost = -tf.reduce_mean(Y * tf.log(hypothesis) + (1-Y) * tf.log(1-hypothesis))
train = tf.train.GradientDescentOptimizer(learning_rate=0.1).minimize(cost)

predicted = tf.cast(hypothesis>0.5, dtype=tf.float32)
accuracy = tf.reduce_mean(tf.cast(tf.equal(predicted, Y),dtype=tf.float32))

#실행시키고 accuracy 코드 작성 ==> 100%
sess = tf.Session()
sess.run(tf.global_variables_initializer())
for step in range(50001):
    c,h,_ = sess.run([cost,hypothesis,train],feed_dict={X:x_data,Y:y_data})
    if step % 1000 == 0:
        print(step," | ",c)
print(sess.run(accuracy,feed_dict={X:x_data,Y:y_data}))
sess.close()
```

b

```python
import tensorflow as tf
import numpy as np

x_data = [[0,0],[0,1],[1,0],[1,1]]
y_data = [[0],[1],[1],[0]]

X = tf.placeholder(tf.float32,shape=[None,2])
Y = tf.placeholder(tf.float32,shape=[None,1])

W1 = tf.Variable(tf.random_normal([2,128]))
b1 = tf.Variable(tf.random_normal([128]))
layer1 = tf.sigmoid(tf.matmul(X,W1)+b1)

W2 = tf.Variable(tf.random_normal([128,1]))
b2 = tf.Variable(tf.random_normal([1]))
hypothesis = tf.sigmoid(tf.matmul(layer1,W2)+b2)

cost = -tf.reduce_mean(Y * tf.log(hypothesis) + (1-Y) * tf.log(1-hypothesis))
train = tf.train.GradientDescentOptimizer(learning_rate=0.1).minimize(cost)

predicted = tf.cast(hypothesis>0.5, dtype=tf.float32)
accuracy = tf.reduce_mean(tf.cast(tf.equal(predicted, Y),dtype=tf.float32))

#실행시키고 accuracy 코드 작성 ==> 100%
sess = tf.Session()
sess.run(tf.global_variables_initializer())
for step in range(50001):
    c,h,_ = sess.run([cost,hypothesis,train],feed_dict={X:x_data,Y:y_data})
    if step % 1000 == 0:
        print(step," | ",c)
print(sess.run(accuracy,feed_dict={X:x_data,Y:y_data}))
sess.close()
```

b

```python
import tensorflow as tf
import numpy as np

x_data = [[0,0],[0,1],[1,0],[1,1]]
y_data = [[0],[1],[1],[0]]

X = tf.placeholder(tf.float32,shape=[None,2])
Y = tf.placeholder(tf.float32,shape=[None,1])

W1 = tf.Variable(tf.random_normal([2,2]))
b1 = tf.Variable(tf.random_normal([2]))
layer1 = tf.sigmoid(tf.matmul(X,W1)+b1)

W2 = tf.Variable(tf.random_normal([2,2]))
b2 = tf.Variable(tf.random_normal([2]))
layer2 = tf.sigmoid(tf.matmul(layer1,W2)+b2)

W3 = tf.Variable(tf.random_normal([2,2]))
b3 = tf.Variable(tf.random_normal([2]))
layer3 = tf.sigmoid(tf.matmul(layer2,W3)+b3)

W4 = tf.Variable(tf.random_normal([2,2]))
b4 = tf.Variable(tf.random_normal([2]))
layer4 = tf.sigmoid(tf.matmul(layer3,W4)+b4)

W5 = tf.Variable(tf.random_normal([2,2]))
b5 = tf.Variable(tf.random_normal([2]))
layer5 = tf.sigmoid(tf.matmul(layer4,W5)+b5)

W6 = tf.Variable(tf.random_normal([2,2]))
b6 = tf.Variable(tf.random_normal([2]))
layer6 = tf.sigmoid(tf.matmul(layer5,W6)+b6)

W7 = tf.Variable(tf.random_normal([2,1]))
b7 = tf.Variable(tf.random_normal([1]))
hypothesis = tf.sigmoid(tf.matmul(layer6,W7)+b7)

cost = -tf.reduce_mean(Y * tf.log(hypothesis) + (1-Y) * tf.log(1-hypothesis))
train = tf.train.GradientDescentOptimizer(learning_rate=0.1).minimize(cost)

predicted = tf.cast(hypothesis>0.5, dtype=tf.float32)
accuracy = tf.reduce_mean(tf.cast(tf.equal(predicted, Y),dtype=tf.float32))

#실행시키고 accuracy 코드 작성 ==> 100%
sess = tf.Session()
sess.run(tf.global_variables_initializer())
for step in range(50001):
    c,h,_ = sess.run([cost,hypothesis,train],feed_dict={X:x_data,Y:y_data})
    if step % 1000 == 0:
        print(step," | ",c)
print(sess.run(accuracy,feed_dict={X:x_data,Y:y_data}))
sess.close()
```

aa

```python
import tensorflow as tf
import numpy as np


# In[2]:


training = np.loadtxt('iris_training.csv', delimiter=",",dtype=np.float32)
test = np.loadtxt('iris_test.csv', delimiter=",",dtype=np.float32)


# In[3]:


x_train = training[:,:-1]
y_train = training[:,[-1]]
x_test = test[:,:-1]
y_test = test[:,[-1]]


# In[4]:


y_train.shape


# In[5]:


X = tf.placeholder(tf.float32,shape=[None,4])
Y = tf.placeholder(tf.int32,shape=[None,1])
keep_prob = tf.placeholder(tf.float32)

Y_one_hot = tf.one_hot(Y,3)
Y_one_hot = tf.reshape(Y_one_hot,[-1,3])

W1 = tf.get_variable("W1", shape=[4,128], initializer=tf.contrib.layers.xavier_initializer())
#W1 = tf.Variable(tf.random_normal([4,128]))
b1 = tf.Variable(tf.random_normal([128]))
layer1 = tf.nn.relu(tf.matmul(X,W1)+b1)
layer1 = tf.nn.dropout(layer1,keep_prob = keep_prob)

W2 = tf.get_variable("W2", shape=[128,128], initializer=tf.contrib.layers.xavier_initializer())
#W2 = tf.Variable(tf.random_normal([128,128]))
b2 = tf.Variable(tf.random_normal([128]))
layer2 = tf.nn.relu(tf.matmul(layer1,W2)+b2)
layer2 = tf.nn.dropout(layer2,keep_prob = keep_prob)

W3 = tf.get_variable("W3", shape=[128,128], initializer=tf.contrib.layers.xavier_initializer())
#W3 = tf.Variable(tf.random_normal([128,128]))
b3 = tf.Variable(tf.random_normal([128]))
layer3 = tf.nn.relu(tf.matmul(layer2,W3)+b3)
layer3 = tf.nn.dropout(layer3,keep_prob = keep_prob)

W4 = tf.get_variable("W4", shape=[128,3], initializer=tf.contrib.layers.xavier_initializer())
#W4 = tf.Variable(tf.random_normal([128,3]))
b4 = tf.Variable(tf.random_normal([3]))

logits = tf.matmul(layer3,W4)+b4
hypothesis = tf.nn.softmax(logits)
cost = tf.reduce_mean(tf.nn.softmax_cross_entropy_with_logits(logits=logits,labels=Y_one_hot))
optimizer = tf.train.AdamOptimizer(learning_rate=0.001).minimize(cost)

prediction = tf.argmax(hypothesis,1)
correct_prediction = tf.equal(prediction,tf.argmax(Y_one_hot,1))
accuracy = tf.reduce_mean(tf.cast(correct_prediction, tf.float32))


# In[6]:


sess = tf.Session()
sess.run(tf.global_variables_initializer())


# In[7]:


for step in range(20001):
    cost_val,_ = sess.run([cost,optimizer], feed_dict={X:x_train,Y:y_train,keep_prob:0.7})
    if step % 1000 == 0:
        print(step,"|", cost_val)
print(sess.run(accuracy,feed_dict={X:x_test,Y:y_test,keep_prob:1}))


# In[1]:


import tensorflow as tf
import numpy as np
import random
import matplotlib.pyplot as plt
from tensorflow.examples.tutorials.mnist import input_data
mnist = input_data.read_data_sets('MNIST_data/',one_hot=True)

X = tf.placeholder(tf.float32,shape=[None,784])
Y = tf.placeholder(tf.float32,shape=[None,10])
keep_prob = tf.placeholder(tf.float32)


W1 = tf.get_variable("W1", shape=[784,1024], initializer=tf.contrib.layers.xavier_initializer())
b1 = tf.Variable(tf.random_normal([1024]))
layer1 = tf.nn.relu(tf.matmul(X,W1) + b1)
layer1 = tf.nn.dropout(layer1,keep_prob = keep_prob)


W2 = tf.get_variable("W2", shape=[1024,1024], initializer=tf.contrib.layers.xavier_initializer())
b2 = tf.Variable(tf.random_normal([1024]))
layer2 = tf.nn.relu(tf.matmul(layer1,W2) + b2)
layer2 = tf.nn.dropout(layer2,keep_prob = keep_prob)


W3 = tf.get_variable("W3", shape=[1024, 10], initializer=tf.contrib.layers.xavier_initializer())
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
        c,_ = sess.run([cost,optimizer], feed_dict={X:batch_xs, Y:batch_ys, keep_prob:0.7})
        avg_cost += c/total_batch
    print("epoch : ",epoch + 1,"| avg_cost : ",avg_cost)
print("Accuracy: ", sess.run(accuracy, feed_dict={X: mnist.test.images, Y: mnist.test.labels, keep_prob:1}))

r = random.randint(0, mnist.test.num_examples - 1)
print("Label : ", sess.run(tf.argmax(mnist.test.labels[r:r+1],1)))
print("Prediction: ", sess.run(tf.argmax(hypothesis,1),feed_dict = {X:mnist.test.images[r:r+1],keep_prob:1}))
plt.imshow(
    mnist.test.images[r:r+1].reshape(28,28),
    cmap="Greys",
    interpolation="nearest")


# In[8]:


import numpy as np
import tensorflow as tf
import matplotlib.pyplot as plt


# In[9]:


image = np.array([[[[1],[2],[3]],
                  [[4],[5],[6]],
                  [[7],[8],[9]]]], dtype=np.float32)


# In[10]:


sess = tf.InteractiveSession()


# In[12]:


print(image.shape)
plt.imshow(image.reshape(3,3), cmap="Greys")
# image : 갯수, 가로, 세로, 높이


# In[19]:


weight = tf.constant([[[[1.]],[[1.]]],
                     [[[1.]],[[1.]]]])
print(weight.shape)
# filter : 가로, 세로, 높이, 갯수
conv2d = tf.nn.conv2d(image,weight,strides=[1,1,1,1], padding="VALID")
conv2d_img = conv2d.eval()
print(conv2d_img.shape)
# image : 갯수, 가로, 세로, 높이


# In[16]:


conv2d_img = np.swapaxes(conv2d_img, 0,3)
for i, one_img in enumerate(conv2d_img):
    print(one_img.reshape(2,2))
    plt.subplot(1,2,i+1), plt.imshow(one_img.reshape(2,2), cmap="Greys")


# In[20]:


weight = tf.constant([[[[1.]],[[1.]]],
                     [[[1.]],[[1.]]]])
print(weight.shape)
# filter : 가로, 세로, 높이, 갯수
conv2d = tf.nn.conv2d(image,weight,strides=[1,1,1,1], padding="SAME")
conv2d_img = conv2d.eval()
print(conv2d_img.shape)
# image : 갯수, 가로, 세로, 높이


# In[21]:


conv2d_img = np.swapaxes(conv2d_img, 0,3)
for i, one_img in enumerate(conv2d_img):
    print(one_img.reshape(3,3))
    plt.subplot(1,2,i+1), plt.imshow(one_img.reshape(3,3), cmap="Greys")


# In[36]:


weight = tf.constant([[[[1.,10.,-1.]],[[1.,10.,-1.]]],
                     [[[1.,10.,-1.]],[[1.,10.,-1.]]]])
print(weight.shape)
# filter : 가로, 세로, 높이, 갯수
conv2d = tf.nn.conv2d(image,weight,strides=[1,1,1,1], padding="SAME")
conv2d_img = conv2d.eval()
print(conv2d_img.shape)
# image : 갯수, 가로, 세로, 높이


# In[37]:


conv2d_img = np.swapaxes(conv2d_img, 0,3)
for i, one_img in enumerate(conv2d_img):
    print(one_img.reshape(3,3))
    plt.subplot(1,3,i+1), plt.imshow(one_img.reshape(3,3), cmap="Greys")


# In[38]:


image = np.array([[[[4],[3]],
                   [[2],[1]]]], dtype=np.float32)
pool = tf.nn.max_pool(image,ksize=[1,2,2,1], strides=[1,1,1,1], padding="VALID")
print(pool.shape)
print(pool.eval())


# In[1]:


import tensorflow as tf
import numpy as np
import random
import matplotlib.pyplot as plt
from tensorflow.examples.tutorials.mnist import input_data
mnist = input_data.read_data_sets('MNIST_data/',one_hot=True)


# In[2]:


X = tf.placeholder(tf.float32,shape=[None,784])
Y = tf.placeholder(tf.float32,shape=[None,10])

X_img = tf.reshape(X,[-1,28,28,1])

W1 = tf.Variable(tf.random_normal([3,3,1,32], stddev=0.01))
L1 = tf.nn.conv2d(X_img,W1,strides=[1,1,1,1], padding="SAME")
# L1 = -1 * 28 * 28 & 32
L1 = tf.nn.relu(L1)
L1 = tf.nn.max_pool(L1, ksize=[1,2,2,1], strides=[1,2,2,1], padding="SAME")
# L1 = -1 * 14 * 14 * 32

W2 = W1 = tf.Variable(tf.random_normal([3,3,32,64], stddev=0.01))
L2 = tf.nn.conv2d(L1,W2,strides=[1,1,1,1], padding="SAME")
# L2 = -1 * 14 * 14 * 64
L2 = tf.nn.relu(L2)
L2 = tf.nn.max_pool(L2, ksize=[1,2,2,1], strides=[1,2,2,1], padding="SAME")
# L2 = -1 * 7 * 7 * 64

L2_flat = tf.reshape(L2,[-1,7*7*64])
W = tf.get_variable("W", shape=[7*7*64,10], initializer=tf.contrib.layers.xavier_initializer())
b = tf.Variable(tf.random_normal([10]))


# In[3]:


logits = tf.matmul(L2_flat,W) + b
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


# In[3]:


X = tf.placeholder(tf.float32,shape=[None,784])
Y = tf.placeholder(tf.float32,shape=[None,10])
keep_prob = tf.placeholder(tf.float32)
X_img = tf.reshape(X,[-1,28,28,1])

W1 = tf.Variable(tf.random_normal([3,3,1,32], stddev=0.01))
L1 = tf.nn.conv2d(X_img,W1,strides=[1,1,1,1], padding="SAME")
# L1 = -1 * 28 * 28 & 32
L1 = tf.nn.relu(L1)
L1 = tf.nn.max_pool(L1, ksize=[1,2,2,1], strides=[1,2,2,1], padding="SAME")
# L1 = -1 * 14 * 14 * 32
L1 = tf.nn.dropout(L1,keep_prob = keep_prob)

W2 = tf.Variable(tf.random_normal([3,3,32,64], stddev=0.01))
L2 = tf.nn.conv2d(L1,W2,strides=[1,1,1,1], padding="SAME")
# L2 = -1 * 14 * 14 * 64
L2 = tf.nn.relu(L2)
L2 = tf.nn.max_pool(L2, ksize=[1,2,2,1], strides=[1,2,2,1], padding="SAME")
# L2 = -1 * 7 * 7 * 64
L2 = tf.nn.dropout(L2,keep_prob = keep_prob)

W3 = tf.Variable(tf.random_normal([3,3,64,128], stddev=0.01))
L3 = tf.nn.conv2d(L2,W3,strides=[1,1,1,1], padding="SAME")
# L2 = -1 * 7* 7 * 128
L3 = tf.nn.relu(L3)
L3 = tf.nn.max_pool(L3, ksize=[1,2,2,1], strides=[1,1,1,1], padding="SAME")
# L2 = -1 * 7 * 7 * 128
L3 = tf.nn.dropout(L3,keep_prob = keep_prob)

L3_flat = tf.reshape(L3,[-1,7*7*128])
W = tf.get_variable("W", shape=[7*7*128,10], initializer=tf.contrib.layers.xavier_initializer())
b = tf.Variable(tf.random_normal([10]))


# In[5]:


logits = tf.matmul(L3_flat,W) + b
hypothesis = tf.nn.softmax(logits)
keep_prob = tf.placeholder(tf.float32)


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
        c,_ = sess.run([cost,optimizer], feed_dict={X:batch_xs, Y:batch_ys, keep_prob: 0.3})
        avg_cost += c/total_batch
    print("epoch : ",epoch + 1,"| avg_cost : ",avg_cost)
print("Accuracy: ", sess.run(accuracy, feed_dict={X: mnist.test.images, Y: mnist.test.labels, keep_prob: 1}))

r = random.randint(0, mnist.test.num_examples - 1)
print("Label : ", sess.run(tf.argmax(mnist.test.labels[r:r+1],1)))
print("Prediction: ", sess.run(tf.argmax(hypothesis,1),feed_dict = {X:mnist.test.images[r:r+1],keep_prob: 1}))
plt.imshow(
    mnist.test.images[r:r+1].reshape(28,28),
    cmap="Greys",
    interpolation="nearest")

```

