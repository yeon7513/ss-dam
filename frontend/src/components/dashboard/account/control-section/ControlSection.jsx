import React from 'react';
import { ADMIN_ACCOUNT_DEPT_OPTIONS, ADMIN_ACCOUNT_ROLE_OPTIONS, ADMIN_ACCOUNT_STATUS_OPTIONS } from "../../../../constants/admin-account/AccountManage.constants.js";
import styles from "./ControlSection.module.scss";
import SelectBox from "../../../forms/select-box/SelectBox.jsx";
import Button from "../../../common/button/Button.jsx";
import { handleSetField } from "../../../../utils/changeHandler.js";

function ControlSection({ updateData, onUpdateData, onUpdateAccount }) {
  console.log("updateData: ", updateData);

  const handleChangeSelect = (e) => {
    e.preventDefault();

    onUpdateAccount(updateData);
  }

  return (
    <form className={styles.control} onSubmit={handleChangeSelect}>
      <h4>계정 설정</h4>
      <div>
        <span>부서 변경</span>
        <SelectBox
          name="dept"
          placeholder="미정"
          selectedValue={updateData?.dept ?? ""}
          options={ADMIN_ACCOUNT_DEPT_OPTIONS}
          onChange={e => handleSetField(e, onUpdateData)}
        />
      </div>

      <div>
        <span>권한 변경</span>
        <SelectBox
          name="role"
          placeholder="미정"
          selectedValue={updateData?.role ?? ""}
          options={ADMIN_ACCOUNT_ROLE_OPTIONS}
          onChange={e => handleSetField(e, onUpdateData)}
        />
      </div>

      <div>
        <span>활성 여부</span>
        {ADMIN_ACCOUNT_STATUS_OPTIONS.map((status, idx) => (
          <div key={idx} className={styles.radioItem}>
            <input
              type="radio"
              id={`status_${status.code}`}
              name="deleteYn"
              value={String(status.code)}
              checked={String(status.code) === String(updateData?.deleteYn)}
              onChange={e => handleSetField(e, onUpdateData)}
            />
            <label htmlFor={`status_${status.code}`}>{status.name}</label>
          </div>
        ))}
      </div>

      <div>
        <Button
          type="submit"
          btnStyle="outline"
          action="submit"
          size="sm"
        >
          적용
        </Button>
      </div>
    </form>
  );
}

export default ControlSection;
