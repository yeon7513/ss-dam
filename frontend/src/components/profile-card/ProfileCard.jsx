import placeholder from '../../assets/images/placeholder.png';
import styles from './ProfileCard.module.scss';

function ProfileCard({ memberProfile }) {
  if (!memberProfile) return <div>사용자 정보가 없습니다.</div>;

  return (
    <div className={styles.profileCard}>
      <div className={styles.profileImageBox}>
        <img
          className={styles.profileImage}
          src={memberProfile.path || placeholder}
          alt="프로필 이미지"
        />
      </div>

      <div className={styles.profileInfo}>
        <p className={styles.profileName}>{memberProfile.id}</p>
        <div className={styles.profileMeta}>
          <span>등급 {memberProfile.rating}</span>
          <span>랭킹 {memberProfile.ranking}</span>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
