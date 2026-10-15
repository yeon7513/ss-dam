import React from 'react';
import { ADMIN_ACCOUNT_DEPT_OPTIONS, ADMIN_ACCOUNT_ROLE_OPTIONS, ADMIN_ACCOUNT_STATUS_OPTIONS } from "../../../../constants/admin-account/AccountManage.constants.js";
import styles from "./ControlSection.module.scss";
import SelectBox from "../../../forms/select-box/SelectBox.jsx";
import Button from "../../../common/button/Button.jsx";

function ControlSection() {
  return (
    <form className={styles.control}>
      <h4>계정 설정</h4>
      <div>
        <span>부서 변경</span>
        <SelectBox
          name="dept"
          placeholder="미정"
          options={ADMIN_ACCOUNT_DEPT_OPTIONS}
        />
      </div>

      <div>
        <span>권한 변경</span>
        <SelectBox
          name="role"
          placeholder="미정"
          options={ADMIN_ACCOUNT_ROLE_OPTIONS}
        />
      </div>

      <div>
        <span>활성 여부</span>
        {ADMIN_ACCOUNT_STATUS_OPTIONS.map((status, idx) => (
          <div key={idx} className={styles.radioItem}>
            <input
              type="radio"
              id={`status_${status.code}`}
              name="deletedYn"
              value={status.code}
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
