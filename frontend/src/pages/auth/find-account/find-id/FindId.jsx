import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { findMemberId } from "../../../../api/findAccount.js";
import Button from "../../../../components/common/button/Button.jsx";
import TextInput from "../../../../components/forms/text-input/TextInput.jsx";
import styles from "../FindAccount.module.scss";

function FindId() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [foundId, setFoundId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const submitting = useRef(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submitting.current) return;
    setError("");
    if (!name.trim() || !/^010\d{8}$/.test(phone)) {
      setError("이름과 올바른 휴대전화 번호를 입력해주세요.");
      return;
    }
    submitting.current = true;
    setLoading(true);
    try {
      const id = await findMemberId({ name: name.trim(), phone });
      if (typeof id !== "string" || !id) throw new Error("아이디를 확인하지 못했습니다. 다시 시도해주세요.");
      setFoundId(id);
    } catch (err) {
      setError(err.message || "아이디 조회에 실패했습니다.");
    } finally {
      submitting.current = false;
      setLoading(false);
    }
  };

  return (
    <section className={styles.content}>
      <h2>아이디 찾기</h2>
      <p className={styles.description}>가입할 때 입력한 이름과 휴대전화 번호를 입력해주세요.</p>

      {foundId ? (
        <>
          <div className={styles.result} role="status">
            <p>회원님의 아이디를 찾았습니다.</p>
            <strong>{foundId}</strong>
          </div>
          <Link className={styles.primaryLink} to="/login">로그인하기</Link>
          <Link className={styles.secondaryLink} to="/supports/find_account/password">비밀번호 찾기</Link>
          <button type="button" className={styles.textButton} onClick={() => { setFoundId(""); setError(""); }}>다시 찾기</button>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <fieldset className={styles.fields} disabled={loading}>
            <TextInput className={styles.input} label="이름" name="findIdName"
              value={name} required maxLength={50} autoComplete="name" placeholder="이름 입력"
              onChange={(event) => setName(event.target.value)} />
            <TextInput className={styles.input} label="휴대전화 번호" name="findIdPhone"
              type="tel" value={phone} required maxLength={13} autoComplete="tel"
              placeholder="휴대전화 번호 입력 (- 제외)"
              onChange={(event) => setPhone(event.target.value.replace(/\D/g, "").slice(0, 11))} />
            {error && <p className={styles.error} role="alert">{error}</p>}
            <Button fullWidth type="submit" disabled={loading}>{loading ? "조회 중..." : "아이디 찾기"}</Button>
          </fieldset>
          <div className={styles.bottomLinks}>
            <Link to="/login">로그인</Link><span aria-hidden="true">|</span><Link to="/signup">회원가입</Link>
          </div>
        </form>
      )}
    </section>
  );
}

export default FindId;
