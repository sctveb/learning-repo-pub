# hphk 

## day6 - CRUD + 챗봇

- Model

  - todo
    - title
    - content
    - deadline

  ```python
  from flask_sqlalchemy import SQLAlchemy
  import datetime
  db = SQLAlchemy()
  
  class Todo(db.Model):
      __tablename__ = "todos"
      id = db.Column(db.Integer, primary_key=True)
      title = db.Column(db.String, nullable=False)
      content = db.Column(db.Text)
      deadline = db.Column(db.DateTime)
      
      def __init__(self,title,content,deadline):
          self.title = title
          self.content = content
          self.deadline = deadline
  ```

- URL

  - /

  - /todos/create

  - /todos/edit

  - /todos/update

  - /todos/delete

- chatbot

  - "긴급" : deadline이 가장 가까운 todo 응답
  - "투두" : 해야 할 일 목록 인덱스 페이지 링크 버튼 전송



# source - [github](https://github.com/sctveb/test_project)