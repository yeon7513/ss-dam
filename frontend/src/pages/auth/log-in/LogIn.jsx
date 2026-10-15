import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiEye, HiEyeOff } from "react-icons/hi";
import Button from "../../../components/common/button/Button";
import TextInput from "../../../components/forms/text-input/TextInput";
import { useAuth } from "../../../context/AuthContext.jsx";
import styles from "./LogIn.module.scss";

const LogIn = () => {
  /* 로그인 상태 관리 */
  const [memberId, setMemberId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  /* 인증 컨텍스트 조회 */
  const { login } = useAuth();

  /* 로그인 제출 처리 */
  const handleSubmit = async (e) => {
    // 폼 기본 제출 동작을 방지함.
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

      if (loggedInUser.role.code === "ROLE_MEMBER") {
        alert(`${loggedInUser.name}님 환영합니다!`);

        // 이전 복귀 경로를 조회하여 이동함.
        const returnUrl =
          location.state?.from || sessionStorage.getItem("returnUrl") || "/";
        sessionStorage.removeItem("returnUrl");

        navigate(returnUrl, { replace: true });
      } else {
        alert("관리자 계정으로 로그인");
        navigate("/admin", { replace: true });
      }
    } catch (error) {
      // 로그인 오류 메시지를 출력함.
      console.error("로그인 중 서버 통신 에러:", error);
      alert("서버와 통신하는 중 문제가 발생했습니다.");
    }
  };

  return (
    /* 로그인 페이지 영역 */
    <main className={styles.loginPage}>
      {/* 로그인 컨테이너 영역 */}
      <div className={styles.loginContainer}>
        <h2>로그인</h2>
        {/* 서브 타이틀 영역 */}
        <p className={styles.subTitle}>
          더 나은 순환을 위해 다시 만나 반가워요!
        </p>

        {/* 로그인 양식 영역 */}
        <form method="post" onSubmit={handleSubmit}>
          {/* 입력 그룹 영역 */}
          <div className={styles.inputGroup}>
            {/* 로그인 입력 상자 영역 */}
            <TextInput
              label="아이디"
              placeholder="아이디 입력"
              className={styles.loginInput}
              name="id"
              value={memberId}
              onChange={(e) => setMemberId(e.target.value)}
            />
            {/* 비밀번호 입력 상자 영역 */}
            <div className={styles.passwordInputWrapper}>
              <TextInput
                label="비밀번호"
                placeholder="비밀번호 입력"
                className={styles.loginInput}
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* 비밀번호 표시 버튼 영역 */}
              <button
                className={styles.togglePasswordBtn}
                type="button"
                aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
              </button>
            </div>
          </div>

          {/* 로그인 버튼 영역 */}
          <Button fullWidth className={styles.loginButton} type="submit">
            로그인
          </Button>

          {/* 회원가입 버튼 영역 */}
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
            {/* 링크 그룹 영역 */}
            <div className={styles.linkGroup}>
              <Link to="/supports/find_account/id" className={styles.subLink}>
                아이디 찾기
              </Link>
              <span className={styles.divider}>|</span>
              <Link
                to="/supports/find_account/password"
                className={styles.subLink}
              >
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
