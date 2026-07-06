# GeekNews Theme - Chrome Extension

[news.hada.io](https://news.hada.io/) (GeekNews)를 읽기 편한 매거진 스타일로 바꿔주는 크롬 익스텐션입니다.

## 왜 만들었나?

GeekNews는 정보 밀도가 높은 HN 스타일 UI를 사용합니다. 글자가 작고 간격이 촘촘해서 장시간 읽기에 피로감이 있죠. 요즘 트렌디한 뉴스/매거진 페이지처럼 큰 폰트, 넉넉한 줄 간격, 여유로운 여백의 편안한 읽기 경험을 GeekNews에 입히는 것이 목표입니다.

## 디자인 컨셉

### 공통 (매거진 스타일)

- **본문 폰트**: 17px, Pretendard / Noto Sans KR
- **줄 간격**: 1.75 ~ 1.85
- **본문 너비**: 리스트 960px / 아티클 읽기 720px
- **여유로운 여백**: 카드 간 padding 20px, 섹션 간 분리감

### 라이트 테마

- 흰 배경(`#ffffff`), 진한 본문(`#1a1a1a`), 부드러운 메타(`#8a8a8a`)
- 액센트: `#35a79c` (틸)

### 다크 테마 (GeekNews 기존 팔레트)

- 배경 `#1d232c` / 서피스 `#242b35` / 보더 `#2b3442`
- 텍스트 `#e9ecef`, 액센트 `#6666FF`

### 테마 전환

- 브라우저 확장 아이콘 클릭 > 팝업에서 라이트/다크 토글
- `chrome.storage.sync`로 저장, 탭 간 동기화

## 파일 구조

```
geeknews_theme/
├── manifest.json    # Manifest V3 설정 (permissions, content_scripts)
├── content.css      # 핵심 CSS (CSS 변수 + 레이아웃 + 테마)
├── content.js       # 저장된 테마를 <html data-gn-theme="light|dark">로 적용
├── popup.html       # 테마 토글 팝업 UI
├── popup.js         # 팝업 로직 (storage 읽기/쓰기)
└── README.md        # 이 파일
```

## 설치 방법

**Chrome 웹스토어에서 설치 (권장)**

[Chrome 웹스토어에서 설치하기](https://chromewebstore.google.com/detail/aogkcaeoecfahejjkkaifohbebhnjlph?utm_source=item-share-cb)

**개발자 모드로 직접 설치**

1. 이 폴더를 로컬에 클론/다운로드
2. Chrome에서 `chrome://extensions` 이동
3. 우측 상단 **개발자 모드** ON
4. **"압축해제된 확장 프로그램 로드"** 클릭 > 이 폴더 선택
5. [news.hada.io](https://news.hada.io/) 방문하면 자동 적용

## 수정 후 반영

- CSS/JS 수정: `chrome://extensions`에서 확장 프로그램의 **새로고침(↻)** 클릭 > 사이트 새로고침
- manifest.json 수정: 확장 삭제 후 재등록 (보통 ↻만으로도 됨)

## 현재 스타일링 범위

| 영역                       | 상태   | 비고                                                     |
| -------------------------- | ------ | -------------------------------------------------------- |
| 메인 리스트 (`.topic_row`) | 완료   | 블록 레이아웃, grid 제거                                 |
| 토픽 상세 (`.topic`)       | 진행중 | vote+title 정렬 완료, 본문/댓글 계속 개선중              |
| 댓글 (`.comment_thread`)   | 완료   | 뎁스 들여쓰기 유지, 테마 컬러                            |
| 네비게이션                 | 완료   | flex 레이아웃, 검색창 고정폭                             |
| Footer                     | 완료   | 테마 톤 통일                                             |
| Input/Textarea             | 완료   | 다크모드 `color-scheme` 대응, autofill 방지              |
| GeekBots 페이지            | 완료   | 라이트/다크 모드 액센트 컬러 통일, 텍스트·보더 전체 대응 |
| GeekBadge 페이지           | 완료   | 라이트/다크 모드 텍스트·버튼 컬러 대응                   |
| Weekly 페이지              | 완료   | 다크모드 본문 텍스트 컬러 대응                           |
| 후원/서포트 버튼           | 완료   | 라이트/다크 모드 액센트 컬러 통일                        |

## 알려진 이슈 / TODO

- 토픽 상세 페이지 레이아웃 추가 다듬기 필요
- 시스템 테마 자동 감지 옵션 (OS 설정 따라가기)
- 폰트 크기 조절 슬라이더
- 기타 서브 페이지(write, login, profile 등) 스타일링 미적용

## 원본 CSS 충돌 참고

GeekNews 원본 CSS(`main.css`)는 다음과 같은 패턴이 있어 override시 주의 필요:

- `@media (prefers-color-scheme: dark)` 블록에서 input/textarea/a 등 하드코딩 색상
- `:root { color-scheme: dark light }` — 브라우저 UA 폼 렌더링에 영향
- `.topic_row`의 3컬럼 grid (`12px 24px 1fr`) — `grid-column-start: 3` 사용
- `.commentTD { overflow: hidden }` — 하위 요소 잘림 유발
- `.topictitle { word-break: keep-all }` — flex 레이아웃에서 줄바꿈 문제
- `nav .geeknews { width: 4em }` — 고정폭 로고
- `footer { display: table; background: #E5E5E5 }`
- `.u { border-bottom: solid 1px }` — pagination 버튼에도 적용됨

## 버전 로그

| 버전      | 날짜     | 변경 내용                                                                                                                         |
| --------- | -------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **0.1.1** | 26.07.06 | 로그인 시 nav 헤더 줄바꿈 수정, `.curnavitem` 숨김 처리, `a.u` 링크 컬러 accent(틸)로 변경, 글쓰기 페이지 `#watchmsg` 컬러 수정   |
| **0.1.0** | 26.04.16 | 최초 릴리즈 — 메인 리스트·네비게이션·댓글·Footer·Input/Textarea 스타일링, 라이트/다크 테마, GeekBots·GeekBadge·Weekly 페이지 대응 |
