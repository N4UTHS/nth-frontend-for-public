## 기업 소개 홈페이지 개발 프로젝트
해당 저장소는 프로젝트의 프론트엔드 애플리케이션 저장소입니다.
<br>
코드 공개를 위해 생성된 저장소이며, 실제 운영 환경과 다를 수 있습니다.
<br>
실제 배포 및 개발은 별도의 비공개 저장소에서 진행됩니다.

## 개발 기간
2024년 7월 14일 ~ 8월 30일

## 배포 기간
2024년 8월 30일 ~ 현재

## 시연 영상
```
https://youtu.be/AeV2KVPsxs4?si=C4K39odwoKgtgsog
```
## 프로젝트 구조도
![프로젝트 구조](https://github.com/user-attachments/assets/bc1ae8ca-c34c-4b18-a973-e9230055a44a)

## 핵심 기능
- 드래그 앤 드롭으로 메인 화면에 표시할 이미지 순서 지정
- ReactQuill으로 공지사항 에디터 구현
- NAVER Cloud Platform Web Dynamic Map API로 오시는 길 구현

## 프로젝트 구조 및 설명
```
NTH-Frontend-for-public
├─ package-lock.json
├─ package.json
├─ Dockerfile ───────────────────────────────────── # Docker 이미지 설정 파일
├─ middleware.ts ────────────────────────────────── # 미들웨어
├─ src
│  ├─ apis ──────────────────────────────────────── # API 요청 관리
│  │  ├─ adminPage
│  │  │  ├─ announcement
│  │  │  │  ├─ create
│  │  │  │  │  └─ fetchForAnnouncement.ts
│  │  │  │  ├─ fetchForAdminAnnouncmentList.ts
│  │  │  │  └─ update
│  │  │  ├─ login
│  │  │  │  └─ fetchForAdminLogin.ts
│  │  │  ├─ main-image
│  │  │  │  └─ fetchForMainImages.ts
│  │  │  └─ subsidiaries
│  │  │     └─ fetchForSubsidiaries.ts
│  │  └─ userPage
│  │     ├─ announcement
│  │     │  ├─ fetchForAllAnnouncements.ts
│  │     │  └─ fetchForSingleAnnouncement.ts
│  │     └─ subsidiaries
│  │        └─ fetchForSubsidiaries.ts
│  ├─ app ────────────────────────────────────────── # 애플리케이션 
│  │  ├─ announcement
│  │  │  ├─ [id]
│  │  │  │  └─ page.tsx
│  │  │  └─ page.tsx
│  │  ├─ favicon.ico
│  │  ├─ fonts
│  │  │  ├─ GeistMonoVF.woff
│  │  │  └─ GeistVF.woff
│  │  ├─ globals.css
│  │  ├─ layout.tsx
│  │  ├─ page.tsx
│  │  ├─ secret
│  │  │  └─ urls
│  │  │     └─ for
│  │  │        └─ admin
│  │  │           ├─ announcement
│  │  │           │  ├─ create
│  │  │           │  │  └─ page.tsx
│  │  │           │  ├─ page.tsx
│  │  │           │  └─ update
│  │  │           │     └─ [id]
│  │  │           │        └─ page.tsx
│  │  │           ├─ home-image
│  │  │           │  └─ page.tsx
│  │  │           ├─ login
│  │  │           │  └─ page.tsx
│  │  │           └─ subsidiaries
│  │  │              └─ page.tsx
│  │  ├─ subsidiaries
│  │  │  └─ page.tsx
│  │  └─ waytocome
│  │     └─ page.tsx
│  ├─ components ─────────────────────────────────── # 컴포넌트
│  │  ├─ Admin
│  │  │  ├─ AdminNavigation.tsx
│  │  │  └─ Announcement
│  │  │     └─ List.tsx
│  │  ├─ NormalUserPage
│  │  │  ├─ Announcement
│  │  │  │  └─ List.tsx
│  │  │  ├─ Subsidiaries
│  │  │  │  └─ List.tsx
│  │  │  └─ WayToCome
│  │  │     ├─ Map.tsx
│  │  │     └─ TransportationInfo.tsx
│  │  ├─ UI
│  │  │  └─ Loading.tsx
│  │  └─ layout
│  │     ├─ ClientWrapper.tsx
│  │     ├─ Footer.tsx
│  │     └─ Navigation.tsx
│  ├─ hooks ──────────────────────────────────────── # 상태 관리
│  │  ├─ adminPage
│  │  │  ├─ announcement
│  │  │  │  ├─ create
│  │  │  │  │  └─ useAnnouncment.ts
│  │  │  │  ├─ update
│  │  │  │  └─ useAdminAnnouncementList.ts
│  │  │  ├─ login
│  │  │  │  └─ useAdminLogin.ts
│  │  │  ├─ main-image
│  │  │  │  └─ useMainImageManage.ts
│  │  │  └─ subsidiaries
│  │  │     └─ useAdminSubsidiaries.ts
│  │  └─ userPage
│  │     ├─ announcement
│  │     │  ├─ useAnnouncement.ts
│  │     │  └─ useAnnouncements.ts
│  │     └─ subsidiaries
│  │        └─ useSubsidiaries.ts
│  ├─ public
│  │  ├─ f_logo1.png
│  │  ├─ f_logo2.png
│  │  ├─ favicon.ico
│  │  ├─ logo.png
│  │  ├─ logo_title.png
│  │  ├─ next.svg
│  │  ├─ test.png
│  │  └─ vercel.svg
│  ├─ types ──────────────────────────────────────── # 타입 관리
│  │  └─ Props.ts
│  └─ utils
├─ tailwind.config.ts
└─ tsconfig.json
```
