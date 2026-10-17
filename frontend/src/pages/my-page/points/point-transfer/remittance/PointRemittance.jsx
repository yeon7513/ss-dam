import React, { useEffect, useState } from 'react';
import Button from "../../../../../components/common/button/Button.jsx";
import styles from "../PointTransfer.module.scss";
import AmountInput from "../../../../../components/my-page/point-transfer/AmountInput.jsx";
import TransferSummary from "../../../../../components/my-page/point-transfer/TransferSummary.jsx";
import { useLoadData } from "../../../../../hooks/useLoadData.js";
import ReceiverInput from "../../../../../components/my-page/point-transfer/ReceiverInput.jsx";
import AccountPasswordInput from "../../../../../components/my-page/point-transfer/AccountPasswordInput.jsx";
import { useSubmitData } from "../../../../../hooks/useSubmitData.js";
import { useNavigate } from "react-router-dom";

function PointRemittance({ targetProductCode }) {
  const { data: pointBalance } = useLoadData("/api/point/balance");
  const { data: productInfo } = useLoadData(targetProductCode ? `/api/market/products/${targetProductCode}` : null);
  const { handleSubmit } = useSubmitData("/api/point/payment", "POST");

  const [transferInfo, setTransferInfo] = useState({
    prodCode: targetProductCode || null, // 거래글 번호
    receiverId: productInfo?.memberProfile.id || "", // 송금할 회원 아이디
    amount: productInfo?.price || "", // 송금할 포인트
  });
  const [isCheckedId, setIsCheckedId] = useState(!!productInfo?.memberProfile.id);
  const [password, setPassword] = useState("");

  const navigate = useNavigate();


  console.log("transferInfo: ", transferInfo);

  // 송금 전송
  const handleSubmitRemittance = async (e) => {
    e.preventDefault();

    if (!isCheckedId) {
      alert("받는 회원의 아이디 확인을 완료해 주세요.");
    }

    if (!password) {
      alert("비밀번호를 입력해 주세요.");
    }

    try {
      // 비밀번호 검증 먼저
      const response = await fetch("/api/auth/find/password-check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        throw new Error("비밀번호 확인 요청에 실패했습니다.");
      }

      const passwordCheck = await response.json();

      console.log("passwordCheck: ", passwordCheck);

      if (!passwordCheck) {
        alert("비밀번호를 정확하게 입력해 주세요.");
        return;
      }

      console.log("비밀번호 검증까지 통과!");

      // 비밀번호 검증 통과 후 송금 처리 시작
      const { success } = await handleSubmit(transferInfo);

      if (success) {
        alert(`${transferInfo.receiverId}님께 그루를 송금했습니다.`);
        navigate("/mypage/point/history");
      } else {
        alert("그루 송금에 실패했습니다. 다시 시도해 주세요.");
      }

    } catch (error) {
      console.error("서버 통신 실패: ", error);
    }
  }

  useEffect(() => {
    if (productInfo) {
      setTransferInfo((prev) => ({
        ...prev,
        receiverId: productInfo.memberProfile?.id || "",
        amount: productInfo.price ?? "",
      }));

      setIsCheckedId(true);
    }
  }, [productInfo]);

  return (
    <form className={styles.pointRemittance} onSubmit={handleSubmitRemittance}>
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
        isPayment={!!targetProductCode}
        isCheckedId={isCheckedId}
        setIsCheckedId={setIsCheckedId}
        setTransferInfo={setTransferInfo}
      />


      {/* 비밀번호 확인 */}
      <AccountPasswordInput
        label="계정 비밀번호"
        setPassword={setPassword}
      />

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
    </form>
  );
}

export default PointRemittance;
