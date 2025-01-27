# 🚗 Parking Lot Reservation

## 🌟 프로젝트 소개

주차장 예약 서비스의 프로토타입 프로젝트입니다.
이 서비스를 통해 사용자들은 간편하게 주차장을 예약하고 관리할 수 있습니다.

---

## ⚙️ 초기 설정

프로젝트를 클론한 후 다음 명령어를 실행하여 의존성을 설치하세요:

```bash
yarn install
```

---

## ✅ 커밋 주의 사항

`git commit` 명령어를 입력한 후, 아래 형식에 따라 커밋 메시지를 작성해주세요:

```bash
# .gitmessage.txt 파일을 참고해주세요.
#
# [타입]: [제목] [#이슈번호]
#
# 제목은 50자를 넘지 않도록 간결히 작성합니다.
# 본문은 72자 단위로 줄바꿈을 하고, 필요한 경우 상세 설명을 추가합니다.
# 이슈번호는 해당 커밋이 해결하는 이슈번호를 작성합니다.
#
# 타입 예시:
# feat: 새로운 기능 추가
# fix: 버그 수정
# docs: 문서 수정
# style: 코드 스타일 변경 (기능 변경 없음)
# refactor: 코드 리팩토링
# test: 테스트 추가 또는 수정
# chore: 기타 작업
#
# 예시
# feat: 로그인 페이지 추가 #123
# fix: API 응답 오류 수정 #456
```

> **⚠️ 주의:** 커밋 메시지 형식을 맞추지 않으면 커밋이 되지 않습니다.

---

## 📚 Storybook

컴포넌트 문서를 확인하려면 다음 명령어를 실행하세요:

```bash
yarn storybook
```

Storybook이 로컬 서버에서 실행되며, 브라우저에서 컴포넌트 라이브러리를 확인할 수 있습니다.

---

## 🚀 프로젝트 실행

개발 서버를 실행하려면 다음 명령어를 사용하세요:

```bash
yarn dev
```

> **ℹ️ 참고:** `yarn dev` 실행 시 Mock API Worker가 동작하여 UI 상호작용이 가능합니다.  
> 새로 고침 시 데이터는 초기화되며, 이를 원하지 않을 경우 `src/mocks/handler.js`에서  
> `initializeStorages();` 함수를 주석 처리하면 데이터 초기화 없이 지속성이 유지됩니다.

---

## 🛠 주요 스크립트

| 명령어           | 설명               |
| ---------------- | ------------------ |
| `yarn install`   | 의존성 설치        |
| `yarn dev`       | 개발 서버 실행     |
| `yarn build`     | 프로덕션 빌드 생성 |
| `yarn storybook` | Storybook 실행     |

---

# 📂 프로젝트 폴더 구조

```
.
├── .husky/               # Git 훅 관리와 관련된 설정 파일
├── .storybook/           # Storybook 설정 파일
├── node_modules/         # 설치된 의존성 패키지
├── public/               # 정적 파일(이미지, 아이콘 등)
├── src/                  # 프로젝트 소스 코드
│   ├── api/              # API 요청 및 관련 함수
│   ├── assets/           # 이미지 및 정적 자산
│   ├── components/       # UI 컴포넌트 관리
│   │   ├── Feature/      # 특정 기능 관련 컴포넌트
│   │   ├── Module/       # 모듈 단위 컴포넌트
│   │   └── UI/           # 기본 UI 요소 컴포넌트
│   ├── config/           # 프로젝트 전역 설정
│   ├── constants/        # 상수값 정의
│   ├── hooks/            # React 커스텀 훅
│   │   ├── handler/      # 핸들러 관련 훅
│   │   └── query/        # 쿼리 관련 훅
│   ├── mocks/            # Mock 데이터 및 API 핸들러
│   │   ├── browser.js    # 브라우저 환경 Mock 설정
│   │   └── handlers.js   # Mock API 핸들러
│   ├── pages/            # 화면 페이지 컴포넌트
│   ├── router/           # 라우팅 관련 파일
│   ├── store/            # 전역 상태 관리 (Redux 등)
│   └── utils/            # 유틸리티 함수 모음
├── App.jsx               # React 애플리케이션 진입점
├── index.css             # 전역 스타일 파일
├── main.jsx              # 애플리케이션 엔트리 포인트
├── vite.config.js        # Vite 설정 파일
├── lefthook.yml          # Lefthook 설정 파일
├── package.json          # 프로젝트 설정 파일
├── ...                   # 기타 설정 파일
```

### 📋 주요 파일 및 폴더 설명

#### 루트 디렉토리

- **.husky/**: Git 훅 관련 설정 파일로, 커밋 전/후 특정 작업 자동 실행을 설정합니다.
- **.storybook/**: Storybook 실행과 관련된 설정 파일들이 저장된 폴더입니다.
- **node_modules/**: 설치된 모든 의존성 패키지들이 저장된 폴더입니다.
- **public/**: 이미지, 아이콘 등 정적 자산이 저장됩니다.
- **src/**: 프로젝트의 핵심 소스 코드가 위치합니다.
  - **api/**: 서버와 통신하는 API 요청 코드가 포함됩니다.
  - **assets/**: 프로젝트에서 사용하는 이미지 및 정적 파일들이 저장됩니다.
  - **components/**: 재사용 가능한 UI 컴포넌트들이 포함됩니다.
  - **config/**: 환경 설정 및 초기화 관련 파일이 위치합니다.
  - **constants/**: 프로젝트에서 전역적으로 사용하는 상수값들이 관리됩니다.
  - **hooks/**: React 커스텀 훅 코드가 포함됩니다.
  - **mocks/**: Mock 데이터 및 API 핸들러 파일들이 저장됩니다.
  - **pages/**: 애플리케이션의 주요 페이지 컴포넌트가 포함됩니다.
  - **router/**: 페이지 이동 및 라우팅 로직이 관리됩니다.
  - **store/**: Redux와 같은 상태 관리 관련 코드가 포함됩니다.
  - **utils/**: 공통적으로 사용하는 유틸리티 함수들이 저장됩니다.

#### 주요 파일

- **App.jsx**: React 애플리케이션의 최상위 컴포넌트 파일입니다.
- **index.css**: 애플리케이션의 전역 스타일을 정의합니다.
- **main.jsx**: React 애플리케이션의 엔트리 포인트로, DOM에 컴포넌트를 렌더링합니다.
- **vite.config.js**: Vite 개발 환경 및 빌드 설정 파일입니다.
- **package.json**: 프로젝트의 의존성 버전 관리를 위한 파일입니다.

#### 설정 파일

- **.eslint.cjs**: 코드 스타일 및 오류를 확인하는 ESLint 설정 파일입니다.
- **.gitignore**: Git에서 추적하지 않을 파일/폴더 목록을 정의합니다.
- **.gitmessage.txt**: Git 커밋 메시지 작성 시 사용할 템플릿을 지정합니다.
- **.lintstagedrc.json**: lint-staged 설정 파일로, 커밋 단계에서 코드 품질 검사를 수행합니다.
- **.prettierignore**: Prettier 포맷팅에서 제외할 파일/폴더를 정의합니다.
- **.prettierrc**: 코드 포맷팅 규칙을 정의한 Prettier 설정 파일입니다.
- **lefthook.yml**: Lefthook 설정 파일로, Git 훅을 관리합니다.
- **yarn.lock**: 프로젝트의 의존성 버전 관리를 위한 파일입니다.
