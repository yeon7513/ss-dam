import { useState } from "react";
import { CgAsterisk } from "react-icons/cg";
import { HiEye, HiEyeOff } from "react-icons/hi";
import TextInput from "../../../../../components/forms/text-input/TextInput.jsx";
import SelectBox from "../../../../../components/forms/select-box/SelectBox.jsx";
import { useLoadData } from "../../../../../hooks/useLoadData.js";
import styles from "../PointTransfer.module.scss";

const BANKS = [
  { code: "KB", name: "KB국민은행" },
  { code: "SHINHAN", name: "신한은행" },
  { code: "WOORI", name: "우리은행" },
  { code: "HANA", name: "하나은행" },
  { code: "NH", name: "NH농협은행" },
  { code: "IBK", name: "IBK기업은행" },
  { code: "KAKAO", name: "카카오뱅크" },
  { code: "TOSS", name: "토스뱅크" },
  { code: "K", name: "케이뱅크" },
  { code: "POST", name: "우체국" },
];

function PointWithdrawal({ onCancel }) {
  const { data: balance, loading, error } = useLoadData("/api/point/balance");
  const [amount, setAmount] = useState("");
  const [bank, setBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [memo, setMemo] = useState("");
  const [message, setMessage] = useState("");

  const amountNumber = Number(amount);
  const validAmount = Number.isSafeInteger(amountNumber) && amountNumber >= 1;
  const exceedsBalance = !loading && !error && balance != null && amountNumber > Number(balance);
  const canSubmit = !loading && !error && balance != null && validAmount
    && !exceedsBalance && bank && accountNumber && password.trim();
  const required = <CgAsterisk className={styles.requiredIcon} />;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!canSubmit) return;
    // 기존 /exchange는 계좌 정보를 처리하지 않으므로 여기서 잔액을 차감하지 않는다.
    setMessage("현재 계좌 출금은 준비 중입니다. 포인트는 차감되지 않았습니다.");
    setPassword("");
  };

  return (
    <form className={styles.pointRemittance} onSubmit={handleSubmit}>
      {/* 출금 포인트 + 실제 보유 잔액 */}
      <div className={styles.withdrawalAmount}>
        <TextInput
          label={<>출금할 포인트 {required}</>}
          type="number" name="withdrawalAmount" value={amount}
          min="1" step="1" max={balance ?? undefined} required
          placeholder="1그루 이상 입력하세요."
          onChange={(event) => { setAmount(event.target.value); setMessage(""); }}
        />
        <div className={styles.balanceRow}>
          <span>출금 가능 포인트</span>
          <strong>{loading ? "조회 중" : error || balance == null ? "조회 실패" : `${Number(balance).toLocaleString("ko-KR")}그루`}</strong>
        </div>
        {exceedsBalance && <p className={styles.fieldError} role="alert">출금 가능한 포인트를 초과했습니다.</p>}
      </div>

      {/* 출금 계좌 */}
      <fieldset className={styles.withdrawalAccount}>
        <legend>출금 계좌 {required}</legend>
        <div className={styles.accountRow}>
          <SelectBox name="withdrawalBank" options={BANKS} selectedValue={bank}
            placeholder="은행 선택" onChange={(event) => setBank(event.target.value)} />
          <TextInput name="withdrawalAccountNumber" value={accountNumber}
            aria-label="출금 계좌번호" inputMode="numeric" required maxLength={20}
            placeholder="계좌번호를 입력하세요."
            onChange={(event) => setAccountNumber(event.target.value.replace(/[^0-9]/g, ""))} />
        </div>
      </fieldset>

      {/* 계정 비밀번호 (보기/숨기기) */}
      <TextInput
        label={<>내 쓰담쓰담 비밀번호 {required}</>}
        type={showPassword ? "text" : "password"}
        name="withdrawalPassword" value={password} required
        autoComplete="current-password"
        placeholder="내 쓰담쓰담 비밀번호를 입력하세요."
        onChange={(event) => setPassword(event.target.value)}
        icon={<button type="button" className={styles.withdrawalPasswordToggle}
          onClick={() => setShowPassword((previous) => !previous)}
          aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}>
          {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
        </button>}
      />

      {/* 메모: 최대 100자 */}
      <TextInput label="메모" name="withdrawalMemo" value={memo} maxLength={100}
        placeholder="내용을 입력하세요. (100자 이내)"
        onChange={(event) => setMemo(event.target.value)} />

      <p className={styles.withdrawalNotice} role="status">
        {message || "현재 계좌 출금은 준비 중입니다."}
      </p>

      <div className={`${styles.submit} ${styles.withdrawalActions}`}>
        <button type="submit" disabled={!canSubmit}>출금하기</button>
        <button type="button" className={styles.withdrawalCancel} onClick={onCancel}>취소</button>
      </div>
    </form>
  );
}

export default PointWithdrawal;
