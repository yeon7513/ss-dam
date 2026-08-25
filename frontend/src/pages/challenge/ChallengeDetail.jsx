import { useState } from "react";
import styles from "./ChallengeDetail.module.scss";

const ChallengeDetail = () => {
  const [status, setStatus] = useState("진행중");
  const [selectedCode, setSelectedCode] = useState(1);
  const [liked, setLiked] = useState(false);

  const challengeList = {
    진행중: [
      {
        code: 1,
        title: "아침 6시 미라클 모닝",
        icon: "🌅",
      },
      {
        code: 2,
        title: "하루 물 2L 마시기",
        icon: "💧",
      },
      {
        code: 3,
        title: "하루 10분 독서 습관",
        icon: "📖",
      },
      {
        code: 4,
        title: "플라스틱 줄이기 챌린지",
        icon: "🌿",
      },
      {
        code: 5,
        title: "일회용컵 사용 줄이기",
        icon: "☕",
      },
    ],

    진행예정: [
      {
        code: 6,
        title: "하루 30분 걷기",
        icon: "🚶",
      },
      {
        code: 7,
        title: "텀블러 사용하기",
        icon: "🥤",
      },
    ],

    완료: [
      {
        code: 8,
        title: "일주일 계단 이용하기",
        icon: "🏃",
      },
      {
        code: 9,
        title: "매일 분리수거 실천하기",
        icon: "♻️",
      },
    ],
  };

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);

    if (challengeList[newStatus].length > 0) {
      setSelectedCode(challengeList[newStatus][0].code);
    }
  };

  return (
    <main className={styles.page}>
      {/* breadcrumb */}
      <div className={styles.breadcrumb}>
        <span>홈</span>
        <span>›</span>
        <span>챌린지</span>
        <span>›</span>
        <span>목록</span>
        <span>›</span>
        <strong>상세</strong>
      </div>

      <div className={styles.mainLayout}>
        {/* ================= 왼쪽 ================= */}
        <aside className={styles.left}>
          <h2 className={styles.leftTitle}>챌린지 목록</h2>

          <div className={styles.tabs}>
            {["진행중", "진행예정", "완료"].map((item) => (
              <button
                key={item}
                type="button"
                className={`${styles.tab} ${
                  status === item ? styles.activeTab : ""
                }`}
                onClick={() => handleStatusChange(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className={styles.list}>
            {challengeList[status].map((challenge) => (
              <button
                key={challenge.code}
                type="button"
                className={`${styles.listButton} ${
                  selectedCode === challenge.code ? styles.selectedItem : ""
                }`}
                onClick={() => setSelectedCode(challenge.code)}
              >
                <div className={styles.thumbnail}>{challenge.icon}</div>

                <div className={styles.itemText}>
                  <strong className={styles.itemTitle}>
                    {challenge.title}
                  </strong>

                  <span className={styles.smallStatus}>{status}</span>
                </div>
              </button>
            ))}
          </div>
        </aside>

        {/* ================= 가운데 ================= */}
        <section className={styles.center}>
          <div className={styles.top}>
            <div>
              <span className={styles.statusBadge}>진행중</span>

              <h1 className={styles.title}>아침 6시 미라클 모닝</h1>

              <p className={styles.subtitle}>
                작은 습관으로 하루를 바꿔보세요!
              </p>

              <div className={styles.tags}>
                <span>생활습관</span>
                <span>건강</span>
              </div>
            </div>

            <button type="button" className={styles.shareButton}>
              ↗ 공유하기
            </button>
          </div>

          {/* 메인 이미지 */}
          <div className={styles.hero}>
            <div className={styles.sun}></div>

            <div className={styles.mountain1}></div>
            <div className={styles.mountain2}></div>
            <div className={styles.mountain3}></div>

            <div className={styles.groundBack}></div>
            <div className={styles.groundFront}></div>
          </div>

          {/* 챌린지 소개 */}
          <div className={styles.description}>
            <h3>🌱 챌린지 소개</h3>

            <p>아침 6시에 일어나 하루를 시작하는 챌린지입니다.</p>

            <p>
              규칙적인 기상 습관은 집중력 향상과 스트레스 감소에 도움을 줍니다.
            </p>

            <p>함께 미라클 모닝을 실천하고, 더 나은 나를 만들어보세요!</p>
          </div>
        </section>

        {/* ================= 오른쪽 ================= */}
        <aside className={styles.right}>
          <section className={styles.infoCard}>
            <h2 className={styles.cardTitle}>챌린지 정보</h2>

            <div className={styles.infoContent}>
              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>▣</div>

                <div>
                  <strong>진행 기간</strong>
                  <p>2024.05.20 ~ 2024.06.20 (32일 남음)</p>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>♙</div>

                <div>
                  <strong>참여 인원</strong>
                  <p>128명 참여 중</p>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>◎</div>

                <div>
                  <strong>목표</strong>
                  <p>30일 동안 6시 기상 인증</p>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>◇</div>

                <div>
                  <strong>인증 횟수</strong>
                  <p>12회 / 30회</p>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>☆</div>

                <div>
                  <strong>획득 포인트</strong>
                  <p>360P</p>
                </div>
              </div>

              <button type="button" className={styles.joinButton}>
                챌린지 참여하기
              </button>

              <button
                type="button"
                className={`${styles.likeButton} ${liked ? styles.liked : ""}`}
                onClick={() => setLiked(!liked)}
              >
                {liked ? "♥ 찜하기" : "♡ 찜하기"}
              </button>
            </div>
          </section>

          {/* 유의사항 */}
          <section className={styles.notice}>
            <h3>유의사항</h3>

            <ul>
              <li>인증은 하루 1회만 인정됩니다.</li>
              <li>타인의 사진 도용 시 참여가 제한될 수 있습니다.</li>
              <li>부정 인증 적발 시 포인트가 회수됩니다.</li>
            </ul>
          </section>

          {/* 함께하는 사람들 */}
          <section className={styles.peopleCard}>
            <h3>함께하는 사람들</h3>

            <div className={styles.people}>
              <span>●</span>
              <span>●</span>
              <span>●</span>
              <span>●</span>

              <div className={styles.more}>+123</div>
            </div>
          </section>
        </aside>
      </div>
    </main>
  );
};

export default ChallengeDetail;
