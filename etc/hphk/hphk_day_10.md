# hphk 

## day10 - django_003 + a

### 한 일

- login
  - django.contrib.auth.forms의 `AuthenticationForm`, django.contrib.auth의 `login` 활용
- logout
  - django.contrib.auth의 `logout` 활용 + html에서 login 상태 구분(`user.is_authenticated`)
- signup
  - login 메커니즘에 `UserCreationForm` + create form에서 불필요한 노출을 없애기 위한 노력
- profile 추가
  - account 앱에 Profile 모델 추가 -> ProfileForm 생성 및 연결 -> admin에 추가 & 사용(signup에 바뀐 form만 추가 및 적용)



# 전체 파일 경로 - [github](https://github.com/sctveb/django_003)

### ※ 세부 branch (로그인,회원가입,로그아웃 구현) 참조