import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { changeMemberPassword, findMemberPassword } from "../../../../api/findAccount.js";
import Button from "../../../../components/common/button/Button.jsx";
import TextInput from "../../../../components/forms/text-input/TextInput.jsx";
import styles from "../FindAccount.module.scss";

function PasswordInput({ name, label, value, onChange }) {
  const [visible, setVisible] = useState(false);
  return (
    <TextInput className={styles.input} label={label} name={name}
      type={visible ? "text" : "password"} value={value} required maxLength={20}
      autoComplete="new-password" placeholder={label} onChange={onChange}
      icon={<button type="button" className={styles.passwordToggle}
        aria-label={visible ? "비밀번호 숨기기" : "비밀번호 보기"}
        onClick={() => setVisible((previous) => !previous)}>
        {visible ? <HiEyeOff size={20} /> : <HiEye size={20} />}
      </button>} />
  );
}

function FindPassword() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [memberCode, setMemberCode] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [complete, setComplete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const submitting = useRef(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submitting.current) return;
    setError("");

    if (memberCode == null) {
      if (!id.trim() || !name.trim() || !/^010\d{8}$/.test(phone)) {
        setError("아이디, 이름과 올바른 휴대전화 번호를 입력해주세요.");
        return;
      }
    } else {
      if (!/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(password)) {
        setError("비밀번호는 8~20자의 영문·숫자·특수문자(@$!%*?&)를 포함해야 합니다.");
        return;
      }
      if (password !== passwordCheck) {
        setError("비밀번호 확인이 일치하지 않습니다.");
        return;
      }
    }

    submitting.current = true;
    setLoading(true);
    try {
      if (memberCode == null) {
        const code = await findMemberPassword({ id: id.trim(), name: name.trim(), phone });
        if (!Number.isSafeInteger(Number(code)) || Number(code) <= 0) {
          throw new Error("회원 정보를 확인하지 못했습니다. 다시 시도해주세요.");
        }
        setMemberCode(Number(code));
      } else {
        await changeMemberPassword({ code: memberCode, password });
        setPassword("");
        setPasswordCheck("");
        setMemberCode(null);
        setComplete(true);
      }
    } catch (err) {
      setError(err.message || "비밀번호 찾기에 실패했습니다.");
    } finally {
      submitting.current = false;
      setLoading(false);
    }
  };

  return (
    <section className={styles.content}>
      <h2>{complete ? "비밀번호 변경 완료" : memberCode != null ? "새 비밀번호 설정" : "비밀번호 찾기"}</h2>
      <p className={styles.description}>
        {complete ? "새 비밀번호로 다시 로그인해주세요."
          : memberCode != null ? "사용하실 새 비밀번호를 입력해주세요."
            : "가입할 때 입력한 회원 정보를 입력해주세요."}
      </p>

      {complete ? (
        <>
          <div className={styles.result} role="status"><p>비밀번호가 변경되었습니다.</p></div>
          <Link className={styles.primaryLink} to="/login">로그인하기</Link>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <fieldset className={styles.fields} disabled={loading}>
            {memberCode == null ? (
              <>
                <TextInput className={styles.input} label="아이디" name="findPasswordId"
                  value={id} required autoComplete="username" placeholder="아이디 입력"
                  onChange={(event) => setId(event.target.value)} />
                <TextInput className={styles.input} label="이름" name="findPasswordName"
                  value={name} required maxLength={50} autoComplete="name" placeholder="이름 입력"
                  onChange={(event) => setName(event.target.value)} />
                <TextInput className={styles.input} label="휴대전화 번호" name="findPasswordPhone"
                  type="tel" value={phone} required maxLength={13} autoComplete="tel"
                  placeholder="휴대전화 번호 입력 (- 제외)"
                  onChange={(event) => setPhone(event.target.value.replace(/\D/g, "").slice(0, 11))} />
              </>
            ) : (
              <>
                <PasswordInput name="newPassword" label="새 비밀번호" value={password}
                  onChange={(event) => setPassword(event.target.value)} />
                <p className={styles.passwordHint}>8~20자의 영문, 숫자, 특수문자(@$!%*?&) 포함</p>
                <PasswordInput name="newPasswordCheck" label="새 비밀번호 확인" value={passwordCheck}
                  onChange={(event) => setPasswordCheck(event.target.value)} />
              </>
            )}

            {error && <p className={styles.error} role="alert">{error}</p>}
            <Button fullWidth type="submit" disabled={loading}>
              {loading ? "처리 중..." : memberCode == null ? "회원 정보 확인" : "비밀번호 변경"}
            </Button>
            {memberCode != null && (
              <Button fullWidth btnStyle="outline" onClick={() => {
                setMemberCode(null); setPassword(""); setPasswordCheck(""); setError("");
              }}>이전으로</Button>
            )}
          </fieldset>
          <div className={styles.bottomLinks}>
            <Link to="/login">로그인</Link><span aria-hidden="true">|</span><Link to="/supports/find_account/id">아이디 찾기</Link>
          </div>
        </form>
      )}
    </section>
  );
}

export default FindPassword;
