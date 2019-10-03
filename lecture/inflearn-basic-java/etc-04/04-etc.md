# 자바 프로그래밍 입문 - 04

## ETC

### 예외처리

예외 : 프로그램에 문제가 있음을 말함, 예외로 인한 시스템 중단을 막는 것을 예외처리

Checked Expection : 예외처리를 반드시 해야하는 경우(network, fs 등)

Unchecked Expection: 예외처리를 개발자의 판단에 맡기는 경우(데이터 오류 등)



Exception 클래스 : 하위 클래스로 다양한 예외처리 상황을 담고 있다.

ex) `NullPointerException` 객체를 가리키지 않고 있는 레퍼런스를 이용할 때

`ArrayIndexOutOfBoundException` 배열에서 존재하지 않는 인덱스를 가리킬 때

`NumberFormatException` 숫자데이터에 문자데이터등을 넣었을 때



```java
try {
    // 예외를 발생할 수 있는 코드
} catch(Exception e	) {
    // 예외가 발생했을 때 처리할 코드
}
```

1. 복수의 `catch`를 사용가능
2. finally : try catch 문이 끝나면 반드시 실행
3. throws : 예외 발생시 예외 처리를 직접 하지 않고 호출한 곳으로 넘김



### 입력과 출력

입출력 : 다른 곳의 데이터를 가져오거나 내보내는 것

입출력 기본 클래스 : 1byte 단위로 데이터를 전송하는 InputStream, OutputStream이 있음

FileInputStream / FileOutputStream

`read()` 1byte씩 읽고

`read(byte[])` [] 크기만큼 읽고

`write(byte[] b)` : 전체 쓰기

`write(byte[], int off, int len)` : off(시작점), len(길이)



DataInputStream / DataOutputStream : byte 단위로 입출력을 개선해서 문자열을 좀 더 편리하게 다룸

BufferedReader, BufferedWriter : byte 단위로 입출력을 개선해서 문자열을 좀 더 편리하게 다룸 (문자열 단위)



### 네트워킹

소켓 : 네트워크 상에서 데이터를 주고 받기 위한 장치

Socket 클래스 : 서버는 클라이언트를 맞을 준비를 하다가 클라이언트의 요청에 반응

Client와 Server 소켓 : 서버에서 ServerSocket을 준비하고 클라이언트에서 Socket을 이용해 접속

양방향 통신 : 클라이언트와 서버는 InputStream, OutputStream을 이용해 양방향 통신이 가능

