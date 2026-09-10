import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sendToSignup } from "../../../api/member";

import IdSection from "../../../components/auth/id/IdSection";
import PasswordSection from "../../../components/auth/password/PasswordSection";
import UserInfoSection from "../../../components/auth/userInfo/UserInfoSection";
import AddressSection from "../../../components/auth/address/AddressSection";
import ProfileImageSection from "../../../components/auth/profile-image/ProfileImageSection";

import Button from "../../../components/common/button/Button";
import styles from "./SignUp.module.scss";

const phoneRegex = /^010\d{8}$/;
const passwordRegex =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

const SignUp = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    id: "",
    password: "",
    name: "",
    birth: "",
    phone: "",
    address: "",
    detailAddress: "",
    file: null,
  });

  const [isIdChecked, setIsIdChecked] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isPasswordMatched, setIsPasswordMatched] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") e.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.id.trim()) return alert("아이디를 입력해 주세요.");
    if (!isIdChecked) return alert("아이디 중복확인을 진행해 주세요.");

    if (!form.password) return alert("비밀번호를 입력해 주세요.");
    if (!passwordRegex.test(form.password))
      return alert("비밀번호 형식을 확인해 주세요.");
    if (!passwordCheck) return alert("비밀번호 확인을 입력해 주세요.");
    if (!isPasswordMatched) return alert("비밀번호가 일치하지 않습니다.");

    const cleanName = form.name.trim();
    if (!cleanName) return alert("이름을 입력해 주세요.");
    if (cleanName.length < 2 || cleanName.length > 20)
      return alert("이름은 2자 이상 20자 이하로 입력해 주세요.");

    const nameRegex = /^[가-힣a-zA-Z\s]+$/;
    if (!nameRegex.test(cleanName) || /[ㄱ-ㅎㅏ-ㅣ]/.test(cleanName)) {
      return alert("이름은 올바른 한글 또는 영문으로만 입력해 주세요.");
    }

    if (!form.birth) return alert("생년월일을 선택해 주세요.");
    if (!form.phone.trim()) return alert("전화번호를 입력해 주세요.");
    if (!phoneRegex.test(form.phone.replace(/-/g, ""))) {
      return alert("올바른 전화번호 형식(11자리 숫자)을 입력해 주세요.");
    }
    if (!form.address) return alert("주소를 입력해 주세요.");
    if (!form.detailAddress || !form.detailAddress.trim()) {
      return alert("상세 주소를 입력해 주세요.");
    }

    sendToSignup({ ...form, name: cleanName }, navigate);
  };

  return (
    <main className={styles.signUpPage}>
      <div className={styles.signUpContainer}>
        <h2>회원가입</h2>
        <form method="post" onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
          <IdSection
            form={form}
            setForm={setForm}
            isIdChecked={isIdChecked}
            setIsIdChecked={setIsIdChecked}
          />

          <PasswordSection
            form={form}
            setForm={setForm}
            passwordCheck={passwordCheck}
            setPasswordCheck={setPasswordCheck}
            isPasswordMatched={isPasswordMatched}
            setIsPasswordMatched={setIsPasswordMatched}
            passwordError={passwordError}
            setPasswordError={setPasswordError}
          />

          <UserInfoSection form={form} setForm={setForm} />

          <AddressSection setForm={setForm} />

          <ProfileImageSection setForm={setForm} />

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
