# hphk 

## day3 - flask

## 플라스크 게시판 만들기
#### [파이썬 환경 설정](https://github.com/mcDeeplearning/TIL/blob/master/%ED%8C%8C%EC%9D%B4%EC%8D%AC%20%ED%99%98%EA%B2%BD%EC%84%A4%EC%A0%95.md)

### 데이터베이스 & 기본 골격

- 설정( .bash_profile를 삭제하고 기존 환경 변수를 .bashrc에 저장 -> 이유는?)
```bash
$ sudo apt-get update
# ubuntu에 postgresql 설치
$ sudo apt-get install postgresql postgresql-contrib libpq-dev
# python(flask)에서 postgresql를 사용하기 편하게 해주는 psycopg2 설치
$ pip install psycopg2 psycopg2-binary
# import 해서 쓸 친구들
$ pip install Flask-SQLAlchemy Flask-Migrate
```

- DB 설정
```bash
$ psql
ubuntu=# CREATE DATABASE DB이름 WITH template=template0 encoding='UTF8';
ubuntu=# \q
```

- 'models.py' 설정
```python
from flask_sqlalchemy import SQLAlchemy
import datetime
db = SQLAlchemy()

class Post(db.Model):
    # 데이터베이스 테이블 설정
    __tablename__ = 'posts'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    content = db.Column(db.Text)
    created_at = db.Column(db.DateTime)
    
    # 생성자
    def __init__(self,title,content):
        self.title = title
        self.content = content
        self.created_at = datetime.datetime.now()
```
- flask db initialize : `flask db init`
- `migration`폴더 생성
- 파일의 현재 상태를 반영 : `flask db migrate`
- 반영된 파일을 업데이트 : `flask db upgrade`
- DB확인 : `psql <작성한 db이름>`



- 'app.py' 설정

```python
from flask import Flask, render_template, request, redirect
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from models import *

app = Flask(__name__)

# DB 설정
app.config["SQLALCHEMY_DATABASE_URI"] = 'postgresql:///board'
app.config["SQLALCHEMY_TRACK_MODIFICATION"] = False
db.init_app(app)
migrate = Migrate(app,db)

@app.route('/')
def index():
    posts = Post.query.all()
    # SELECT * FROM posts;
    posts = Post.query.order_by(Post.id.desc()).all()
    # SELECT * FROM posts ORDER BY id DESE;
    return render_template('index.html',posts=posts)
    
@app.route('/posts/new')
def new():
    return render_template('new.html')

@app.route('/posts/create', methods=["POST"])
def create():
    # title = request.args.get('title')
    title = request.form.get('title')
    # content = request.args.get('content')
    content = request.form.get('content')
    post = Post(title=title,content=content)
    db.session.add(post)
    db.session.commit()
    return render_template('create.html',post=post)
    
@app.route('/posts/<int:id>')
def read(id):
    post = Post.query.get(id)
    # SELECT * FROM posts WHERE id=1;
    return render_template('read.html', post=post)
    
@app.route('/posts/<int:id>/delete')
def delete(id):
    post = Post.query.get(id)
    db.session.delete(post)
    db.session.commit()
    # DELETE * FROM posts WHERE id=1;
    return redirect('/')
    
@app.route('/posts/<int:id>/edit')
def edit(id):
    post = Post.query.get(id)
    return render_template('edit.html',post=post)

    
@app.route('/posts/<int:id>/update', methods=["POST"])
def update(id):
    post = Post.query.get(id)
    post.title = request.form.get('title')
    post.content = request.form.get('content')
    db.session.commit()
    return redirect('/posts/{}'.format(post.id))

```

### html 파트

- base.html (전체적으로 적용하는 css나 html 형식 정의된 html)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
</head>
<body>
    
    <div class="container">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="/">Navbar</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <a class="nav-link" href="/posts/new"> 글쓰기 <span class="sr-only">(current)</span></a>
      </li>
    </ul>
  </div>
</nav>
        {% block body_block %}
        {% endblock %}
    </div>

    
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
</body>
</html>
```

- index.html (초기 페이지)

```html
{% extends 'base.html' %}
{% block body_block %}
    <h1>하고 싶은 말을 남겨보자</h1>
    <div class='row'>
    {% for post in posts %}
        <!--<h1>{{post.id}}</h1>-->
        <!--<h2>{{post.title}}</h2>-->
        <!--<h3>{{post.content}}</h3>-->
        <!--<h4>{{post.created_at}}</h4>-->
        <!--<a href='/posts/{{post.id}}'>글보기</a>-->
        <div class="col-sm">
            <div class="card" style="width: 18rem;">
      <img class="card-img-top" src=".../100px180/" alt=" ">
      <div class="card-body">
        <h5 class="card-title">{{post.title}}</h5>
        <p class="card-text">{{post.content}}</p>
        <a href='/posts/{{post.id}}' class="btn btn-primary">상세정보</a>
        </div>
      </div>
    </div>
    {% endfor %}
        </div>

{% endblock %}
```

- new.html (신규 데이터 작성 페이지)

```html
{% extends 'base.html' %}
{% block body_block %}
    <!--<form action="/posts/create">-->
    <!--    <input type="text" name="title"/>-->
    <!--    <input type="text" name="content"/>-->
    <!--    <input type="submit"/>-->
    <!--</form>-->
    <form action="/posts/create" method="post">
      <div class="form-group">
        <label for="title">제목</label>
        <input type="text" name="title" class="form-control" id="title" placeholder="제목을 입력해주세요.">
      </div>
      <div class="form-group">
        <label for="content">내용</label>
        <textarea name="content" id="content" class="form-control"></textarea>

      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
{% endblock %}
```

- read.html (작성된 데이터를 읽는 페이지)

```html
{% extends 'base.html' %}
{% block body_block %}
{{post.id}}
{{post.title}}
{{post.content}}
{{post.created_at}}
<a href="/posts/{{post.id}}/delete">삭제</a>
<a href="/posts/{{post.id}}/edit">수정</a>
{% endblock %}
```

- edit.html (작성된 데이터를 수정하는 페이지, new.html과 유사)

```html
{% extends 'base.html' %}
{% block body_block %}
    <!--<form action="/posts/create">-->
    <!--    <input type="text" name="title"/>-->
    <!--    <input type="text" name="content"/>-->
    <!--    <input type="submit"/>-->
    </form>
    <form action="/posts/{{post.id}}/update" method="post">
      <div class="form-group">
        <label for="title">제목</label>
        <input value="{{post.title}}" type="text" name="title" class="form-control" id="title" placeholder="제목을 입력해주세요." >
      </div>
      <div class="form-group">
        <label for="content">내용</label>
        <textarea name="content" id="content" class="form-control">{{post.content}}</textarea>

      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
{% endblock %}
```

- create.html (read.html과 유사, 하지만 새로운 데이터를 저장하는 과정을 위한 페이지)

```html
{% extends 'base.html' %}
{% block body_block %}
{{post.id}}
{{post.title}}
{{post.content}}
{{post.created_at}}
<a href="/posts/{{post.id}}/delete">삭제</a>
<a href="/posts/{{post.id}}/edit">수정</a>
{% endblock %}
```



### 플라스크 실행 : flask run --host $IP --port $port



### c9 기준 팁

- html 확장자의 파일에서 ` ! + tab ` 입력시 자동완성
- html tag 명령어만 입력하고 `tab`을 사용하면 자동완성



## 마크다운 문법

```
# 제목 <h1>
## 제목 <h2>
### 제목 <h3>
# 제목 <h1>
```



```
# list
1. 1번내용
	1. 1-1번 내용
	2. 1-2번 내용
2. 2번내용
```



```
# ul
- * +
```



```
# link
[google](https://google.com)
# img
![simyoung](http://ko.simyoung.wikidok.net/api/File/Real/59333433f2e511b56a928cbd)
```



```
# 코드작성
​```코드종류
​```
```



```
# 인라인 코드 강조
`강조하고 싶은 부분`
```



```
# 인용구문
>
```



```
# 표 입력 (앵간하면 마크다운 편집기 쓰자)
| id   | 제목 | 내용 |
| ---- | ---- | ---- |
| 1    | 2    | 3    |
| 4    | 5    | 6    |
| 7    | 8    | 9    |

```

