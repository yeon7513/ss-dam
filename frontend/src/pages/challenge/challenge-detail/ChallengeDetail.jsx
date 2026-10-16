import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ChallengeBreadcrumb from "../challenge-breadcrumb/ChallengeBreadcrumb";
import ChallengeSidebar from "../challenge-sidebar/ChallengeSidebar";
import ChallengeInfoCard from "../challengeInfo-card/ChallengeInfoCard";

import { CHALLENGE_TABS } from "../../../lib/challengeTabs";
import { formatImagePath } from "../../../utils/formatImagePath";

import styles from "./ChallengeDetail.module.scss";

const ChallengeDetail = () => {
  const { code } = useParams();
  const [selectedCode, setSelectedCode] = useState(code);
  const [mainDetail, setMainDetail] = useState(null);

  useEffect(() => {
    setSelectedCode(code);
  }, [code]);

  useEffect(() => {
    const fetchMainDetail = async (code) => {
      if (!code) return;
      try {
        const response = await fetch(`/api/challenge/${code}`);
        const result = await response.json();

        if (response.ok && result.success) {
          setMainDetail(result.data);
        } else {
          setMainDetail(null);
        }
      } catch (error) {
        // 메인 상세 정보 조회 중 오류가 발생함.
        console.error("메인 상세 정보 조회 오류", error);
      }
    };

    fetchMainDetail(selectedCode);
  }, [selectedCode]);

  return (
    /* 전체 영역 */
    <main className={styles.wrap}>
      {/* 사이드바 영역 */}
      <div className={styles.sideNavWrap}>
        <ChallengeSidebar
          selectedCode={selectedCode}
          onSelectChallenge={setSelectedCode}
        />
      </div>

      {/* 메인 컨테이너 영역 */}
      <div className={styles.container}>
        {/* 브레드크럼 영역 */}
        <div className={styles.breadcrumb}>
          <ChallengeBreadcrumb title={mainDetail?.title} />
        </div>

        {/* 챌린지 콘텐츠 영역 */}
        <div className={styles.contents}>
          {/* 메인 상세 정보 영역 */}
          <div className={styles.mainContent}>
            {/* 상단 헤더 영역 */}
            <div className={styles.headerArea}>
              {/* 상태 배지 영역 */}
              <div className={styles.headerTop}>
                <span className={styles.statusBadge}>
                  {CHALLENGE_TABS.find(
                    (tab) => tab.value === mainDetail?.progressStatus,
                  )?.label || "상태 미정"}
                </span>
              </div>

              {/* 제목 및 부제목 영역 */}
              <h1 className={styles.title}>{mainDetail?.title}</h1>
              <p className={styles.subTitle}>
                {mainDetail?.subTitle || mainDetail?.description}
              </p>

              {/* 카테고리 태그 영역 */}
              <div className={styles.categoryTags}>
                {mainDetail?.tags?.map((tag, idx) => (
                  <span key={idx} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* 메인 배너 영역 */}
            <div className={styles.bannerContainer}>
              {mainDetail?.imageUrl ? (
                <img
                  className={styles.bannerImg}
                  src={formatImagePath(mainDetail.imageUrl)}
                  alt={mainDetail.title}
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

            {/* 소개 섹션 영역 */}
            <section className={styles.introSection}>
              <h3 className={styles.sectionTitle}>챌린지 소개</h3>
              <div className={styles.sectionBody}>
                <p>{mainDetail?.content || mainDetail?.description}</p>
              </div>
            </section>
          </div>

          {/* 우측 카드 컬럼 영역 */}
          <div className={styles.rightColumn}>
            {selectedCode && <ChallengeInfoCard code={selectedCode} />}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ChallengeDetail;
