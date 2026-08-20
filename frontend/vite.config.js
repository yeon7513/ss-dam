import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
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
