// vite-env.d.ts
declare module '*.svg' {
  const content: string;
  export default content;
}

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string; // 예시: 사용자 지정 환경 변수
  // 추가할 변수 정의
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}