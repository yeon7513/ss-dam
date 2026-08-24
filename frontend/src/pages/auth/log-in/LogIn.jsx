import React, { useState } from "react";
import TextInput from "../../../components/forms/text-input/TextInput";
import Button from "../../../components/common/button/Button";
import { useNavigate } from "react-router-dom";
import styles from "./LogIn.module.scss"; // 로그인 페이지 전용 scss모듈

const LogIn = () => {
  const [memberId, setMemberId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          memberId: memberId,
          password: password,
        }),
        credentials: "include",
      });

      const result = await response.json();
      console.log("백엔드가 준 결과물:", result);

      if (result.success) {
        const userRole = result.data.role;
        const userName = result.data.name;

        sessionStorage.setItem("userRole", userRole);
        sessionStorage.setItem("userName", userName);

        window.dispatchEvent(new Event("loginStateChanged"));

        if (userRole !== "MEMBER") {
          alert("관리자 계정으로 로그인");
          navigate("/admin");
        } else {
          alert(`${userName}님 환영`);
          navigate("/");
        }
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("로그인 중 서버 통신 에러:", error);
      alert("서버와 통신하는 중 문제가 발생했습니다.");
    }
  };

  // 이 아래로만 손댈 것. 퍼블리싱 시작.
  return (
    <main className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <h2>로그인</h2>
        <p className={styles.subTitle}>
          더 나은 순환을 위해 다시 만나 반가워요!
        </p>
        <form method="post" onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <TextInput
              className={styles.loginInput}
              name="id"
              label="아이디"
              placeholder="아이디 입력"
              value={memberId}
              onChange={(e) => setMemberId(e.target.value)}
            />
            <TextInput
              className={styles.loginInput}
              type="password"
              name="password"
              label="비밀번호"
              placeholder="비밀번호 입력"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button className={styles.loginButton} type="submit">
            로그인
          </Button>

          <Button
            className={styles.signupButton}
            type="button"
            onClick={() => navigate("/signup")}
          >
            회원가입
          </Button>
        </form>
      </div>
    </main>
  );
};

export default LogIn;
