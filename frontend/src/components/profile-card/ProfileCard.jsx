import styles from "./ProfileCard.module.scss";

function ProfileCard({ memberProfile }) {
  if (!memberProfile) return null;

  const profileImg =
    memberProfile.profileImg ||
    memberProfile.profileImage ||
    "/images/default-profile.png";

  const name = memberProfile.name || memberProfile.nickname || "이름 없음";

  const introduce =
    memberProfile.introduce || memberProfile.intro || "소개글이 없습니다.";

  const point = memberProfile.point ?? 0;
  const ranking = memberProfile.ranking ?? "-";

  return (
    <div className={styles.profileCard}>
      <div className={styles.profileImageBox}>
        <img
          className={styles.profileImage}
          src={profileImg}
          alt="프로필 이미지"
        />
      </div>

      <div className={styles.profileInfo}>
        <p className={styles.profileName}>{name}</p>

        <p className={styles.profileIntro}>{introduce}</p>

        <div className={styles.profileMeta}>
          <span>포인트 {point}</span>
          <span>랭킹 {ranking}</span>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
