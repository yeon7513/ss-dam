import React from 'react';
import { useLoadData } from "../../../../hooks/useLoadData.js";
import styles from "./AccountManageDetail.module.scss";
import Card from "../../../../components/common/card/Card.jsx";
import cn from "classnames";
import { BiError } from "react-icons/bi";
import { TbHandClick } from "react-icons/tb";

function AccountManageDetail({ code }) {
  // props로 받아오는 code의 값이 유효할 때만 fetch로 데이터를 불러옴
  const { data: detail } = useLoadData(code ? `/api/admin/account/${code}` : null);
  const supervisor = detail?.supervisor;

  if (code === null) {
    return (
      <Card className={cn(styles.detail, styles.notice)}>
        <TbHandClick className={styles.icon} />
        <p>관리할 계정을 선택해주세요.</p>
      </Card>
    );
  }

  if (!detail) {
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
      <div className={styles.container}>
        {/* 기본 정보 */}
        <div className={styles.basicInfo}>
          <div>
            <span className={styles.number}>CODE #{detail.code}</span>

            {/* 아이디 & 이름 */}
            <div className={styles.id}>
              <span>
                {detail.name}
              </span>
              <span>
                {detail.empId}
              </span>
            </div>
          </div>

          {/* 메타 정보 - 부서, 권한 */}
          <div>
            <div>
              <div>
                <span>부서</span>
                <span>{detail.dept}</span>
              </div>
              <div>
                <span>권한</span>
                <span>{detail.role.label}</span>
              </div>
            </div>
            <div>
              <span>계정 생성일</span>
              <span>{detail.createdAt}</span>
            </div>
            <div>
              <span>마지막 로그인</span>
              <span>{detail.loggedAt ?? "-"}</span>
            </div>
          </div>
        </div>

        {/* 상태 조치 */}
        <div className={styles.control}>
          상태 조치 영역
        </div>
      </div>

      <div className={styles.subInfo}>
        {/* 상관 정보 */}
        <div className={styles.supervisor}>
          {supervisor.code}
          {supervisor.name}
          {supervisor.empId}
          {supervisor.dept}
          {supervisor.role.label}
        </div>

        {/* 최근 활동 */}
        <div className={styles.recentActivity}>
          {detail.recentActivity ? (
            <ul>
              {detail.recentActivity.map((activity, idx) => (
                <li key={idx}>
                  <span>{activity.type}</span>
                  <span>{activity.createdAt}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.noActivity}>활동 내역이 없습니다.</p>
          )}
        </div>
      </div>

    </Card>
  );
}

export default AccountManageDetail;
