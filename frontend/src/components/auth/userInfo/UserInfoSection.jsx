import { useState } from "react";
import { handleSetField } from "../../../utils/changeHandler";
import TextInput from "../../forms/text-input/TextInput";
import styles from "./UserInfoSection.module.scss";
import { formatPhoneNumber } from "../../../utils/formatNumber.js";

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
    const formattedPhone = formatPhoneNumber(e, setPhoneError);

    setForm((prev) => ({ ...prev, phone: formattedPhone }));
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
