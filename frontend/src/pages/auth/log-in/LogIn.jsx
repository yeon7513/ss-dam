import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../../components/common/button/Button";
import TextInput from "../../../components/forms/text-input/TextInput";
import styles from "./LogIn.module.scss";
import { useAuth } from "../../../context/AuthContext.jsx"; // 로그인 페이지 전용 scss모듈

const LogIn = () => {
  const [memberId, setMemberId] = useState("");
  const [password, setPassword] = useState("");
  // const [] = useState(false);
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
        navigate("/");
      } else {
        alert("관리자 계정으로 로그인");
        navigate("/admin");
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
          <Button className={styles.loginButton} type="submit" fullWidth>
            로그인
          </Button>

          <Button
            className={styles.signupButton}
            type="button"
            size="lg"
            onClick={() => navigate("/signup")}
            fullWidth
          >
            회원가입
          </Button>

          <div className={styles.ctaAuthLinks}>
            <p>계정 정보를 잊으셨나요?</p>
            <div className={styles.linkGroup}>
              <Link className={styles.subLink} to="#">
                아이디 찾기
              </Link>
              <span className={styles.divider}>|</span>
              <Link className={styles.subLink} to="#">
                비밀번호 찾기
              </Link>
              <span className={styles.divider}>|</span>
              <Link className={styles.subLink} to="#">
                회원가입
              </Link>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default LogIn;
