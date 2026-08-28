import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sendToSignup } from "../../../api/member";
import Address from "../../../components/common/address/Address";
import Button from "../../../components/common/button/Button";
import { handleSetField } from "../../../utils/changeHandler";
import ProfileImage from "./../../../components/common/profile-image/ProfileImage";
import TextInput from "./../../../components/forms/text-input/TextInput";
import styles from "./SignUp.module.scss";

const SignUp = () => {
  const [form, setForm] = useState({
    id: "",
    password: "",
    name: "",
    phone: "",
  });

  // 비밀번호 확인 전용 state
  const [passwordCheck, setPasswordCheck] = useState("");

  // 에러 메시지 state
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");

  // 1. 비밀번호 일치(성공) 상태 관리 state 추가
  const [isPasswordMatched, setIsPasswordMatched] = useState(false);

  const navigate = useNavigate();

  // 비밀번호 정규식 : 영문, 숫자, 특수문자(@$!%*?&) 포함 8~20자
  const passwordRegex =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

  // 비밀번호 변경 핸들러
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    handleSetField(e, setForm);

    if (!value) {
      setPasswordError("");
    } else if (!passwordRegex.test(value)) {
      setPasswordError(
        "비밀번호는 영문, 숫자, 특수문자 포함 8~20자여야 합니다.",
      );
    } else {
      setPasswordError("");
    }

    // 비밀번호확인란과의 일치 여부 재검증
    // 2. 1차 비밀번호 변경 시 일치하면 성공 문구 및 상태 업데이트
    if (passwordCheck) {
      if (value !== passwordCheck) {
        setPasswordConfirmError("비밀번호가 일치하지 않습니다.");
        setIsPasswordMatched(false);
      } else {
        setPasswordConfirmError("성공!"); //성공 내용은 필요없을 듯. 비밀번호확인 초기화하기로 함.
        setIsPasswordMatched(true);
      }
    }
  };

  // 비밀번호 확인 변경 핸들러
  const handlePasswordCheckChange = (e) => {
    const value = e.target.value;
    setPasswordCheck(value);

    // 3. 비동기 State(form.password) 대신 e.target.value에서 직접 가져온 value와 일치하면 성공 처리
    if (!value) {
      setPasswordConfirmError("");
      setIsPasswordMatched(false);
    } else if (form.password !== value) {
      setPasswordConfirmError("비밀번호가 일치하지 않습니다.");
      setIsPasswordMatched(false);
    } else {
      setPasswordConfirmError("비밀번호가 일치합니다!");
      setIsPasswordMatched(true);
    }
  };

  // 이미지 전용
  const handleChangeProfileImg = (file) => {
    if (file) {
      setForm((prev) => ({
        ...prev,
        file: file,
      }));
    }
  };

  // 주소 추가
  const handleTakeAddress = (address) => {
    setForm((prev) => ({
      ...prev,
      address: address,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 제출 전 유효성 검사
    if (!passwordRegex.test(form.password)) {
      alert("비밀번호 형식을 확인해 주세요.");
      return;
    }

    //4. State 상태값(isPasswordMatched)을 직접 체크하도록 검증 개선
    if (!isPasswordMatched) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    sendToSignup(form, navigate);
  };

  // 이 아래로만 손댈 것. 퍼블리싱 시작.
  return (
    <main className={styles.signUpPage}>
      <div className={styles.signUpContainer}>
        <h2>회원가입</h2>
        <form method="post" onSubmit={handleSubmit}>
          <div className={styles.idGroup}>
            <TextInput
              name="id"
              label="아이디"
              placeholder="아이디 입력"
              onChange={(e) => handleSetField(e, setForm)}
            />
            <Button className={styles.checkButton}>중복확인</Button>
          </div>
          <div className={styles.messageContainer}>
            <div className={styles.passwordGroup}>
              <TextInput
                type="password"
                name="password"
                label="비밀번호"
                placeholder="비밀번호 입력"
                onChange={handlePasswordChange}
              />

              <TextInput
                type="password"
                name="password_check"
                label="비밀번호 확인"
                placeholder={
                  !passwordError && form.password
                    ? "비밀번호 확인"
                    : "비밀번호 먼저 입력하세요"
                }
                onChange={handlePasswordCheckChange}
                /* 1차 비밀번호가 없거나 정규식을 통과하지 못하면 비활성화 */
                disabled={!form.password || !!passwordError}
              />
            </div>
            <div className={styles.errorGroup}>
              {passwordError && (
                <span className={styles.errorMessage}>{passwordError}</span>
              )}

              {passwordConfirmError && (
                <span
                  className={
                    isPasswordMatched
                      ? styles.successMessage
                      : styles.errorMessage
                  }
                >
                  {passwordConfirmError}
                </span>
              )}
            </div>
          </div>
          <div className={styles.basicInfoGroup}>
            <TextInput
              name="name"
              label="이름"
              placeholder="실명 입력"
              onChange={(e) => handleSetField(e, setForm)}
            />
            <TextInput type="date" name="birth" label="생년월일" />
          </div>
          <div className={styles.phoneGroup}>
            <TextInput
              name="phone"
              label="전화번호"
              placeholder="'-' 없이 11자리 숫자 입력"
              onChange={(e) => handleSetField(e, setForm)}
            />
          </div>
          <div className={styles.addressGroup}>
            <label className={styles.label}>주소</label>
            <Address onChange={handleTakeAddress} />
          </div>
          <div className={styles.profileImgGroup}>
            <label className={styles.label}>프로필</label>
            <ProfileImage onChange={handleChangeProfileImg} />
          </div>
          <div>
            <Button className={styles.submitButton} type="submit">
              회원가입
            </Button>
          </div>
        </form>
        <div className={styles.ctaLogin}>
          <p>계정이 있으신가요?</p>
          <Link className={styles.loginLink} to="/login">
            로그인
          </Link>
        </div>
      </div>
    </main>
  );
};

export default SignUp;
