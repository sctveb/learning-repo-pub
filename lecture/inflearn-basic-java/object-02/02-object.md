# 자바 프로그래밍 입문 - 02

## 객체 지향 프로그래밍

객체 :  프로그래밍에서 속성과 기능을 가지는 프로그램 단위

클래스 : 

- 객체를 생성하기 위한 틀로 모든 객체는 클래스로부터 생성
- 속성(맴버 변수)와 기능(메서드)로 구성



#### 클래스 제작과 객체 생성

클래스 제작

```java
public class Car {
    // 맴버 변수
    public String color;
    public String gear;
    public int price;
    // 생성자 : 객체를 생성할 때 가장 먼저 호출
    public Car() {
        System.out.println("constructor");
    }
    // 메서드
    public void run() {
        System.out.println("--run--");
    }
    public void stop() {
        System.out.println("--stop--");
    }
    public void info() {
    	System.out.println("--info--");
        System.out.println(color);
        System.out.println(gear);
        System.out.println(price);
    }
}
```

객체 생성

```java
Car myCar1 = new Car();
myCar1.color = "red";
myCar1.gear = "auto";
myCar1.price = 3000000;

myCar1.run();
myCar1.stop();
myCar1.info();
```



#### 메서드

매서드 선언과 호출

```java
public void getInfo() {
    System.out.println(i);
    System.out.println(b);
    System.out.println(d);
    System.out.println(c);
    System.out.println(s);
}

ChildClass childClass = new ChildClass();
ChildClass.getInfo();
```



매개변수 : 메서드에서 필요로 하는 경우 받는 값(변수)

중복 메서드(overloading) : 이름은 같고, 매개변수의 개수나 타입이 다른 메서드를 만들 수 있음

접근자 :  메서드를 호출할 때 접근자에 따라서 호출이 불가할 수 있다

| 접근자명 | 설명                                 |
| -------- | ------------------------------------ |
| public   | 외부에서 호출할 수 있음              |
| private  | 정의된 class 외부에서 호출할 수 없음 |



#### 객체와 메모리

메모리에서 객체 생성(동적 생성) : 객체는 메모리에서 동적으로 생성되며 더이상 필요 없게 되면 Gabage Collector에 의해 제거됨

레퍼런스 : 생성된 객체의 주소를 변수에 저장하는 것을 레퍼런스라고 함

자료형이 같아도 다른 객체 : 같은 자료형이라고 해도 다른 공간에 존재하는 객체는 다른 객체

null과 NullPointException : 레퍼런스에 null이 저장되면 객체의 연결이 끊기며 더 이상 객체를 이용할 수 없다



#### 생성자와 소멸자 그리고 this 키워드

디폴트 생성자 : 객체가 생성될 때 가장 먼저 호출되는 생성자, 개발자가 명시하지 않아도  컴파일 시점에 자동 생성

사용자 정의 생성자 : 디폴트 생성자 외의 특정 목적에 의해 개발자가 만든 생성자로 매개변수에 차이가 있다

소멸자 : 객체가 GC에 의해 메모리에서 제거될 때 finalize() 메서드가 호출된다

System.gc() : GC가 작동되도록 요구하는 명령어(바로 실행되진 않음)

this 키워드 :  동일한 변수명에 다른 스코프를 가진 변수를 구분하기 위한 명령어



#### 패키지와 static

패키지 : Java 프로그램은 많은 클래스로 구성되고 이를 폴더 형식으로 관리하는 것을 패키지라고 함

import : `import 패키지명.클래스명`를 통해 원하는 클래스 가져다 쓰기

static : 클래스의 속성과 메서드에 static 키워드를 이용하면 어디서나 속성과 메서드를 공유할 수 있다



#### 데이터 은닉

맴버변수와 private 설정 : 맴버 변수(속성)은 주로 private로 시작해서, 외부로부터 데이터가 변질되는 것을 막음

setter와 getter : private 설정한 맴버변수로 접근하기 위해 만드는 메서드

