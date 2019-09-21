# hphk 

## day2 - flask

※ html은 codecademy에서 기초루다가 + 리눅스 pwd 현재 위치

- 파이썬 환경 설정

- 플라스크

  ```bash
  pip install flask
  ```

- `app.py`

  ```python
  import random
  import requests
  from bs4 import BeautifulSoup
  import csv
  import datetime
  from flask import Flask, render_template, request
  app = Flask(__name__)
  
  #요청이 들어오는 주소 설정
  @app.route("/")
  def hello():
      return "Hello World!"
      
  @app.route("/welcome")
  def welcome():
      return "welcom flask!!!"
  
  @app.route("/html_tag")
  def html_tag():
      return "<h1>안녕하세요!</h1>"
      
  @app.route("/html_line")
  def html_line():
      return """<h1>여러줄을 보냅니다</h1>
      <ul>
      <li>1줄</li>
      <li>2줄</li>
      </ul>
      """
  @app.route("/html_file")
  def html_file():
      return render_template("file.html")
      
  @app.route("/hello_p/<string:name>")
  def hello_p(name):
      return render_template("hello.html", people_name = name)
      
  @app.route("/cube/<int:num>")
  def cube(num):
      # 사용자가 입력한 숫자를 받아서
      # 세제곱 후 cube.html파일을 통해 응답
      result = num**3
      return render_template("cube.html", cube_num = num, cube_result = result)
      
  @app.route("/lunch")
  def lunch():
      list = ["멀티캠퍼스", "김밥", "중국집"]
      dict = {"멀티캠퍼스":"http://www.circul.us/themaker/img/credu.png",
      "김밥":"http://recipe1.ezmember.co.kr/cache/recipe/2015/04/04/0461907459756bc3a56472da407a1a9d1.jpg",
      "중국집":"https://homecuisine.co.kr/files/attach/images/142/684/034/4b29b96450d68a4d4df29f7439fe180a.JPG"}
      pick = random.choice(list)
      img = dict[pick]
      result = "오늘의 추천 메뉴는 {menu}".format(menu=pick)
      return render_template("lunch.html", lunch_result = pick, lunch_img = img)
  @app.route("/lotto")
  def lotto():
      list_l= list(range(1,46))
      luck = random.sample(list_l,6)
      return render_template("lotto.html",lucky = luck)
  
  @app.route("/naver")
  def naver():
      return render_template("naver.html")
  
  @app.route("/google")
  def google():
      return render_template("google.html")
  
  @app.route("/hell")
  def hell():
      return render_template("hell.html")
      
  @app.route("/hi")
  def hi():
      user_name = request.args.get('name')
      return render_template("hi.html", user_name = user_name)
      
  @app.route("/main")
  def main():
      return render_template("main.html")
      
  @app.route("/result_main")
  def result_main():
      player_name1 = request.args.get('player_name1')
      player_name2 = request.args.get('player_name2')
      animal = ["개","고양이","소","말","사자","사람","호랑이","토끼","고슴도치","사슴","여우"]
      animal_name = ''.join(random.sample(animal,1))
  
      return render_template("result_main.html", player_name1 = player_name1, player_name2 = player_name2,animal_name = animal_name)
  
  @app.route("/summoner")
  def summoner():
      return render_template("summoner.html")
      
  @app.route("/opgg")
  def opgg():
      summoner = request.args.get('summoner')
      url = "http://www.op.gg/summoner/userName="
      html = requests.get(url + summoner)
      soup = BeautifulSoup(html.text,"html.parser")
      
      wins = soup.select('.wins')
      losses = soup.select('.losses')
      
      if len(wins) == 0 :
          wins = "0W"
      else:
          wins = soup.select('.wins')[0].text
          
      if len(losses) == 0 :
          losses = "0L"
      else:
          losses = soup.select('.losses')[0].text
          
      f = open("list.txt", "a+")
      data = "\n소환사의 이름은 {0}이며 승패는 {1} / {2} 입니다.".format(summoner,wins,losses)
      f.write(data)
      f.close
      
      f_1 = open("list.csv",'a+',encoding='utf-8',newline="")
      csvfile = csv.writer(f_1)
      data=[summoner,wins,losses,datetime.datetime.now()]
      csvfile.writerow(data)
      f_1.close()
      
      return render_template('opgg.html',wins = wins, losses = losses, summoner = summoner)
      
  @app.route("/log")
  def log():
      f = open('list.csv','r',encoding='utf-8')
      logs = csv.reader(f)
      return render_template('log.html',logs = logs)
  ```

- flask 구동

  ```bash
  flask run --host 0.0.0.0 --port 8080
  ```

- bootstrap 적극적인 활용

  ```html
  <!-- navbar와 같은 bootstrap 기본 탬플릿 복붙 & 수정으로 적극적인 활용 == 시간단축 -->
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
  
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Dropdown
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">Something else here</a>
          </div>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" href="#">Disabled</a>
        </li>
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
    </div>
  </nav>
  <!-- block으로 자신을 상속하는 자식 페이지에 필요한 공간을 지정-->
  <% block 자식블록1 %>
  <% endblock %>
  
  <!-- #자식 페이지에서 상속선언-->
  <% extends "상속페이지.html"%>
  ```
