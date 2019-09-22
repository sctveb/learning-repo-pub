# mysql & sequelize

## mysql

#### 1. mysql 접속

```mysql
mysql -h localhost -u root -p
```

1-1. 접속할 주소, 사용자명 순으로 입력(비밀번호는 차후에 입력)

cf) mysql를 편하게 사용하려면 path 설정이 필요



#### 2. db & table 생성

```mysql
CREATE SCHEMA dbsomething;

use database;

CREATE TABLE dbsomething.users (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL,
    age INT UNSIGNED NOT NULL,
    married TINYINT NOT NULL,
    comment TEXT NULL,
    created_at DATETIME NOT NULL DEFAULT now(),
    PRIMARY KEY(id),
    UNIQUE INDEX name_UNIQUE (name ASC))
    COMMENT = '사용자 정보'
    DEFAULT CHARSET=utf8
    ENGINE=InnoDB;
    
DESC users;

DROP TABLE users;

CREATE TABLE dbsomething.comments (
    id INT NOT NULL AUTO_INCREMENT,
    commenter INT NOT NULL,
    comment VARCHER(100) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT now(),
    PRIMARY KEY(id),
    INDEX commenter_idx (commenter ASC),
    CONSTRAINT commenter
    FOREIGN KEY (commenter)
    REFERENCES dbsomething.users (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
    COMMENT = '댓글'
    DEFAULT CHARSET=utf8
    ENGINE=InnoDB;
    
SHOW TABLES;
```

2-1. `dbsomething` 이라는 이름의 데이터베이스를  생성

2-2. `dbsomething` 이라는 이름의 데이터베이스를  사용

2-3. user 테이블 생성

자료형: INT, FLOAT, DOUBLE, VARCHAR(자릿수), CHAR(자릿수), TINYINT, TEXT, DATETIME

옵션: NULL & NOT NULL(빈칸 허용), UNSIGNED(음수 무시), AUTO_INCREMENT(숫자 자동 증가), DEFAULT(기본 값), PRIMARY KEY(기본 키), UNIQUE INDEX(값의 고유성 유무)

테이블 자체 설정: COMMENT(테이블 보충 설명), DEFAULT CHARSET(문자 인코딩), ENGINE(DB 엔진)

2-4. user 테이블 확인

2-5. 테이블 삭제

2-6. comments 테이블 생성

CONSTRAINT [제약조건명] FOREIGN KEY [컬럼명] REFERENCES [참고하는 컬럼명]

commeter 컬럼과 user 테이블의 id 컬럼을 연결

2-7. 테이블들 확인



#### 3. Create

```mysql
INSERT INTO dbsomething.users (name, age, married, comment) VALUES ('name1', 24, 0, '자기소개1');
INSERT INTO dbsomething.users (name, age, married, comment) VALUES ('name2', 32, 1, '자기소개2');

INSERT INTO dbsomething.comments (commenter, comment) VALUES (1, 'comments1');
```

3-1. users 테이블에 row 생성

3-2. comments 테이블에 row 생성



#### 4. Read

```mysql
SELECT * FROM dbsomething.users;
SELECT * FROM dbsomething.comments;

SELECT name, married FROM dbsomething.users;

SELECT name, age FROM dbsomething.users WHERE married = 1 AND age > 30;
SELECT id, name FROM dbsomething.users WHERE married = 0 OR age > 30;

SELECT id, name FROM dbsomething.users ORDER BY age DESC;

SELECT id, name FROM dbsomething.users ORDER BY DESC LIMIT 1;

SELECT id, name FROM dbsomething.users ORDER BY DESC LIMIT 1 OFFSET 1;
```

4-1. 각 테이블의 모든 값 조회

4-2. 특정 값만 조회

4-3. 특정 조건에 해당하는 값만 조회

4-4. ORDER BY로 조회된 값 정렬(DESC: 내림차순, ASC: 오름차순)

4-5. LIMIT로 조회할 문서 개수 설정

4-6. OFFSET으로 몇 개를 건너뛸지 설정



#### 5. Update

```mysql
UPDATE dbsomething.users SET comment = '바꿀 내용' WHERE id = 2; 
```

5-1. 해당 조건의 문서 변경



#### 6. Delete

```mysql
DELETE FROM dbsomething.users WHERE id = 2;
```

6-1. 해당 조건의 문서 삭제