import { useCallback, useEffect, useState } from "react";
import styles from "./ChallengeInfoCard.module.scss";

const DEFAULT_NOTICE = [
  "인증은 하루 1회만 인정됩니다.",
  "타인의 사진 도용시 참여가 제한될 수 있습니다.",
  "부정 인증 적발 시 포인트가 회수됩니다.",
];

const InfoItem = ({ icon, label, value }) => (
  <div className={styles.infoRow}>
    <div className={styles.iconBox}>{icon}</div>
    <div className={styles.infoContent}>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>{value}</span>
    </div>
  </div>
);
const ChallengeInfoCard = ({
  code,
  onJoinSuccess,
  noticeList = DEFAULT_NOTICE,
}) => {
  const [infoData, setInfoData] = useState(null);
  const [joining, setJoining] = useState(false);

  const fetchInfoData = useCallback(async () => {
    if (!code) return;

    try {
      const response = await fetch(`/api/user/challenge/${code}/info`, {
        credentials: "include",
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setInfoData(result.data);
      }
    } catch (error) {
      console.error("챌린지 정보 카드 조회 오류: ", error);
    }
  }, [code]);

  useEffect(() => {
    fetchInfoData();
  }, [fetchInfoData]);

  if (!infoData) {
    return (
      <div className={styles.cardWrapper}>
        <div className={styles.cardContainer}>
          <div className={styles.cardHeader}>
            <h3>챌린지 정보</h3>
          </div>
          <div className={styles.cardBody}>
            <p style={{ padding: "20px", textAlign: "center", color: "#888" }}>
              정보를 불러오는 중...
            </p>
          </div>
        </div>
      </div>
    );
  }

  const infoItems = [
    {
      icon: "★",
      label: "진행 기간",
      value: `${infoData.startDate} ~ ${infoData.endDate} (${infoData.daysLeft ?? 0}일 남음)`,
    },
    {
      icon: "★",
      label: "참여 인원",
      value: `${infoData.participantCount ?? 0}명 참여중`,
    },
    {
      icon: "★",
      label: "목표",
      value: `${infoData.goal ?? "매일 인증 실천"}`,
    },
    {
      icon: "★",
      label: "인증 횟수",
      value: `${infoData.proofCount ?? 0}회 / ${infoData.totalProofCount ?? 0}회`,
    },
    {
      icon: "★",
      label: "획득 포인트",
      value: `${infoData.pointEarn ?? 0}`,
    },
  ];

  const handleJoin = async () => {
    if (infoData.isJoined) {
      alert("이미 참여 중인 챌린지입니다.");
      return;
    }
    try {
      setJoining(true);
      const response = await fetch(
        `/api/user/challenge/${infoData.code}/join`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        },
      );

      const result = await response.json();

      if (response.ok && result.success) {
        alert(result.message || "챌린지 참여가 완료되었습니다");
        fetchInfoData();
        if (onJoinSuccess) onJoinSuccess();
      } else {
        alert(result.message || "챌린지 참여 신청에 실패했습니다");
      }
    } catch (error) {
      console.error("참여 신청 오류", error);
      alert("요청 처리 중 오류가 발생했습니다");
    } finally {
      setJoining(false);
    }
  };

  return (
    <div className={styles.cardWrapper}>
      <div className={styles.cardContainer}>
        <div className={styles.cardHeader}>
          <h3>챌린지 정보</h3>
        </div>

        <div className={styles.cardBody}>
          {infoItems.map((item, index) => (
            <InfoItem
              key={index}
              icon={item.icon}
              label={item.label}
              value={item.value}
            />
          ))}

          <div className={styles.btnGroup}>
            <button
              className={`${styles.joinBtn} ${infoData.isJoined ? styles.joined : ""}`}
              onClick={handleJoin}
              disabled={joining || infoData.isJoined}
            >
              {infoData.isJoined
                ? "참여 완료"
                : joining
                  ? "처리 중"
                  : "챌린지 참여하기"}
            </button>
          </div>
        </div>
      </div>

      <div className={styles.noticeCard}>
        <h4>유의사항</h4>
        <ul>
          {noticeList.map((notice, index) => (
            <li key={index}>{notice}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChallengeInfoCard;
