import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { deleteMember } from "../../../../api/memberAccount.js";
import { useAuth } from "../../../../context/AuthContext.jsx";
import styles from "../MemberAccount.module.scss";

export default function Withdraw() {
  const { authFetch, setUser } = useAuth();
  const navigate = useNavigate();
  const submitting = useRef(false);

  const [agreed, setAgreed] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const handleWithdraw = async () => {
    if (!agreed || submitting.current) return;
    if (!window.confirm("정말 회원 탈퇴를 진행하시겠습니까?")) return;

    submitting.current = true;
    setPending(true);
    setError("");

    try {
      await deleteMember(authFetch);
    } catch (err) {
      setError(err.message || "회원 탈퇴에 실패했습니다.");
      submitting.current = false;
      setPending(false);
      return;
    }

    // 탈퇴 API가 서버 세션을 이미 무효화하므로
    // 로그아웃 API를 다시 호출하지 않습니다.
    localStorage.removeItem("loggedInUser");
    alert("회원 탈퇴가 완료되었습니다.");
    setUser(null);
    navigate("/", { replace: true });
  };

  return (
    <section className={styles.panel}>
      <h2>회원 탈퇴</h2>

      <div className={styles.warning}>
        <span aria-hidden="true">⚠</span>
        <h3>잠시만요! 탈퇴하시면 지금까지 모은 ‘그루’와<br />소중한 활동 기록이 모두 사라져요.</h3>
        <p>탈퇴 전, 아래 주의사항을 반드시 확인해 주세요.</p>
      </div>

      <ul className={styles.noticeGrid}>
        <li>
          <span className={styles.noticeIcon} aria-hidden="true">×</span>
          <p>보유하신 ‘그루’가 모두 소멸되며,<br />재가입 시에도 복구되지 않습니다.</p>
        </li>
        <li>
          <span className={styles.noticeIcon} aria-hidden="true">×</span>
          <p>진행 중인 챌린지 기록과<br />작성하신 게시글, 댓글 등<br />모든 활동 데이터가 삭제됩니다.</p>
        </li>
        <li>
          <span className={styles.noticeIcon} aria-hidden="true">×</span>
          <p>다시쓰담을 통해 진행된<br />거래 내역 및 채팅 기록을<br />더 이상 확인할 수 없습니다.</p>
        </li>
        <li>
          <span className={styles.noticeIcon} aria-hidden="true">×</span>
          <p>탈퇴 즉시 개인정보는 파기되며,<br />법령에 의거하여 보관이 필요한<br />정보 외에는 모두 삭제됩니다.</p>
        </li>
      </ul>

      <label className={styles.agreement}>
        <input
          type="checkbox"
          checked={agreed}
          onChange={(event) => setAgreed(event.target.checked)}
          disabled={pending}
        />
        주의사항을 모두 확인했으며, 회원 탈퇴를 진행합니다.
      </label>

      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}

      <div className={styles.centerActions}>
        <button
          type="button"
          className={styles.primary}
          disabled={!agreed || pending}
          onClick={handleWithdraw}
        >
          {pending ? "처리 중..." : "회원 탈퇴"}
        </button>

        <button
          type="button"
          className={styles.secondary}
          disabled={pending}
          onClick={() => navigate("/mypage/edit_profile")}
        >
          취소
        </button>
      </div>
    </section>
  );
}
