import React from 'react';
import { ADMIN_ACCOUNT_DEPT_OPTIONS, ADMIN_ACCOUNT_ROLE_OPTIONS, ADMIN_ACCOUNT_STATUS_OPTIONS } from "../../../../constants/admin-account/AccountManage.constants.js";
import styles from "./ControlSection.module.scss";
import SelectBox from "../../../forms/select-box/SelectBox.jsx";
import Button from "../../../common/button/Button.jsx";
import { handleSetField } from "../../../../utils/changeHandler.js";

function ControlSection({ updateData, onUpdateData, onUpdateAccount }) {
  const handleChangeSelect = (e) => {
    e.preventDefault();

    onUpdateAccount(updateData);
  }

  return (
    <form className={styles.control} onSubmit={handleChangeSelect}>
      <h4>계정 설정</h4>

      <div className={styles.selectGroup}>
        <div className={styles.changeDept}>
          <span className={styles.label}>부서 변경</span>
          <SelectBox
            className={styles.dept}
            name="dept"
            placeholder="미정"
            selectedValue={updateData?.dept ?? ""}
            options={ADMIN_ACCOUNT_DEPT_OPTIONS}
            onChange={e => handleSetField(e, onUpdateData)}
          />
        </div>

        <div className={styles.changeRole}>
          <span className={styles.label}>권한 변경</span>
          <SelectBox
            className={styles.role}
            name="role"
            placeholder="미정"
            selectedValue={updateData?.role ?? ""}
            options={ADMIN_ACCOUNT_ROLE_OPTIONS}
            onChange={e => handleSetField(e, onUpdateData)}
          />
        </div>
      </div>

      <div className={styles.changeStatus}>
        <span className={styles.label}>활성 여부</span>
        <div className={styles.contents}>
          <div className={styles.radioGroup}>
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

          <div className={styles.submit}>
            <Button
              type="submit"
              btnStyle="outline"
              action="submit"
              size="sm"
            >
              적용
            </Button>
          </div>
        </div>
      </div>


    </form>
  );
}

export default ControlSection;
