import React from 'react';
import TextInput from "../../forms/text-input/TextInput.jsx";
import { CgAsterisk } from "react-icons/cg";
import styles from "./PointTransferComponents.module.scss";
import { handleSetField } from "../../../utils/changeHandler.js";

function AmountInput({
  amount,
  label,
  isRequired = true,
  isPayment = false,
  setTransferInfo,
  pointBalance,
}) {

  const textInputLabel = isRequired
    ? <>{label} <CgAsterisk className={styles.requiredIcon} /></>
    : label;

  // 유효한 포인트 값인지 검증
  const handleChangeAmount = (e) => {
    const { value } = e.target;

    if (Number(value) === 0) {
      return;
    }

    if (!Number.isInteger(Number(value))) {
      alert("정수만 입력해 주세요.");
      return;
    }

    // 혹시 모를 안전장치..
    if (Number(value) < 1 && value !== "") {
      alert("송금할 포인트는 1그루 이상 입력해 주세요.");
      focus();

      return;
    }

    handleSetField(e, setTransferInfo);
  }

  return (
    <div className={styles.amountPoint}>
      <TextInput
        label={textInputLabel}
        type="number"
        name="amount"
        value={amount}
        placeholder="1그루 이상 입력하세요."
        onChange={(e) => handleChangeAmount(e)}
        disabled={isPayment}
      />
      <div>
        <span>송금 가능 그루</span>
        <span>{pointBalance?.toLocaleString()}그루</span>
      </div>
    </div>
  );
}

export default AmountInput;
