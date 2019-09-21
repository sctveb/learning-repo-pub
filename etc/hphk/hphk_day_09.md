# hphk 

## day9 - django_003

### Question

- 메인페이지 - db 오브젝트 호출 & listing > paginator(bootstrap_pagination로 구현)

- C - 완료
  - POST, GET 구분해서 form 입력, form 페이지 출력 구현
    - POST - request.POST로 받은 폼 호출 > .is_vaild() > 세이브 > 원하는 링크로 리다이렉트
    - GET - 폼 호출 > render에 html과 폼 변수 입력
- R - 완료
  - db에서 단일 객체 호출 > 종속 form에서 해당 객체에 맞는 데이터 호출 > filter로 값 호출 및 변형 > 활용
- U - 완료
  - POST, GET 구분해서 form 입력, form 페이지 출력 구현
    - POST - request.POST로 받은 폼 호출 + 상위 db에 맞는 값 출력  > .is_vaild() > 세이브 > 리다이렉트
    - GET - 폼 호출 + 상위 db에 맞는 값 출력 > render에 html과 폼 변수 입력
- D - 완료
  - db 단일 객체 호출 > 삭제 > 리다이렉트

### Comment

- C - 완료
  - POST, GET 구분해서 form 입력, form 페이지 출력 구현
    - POST - request.POST로 받은 폼 호출 > .is_vaild() > 바로 올리지 않음 > 빈 데이터값 끼워넣기 > 세이브 > 원하는 링크로 리다이렉트
    - GET - 폼 호출 > render에 html과 폼 변수 입력

- R - 완료

  - db에서 단일 객체 호출 > 종속 form에서 해당 객체에 맞는 데이터 호출 > filter로 값 호출 및 변형 > 활용

- U - (X)

- D - 완료
  - db 단일 객체 호출 > 삭제 > 리다이렉트


### 추가

- 각각의 기능들로 가는 링크들 생성
  - 예) 수정하기 버튼, 글보기 버튼
  - {% url %} 문법으로 링크 경로 설정

- django_seed로 임의의 데이터 입력 테스트 (python manage.py seed <db이름> --number=<숫자>)



# 전체 파일 경로 - [github](https://github.com/sctveb/django_003)

