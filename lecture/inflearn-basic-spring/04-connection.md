# 자바 스프링 프레임워크 - 04

### 세션, 쿠키

세션과 쿠키 : 

- HTTP 프로토콜은 Connectionless Protocol(클라이언트와 서버의 관계를 유지하지 않음)
- 로그인 상태 유지, 장바구니 등의 기능을 구현하기 어려운 문제점 발생
- 세션은 서버에 연결 정보를 관리하고 쿠키는 클라이언트에 연결 정보를 관리



HttpServeltRequest를 이용한 세션 이용 : 스프링 MVC에서 HttpServletRequest를 이용해서 세션을 이용하려면 컨트롤러의 메소드에서 파라미터로 HttpServeltRequest를 받으면 됨

```java
@RequstMapping(value = "/login", method = RequestMethod.POST)
public String memLogin(Member member, HttpServletRequest request) {
    Member mem = service.memberSearch(member);
    HttpSession session = request.getSession();
    session.setAttribute("member", mem);
    return "/member/loginOk";
}
```



HttpSession을 이용한 세션 이용 : HttpServletRequest와 거의 차이는 없지만 객체 얻는 법이 다름

- HttpServletRequest : 파라미터로 HttpServeltRequst를 받고 getSession()으로 세션 얻음
- HttpSession : 파라미터로 HttpSession을 받아서 세션 사용



세션 삭제 :  세션에 저장된 속성이 더 이상 필요없을 경우, `session.invalidate();`



세션 주요 메소드 및 플로어

| 세션 메소드              | 기능                           |
| ------------------------ | ------------------------------ |
| getId()                  | 세션 ID를 반환                 |
| setAttribute()           | 세션 객체에 속성을 저장        |
| getAttribute()           | 세션 객체에 저장된 속성을 반환 |
| removeAttribute()        | 세션 객체에 저장된 속성을 제거 |
| setMaxInactiveInterval() | 세션 객체의 유지시간을 설정    |
| getMaxInactiveInterval() | 세션 객체의 유지시간을 반환    |
| invalidate()             | 세션 객체의 모든 정보를 삭제   |



쿠키

- 메소드에서 쿠키를 생성하고, 파라미터로 받은 HttpServletResponse에 쿠키를 담음
- 쿠키 생성시 생성자에 쿠키이름, 쿠키값 순으로 파라미터 넣어줌

```java
// 쿠키 생성
@RequestMapping("/main")
public string mallMain(Mall mall, HttpServletResponse response) {
    
    Cookie genderCookie = new Cookie("gender", mall.getGender());
    
    if(mall.isCookieDel()) {
        genderCookie.setMaxAge(0);
        mall.setGender(null);
    } else {
        genderCookie.setMaxAge(60*60*24*30);
    }
    
    response.addCookie(genderCookie);
    
    return "/mall/main";
}


// 어노테이션을 통한 쿠키 사용
@RequestMapping("/index")
public String mallIndex(Mall mall, @CookieValue(value="gender", required=false) Cookie genderCookie, HttpServletRequest request) {
    
    if (genderCookie != null) {
        mall.setGender(genderCookie.getValue());
    }
    
    return "/mall/index";
}
```



### 리다이렉트, 인터셉트

리다이렉트 : 지금의 페이지에서 특정 페이지로 전환하는 기능

```java
return "redirect:/";
```



인터셉트 : 리다이렉트를 사용해야 하는 경우가 많은 경우, HanlderInterceptor를 이용함

| HandlerInterCepter | 설명                                         |
| ------------------ | -------------------------------------------- |
| preHandle()        | 컨트롤러 작업 전 가로채기                    |
| postHandle()       | 컨트롤러 작업 후 가로채기                    |
| afterCompletion()  | 컨트롤러와 View 작업이 모두 끝난 후 가로채기 |

```java
public class MemberLoginInterceptor extends HandlerInterceptorAdapter {
    @Override
    public boolean prehandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        
        HttpSession session = request.getSession(false);
        if(session != null) {
            Object obj = session.getAttribute("member");
            if(obj != null) return true;
        }
        response.sendRedirect(request.getContextPath() + '/');
        return false;
    }
}
```

```xml
<interceptors>
    <interceptor>
        <mapping path="/member/modifyForm" />
        <mapping path="/member/removeForm" />
        <beans:bean class="com.bs.lec21.member.MemberLoginInterceptor" />    </interceptor>
</interceptors>
```





### Database

JSP 강좌에 동일내용 존재

```sql
CREATE USER c##scott IDENTIFIED BY tiger;
GRANT CONNECT, RESOURCE TO c##scott;
DROP USER c##scott CASCADE;

--------------------- 추가 확인 요망
ALTER USER c##scott default tablespace users quota unlimited on users;
```



### JDBC

기본 SQL

```sql
CREATE TABLE member (
memId VARCHAR2(10) CONSTRAINT memId_pk PRIMARY KEY,
memPw VARCHAR2(10),
memMail VARCHAR2(15),
memPurcNum NUMBER(3) DEFAULT 0 CONSTRAINT memPurNum_pk CHECK (memPurcNum < 3)
);

INSERT INTO member (memId, memPw, memMail) values ('b','bb','bbb@gmail.com');

DELETE FROM member WHERE memId = 'b';

SELECT * FROM member;

DROP TABLE member;
```



JDBC

```java
private String driver = "oracle.jdbc.driver.OracleDriver";
private String url = "jdbc:oracle:thin:@localhost:1521:xe";
private String userId = "c##scott";
private String userPw = "tiger";

private Connection conn = null;
private PreparedStatement pstmt = null;
private ResultSet rs = null;

@Override
public int memberInsert(Member member) {
    
    int result = 0;
    
    try {
        // 드라이버 연결
        Class.forName(driver);
        // DB 연결
        conn = DriverManager.getConnection(url, userId, userPw);
        // SQL 작성 및 전송
        String sql = "INSERT INTO member(memId, memPw, memMail) values (?, ?, ?)";
        pstmt.setString(1, member.getMemId());
        pstmt.setString(2, member.getMemPw());
        pstmt.setString(3, member.getMemMail());
        result = pstmt.executeUpdate();    
    } catch (ClassNotFoundException e) {
        e.printStackTrace();
    } catch (SQLException e) {
        e.printStackTrace();
    } finally {
        try {
            // 자원해제
            if (pstmt != null) pstmt.close();
            if (conn != null) conn.close();            
        } catch (SQLException e) {
        	e.printStackTrace();
        }
    }
    return result;
}
```



### JdbcTemplate

JDBC의 단점을 보완한 JdbcTemplate : 반복되는 과정을 압축(드라이버 로딩, DB 로딩, 자원해제)

DateSource 클래스 : 데이터베이스 연결과 관련된 정보를 가지고 있는 DataSource는 스프링 또는 c3p0에 제공하는 클래스를 이용할 수 있다.

- Spring : org.springframework.jdbc.datasource.DriverManagerDataSource
- c3p0 : com.mchange.v2.c3p0.DriverManagerDataSource

```pom.xml
<repositories>
	<repository>
		<id>oracle</id>
		<name>ORACLE JDBC Repository</name>
		<url>http://maven.jahia.org/maven2</url>
	</repository>
</repositories>
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-jdbc</artifactId>
    <version>4.1.6.RELEASE</version>
</dependency>
<dependency>
    <groupId>com.mchange</groupId>
    <artifactId>c3p0</artifactId>
    <version>0.9.5</version>
</dependency>
```

```java
private String driver = "oracle.jdbc.driver.OracleDriver";
private String url = "jdbc:oracle:thin:@localhost:1521:xe";
private String userId = "c##scott";
private String userPw = "tiger";

// private DriverManagerDataSource dataSource;
org.springframework.jdbc.datasource.DriverManagerDataSource dataSource;
private JdbcTemplate template;

// DAO 객체가 생성될때 한번만 지정
public MemberDao() {
    /*
    dataSource = new DriverManagerDataSource();
    dataSource.setDriverClass(driver);
    dataSource.setJdbcUrl(url);
    dataSource.setUser(userId);
    dataSource.setPassword(userPw);
    */
    dataSource = new org.springframework.jdbc.datasource.DriverManagerDataSource();
    dataSource.setDriverClassName(driver);
    dataSource.setUrl(url);
    dataSource.setUsername(userId);
    dataSource.setPassword(userPw);
}

@Override
public int memberInsert(Member member) {
    
    int result = 0;
    String sql = "INSERT INTO member(memId, memPw, memMail) values (?, ?, ?)";
    result = template.update(sql, member.getMemId(), member.getMemPw(), member.getMemMail());
    
    return result;   
}
```



### 커넥션풀

커넥션을 미리 만들어놓고 요청이 있을 경우 이용하게 함으로 부하를 줄임



c3p0 모듈의 ComboPooledDateSource : ComboPooledDataSource 사용시 예외처리 필요

```java
// com.mchange.v2.c3p0.ComboPooledDataSource
dataSource = new DriverManagerDataSource();
try {
    dataSource.setDriverClass(driver);
    dataSource.setJdbcUrl(url);
    dataSource.setUser(userId);
    dataSource.setPassword(userPw);    
} catch (PropertyVetoException e) {
    e.printStackTrace();    
}

template = new JdbcTemplate();
template.setDataSource(dataSource);
```



스프링 설정파일을 이용한 DateSource 설정 :

```xml
<beans:bean id="dataSource" class="com.mchange.v2.c3p0.ComboPooledDataSource">
    <beans:property name="driverClass" value="oracle.jdbc.driver.OracleDriver" />
    <beans:property name="jdbcUrl" value="jdbc:oracle:thin:@localhost:1521:xe" />
    <beans:property name="user" value="c##scott" />
    <beans:property name="password" value="tiger" />
    <beans:property name="maxPoolSize" value="200" />
    <beans:property name="checkoutTimout" value="60000" />
    <beans:property name="maxIdleTime" value="1800" />
    <beans:property name="idleConnectedTestPeriod" value="600" />
</beans:bean>
```

