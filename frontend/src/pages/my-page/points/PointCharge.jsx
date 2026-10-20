import { useState } from "react";
import Modal from "../../../components/common/modal/Modal.jsx";
import layout from "./point-transfer/PointTransfer.module.scss";
import styles from "./PointCharge.module.scss";

const CARDS = ["현대카드", "삼성카드", "비씨카드", "신한카드", "KB국민", "롯데카드", "하나카드", "NH농협", "씨티카드", "UnionPay"];
const OTHER_CARDS = ["우리카드", "수협카드", "전북은행", "광주은행", "제주은행"];
const EMPTY_AGREEMENTS = { electronic: false, collection: false, provision: false };

const PointCharge = () => {
  const [agreements, setAgreements] = useState(EMPTY_AGREEMENTS);
  const [showTerms, setShowTerms] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [showComplete, setShowComplete] = useState(false);
  const allAgreed = Object.values(agreements).every(Boolean);
  const canProceed = allAgreed && Boolean(paymentMethod);

  const toggleAgreement = (name, checked) => {
    setAgreements((previous) => ({ ...previous, [name]: checked }));
  };

  const resetForm = () => {
    setAgreements(EMPTY_AGREEMENTS);
    setPaymentMethod("");
    setShowTerms(false);
    setShowComplete(false);
  };

  const handleNext = (event) => {
    event.preventDefault();
    if (!canProceed) return;
    // 결제 UI 미리보기: PG 승인이나 포인트 충전 API를 호출하지 않는다.
    setShowComplete(true);
  };

  const renderMethod = (name) => (
    <label key={name} className={`${styles.paymentOption} ${paymentMethod === name ? styles.selected : ""}`}>
      <input type="radio" name="paymentMethod" value={name}
        checked={paymentMethod === name} onChange={() => setPaymentMethod(name)} />
      <span>{name}</span>
    </label>
  );

  return (
    <div className={layout.pointTransfer}>
      <div className={`${layout.cardWrapper} ${styles.chargeWrapper}`}>
        <form className={`${layout.pointRemittance} ${styles.chargeCard}`} onSubmit={handleNext}>
          <h2 className={styles.brand}>쓰담쓰담 - 그루(포인트) 충전</h2>

          {/* 이용약관: 전체 동의 / 개별 동의 */}
          <section className={styles.termsSection} aria-labelledby="chargeTermsHeading">
            <div className={styles.termsHeader}>
              <h4 id="chargeTermsHeading">이용약관</h4>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" checked={allAgreed}
                  onChange={(event) => setAgreements({
                    electronic: event.target.checked,
                    collection: event.target.checked,
                    provision: event.target.checked,
                  })} />
                전체동의
              </label>
            </div>

            <div className={styles.agreementRow}>
              <span>전자금융거래 이용약관</span>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" checked={agreements.electronic}
                  onChange={(event) => toggleAgreement("electronic", event.target.checked)} />
                동의
              </label>
            </div>
            <div className={styles.personalAgreements}>
              <label className={styles.checkboxLabel}>
                <span>개인정보 수집 및 이용안내</span>
                <input type="checkbox" checked={agreements.collection}
                  onChange={(event) => toggleAgreement("collection", event.target.checked)} />
                동의
              </label>
              <label className={styles.checkboxLabel}>
                <span>개인정보 제공 및 위탁안내</span>
                <input type="checkbox" checked={agreements.provision}
                  onChange={(event) => toggleAgreement("provision", event.target.checked)} />
                동의
              </label>
            </div>

            <div className={styles.termsDivider}>
              <button type="button" className={styles.termsToggle}
                aria-expanded={showTerms} aria-controls="chargeTermsContent"
                onClick={() => setShowTerms((previous) => !previous)}>
                약관{showTerms ? "닫기" : "보기"}
                <svg className={showTerms ? styles.arrowUp : undefined}
                  width="8" height="8" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                  <path d="m2 3.5 3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            {showTerms && (
              <div id="chargeTermsContent" className={styles.termsContent}>
                결제 화면 미리보기입니다. 실제 전자금융거래 이용약관과 개인정보 안내는
                정식 결제 서비스 연결 시 제공됩니다.
              </div>
            )}
          </section>

          {/* 간편결제 */}
          <fieldset className={styles.paymentSection}>
            <legend>간편결제</legend>
            <div className={styles.easyPayments}>
              {["카카오페이", "네이버페이"].map(renderMethod)}
            </div>
          </fieldset>

          {/* 카드결제: 간편결제와 합쳐 한 가지 수단만 선택 */}
          <fieldset className={styles.paymentSection}>
            <legend>카드결제</legend>
            <div className={styles.cardPayments}>
              {CARDS.map(renderMethod)}
              <select aria-label="그 외 카드 선택" className={styles.otherCards}
                value={OTHER_CARDS.includes(paymentMethod) ? paymentMethod : ""}
                onChange={(event) => setPaymentMethod(event.target.value)}>
                <option value="">그 외 카드</option>
                {OTHER_CARDS.map((name) => <option key={name} value={name}>{name}</option>)}
              </select>
            </div>
          </fieldset>

          {/* 하단 취소 / 다음 */}
          <div className={styles.actions}>
            <button type="button" className={styles.cancelButton} onClick={resetForm}>취소</button>
            <button type="submit" className={styles.nextButton} disabled={!canProceed}>다음</button>
          </div>
        </form>
        <p className={styles.previewNotice}>
          화면 미리보기이며 실제 결제 및 그루 충전은 진행되지 않습니다.
        </p>
      </div>

      {/* 다음 버튼 이후 완료 안내창 */}
      <Modal isOpen={showComplete} onClose={resetForm} contentClassName={styles.completeModal}>
        <h2>결제를 완료하였습니다.</h2>
        <p>완료 화면 미리보기입니다. 실제 결제 및 충전 내역은 생성되지 않습니다.</p>
        <button type="button" className={styles.nextButton} onClick={resetForm}>확인</button>
      </Modal>
    </div>
  );
};

export default PointCharge;
