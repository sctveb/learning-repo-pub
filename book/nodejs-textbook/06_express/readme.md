# Express 기본기

## 구조이해

`/bin/www`

```javascript
// 핵심 부문만 설명
var app = require('../app');
var debug = require('debug')('express-06:server');
var http = require('http');
/* app, debug, http 모듈 import */
var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
/* process.env.PORT 값 또는 없으면 3000 포트를 설정 */
var server = http.createServer(app);
/* http.createServer에 생성한 app 모듈 삽입 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
/* 포트를 연결하고 서버를 실행 */
```

`app.js`

```javascript
var app = express();
/* express 패키지를 통해 app 객체 생성 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
/* app.set()으로 익스프레스 앱 설정 */
app.use(logger('dev'));
/* app.use()로 미들웨어 연결 */
module.exports = app;
/* app객체 모듈화하여 bin/www로 전달 */
```



## 미들웨어

요청과 응답의 중간에서 들어오는 값을 조작하여 원하는 결과를 얻고자 하는데 이용

```javascript
// morgan
var logger = require('morgan');
app.use(logger('dev'))
/* 요청에 대한 정보를 콘솔에 기록 */

// body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
/* 요청의 본문을 해석, 현재는 내장되어 있는 형태로 사용가능 */

// cookie-parser
var cookieParser = require('cookie-parser');
app.use(cookieParser());
/* 요청에 동봉된 쿠키를 해석 */

// static
app.use(express.static(path.join(__dirname, 'public')));
/* 정적파일을 위한 미들웨어, express에 내장되어 있음 */

// express-session
var session = require('express-session');
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'secret code',
  cookie: {
    httpOnly: true,
    secure: false,
  }
}));
/* 세션 관리를 위한 미들웨어, express-generator에는 없으므로 수동 설치 요망
또한 cookie-parser 뒤에 배치하는 것이 안전한 미들웨어 사용법 */

// connect-flash
var flash = require('connect-flash');
app.use(flash());
/* 일회성 메세지를 웹브라우저에 노출시 사용, express-generator에 미동봉(추가 설치 요망), cookie-parser & express-session 선설치 & 후방 배치 필요 */
```

사용자 커스터마이징된 미들웨어를 사용할 경우, `next()`로 반드시 다음 미들웨어에게 전달 요망



## Router 객체로 라우팅 분리

`app.js`

```javascript
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

app.use('/', indexRouter);
app.use('/users', usersRouter);
```

Router도 일종의 미들웨어로 취급, 하지만 추가적인 설정이 가능하다. use 메서드 대신 get, post 메서드를 사용시 http 메서드까지 일치시켜야 실행.

`routes/index.js`

```javascript
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

/* root page로 get 요청 */
```

router.get에서도 `app.js`에서 app.use() 내에 복수의 미들웨어를 전달하는 것처럼 복수의 미들웨어 설정 가능.

router 내부에서 `next('route')`를 사용할 경우, 라우터에 연결된 미들웨어들을 `break`문처럼 skip 가능.

router에서 parameter나 query문을 사용할 경우, `req.params.parameter명`과 `req.query`를 활용해서 원하는 결과를 만들어 낼 수 있음(다른 라우터를 방해하지 않기 위해 뒤에 위치할 것)

`res.send`메서드를 활용해서 버퍼 데이터, 문자열, html code, json data 등 다양한 형식을 전송 가능.

`res.render`는 템플릿 엔진을 렌더링할 때 사용



## 템플릿 엔진 사용
`app.set('view engine', 'pug')`와 같이 express 내부에서 사용할 랜더링 엔진을 지정하여 사용
ex) `res.render('index')`로 `views/index.pug`를 랜더링

pug, ejs 등이 있으며 기존 HTML과 문법이 유사하지만 다른 점을 고려하여 사용, 업무에서 필요할 경우에 초점을 맞춰서 쓸 것(당장은 불필요해 보임)
