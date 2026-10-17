import React, { useState } from 'react';
import styles from "../../../pages/my-page/points/point-transfer/PointTransfer.module.scss";
import TextInput from "../../forms/text-input/TextInput.jsx";
import { CgAsterisk } from "react-icons/cg";
import { HiEye, HiEyeOff } from "react-icons/hi";

function AccountPasswordInput({
  label,
  isRequired = true,
  setPassword,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const textInputLabel = isRequired
    ? <>{label} <CgAsterisk className={styles.requiredIcon} /></>
    : label;

  return (
    <div className={styles.passwordCheck}>
      <TextInput
        label={textInputLabel}
        type={showPassword ? "text" : "password"}
        name="password"
        placeholder="계정 비밀번호를 입력하세요."
        onChange={(e) => setPassword(e.target.value)}
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
      />
    </div>
  );
}

export default AccountPasswordInput;
