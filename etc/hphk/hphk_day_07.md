# hphk 

## day7 - django

#### 한일 요약

#### 1. 기본적인 django 설치 및 구동
#### 2. MVT 구조의 기본적인 이해를 기반으로 한 설정 (app_intro는 model 미포함)
#### 3. django에서 CRUD 구현



### 0. [파이썬 환경설정](https://github.com/mcDeeplearning/TIL/blob/master/파이썬%20환경설정.md) 

(pyenv-virtualenv 설치까지만)



### 1. django 설정

- 장고 설치
  - 전역에서 django-admin 이라는 명령어를 사용하기 위해서
  - `pip install django`
- django 프로젝트 생성
  - `django-admin startproject <프로젝트이름>`
  - `cd <프로젝트이름>`
- 로컬 파이썬 버전 셋팅
  - `pyenv virtualenv 3.6.1 <프로젝트이름>`
  - `pyenv local <프로젝트이름>`
  - `pip install django`
- django 앱 생성
  - `django-admin startapp <앱이름>`
- django server 실행
  - `python manage.py runserver $IP:$PORT`



### 2. 세부설정

- django_intro

  - settings.py

    ```python
    import os
    
    # Build paths inside the project like this: os.path.join(BASE_DIR, ...)
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    
    
    # Quick-start development settings - unsuitable for production
    # See https://docs.djangoproject.com/en/2.1/howto/deployment/checklist/
    
    # SECURITY WARNING: keep the secret key used in production secret!
    SECRET_KEY = '47jp#q$ovrco5qp=)xgyu8%4%l2xcujohey!9g$p=bpuw7w=$-'
    
    # SECURITY WARNING: don't run with debug turned on in production!
    DEBUG = True
    
    ALLOWED_HOSTS = [
        'django001-sctveb.c9users.io'
        ]
    # 화이트리스트 처리를 하기 때문에
    # c9에서 부여되는 url을 허용
    
    # Application definition
    
    INSTALLED_APPS = [
        'django.contrib.admin',
        'django.contrib.auth',
        'django.contrib.contenttypes',
        'django.contrib.sessions',
        'django.contrib.messages',
        'django.contrib.staticfiles',
        'app_intro',
        'todo'
    ]
    
    MIDDLEWARE = [
        'django.middleware.security.SecurityMiddleware',
        'django.contrib.sessions.middleware.SessionMiddleware',
        'django.middleware.common.CommonMiddleware',
        'django.middleware.csrf.CsrfViewMiddleware',
        'django.contrib.auth.middleware.AuthenticationMiddleware',
        'django.contrib.messages.middleware.MessageMiddleware',
        'django.middleware.clickjacking.XFrameOptionsMiddleware',
    ]
    
    ROOT_URLCONF = 'django_intro.urls'
    
    TEMPLATES = [
        {
            'BACKEND': 'django.template.backends.django.DjangoTemplates',
            'DIRS': [os.path.join(BASE_DIR, 'templates')],
            'APP_DIRS': True,
            # django app을 돌면서 templates라는 폴더를 검색
            # 기본적으로 install 한 순서대로 인식
            
            'OPTIONS': {
                'context_processors': [
                    'django.template.context_processors.debug',
                    'django.template.context_processors.request',
                    'django.contrib.auth.context_processors.auth',
                    'django.contrib.messages.context_processors.messages',
                ],
            },
        },
    ]
    
    WSGI_APPLICATION = 'django_intro.wsgi.application'
    
    
    # Database
    # https://docs.djangoproject.com/en/2.1/ref/settings/#databases
    
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
        }
    }
    
    
    # Password validation
    # https://docs.djangoproject.com/en/2.1/ref/settings/#auth-password-validators
    
    AUTH_PASSWORD_VALIDATORS = [
        {
            'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
        },
        {
            'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
        },
        {
            'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
        },
        {
            'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
        },
    ]
    
    
    # Internationalization
    # https://docs.djangoproject.com/en/2.1/topics/i18n/
    
    LANGUAGE_CODE = 'en-us'
    
    TIME_ZONE = 'UTC'
    
    USE_I18N = True
    
    USE_L10N = True
    
    USE_TZ = True
    
    
    # Static files (CSS, JavaScript, Images)
    # https://docs.djangoproject.com/en/2.1/howto/static-files/
    
    STATIC_URL = '/static/'
    
    ```

  - urls.py

    ```python
    from django.contrib import admin
    from django.urls import path, include
    from app_intro import views
    
    urlpatterns = [
        path('admin/', admin.site.urls),
        path('', views.index),
        path('lunch/', views.lunch),
        path('lotto/', views.lotto),
        path('hello/<str:name>/', views.hello),
        path('cube/<int:number>', views.cube),
        path('todos/', include('todo.urls'))
    ]
    
    # 인자 컨버터
    # str : 스트링
    # int : 0 또는 양의 정수
    # slug : 문자 또는 숫자 하이픈 밑줄 
    #         show-me-the-money
    ```

- app_intro

  - views.py

    ```python
    from django.shortcuts import render
    import random
    # Create your views here.
    def index(request):
        return render(request, 'index.html')
        
    def lunch(request):
        menu_list = ["20층","김밥카페","시골집"]
        pick = random.choice(menu_list)
        return render(request, 'lunch.html', {'pick':pick})
        
    def lotto(request):
        number = list(range(1,46))
        pick = random.sample(number,6)
        return render(request, 'lotto.html', {'pick':pick})
        
    def hello(request, name):
        return render(request, 'hello.html',{'name':name})
        
    def cube(request, number):
        numpy = number**3
        return render(request, 'cube.html',{'numpy':numpy})
    ```

    - index.html

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
          여기는 인덱스다
      </body>
      </html>
      ```
    - hello.html

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
          {{name}}
      </body>
      </html>
      ```

    - lunch.html

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
          {{pick}}
      </body>
      </html>
      ```

    - lotto.html

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
          {{pick}}
      </body>
      </html>
      ```

    - cube.html

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
          {{numpy}}
      </body>
      </html>
      ```

- todo

  - urls.py

    ```python
    from django.urls import path
    from . import views
    # 현재 폴더에 있는 views 파일 추가
    
    app_name = 'todo'
    
    urlpatterns = [
        path('', views.index),
        path('new/', views.new),
        path('create/', views.create),
        path('<int:id>/', views.read),
        path('todo_create/',views.todo_create),
        path('<int:id>/update/',views.update, name='update'),
        path('<int:id>/delete/',views.delete, name='delete')
        ]
    ```

  - models.py

    ```python
    from django.db import models
    
    # Create your models here.
    class Todo(models.Model):
        title = models.CharField(max_length=50)
        deadline = models.DateField()
        
        def __str__(self):
            return (self.title)
    ```

  - admin.py

    ```python
    from django.contrib import admin
    from todo.models import Todo
    # Register your models here.
    admin.site.register(Todo)
    ```

  - views.py

    ```python
    from django.shortcuts import render, redirect
    from todo.models import Todo
    def index(request):
        todos = Todo.objects.all()
        return render(request, 'todo/index.html', {'todos': todos})
        
    def new(request):
        return render(request, 'todo/new.html')
        
    def create(request):
        title = request.POST.get('title')
        deadline = request.POST.get('deadline')
        todo = Todo(title=title,deadline=deadline)
        todo.save()
        return redirect('/todos')
        
    def read(request,id):
        todo = Todo.objects.get(id=id)
        return render(request,'todo/read.html',{'todo':todo})
        
    def todo_create(request):
        if request.method == "POST":
            title = request.POST.get('title')
            deadline = request.POST.get('deadline')
            # todo = Todo(title=title,deadline=deadline)
            # todo.save()
            Todo.objects.create(title=title,deadline=deadline)
            return redirect('/todos/')
        else:
            return render(request, "todo/todo_create.html")
            
    def update(request,id):
        todo = Todo.objects.get(id=id)
        if request.method == "POST":
            # 저장 로직
            todo.title = request.POST.get('title')
            todo.deadline = request.POST.get('deadline')
            # todo = Todo(title=title,deadline=deadline)
            # todo.save()
            todo.save()
            return redirect('/todos/')
        else:
            # 폼 보여주기
            # deadline = todo.deadline.strftime("%Y-%m-%d")
            # deadline = "{}-{}-{}".format(todo.deadline.year,todo.deadline.month,todo.deadline.day)
            return render(request, "todo/update.html",{'todo':todo})
            
    def delete(request,id):
        todo = Todo.objects.get(id=id)
        todo.delete()
        return redirect('/todos')
    
    ```

    - base.html

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
          <p><a href="/todos/new">글작성</a>
          <a href="/todos/todo_create">합쳐진로직</a></p>
          {% block body_block %}
          {% endblock %}
      </body>
      </html>
      ```

    - index.html

      ```html
      {% extends 'todo/base.html' %}
      {% block body_block %}
          <p>todo 인덱스임</p>
          {% for todo in todos %}
          <p>{{todo.title}} | {{todo.deadline}}</p>
          <a href="/todos/{{todo.id}}/">글보기</a>
          {% endfor %}
      {% endblock %}
      
      ```

    - new.html

      ```html
      {% extends 'todo/base.html' %}
      {% block body_block %}
      <form action="/todos/create/", method="post">
          {% csrf_token %}
          <input type="text" name="title"/>
          <input type="date" name="deadline"/>
          <input type="submit" value="Submit"/>
      </form>
      {% endblock %}
      ```

    - read.html

      ```html
      {% extends 'todo/base.html' %}
      {% block body_block %}
      {{todo.title}} | {{todo.deadline}} | <a href="/todos/{{todo.id}}/update">수정</a> |<a href="{% url 'todo:update' id=todo.id %}">또다른수정 </a>| <a href="/todos/{{todo.id}}/delete">삭제</a>
      {% endblock %}
      ```

    - todo_create.html

      ```html
      {% extends 'todo/base.html' %}
      {% block body_block %}
      <form action="/todos/todo_create/", method="post">
          {% csrf_token %}
          <input type="text" name="title"/>
          <input type="date" name="deadline"/>
          <input type="submit" value="Submit"/>
      </form>
      {% endblock %}
      ```

    - update.html

      ```html
      {% extends 'todo/base.html' %}
      {% block body_block %}
      <form action="/todos/{{todo.id}}/update/", method="post">
          {% csrf_token %}
          <input type="text" name="title" value="{{todo.title}}"/>
          <input type="date" name="deadline" value="{{todo.deadline|date:'Y-m-d'}}"/>
          <input type="submit" value="Submit"/>
      </form>
      {% endblock %}
      ```


