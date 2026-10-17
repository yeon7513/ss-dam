import React from 'react';
import styles from "./RecentActivitySection.module.scss";
import { useLoadData } from "../../../../hooks/useLoadData.js";
import { formatCreatedAt } from "../../../../utils/formatDate.js";
import cn from 'classnames';
import { useSearchQuery } from "../../../../hooks/useSearchQuery.js";
import Pagination from "../../../common/pagination/Pagination.jsx";

// 임시로 하드코딩.. 나중에 백엔드에서 ENUM으로 변경할 것!!
const PROCESS_TYPE = {
  DELETE: "삭제",
  RESTORE: "복구",
  UPDATE: "수정",
  CREATE: "등록",
  EARLY_END: "조기종료",
  RELEASE: "해제",
  RESTRICT: "정지",
};

const TARGET_TYPE = {
  feed: "피드",
  market: "마켓",
  challenge: "챌린지",
  member: "회원",
}

function RecentActivitySection({ targetCode }) {
  const { queryString, handleChangePages } = useSearchQuery({
    page: 1,
    perPage: 5,
  });
  const { data } =
    useLoadData(`/api/admin/logs/${targetCode}/activities${queryString}`);

  const recentActivities = data?.content;


  console.log(recentActivities);

  return (
    <div className={styles.recentActivity}>
      <h4 className={styles.title}>활동 내역</h4>
      {recentActivities?.length > 0 ? (
        <div className={styles.tableWrap}>
          <ul className={styles.items}>
            <li className={styles.head}>
              <div>NO.</div>
              <div>유형 번호</div>
              <div>유형</div>
              <div>처리</div>
              <div>메모</div>
              <div>날짜</div>
            </li>
            {recentActivities?.map((activity, idx) => (
              <li key={idx}>
                <span className={styles.code}>{activity.code}</span>
                <span className={styles.code}>{activity.targetCode}</span>
                <span className={cn(styles.badge, styles.type)}>
                  {TARGET_TYPE[activity.targetType]}
                </span>
                <span className={cn(styles.badge, styles.process, {
                  [styles.delete]: activity.processType === "DELETE",
                  [styles.restore]: activity.processType === "RESTORE",
                  [styles.earlyEnd]: activity.processType === "EARLY_END",
                })}>
                  {PROCESS_TYPE[activity.processType]}
                </span>
                <span className={styles.memo}>{activity.memo}</span>
                <span>{formatCreatedAt(activity.createdAt)}</span>
              </li>
            ))}
          </ul>
          <Pagination pager={data?.pager} onChangePage={handleChangePages} />
        </div>
      ) : (
        <p className={styles.noActivity}>활동 내역이 없습니다.</p>
      )}
    </div>
  );
}

export default RecentActivitySection;
