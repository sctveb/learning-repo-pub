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


#### 2. db & collection 생성

```mongodb
use `db's name`
show dbs
db
db.createCollection('users')
db.createCollection('comments')
show collections
```



#### 3. Create

```mongodb
mongo
use `db's name`
db.users.save({ name: 'name1', age: 24, married: false, comment: '이것은 코멘트1', createdAt: new Date() });
db.users.save({ name: 'name2', age: 32, married: true, comment: '이것은 코멘트2', createdAt: new Date() });
db.users.find({ name: 'name1'}, { _id: 1 })
db.comments.save({ commenter: `위에서 검색된 ObjectId`, comment: '댓글1', createdAt: new Date() })
```



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



#### 5. Update

```mongodb

```



#### 6. Delete

```mongodb

```

