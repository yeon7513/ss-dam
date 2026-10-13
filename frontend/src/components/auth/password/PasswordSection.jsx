import { useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { handleSetField } from "../../../utils/changeHandler";
import TextInput from "../../forms/text-input/TextInput";
import styles from "./PasswordSection.module.scss";

/**
 * 비밀번호 및 비밀번호 확인 입력 섹션 컴포넌트
 *
 * @component
 * @param {Object} props - 컴포넌트 Props
 * @param {Object} props.form - 부모 컴포넌트의 폼 상태 객체 (예: { password: "" })
 * @param {React.Dispatch<React.SetStateAction<Object>>} props.setForm - 폼 상태 변경 함수
 * @param {string} props.passwordCheck - 비밀번호 확인 입력값
 * @param {React.Dispatch<React.SetStateAction<string>>} props.setPasswordCheck - 비밀번호 확인 입력값 변경 함수
 * @param {boolean} props.isPasswordMatched - 비밀번호와 비밀번호 확인의 일치 여부 상태값
 * @param {React.Dispatch<React.SetStateAction<boolean>>} props.setIsPasswordMatched - 비밀번호 일치 여부 변경 함수
 * @param {string} props.passwordError - 비밀번호 유효성 에러 메시지
 * @param {React.Dispatch<React.SetStateAction<string>>} props.setPasswordError - 비밀번호 유효성 에러 메시지 변경 함수
 *
 * @example
 * const [form, setForm] = useState({ password: "" });
 * const [passwordCheck, setPasswordCheck] = useState("");
 * const [isPasswordMatched, setIsPasswordMatched] = useState(false);
 * const [passwordError, setPasswordError] = useState("");
 *
 * <PasswordSection
 *   form={form}
 *   setForm={setForm}
 *   passwordCheck={passwordCheck}
 *   setPasswordCheck={setPasswordCheck}
 *   isPasswordMatched={isPasswordMatched}
 *   setIsPasswordMatched={setIsPasswordMatched}
 *   passwordError={passwordError}
 *   setPasswordError={setPasswordError}
 * />
 */

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
            icon={
              <button
                type="button"
                className={styles.togglePasswordBtn}
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
              >
                {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
              </button>
            }
            disabled={!form.password || !!passwordError}
          />
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
