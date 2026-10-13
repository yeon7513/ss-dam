import styles from './MemberCard.module.scss';
import { Link } from 'react-router-dom';
import ImageBox from "../../common/image-box/ImageBox.jsx";

// 등급별 아이콘
const RATING_ICONS = {
  0: '🏷️',
  1: '🌱',
  2: '🌿',
  3: '🌳',
  4: '🌸',
  5: '👑',
};

export default function MemberCard({ member, type = 'user' }) {
  const isAdmin = type === "admin";
  const detailPath = isAdmin
    ? `/admin/system_manage/account/${member.code}`
    : `/admin/user_manage/${member.code}`;

  const cardData = {
    id: member.id || member.empId,
    name: member.name,
    path: member.path,
    statusBadge: isAdmin ? (member.deleteYn ? "비활성" : "활성") : member.status,
    subInfo: isAdmin ? `${member.dept ?? "-"} / ${member.role ?? "-"}` : `등급 ${member.rating} / 랭킹 ${member.ranking ?? "-"}`,
    createdAt: member.createdAt,
    loggedAt: member.loggedAt,
  }

  const formatDate = (value) =>
    value
      ? new Date(value).toLocaleDateString('ko-KR')
      : '-';

  console.log(member);

  return (
    <Link
      to={detailPath}
      className={styles.card}
    >
      {/*프로필 사진 */}
      {!isAdmin && (
        <div className={styles.avatar}>
          <ImageBox src={member.path} />
        </div>
      )}

      <div className={styles.info}>
        {/* 아이디 & 이름 */}
        <div className={styles.group}>
          <h3 className={styles.name}>
            <span className={styles.badge}>
              {cardData.statusBadge}
            </span>
            <span>{cardData.name || '-'}</span>
          </h3>
          <p className={styles.id}>
            {cardData.id}
          </p>
        </div>

        {/* 회원: 등급, 랭킹 / 관리자: 부서, 권한 */}
        <div>
          <p className={styles.subInfo}>{cardData.subInfo}</p>
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
    </Link>
  );
}
