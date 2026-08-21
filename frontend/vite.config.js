import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // scss 설정
  css: {
    modules: {
      // [name]: 파일명 / [local]: 클래스명 / [hash]: 고유 해시값
      generateScopedName: '[name]_[local]_[hash:base64:5]',
    },
  },
  // 서버 설정
  server: {
    proxy: {
      // 일반 사용자용 요청
      "/api": {
        target: "http://localhost:9090",
        changeOrigin: true,
      },
      // 관리자용 요청
      "/api/admin": {
        target: "http://localhost:9090",
        changeOrigin: true,
      },
      //로그인 테스트
      "/api/auth": {
        target: "http://localhost:9090",
        changeOrigin: true,
      },
    },
  },
});
