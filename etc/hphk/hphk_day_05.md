# hphk 

## day5 - kakao talk + flask

### kakao 플러스친구

1. kakao 비즈니스 회원가입
2. 플러스 친구로 들어가서 생성

※ [카카오톡 API](https://github.com/plusfriend/auto_reply)에 대한 학습은 현재 서비스하는 API가 대체된 이후에 차후 정리

### 데이터베이스 구성 복습

1. models.py에서 모델 구성 & 정의
2. pysq로 정의된 db 생성
3. app.py에 생성된 db와의 연결 정의
4. init, migrate,upgrade로 연결처리(flask)

#### app.py

```python
from flask import Flask, jsonify, request, render_template
import random
import requests
from bs4 import BeautifulSoup
from sqlalchemy.sql.expression import func

from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

from models import *

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = 'postgresql:///movie'
app.config["SQLALCHEMY_TRACK_MODIFICATION"] = False
db.init_app(app)
migrate = Migrate(app,db)

@app.route('/')
def index():
    movies = Movie.query.all()
    return render_template('index.html',movies=movies)

@app.route('/keyboard')
def keyboard():
    keyboard = {
        "type" : "buttons",
        "buttons" : ["메뉴","로또","고양이","영화","영화저장"]
    }
    
    return jsonify(keyboard)

@app.route('/message', methods=['POST'])
def message():
    user_msg = request.json['content']
    msg = "기본응답"
    img_bool = False
    url = "기본 주소"
    
    if user_msg == "메뉴":
        # 메뉴를 담은 리스트 만들기
        menus = ['20층','멀캠식당','급식']
        # 그중 하나를 랜덤하게 고르기
        pick = random.choice(menus)
        # msg변수에 담기
        msg = pick
    elif user_msg == "로또":
        # 1~45가 들어간 숫자들 만들기
        numbers = range(1,46)
        # 그중에서 6개 추첨하기
        pick = random.sample(numbers,6)
        # msg 에 6개 숫자 넣기
        msg = str(sorted(pick))
    elif user_msg == "고양이":
        img_bool = True
        cat_api = 'https://api.thecatapi.com/v1/images/search?mime_types=jpg'
        req = requests.get(cat_api).json()
        # msg = url 정보를 담아서 출력
        cat_url = req[0]['url']
        url = cat_url
        msg = "나만 고양이 없어 :("
    elif user_msg == "영화":
        img_bool = True
        movie = Movie.query.order_by(func.random()).first()
        msg = movie.title + ' / ' + str(movie.star) + ' / ' + str(movie.percent)
        url = movie.img
    elif user_msg == "영화저장":
        db.session.query(Movie).delete()
        naver_movie = 'https://movie.naver.com/movie/running/current.nhn'
        req = requests.get(naver_movie).text
        soup = BeautifulSoup(req, 'html.parser')
        
        title_list = soup.select('dt.tit > a')
        star_list = soup.select('a > span.num')
        percent_list = soup.select('div.b_star > span.num')
        img_url_list = soup.select('div.thumb > a > img')
        
        movies = {}
        for i in range(0,10):
            movies[i] ={
                'title':title_list[i].text,
                'star':star_list[i].text,
                'percent':percent_list[i].text,
                'url':img_url_list[i]['src']
            }
        for i in range(0,10):
            movie=Movie(
                title_list[i].text,
                star_list[i].text,
                percent_list[i].text,
                img_url_list[i]['src']
            )
            db.session.add(movie)
            db.session.commit()
        msg = "저장완료"
    return_dict = {
        'message':{
            'text':msg
        },
        'keyboard':{
            "type" : "buttons",
            "buttons" : ["로또","메뉴","고양이","영화","영화저장"]
        }
    }
    return_img_dict = {
        'message':{
            'text':msg,
            'photo':{
                'url':url,
                'width':720,
                'height':630
            }
        },
        'keyboard':{
            "type" : "buttons",
            "buttons" : ["로또","메뉴","고양이","영화","영화저장"]
        }
    }
    
    if img_bool:
        return jsonify(return_img_dict)
    else:
        return jsonify(return_dict)
```

### models.py

```python
from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()

class Movie(db.Model):
    __tablename__ = 'movies'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    star = db.Column(db.Float)
    percent = db.Column(db.Float)
    img = db.Column(db.String)
    
    def __init__(self,title,star,percent,img):
        self.title = title
        self.star = star
        self.percent = percent
        self.img = img
```

### index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <h1>인덱스다임아!</h1>
    {% for movie in movies %}
    <p>
    {{movie.title}} {{movie.star}} {{movie.percent}} {{movie.img}}
    </p>
    {% endfor %}

</body>
</html>
```

