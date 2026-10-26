# CreateDoodle

![thumbnail](https://4rwpwj6q9lf5hlkz.public.blob.vercel-storage.com/common/images/readme_thumbnail-JOGQ0zTn8dchP7mKKD7M6yHrcjXne4.png)

## 소개

이 프로젝트는 개인용 블로그 목적으로 Next.js를 활용하여 개발된 웹 애플리케이션 입니다.
서버의 연결 없이 정적인 파일만으로 블로그를 만들기 위하여 작성되었습니다.

### 배포 URL

https://createdoodle.dev/

## 기술 스택

- Front-end : `Next.js`
- Styling : `Sass(Scss)`, `Tailwind CSS`
- 기타 : `react-markdown`, `@iconify/react`

## 폴더 구조

```
ㄴsrc
  ㄴcomponents : 컴포넌트를 모아둔 폴더
  ㄴconstants : 상수값들을 모아둔 폴더
  ㄴrepository : api 호출 함수들을 모아둔 폴더
  ㄴhooks : 컴포넌트의 비즈니스 로직을 모아둔 폴더
  ㄴapp : 페이지 컴포넌트를 모아둔 폴더
  ㄴstyle : 공통 스타일을 모아둔 폴더
  ㄴtypes : 공통 타입을 모아둔 폴더
```

## 주요 기능

- 마크다운 (.md) 로 작성된 파일 띄우기
- 포스트 리스트 페이지네이션
- 사이드바 카테고리 기능
- 모바일 반응형 적용

## 학습 내용

이 프로젝트를 통해 다음을 배웠습니다.

- Next.js 의 전반적인 사용방법
- Next.js 의 public 리소스 사용 요령
- Next.js 의 서버 컴포넌트, 클라이언트 컴포넌트 활용 방법
- Sass/Scss, Tailwind CSS 를 통한 전반적인 스타일링 및 반응형 디자인 적용
- 커스텀 훅 작성 방법

## 개선 사항 및 향후 계획

- 검색 기능 추가
- 서브 카테고리 기능 추가
- 검색 엔진 최적화(SEO) 개선
- 포스트 내 이동 가능한 목차 기능 추가
- 포스트 안 프로그래스 바 추가

## SVG 디자인 프론트엔드 구현

`designs/createdoodle/`의 모바일·데스크톱 시안을 기존 글 21개에 연결했습니다.
버튼, 카드, 배지, 입력창, 검색 Dialog, 메뉴 Sheet, 정렬 Select는 shadcn/ui를 사용하고
Tailwind CSS의 공통 색상·타입·반응형 토큰으로 스타일링합니다.

- `components.json`: shadcn 설정. 컴포넌트는 `src/components/ui/`에 있습니다.
- `src/app/globals.css`, `tailwind.config.ts`: 색상과 레이아웃 토큰. 768px부터 데스크톱 타이포, 1024px부터 사이드바가 표시됩니다.
- `public/fonts/`: Spoqa Han Sans Neo 로컬 웹폰트와 라이선스.
- 기존 `/post/[id]`, `category`, 0부터 시작하는 `page` URL을 유지합니다. `q`는 검색, `sort=oldest`는 오래된순 정렬입니다.
- 카테고리·검색·정렬을 바꾸면 페이지를 초기화합니다. 추천 글은 전체 목록에서 중복하지 않습니다.
- 본문은 로컬 `public/posts/`에서 읽습니다. 원본 내용은 유지하며 목차·코드 복사·URL 공유·읽기 진행률·이전/다음 글을 제공합니다.
- 헤더의 테마 버튼과 모바일 메뉴에서 테마를 바꿀 수 있고, `⌘K` 또는 `Ctrl+K`로 검색을 엽니다.
- `/rss.xml`은 실제 글 목록에서 RSS를 생성합니다.
- 어두운 테마의 역할 배색과 도식 배치는 이 프로젝트를 위한 확장입니다.

```bash
yarn dev       # http://localhost:3001
yarn test      # Node.js 22.18+의 TypeScript 지원을 사용
yarn tsc --noEmit
yarn lint
yarn build
```

구현 화면 PNG는 `designs/implementation/`에 있습니다.
검수: 로직 테스트 5개, 375/390/768/1024/1440px의 홈·본문 레이아웃,
검색·카테고리·정렬·페이지 이동, 목차 위치, 클립보드 복사, 테마 저장, 404, RSS를 확인했습니다.
자동 접근성 검사는 데스크톱·모바일 홈/본문, 모바일 메뉴, 어두운 테마 홈/본문에서 통과했습니다.
실제 기기와 외부 공유 시트는 확인하지 않았습니다.
