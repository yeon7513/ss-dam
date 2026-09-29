import { createContext, useEffect, useState } from "react";

// 로그인 상태를 전역으로 관리하기 위해 context api로 설정함.

const AuthContext = createContext(null);

export function AuthContext({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 앱 마운트 시 세션 검증
  useEffect(() => {
    const checkAuthStauts = async () => {
      // 세션에 저장된 role 정보가 없으면 검증은 패스 -> 비로그인 상태
      if (!sessionStorage.getItem("userRole")) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/auth/check", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const result = await response.json();
          // 가져온 사용자 정보를 세션 스토리지 및 state에 저장

          const loggedInUser = {
            code: result.data.code,
            role: result.data.role,
            name: result.data.name,
          }

          sessionStorage.setItem("userCode", result.data.code);
          sessionStorage.setItem("userRole", result.data.role);
          sessionStorage.setItem("userName", result.data.name);
        } else {
          sessionStorage.clear();

          window.dispatchEvent(new Event("loginStateChanged"));
          alert("세션이 만료되었습니다. 다시 로그인해 주세요.");

          window.location.href = "/login";
        }
      } catch (err) {
        console.error("세션 검증 통신 에러", err);
      }
    };
    checkAuthStauts();
  }, []);
}
