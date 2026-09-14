import { useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { handleSetField } from "../../../utils/changeHandler";
import TextInput from "../../forms/text-input/TextInput";
import styles from "./PasswordSection.module.scss";

const passwordRegex =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

const PasswordSection = ({
  form,
  setForm,
  passwordCheck,
  setPasswordCheck,
  isPasswordMatched,
  setIsPasswordMatched,
  passwordError,
  setPasswordError,
}) => {
  const [passwordConfirmError, setPasswordConfirmError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    handleSetField(e, setForm);

    if (!value) {
      setPasswordError("");
    } else if (!passwordRegex.test(value)) {
      setPasswordError(
        "비밀번호는 영문, 숫자, 특수문자를 조합하여 8~20자로 입력해 주세요.",
      );
    } else {
      setPasswordError("");
    }

    setPasswordCheck("");
    setPasswordConfirmError("");
    setIsPasswordMatched(false);
  };

  const handlePasswordCheckChange = (e) => {
    const value = e.target.value;
    setPasswordCheck(value);

    if (!value) {
      setPasswordConfirmError("");
      setIsPasswordMatched(false);
    } else if (form.password !== value) {
      setPasswordConfirmError("비밀번호가 일치하지 않습니다.");
      setIsPasswordMatched(false);
    } else {
      setPasswordConfirmError("비밀번호가 일치합니다.");
      setIsPasswordMatched(true);
    }
  };

  return (
    <>
      <div className={styles.passwordGroup}>
        <div className={styles.inputWithIcon}>
          <TextInput
            type={showPassword ? "text" : "password"}
            name="password"
            label="비밀번호"
            placeholder="비밀번호 입력"
            value={form.password}
            onChange={handlePasswordChange}
          />
        </div>

        <div className={styles.inputWithIcon}>
          <TextInput
            type={showPassword ? "text" : "password"}
            name="password_check"
            label="비밀번호 확인"
            value={passwordCheck}
            placeholder={
              !passwordError && form.password
                ? "비밀번호 확인"
                : "비밀번호 먼저 입력"
            }
            onChange={handlePasswordCheckChange}
            disabled={!form.password || !!passwordError}
          />
          <button
            type="button"
            className={styles.togglePasswordBtn}
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
          >
            {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
          </button>
        </div>
      </div>

      <div className={styles.pwErrorGroup}>
        {passwordError && (
          <span className={styles.errorMessage}>{passwordError}</span>
        )}
        {passwordConfirmError && (
          <span
            className={
              isPasswordMatched ? styles.successMessage : styles.errorMessage
            }
          >
            {passwordConfirmError}
          </span>
        )}
      </div>
    </>
  );
};

export default PasswordSection;
