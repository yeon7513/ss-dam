import { useEffect, useState } from "react";
import styles from "./ChallengeDetail.module.scss";
import ChallengeSidebar from "./ChallengeSidebar";
import ChallengeInfoCard from "./ChallengeInfoCard";
import { CHALLENGE_TABS } from "../../lib/challengeTabs";

const ChallengeDetail = () => {
  const [selectedCode, setSelectedCode] = useState(null);
  const [mainDetail, setMainDetail] = useState(null);

  useEffect(() => {
    const fetchMainDetail = async (code) => {
      if (!code) return;
      try {
        const response = await fetch(`/api/user/challenge/${code}`);
        const result = await response.json();

        if (response.ok && result.success) {
          setMainDetail(result.data);
        } else {
          setMainDetail(null);
        }
      } catch (error) {
        console.error("메인 상세 정보 조회 오류", error);
      }
    };
    fetchMainDetail(selectedCode);
  }, [selectedCode]);

  return (
    <div className={styles.detailContainer}>
      <nav className={styles.breadcrumb}>
        <span>홈 </span>&gt;
        <span> 챌린지 </span>&gt;
        <span> 목록 </span>&gt; <span className={styles.activeNav}> 상세</span>
      </nav>
      <div className={styles.pageLayout}>
        <div className={styles.leftColumn}>
          <ChallengeSidebar
            selectedCode={selectedCode}
            onSelectChallenge={setSelectedCode}
          />
        </div>

        <main className={styles.mainContent}>
          <div className={styles.headerArea}>
            <div className={styles.headerTop}>
              <span className={styles.statusBadge}>
                {CHALLENGE_TABS.find(
                  (tab) => tab.value === mainDetail?.progressStatus,
                )?.label || "상태 미정"}
              </span>
            </div>

            <h1 className={styles.title}>{mainDetail?.title}</h1>
            <p className={styles.subTitle}>
              {mainDetail?.subTitle || mainDetail?.description}
            </p>

            <div className={styles.categoryTags}>
              {mainDetail?.tags?.map((tag, idx) => (
                <span key={idx} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.bannerContainer}>
            {mainDetail?.imageUrl ? (
              <img
                src={mainDetail.imageUrl}
                alt={mainDetail.title}
                className={styles.bannerImg}
              />
            ) : (
              <div className={styles.hero}>
                <div className={styles.sun} />
                <div className={styles.mountain1} />
                <div className={styles.mountain2} />
                <div className={styles.mountain3} />
                <div className={styles.groundBack} />
                <div className={styles.groundFront} />
              </div>
            )}
          </div>

          <section className={styles.introSection}>
            <h3 className={styles.sectionTitle}>챌린지 소개</h3>
            <div className={styles.sectionBody}>
              <p>{mainDetail?.content || mainDetail?.description}</p>
            </div>
          </section>
        </main>

        <div className={styles.rightColumn}>
          {selectedCode && <ChallengeInfoCard code={selectedCode} />}
        </div>
      </div>
    </div>
  );
};
export default ChallengeDetail;
