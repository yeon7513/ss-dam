import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Button from "../../../components/common/button/Button";
import TextInput from "../../../components/forms/text-input/TextInput";
import styles from "./LogIn.module.scss";
import { useAuth } from "../../../context/AuthContext.jsx"; // 로그인 페이지 전용 scss모듈

const LogIn = () => {
  /* 로그인 상태 관리 */
  const [memberId, setMemberId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!memberId.trim()) {
      alert("아이디를 입력해 주세요.");
      return;
    }

    if (!password.trim()) {
      alert("비밀번호를 입력해 주세요.");
      return;
    }

    try {
      const loggedInUser = await login({
        id: memberId,
        password: password,
      });

      if (loggedInUser.role === "MEMBER") {
        alert(`${loggedInUser.name}님 환영합니다!`);
        navigate("/", { replace: true });
      } else {
        alert("관리자 계정으로 로그인");
        navigate("/admin", { replace: true });
      }
    } catch (error) {
      console.error("로그인 중 서버 통신 에러:", error);
      alert("서버와 통신하는 중 문제가 발생했습니다.");
    }
  };

  return (
    /* 로그인 페이지 */
    <main className={styles.loginPage}>
      {/* 로그인 컨테이너 */}
      <div className={styles.loginContainer}>
        <h2>로그인</h2>
        {/* 서브 타이틀 */}
        <p className={styles.subTitle}>
          더 나은 순환을 위해 다시 만나 반가워요!
        </p>

        {/* 로그인 정보 입력 양식 */}
        <form method="post" onSubmit={handleSubmit}>
          {/* 입력 그룹 */}
          <div className={styles.inputGroup}>
            {/* 로그인 입력 상자 */}
            <TextInput
              label="아이디"
              placeholder="아이디 입력"
              className={styles.loginInput}
              name="id"
              value={memberId}
              onChange={(e) => setMemberId(e.target.value)}
            />
            <TextInput
              label="비밀번호"
              placeholder="비밀번호 입력"
              className={styles.loginInput}
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* 로그인 버튼 */}
          <Button fullWidth className={styles.loginButton} type="submit">
            로그인
          </Button>

          {/* 회원가입 버튼 */}
          <Button
            size="lg"
            fullWidth
            className={styles.signupButton}
            type="button"
            onClick={() => navigate("/signup")}
          >
            회원가입
          </Button>

          {/* 계정 정보 링크 영역 */}
          <div className={styles.ctaAuthLinks}>
            <p>계정 정보를 잊으셨나요?</p>
            {/* 링크 그룹 */}
            <div className={styles.linkGroup}>
              <Link to="#" className={styles.subLink}>
                아이디 찾기
              </Link>
              <span className={styles.divider}>|</span>
              <Link to="#" className={styles.subLink}>
                비밀번호 찾기
              </Link>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default LogIn;
