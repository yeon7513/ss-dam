import { HiDotsHorizontal } from 'react-icons/hi';
import placeholder from '../../../assets/images/placeholder.png';
import ImageBox from '../../common/image-box/ImageBox.jsx';
import styles from './ProfileCard.module.scss';
import cn from 'classnames';

// isMinimal -> 간단하게 표시
// isVertical -> 세로 버전
function ProfileCard({
  memberProfile,
  className,
  isMinimal = false,
  isVertical = false,
  showMore = true,
  badge,
}) {
  if (!memberProfile) return <div>사용자 정보가 없습니다.</div>;

  const profileType = isMinimal
    ? styles.minimalProfile
    : isVertical
      ? styles.verticalProfile
      : styles.defaultProfile;

  // 기본
  return (
    <div className={cn(profileType, className)}>
      <div className={styles.profileImage}>
        <ImageBox src={memberProfile.path || placeholder} alt="프로필 이미지" />
      </div>

      <div className={styles.info}>
        <div className={styles.name}>
          <span className={styles.memberId}>{memberProfile.id}</span>
          {badge && (
            <span className={styles.badge}>{badge}</span>
          )}
        </div>

        {!isMinimal && (
          <div className={styles.meta}>
            <span>등급 {memberProfile.rating}</span>
            <span>랭킹 {memberProfile.ranking}</span>
          </div>
        )}
      </div>

      {!isMinimal && !isVertical && showMore && (
        <div className={styles.more}>
          <button>
            <HiDotsHorizontal />
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfileCard;
