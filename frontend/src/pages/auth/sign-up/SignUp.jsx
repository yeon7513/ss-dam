import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Address from '../../../components/common/address/Address';
import Button from '../../../components/common/button/Button';
import ProfileImage from './../../../components/common/profile-image/ProfileImage';
import TextInput from './../../../components/forms/text-input/TextInput';
import styles from './SignUp.module.scss';

const SignUp = () => {
  const [form, setForm] = useState({
    id: '',
    password: '',
    name: '',
    phone: '',
  });

  const navigate = useNavigate();

  // 일반 입력 필드
  const handleChangeField = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 이미지 전용
  const handleChangeProfileImg = (file) => {
    if (file) {
      setForm((prev) => ({
        ...prev,
        files: file,
      }));
    }
  };

  const handleTakeAddress = (address) => {
    setForm((prev) => ({
      ...prev,
      address: address,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(form);
  };

  return (
    <div className={styles.signUp}>
      <h2>회원가입 페이지</h2>
      <form method="post" onSubmit={handleSubmit}>
        <div className={styles.idGroup}>
          <TextInput
            name="id"
            label="아이디"
            placeholder="아이디 입력"
            onChange={handleChangeField}
          />
          <Button>중복확인</Button>
        </div>
        <div className={styles.passwordGroup}>
          <TextInput
            type="password"
            name="password"
            label="비밀번호"
            placeholder="비밀번호 입력"
            onChange={handleChangeField}
          />
          <TextInput
            type="password"
            name="password_check"
            label="비밀번호 확인"
            placeholder="비밀번호 확인"
          />
        </div>
        <div className={styles.basicInfoGroup}>
          <TextInput name="name" label="이름" onChange={handleChangeField} />
          <TextInput type="date" name="birth" label="생년월일" />
        </div>
        <div className={styles.phoneGroup}>
          <TextInput
            name="phone"
            label="전화번호"
            onChange={handleChangeField}
          />
        </div>
        <div>
          <Address onChange={handleTakeAddress} />
        </div>
        <div className={styles.profileImgGroup}>
          <ProfileImage onChange={handleChangeProfileImg} />
        </div>
        <div className={styles.submitButton}>
          <Button type="submit">회원가입</Button>
        </div>
      </form>
      <div className={styles.ctaLogin}>
        <p>계정이 있으신가요?</p>
        <Link to="/login">로그인</Link>
      </div>
    </div>
  );
};

export default SignUp;
