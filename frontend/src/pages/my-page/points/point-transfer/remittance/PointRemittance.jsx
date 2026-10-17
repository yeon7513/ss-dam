import React, { Fragment, useState } from 'react';
import TextInput from "../../../../../components/forms/text-input/TextInput.jsx";
import { CgAsterisk } from "react-icons/cg";
import Button from "../../../../../components/common/button/Button.jsx";
import { HiEye, HiEyeOff } from "react-icons/hi";
import styles from "../PointTransfer.module.scss";
import AmountInput from "../../../../../components/my-page/point-transfer/AmountInput.jsx";
import TransferSummary from "../../../../../components/my-page/point-transfer/TransferSummary.jsx";
import { useLoadData } from "../../../../../hooks/useLoadData.js";
import ReceiverInput from "../../../../../components/my-page/point-transfer/ReceiverInput.jsx";

function PointRemittance({ targetProductCode }) {
  const [transferInfo, setTransferInfo] = useState({
    receiverId: "",
    amount: "",
  })
  const [showPassword, setShowPassword] = useState(false);

  const { data: pointBalance } = useLoadData("/api/point/balance");
  const { data: productInfo } = useLoadData(`/api/market/products/${targetProductCode}`);

  console.log(targetProductCode);
  console.log("productInfo: ", productInfo);

  const isPayment = targetProductCode != null;


  // 송금 전송
  const handleSubmitRemittance = (e) => {
    e.preventDefault();

  }

  return (
    <div className={styles.pointRemittance}>
      <AmountInput
        label="송금할 포인트"
        amount={productInfo?.price || transferInfo.amount}
        setTransferInfo={setTransferInfo}
        isPayment={!!targetProductCode}
        pointBalance={pointBalance}
      />

      <ReceiverInput
        label="받는 회원"
        id={productInfo?.memberProfile.id || transferInfo.receiverId}
        setTransferInfo={setTransferInfo}
        isPayment={!!targetProductCode}
      />

      <div className={styles.passwordCheck}>
        <TextInput
          label={<>계정 비밀번호 <CgAsterisk className={styles.requiredIcon} /></>}
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="계정 비밀번호를 입력하세요."
          icon={
            <button
              type="button"
              className={styles.togglePasswordBtn}
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
            >
              {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
            </button>
          }
        />
      </div>

      {/* 송금 전 요약 */}
      <TransferSummary
        pointBalance={pointBalance}
        amount={productInfo?.price || transferInfo.amount}
      />

      <div className={styles.submit}>
        <Button
          type="submit"
          action="submit"
        >
          송금하기
        </Button>
      </div>
    </div>
  );
}

export default PointRemittance;
