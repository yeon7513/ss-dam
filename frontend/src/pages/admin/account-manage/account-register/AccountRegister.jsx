import React, { useState } from 'react';
import styles from "./AccountRegister.module.scss";
import CancelButton from "../../../../components/common/button/cancel/CancelButton.jsx";
import Button from "../../../../components/common/button/Button.jsx";
import TextInput from "../../../../components/forms/text-input/TextInput.jsx";
import SelectBox from "../../../../components/forms/select-box/SelectBox.jsx";
import { handleSetField } from "../../../../utils/changeHandler.js";
import { useSubmitData } from "../../../../hooks/useSubmitData.js";
import { useNavigate } from "react-router-dom";

const DEPT_OPTIONS = [
  {
    code: "OPERATION",
    name: "운영·관리",
  },
  {
    code: "PLANNING",
    name: "기획",
  },
];

function AccountRegister() {
  const [newAccount, setNewAccount] = useState({
    name: "",
    empId: "",
    password: "",
    dept: "",
    role: "",
  });
  const navigate = useNavigate();

  const { handleSubmit } = useSubmitData("/api/admin/account", "POST");

  const handleRegisterNewAdminAccount = async (e) => {
    e.preventDefault();

    try {
      const { data: newAccountCode, success } = await handleSubmit(newAccount);

      if (success) {
        alert("관리자 계정이 등록되었습니다.");
        navigate(`/admin/system_manage?selectedCode=${newAccountCode}`);
      } else {
        alert("관리자 계정 등록에 실패했습니다.");
      }
    } catch (error) {
      alert("관리자 계정 등록에 실패했습니다.");
      console.error("Error registering account:", error);
    }
  };

  console.log(newAccount);

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <h2>관리자 계정 생성</h2>
      </div>

      {/* 등록 */}
      <form className={styles.formSection} onSubmit={handleRegisterNewAdminAccount}>
        <TextInput
          label="이름"
          name="name"
          placeholder="이름 입력"
          onChange={e => handleSetField(e, setNewAccount)}
        />

        <TextInput
          label="아이디"
          name="empId"
          placeholder="아이디 입력"
          onChange={e => handleSetField(e, setNewAccount)}
        />
        <TextInput
          label="초기 비밀번호"
          name="password"
          placeholder="초기 비밀번호 입력"
          onChange={e => handleSetField(e, setNewAccount)}
        />

        <div>
          <span>부서</span>
          <SelectBox
            name="dept"
            options={DEPT_OPTIONS}
            selectedValue={newAccount.dept}
            placeholder="부서 선택"
            onChange={e => handleSetField(e, setNewAccount)}
          />
        </div>

        <div>
          <span>권한</span>
          <label htmlFor="role_super">
            <input
              type="radio"
              id="role_super"
              name="role"
              value="ROLE_SUPER"
              onChange={e => handleSetField(e, setNewAccount)}
            />
            최고 관리자
          </label>
          <label htmlFor="role_manager">
            <input
              type="radio"
              id="role_manager"
              name="role"
              value="ROLE_MANAGER"
              onChange={e => handleSetField(e, setNewAccount)}
            />
            매니저
          </label>
          <label htmlFor="role_staff">
            <input
              type="radio"
              id="role_staff"
              name="role"
              value="ROLE_STAFF"
              onChange={e => handleSetField(e, setNewAccount)}
            />
            스태프
          </label>
        </div>

        <Button type="submit" action="submit">등록</Button>
        <CancelButton className={styles.cancel} targetUrl="..">취소</CancelButton>
      </form>
    </div>
  );
}

export default AccountRegister;
