import { useState } from "react";
import { handleSetField } from "../../../utils/changeHandler";
import TextInput from "../../forms/text-input/TextInput";
import styles from "./UserInfoSection.module.scss";

const UserInfoSection = ({ form, setForm }) => {
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const today = new Date().toISOString().split("T")[0];

  const handleNameChange = (e) => {
    const { name, value } = e.target;
    const formattedValue = value.replace(/\s+/g, " ");
    setForm((prev) => ({ ...prev, [name]: formattedValue }));

    const cleanName = formattedValue.trim();
    const nameRegex = /^[가-힣a-zA-Z\s]+$/;

    if (!cleanName) {
      setNameError("");
    } else if (cleanName.length < 2 || cleanName.length > 20) {
      setNameError("이름은 2자 이상 20자 이하로 입력해 주세요.");
    } else if (!nameRegex.test(cleanName) || /[ㄱ-ㅎㅏ-ㅣ]/.test(cleanName)) {
      setNameError("이름은 올바른 한글 또는 영문으로만 입력해 주세요.");
    } else {
      setNameError("");
    }
  };

  const handlePhoneChange = (e) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, "");
    let formattedPhone = rawValue;
    if (rawValue.length > 3 && rawValue.length <= 7) {
      formattedPhone = `${rawValue.slice(0, 3)}-${rawValue.slice(3)}`;
    } else if (rawValue.length > 7) {
      formattedPhone = `${rawValue.slice(0, 3)}-${rawValue.slice(3, 7)}-${rawValue.slice(7, 11)}`;
    }

    setForm((prev) => ({ ...prev, phone: formattedPhone }));

    if (rawValue.length === 0) {
      setPhoneError("");
    } else if (rawValue.length < 11) {
      setPhoneError("휴대폰 번호 11자리를 모두 입력해 주세요.");
    } else if (!rawValue.startsWith("010")) {
      setPhoneError("010으로 시작하는 올바른 번호를 입력해 주세요.");
    } else {
      setPhoneError("");
    }
  };

  return (
    <>
      {/* 이름, 생년월일 영역 */}
      <div className={styles.basicInfoGroup}>
        <TextInput
          name="name"
          label="이름"
          placeholder="실명 입력"
          value={form.name}
          onChange={handleNameChange}
        />
        <TextInput
          type="date"
          name="birth"
          label="생년월일"
          max={today}
          onChange={(e) => handleSetField(e, setForm)}
        />
      </div>

      <div className={styles.nameErrorGroup}>
        {nameError && <span className={styles.errorMessage}>{nameError}</span>}
      </div>

      {/* 휴대폰번호 영역 */}
      <div className={styles.phoneGroup}>
        <TextInput
          name="phone"
          label="휴대폰번호"
          placeholder="010-0000-0000"
          value={form.phone}
          onChange={handlePhoneChange}
          maxLength={13}
        />
      </div>

      <div className={styles.phoneErrorGroup}>
        {phoneError && (
          <span className={styles.errorMessage}>{phoneError}</span>
        )}
      </div>
    </>
  );
};

export default UserInfoSection;
