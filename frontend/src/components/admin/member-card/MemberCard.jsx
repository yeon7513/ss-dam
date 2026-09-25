import styles from './MemberCard.module.scss';

// 등급별 아이콘
const RATING_ICONS = {
  1: '🌱',
  2: '🌿',
  3: '🌳',
  4: '🌸',
  5: '👑',
};

export default function MemberCard({ member }) {
  const formatDate = (value) =>
    value
      ? new Date(value).toLocaleDateString('ko-KR')
      : '-';

  return (
    <article className={styles.card}>
      {/* 프로필 사진 연결 전에는 기본 아이콘 표시 */}
      <div className={styles.avatar}>
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <circle cx="12" cy="8" r="3" />
          <path d="M7 19v-2a5 5 0 0 1 10 0v2H7Z" />
        </svg>
      </div>

      <div className={styles.info}>
        <h3 className={styles.name}>
          <span
            className={styles.ratingIcon}
            role="img"
            aria-label={`${member.rating ?? '미정'}등급`}
            title={`${member.rating ?? '미정'}등급`}
          >
            {RATING_ICONS[member.rating] ?? '🏷️'}
          </span>

          <span>{member.name || '-'}</span>
        </h3>
        <p className={styles.id}>{member.id}</p>

        <div className={styles.dates}>
          <p>회원 가입일: {formatDate(member.createdAt)}</p>
          <p>마지막 로그인: {formatDate(member.loggedAt)}</p>
        </div>
      </div>
    </article>
  );
}