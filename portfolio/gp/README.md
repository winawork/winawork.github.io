# G-PLATECH · 정적 퍼블리싱 포트폴리오

`index.html`을 브라우저로 직접 열어 확인합니다. Java·JSP·Maven·DB·웹 서버 없이 HTML, CSS, JavaScript와 로컬 에셋으로 표시됩니다.

## 구성

- `index.html` / `index_en.html`: 국문·영문 메인
- `pages.html`: 전체 54개 화면 목록
- `intro_*.html`, `product_*.html`, `facility_*.html`: 회사·제품·공정 화면
- `esg_*.html`, `report_*.html`: ESG·신고채널 화면
- `board_*.html`, `communication_contact_contactForm.html`: 고객센터·문의 화면
- `css/`, `js/`, `images/`, `fonts/`, `video/`: 정적 에셋
- `scripts/check_static.py`: 선택적 파일 경로 검사(Python 3)

기존 JSP의 공통 Tiles 레이아웃·메시지 번역을 각 HTML에 포함했습니다. 실제 제공된 국문·영문 화면을 유지했으며, 영문이 없는 신고·ESG 문구는 한국어 원문을 유지합니다. 모든 내부 페이지·에셋은 상대 경로입니다.

## 퍼블리싱 범위

메뉴·언어 전환·모바일 메뉴·게시판 목록/상세/쓰기·폼 입력 UI를 확인할 수 있습니다. 게시글과 답변은 샘플이며 실제 접수·글쓰기·삭제·비밀번호 인증·문의 전송은 하지 않습니다. 입력값도 저장하지 않습니다.

제공된 메인 동영상 `video/video.mp4`는 유지했습니다. 별도 국문/영문 홍보영상과 일부 이전 화면 이미지·브로슈어는 원본에 없어 안내 표시로 대체했습니다. `MISSING_ASSETS.md`에 기록했습니다. 지도는 서버/API 의존성을 제거하고 주소와 외부 카카오맵 링크를 표시합니다.

## GitHub Pages

상위 포트폴리오 저장소에서 `portfolio/gp/` 폴더 전체를 커밋·푸시하면 기존 배포 구성으로 사용할 수 있습니다. 별도 하위 Git 저장소나 GP 전용 빌드는 필요하지 않습니다.

예상 공개 주소: `https://winawork.github.io/portfolio/gp/`

현재 작업에서는 원격 커밋·푸시·배포를 수행하지 않습니다.

## 검증

```sh
python3 scripts/check_static.py
node --check js/preview.js
```

검사 도구는 선택 사항입니다. 화면 확인에는 설치·빌드 과정이 필요하지 않습니다.
