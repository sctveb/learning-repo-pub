# RNN

Recurrent Neural Network

일방향이 아닌 Output을 Input으로 활용하는 구조 - Sequence data를 처리하는데 좋음

하나의 Cell(구조)에서 3개의 W를 학습함

ht = fw(ht-1 - xt) = 입력값 x를 이전 state인 h를 적용하여 다음 state를 계산

ht = tanh(Whh * ht-1 + Wxh * xt)

yt = Why * ht





http://colah.github.io/





LSTM,GRU



# GAN

Generative Adversarial Nets  = Generative vs Adversarial

위조범(Generator) vs 경찰(Discriminator)의 경쟁으로 구별할 확률을 0.5에 수렴하도록 하는 것

실제 데이터분포와 매우 유사한 분포를 generate