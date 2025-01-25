import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react', // Emotion의 `css` prop 활성화
    }),
    svgr(), // SVG 파일을 React 컴포넌트로 변환
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // 절대 경로 설정
    },
  },
})
