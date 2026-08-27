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

  const navigate = useNavigate();

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

    console.log(form);

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
          <div className={styles.passwordGroup}>
            <TextInput
              type="password"
              name="password"
              label="비밀번호"
              placeholder="비밀번호 입력"
              onChange={(e) => handleSetField(e, setForm)}
            />
            <TextInput
              type="password"
              name="password_check"
              label="비밀번호 확인"
              placeholder="비밀번호 확인"
            />
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
          <p>계정이 있을텐데?</p>
          <Link className={styles.loginLink} to="/login">
            로그인
          </Link>
        </div>
      </div>
    </main>
  );
};

export default SignUp;
