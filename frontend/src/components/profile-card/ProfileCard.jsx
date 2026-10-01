import { HiDotsHorizontal } from 'react-icons/hi';
import placeholder from '../../assets/images/placeholder.png';
import ImageBox from '../common/image-box/ImageBox';
import styles from './ProfileCard.module.scss';
import cn from 'classnames';

// isMinimal -> 간단하게 표시
function ProfileCard({ memberProfile, className, isMinimal = false, isVertical = false }) {
  if (!memberProfile) return <div>사용자 정보가 없습니다.</div>;

  // 미니멀 버전 (댓글, 채팅용)
  if (isMinimal) {
    return (
      <div className={cn(styles.minimalProfile, className)}>
        <div className={styles.profileImage}>
          <ImageBox src={memberProfile.path || placeholder} alt="프로필 이미지" />
        </div>

        <div className={styles.info}>
          <p className={styles.memberId}>{memberProfile.id}</p>
          <div className={styles.meta}>
            <span>등급 {memberProfile.rating}</span>
            <span>랭킹 {memberProfile.ranking}</span>
          </div>
        </div>

        <div className={styles.more}>
          <button>
            <HiDotsHorizontal />
          </button>
        </div>
      </div>
    )
  }

  // 세로 버전
  if (isVertical) {
    return (
      <div className={cn(styles.verticalProfile, className)}>
        <div className={styles.profileImage}>
          <ImageBox src={memberProfile.path || placeholder} alt="프로필 이미지" />
        </div>

        <div className={styles.info}>
          <p className={styles.memberId}>{memberProfile.id}</p>
          <div className={styles.meta}>
            <span>등급 {memberProfile.rating}</span>
            <span>랭킹 {memberProfile.ranking}</span>
          </div>
        </div>
      </div>
    )
  }

  // 기본
  return (
    <div className={cn(styles.profileCard, className)}>
      <div className={styles.profileImage}>
        <ImageBox src={memberProfile.path || placeholder} alt="프로필 이미지" />
      </div>

      <div className={styles.info}>
        <p className={styles.memberId}>{memberProfile.id}</p>
        <div className={styles.meta}>
          <span>등급 {memberProfile.rating}</span>
          <span>랭킹 {memberProfile.ranking}</span>
        </div>
      </div>

      <div className={styles.more}>
        <button>
          <HiDotsHorizontal />
        </button>
      </div>
    </div>
  );
}

export default ProfileCard;
