import React, { Fragment, useState } from 'react';
import TextInput from "../../forms/text-input/TextInput.jsx";
import { CgAsterisk } from "react-icons/cg";
import styles from "./PointTransfer.module.scss";
import Button from "../../common/button/Button.jsx";
import { checkDuplicateId } from "../../../api/member.js";
import { FaCircleCheck } from "react-icons/fa6";
import { HiEye, HiEyeOff } from "react-icons/hi";

function PointRemittance({ receiveInfo }) {
  const [receiverCode, setReceiverCode] = useState(receiveInfo?.receiverCode ?? "");
  const [receiverId, setReceiverId] = useState(receiveInfo?.receiverId ?? "");
  const [amount, setAmount] = useState(receiveInfo?.amount ?? "");
  const [isCheckedId, setIsCheckedId] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  console.log("receiveInfo: ", receiveInfo);

  console.log(amount || 0);
  console.log(amount);

  // 유효한 포인트 값인지 검증
  const handleChangeAmount = (value) => {
    if (!Number.isInteger(Number(value))) {
      alert("정수만 입력해 주세요.");
      return;
    }

    if (Number(value) < 1 && value !== "") {
      alert("송금할 포인트는 1그루 이상 입력해 주세요.");
      setAmount("");
      focus();

      return;
    }

    setAmount(Number(value));
  }

  // 받는 회원 아이디 체크
  const handleCheckId = async () => {
    try {
      setIsCheckedId(false);

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

  // 송금 전송
  const handleSubmitRemittance = (e) => {
    e.preventDefault();

  }

  return (
    <div className={styles.pointRemittance}>
      <div className={styles.amountPoint}>
        <TextInput
          label={<>송금할 포인트 <CgAsterisk className={styles.requiredIcon} /></>}
          type="number"
          name="amount"
          value={amount}
          placeholder="1그루 이상 입력하세요."
          onChange={(e) => handleChangeAmount(e.target.value)}
        />
        <div>
          <span>송금 가능 그루</span>
          <span>{amount || 0}그루</span>
        </div>
      </div>

      <div className={styles.receiverUser}>
        <div>
          <TextInput
            label={<>받는 회원 <CgAsterisk className={styles.requiredIcon} /></>}
            type="text"
            name="receiverId"
            value={receiverId}
            placeholder="그루를 받을 회원의 아이디를 입력하세요."
            onChange={(e) => setReceiverId(e.target.value)}
          />
          <Button
            type="button"
            onClick={handleCheckId}
          >
            아이디 확인
          </Button>
          <input type="hidden" name="receiverCode" value={receiverCode} />
        </div>
        {isCheckedId && (
          <span><FaCircleCheck /> 아이디 확인 완료</span>
        )}
      </div>

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

      <ul>
        <li>
          <span>송금할 그루</span>
          <span>{amount || 0}그루</span>
        </li>
        <li>
          <span>송금 후 잔액</span>
          <span>0그루</span>
        </li>
      </ul>

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
