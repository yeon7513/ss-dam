import React from 'react';

import styles from './MemberCard.module.scss';
import { useNavigate } from 'react-router-dom';
import ImageBox from "../../common/image-box/ImageBox.jsx";
import Card from "../../common/card/Card.jsx";
import cn from 'classnames';

function MemberCard({ member, type = 'user' }) {
  const navigate = useNavigate();

  const isAdmin = type === "admin";
  const detailPath = isAdmin
    ? `/admin/system_manage/account/${member.code}`
    : `/admin/user_manage/${member.code}`;

  const cardData = {
    id: member.id || member.empId,
    name: member.name,
    path: member.path,
    statusLabel: isAdmin
      ? (member.deleteYn ? "비활성" : "활성")
      : member.status.label,
    statusCode: isAdmin
      ? (member.deleteYn ? "WITHDRAW" : "ACTIVE")
      : member.status.code, // 스타일 매핑용 영문 코드
    subInfo: isAdmin ?
      (
        <>
          <span className={cn(styles.meta, styles.dept)}>
            부서 {member.dept ?? "미정"}
          </span>
          <span className={cn(styles.meta, styles.role)}>
            권한 {member.role ?? "미정"}
          </span>
        </>
      ) : (
        <>
          <span className={cn(styles.meta, styles.rating)}>
            등급 {member.rating}
          </span>
          <span className={cn(styles.meta, styles.ranking)}>
            랭킹 {member.ranking ?? "-"}
          </span>
        </>
      ),
    createdAt: member.createdAt,
    loggedAt: member.loggedAt,
  }

  const badgeColor = {
    SLEEP: styles.sleep,
    SUSPENDED: styles.suspended,
    WITHDRAW: styles.withdraw,
  };

  const formatDate = (value) =>
    value
      ? new Date(value).toLocaleDateString('ko-KR')
      : '-';

  console.log(member);

  return (
    <Card className={styles.memberCard} onClick={() => navigate(detailPath)}>
      {/*프로필 사진 */}
      {!isAdmin && (
        <div className={styles.avatar}>
          <ImageBox src={member.path} />
        </div>
      )}

      {/* 기본 정보 */}
      <div className={styles.info}>
        {/* 아이디 & 이름 */}
        <div className={styles.basic}>
          <h3 className={styles.name}>
            <span className={cn(styles.badge, badgeColor[cardData.statusCode])}>
              {cardData.statusLabel}
            </span>
            <span>{cardData.name || '-'}</span>
          </h3>
          <p className={styles.id}>
            {cardData.id}
          </p>
        </div>

        {/* 회원: 등급, 랭킹 / 관리자: 부서, 권한 */}
        <div className={styles.subInfo}>
          {cardData.subInfo}
        </div>

        {/* 날짜 정보 (생성 & 마지막로그인) */}
        <div className={styles.dates}>
          <p>
            <span>{isAdmin ? "계정 생성일" : "회원 가입일"}</span>
            <span>{formatDate(cardData.createdAt)}</span>
          </p>
          <p>
            <span>마지막 로그인</span>
            <span>{formatDate(cardData.loggedAt)}</span>
          </p>
        </div>
      </div>

    </Card>
  );
}

export default MemberCard;
