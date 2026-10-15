import React, { useEffect, useState } from 'react';
import styles from "./AccountManageDetail.module.scss";
import Card from "../../../../components/common/card/Card.jsx";
import cn from "classnames";
import { BiError } from "react-icons/bi";
import { TbHandClick } from "react-icons/tb";
import ControlSection from "../../../../components/dashboard/account/control-section/ControlSection.jsx";
import RecentActivitySection from "../../../../components/dashboard/account/recent-activity-section/RecentActivitySection.jsx";
import SupervisorSection from "../../../../components/dashboard/account/supervisor-section/SupervisorSection.jsx";
import BasicInfoSection from "../../../../components/dashboard/account/basic-info-section/BasicInfoSection.jsx";
import SubInfoSection from "../../../../components/dashboard/account/sub-info-section/SubInfoSection.jsx";

function AccountManageDetail({ detail, onUpdateAccount }) {
  const [updateData, setUpdateData] = useState(null);

  useEffect(() => {
    if (detail !== null) {
      setUpdateData({
        ...detail,
        dept: detail?.dept.code ?? "",
        role: detail?.role.code ?? "",
      });
    }
  }, [detail]);

  if (!detail) {
    return (
      <Card className={cn(styles.detail, styles.notice)}>
        <TbHandClick className={styles.icon} />
        <p>관리할 계정을 선택해주세요.</p>
      </Card>
    );
  }

  if (detail.code === null) {
    return (
      <Card className={cn(styles.detail, styles.notice)}>
        <BiError className={styles.icon} />
        <p>계정 정보를 조회할 수 없습니다.</p>
      </Card>
    );
  }

  console.log(detail);

  return (
    <Card className={styles.detail}>
      <div>
        {/* 정보 */}
        <div className={styles.information}>
          <BasicInfoSection basicInfo={detail} />
          <SubInfoSection role={detail.role} dept={detail.dept} />
        </div>

        {/* 계정 설정 */}
        <ControlSection
          updateData={updateData}
          onUpdateData={setUpdateData}
          onUpdateAccount={onUpdateAccount}
        />
      </div>

      {/* 담당 관리자 정보 */}
      {detail.supervisor && (
        <SupervisorSection supervisor={detail.supervisor} />
      )}

      {/* 최근 활동 */}
      <RecentActivitySection targetCode={detail.code} />
    </Card>
  );
}

export default AccountManageDetail;
