# mongodb & mongoose

## mongodb

#### 1. admin 계정 생성 및 활용

```mongodb
mongod
mongo
use admin
db.createUser({ user: `name`, pwd: `password`, roles: ['root']})

mongod --auth
mongo admin -u `name` -p `password`
```

1-1. admin db를 사용하여 root 유저 생성

1-2. db를 인증이 필요한 상태로 구동하고 root 유저로 로그인



#### 2. db & collection 생성

```mongodb
use `db's name`
show dbs
db
db.createCollection('users')
db.createCollection('comments')
show collections
```

2-1. `db's name` 이라는 이름의 데이터베이스를 사용(없으면 생성)

2-2. 모든 데이터베이스 목록을 조회(값이 없으면 생성되도 조회되지 않음)

2-3. 사용하는 db명 조회

2-4. 콜렉션 생성(users, comments)

2-5. 콜렉션 조회



#### 3. Create

```mongodb
mongo
use `db's name`
db.users.save({ name: 'name1', age: 24, married: false, comment: '이것은 코멘트1', createdAt: new Date() });
db.users.save({ name: 'name2', age: 32, married: true, comment: '이것은 코멘트2', createdAt: new Date() });
db.users.find({ name: 'name1'}, { _id: 1 })
db.comments.save({ commenter: `위에서 검색된 ObjectId`, comment: '댓글1', createdAt: new Date() })
```

3-1. 데이터베이스를 선택하고 users 콜렉션에 문서 생성

3-2. 조회된 값의 id를  사용하여 종속된 comments 콜렉션에 문서 생성



#### 4. Read

```mongodb
mongo
db.users.find({})
db.comments.find({})
db.users.find({}, { _id: 0, name: 1, married: 1 });
db.users.find({ age: { $gt: 30 }, married: true }, { _id: 0, name: 1, married: 1 });
db.users.find({ $or: [{ age: { $gt: 30 } }, { married: false }] }, { _id: 0, name: 1, married: 1 })
db.users.find({}, { _id: 0, name: 1, age: 1 }).sort({ age: -1 })
db.users.find({}, { _id: 0, name: 1, age: 1 }).sort({ age: -1 }).limit(1)
db.users.find({}, { _id: 0, name: 1, age: 1 }).sort({ age: -1 }).limit(1).skip(1)
```

4-1. 각 콜렉션의 모든 문서 조회

4-2. 조회되는 문서에서 특정 값만 확인(`_id`는 default가 1이라 0이라 명시하지 않으면 조회됨)

4-3. 30세 이상이거나 결혼하지 않은 users 콜렉션 조회

4-4. sort로 조회된 값 정렬(-1: 내림차순, 1: 오름차순)

4-5. limit로 조회할 문서 개수 설정

4-6. skip으로 몇 개를 건너뛸지 설정



#### 5. Update

```mongodb
mongo
db.users.update({ name: 'name1' }, {$set: { comment: 'comment is changed' }})
```

5-1. 해당 조건의 문서 변경



#### 6. Delete

```mongodb
mongo
db.users.remove({ name: 'name1' })
```

6-1. 해당 조건의 문서 삭제

