import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

// 로그인 상태를 전역으로 관리하기 위해 context api로 설정함.

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const isAlertShown = useRef(false);

  // loggedInUser 객체 생성 및 세션 저장 (중복 제거)
  const processUserData = (responseData) => {
    const baseData = {
      code: responseData.code,
      id: responseData.id,
      role: responseData.role,
      name: responseData.name,
    };

    const loggedInUser =
      responseData.role === "MEMBER"
        ? {
            ...baseData,
            rating: responseData.rating,
            profileImage: responseData.profileImage,
          }
        : { ...baseData, dept: responseData.dept };

    sessionStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

    return loggedInUser;
  };

  const handleSessionExpired = useCallback(() => {
    setUser(null);
    sessionStorage.removeItem("loggedInUser");

    if (!isAlertShown.current) {
      isAlertShown.current = true;
      alert("세션이 만료되었습니다. 다시 로그인해 주세요");
      isAlertShown.current = false;
      navigate("/login");
    }
  }, [navigate]);

  const checkAuthStauts = useCallback(async () => {
    if (!sessionStorage.getItem("loggedInUser")) {
      setUser(null);
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
        const loggedInUser = processUserData(result.data);
        setUser(loggedInUser);
      } else {
        handleSessionExpired();
      }
    } catch (err) {
      console.error("세션 검증 통신 에러", err);
    } finally {
      setLoading(false);
    }
  }, [handleSessionExpired]);

  // 앱 마운트 시 세션 검증
  useEffect(() => {
    checkAuthStauts();

    const handleFocus = () => {
      if (sessionStorage.getItem("loggedInUser")) {
        checkAuthStauts();
      }
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [checkAuthStauts]);

  const authFetch = async (url, options = {}) => {
    const response = await fetch(url, {
      ...options,
      credentials: "include",
    });

    if (response.status === 401) {
      handleSessionExpired();
      throw new Error("세션이 만료되었습니다");
    }

    return response;
  };

  // 로그인 처리 함수
  const handleLogin = async (loginData) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
      credentials: "include",
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "로그인에 실패했습니다.");
    }

    const loggedInUser = processUserData(result.data);

    setUser(loggedInUser);

    return loggedInUser;
  };

  // 로그아웃 처리 함수
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        sessionStorage.removeItem("loggedInUser");

        alert("로그아웃 되었습니다.");
        setUser(null);

        window.location.href = "/";
      } else {
        alert("로그아웃 처리에 실패했습니다.");
      }
    } catch (err) {
      console.error("로그아웃 통신 오류: ", err);
    }
  };

  if (loading) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        login: handleLogin,
        logout: handleLogout,
        setUser,
        authFetch,
        checkAuthStauts,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth는 AuthProvider 내부에서만 사용할 수 있습니다.");
  }

  return context;
};
