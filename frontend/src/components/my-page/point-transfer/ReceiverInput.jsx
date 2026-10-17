import React, { useState } from 'react';
import styles from "../../../pages/my-page/points/point-transfer/PointTransfer.module.scss";
import { CgAsterisk } from "react-icons/cg";
import TextInput from "../../forms/text-input/TextInput.jsx";
import Button from "../../common/button/Button.jsx";
import { FaCircleCheck } from "react-icons/fa6";
import { checkDuplicateId } from "../../../api/member.js";
import { handleSetField } from "../../../utils/changeHandler.js";
import { useAuth } from "../../../context/AuthContext.jsx";

function ReceiverInput({
  label,
  id,
  isRequired = true,
  setTransferInfo,
  isPayment = false,
}) {
  const [receiverId, setReceiverId] = useState("");
  const [isCheckedId, setIsCheckedId] = useState(false);
  const { user } = useAuth();

  const textInputLabel = isRequired
    ? <>{label} <CgAsterisk className={styles.requiredIcon} /></>
    : label;

  // 받는 회원 아이디 체크
  const handleCheckId = async () => {
    try {
      if (receiverId === user.id) {
        alert("자기 자신에게 송금할 수 없습니다.");
        return;
      }

      if (!receiverId) {
        alert("받는 회원의 아이디를 입력하세요.");
        return;
      }

      // 임시로 회원가입 시 사용한 아이디 중복 체크를 사용함.
      // -> 얘는 탈퇴 또는 정지된 회원은 걸러주지 않기 때문에 나중에 바꿔야할 듯?
      const result = await checkDuplicateId(receiverId);

      if (result.data) {
        setIsCheckedId(true);
        alert("받는 회원의 아이디가 확인되었습니다.");
      } else {
        setIsCheckedId(false);
        alert("존재하지 않는 회원입니다.");
      }

    } catch (error) {
      console.error("아이디 확인 오류: ", error);
      setIsCheckedId(false);
      alert("아이디 확인 중 오류가 발생했습니다.");
    }
  }

  const handleChangeId = (e) => {
    const { value } = e.target;

    setIsCheckedId(false);
    setReceiverId(value);

    handleSetField(e, setTransferInfo);
  }

  return (
    <div className={styles.receiverUser}>
      <div>
        <TextInput
          label={textInputLabel}
          type="text"
          name="receiverId"
          value={id}
          disabled={isPayment}
          placeholder="그루를 받을 회원의 아이디를 입력하세요."
          onChange={(e) => handleChangeId(e)}
        />
        <Button
          type="button"
          disabled={isCheckedId}
          onClick={handleCheckId}
        >
          아이디 확인
        </Button>
      </div>
      {isCheckedId && (
        <span><FaCircleCheck /> 아이디 확인 완료</span>
      )}
    </div>
  );
}

export default ReceiverInput;
