# 더 쉴 펜타포엠 · 포트폴리오 퍼블리싱

`index.html`을 브라우저로 직접 열면 됩니다. Java, Maven, npm 설치나 서버 실행은 필요하지 않습니다.

## 폴더 구성

스애띠밸리 퍼블리싱 프로젝트와 동일하게 HTML과 정적 에셋을 루트에 배치했습니다.

```text
index.html                 메인
pages.html                 전체 65개 화면 목록
biz_intro.html             사업개요
house_house02.html         세대정보
social_notice.html         공지사항
그 밖의 분류_페이지.html    각 퍼블리싱 화면
css/                       스타일
js/                        로컬 라이브러리와 UI 스크립트
images/                    이미지
fonts/                     로컬 폰트
scripts/                   선택적으로 사용하는 검증·배포 도구
.github/workflows/         GitHub Pages 설정
```

HTML, CSS, JS를 직접 수정하면 됩니다. 이미지·폰트·페이지 링크는 모두 상대 경로를 사용하므로 폴더 전체를 이동하거나 GitHub Pages의 저장소 하위 주소로 올려도 같은 구조로 사용할 수 있습니다.

## 퍼블리싱 범위

기존 디자인과 반응형 CSS를 유지했습니다. Java 소스·서버 설정·Maven·빌드 결과·IDE 설정은 제거했습니다.

게시판·FAQ·예약 화면의 정보는 샘플입니다. 로그인·인증·가입·저장·예약 접수·첨부 다운로드는 서버에 전송하지 않습니다. 예약 달력과 단계별 화면 이동은 화면 확인용이며 결과는 고정 샘플입니다. 원본에 없던 이미지와 PDF는 안내로 표시합니다. 목록은 `MISSING_ASSETS.md`에 있습니다. 원본에 연결되지 않은 홍보 영상도 안내만 표시합니다.

## GitHub Pages 배포

현재 폴더는 Git 저장소에 연결되어 있지 않습니다. 저장소를 연결한 뒤:

1. `main` 브랜치에 프로젝트 파일을 올립니다.
2. GitHub 저장소의 `Settings → Pages → Source`에서 `GitHub Actions`를 선택합니다.
3. push 또는 Actions에서 `Deploy static publishing preview`를 실행합니다.

워크플로가 파일 경로와 JS를 검사한 뒤 정적 파일만 배포합니다. 다른 기본 브랜치를 쓰면 `.github/workflows/pages.yml`의 `branches`를 수정하세요. 온라인 주소는 실제 배포 후 생성됩니다.

다른 정적 호스팅에는 아래 명령으로 생성한 `dist/` 내용을 올리면 됩니다. `dist/`는 Git에 포함하지 않습니다.

```sh
python3 scripts/package_site.py
```

## 선택적 검증

Python 3와 Node.js가 있는 경우 아래 검사를 실행할 수 있습니다. 추가 패키지는 필요하지 않습니다. HTML을 열어 보는 데에는 이 도구들이 필요하지 않습니다.

```sh
python3 scripts/check_static.py
node --check js/preview.js
node scripts/check_rendering.cjs
```
