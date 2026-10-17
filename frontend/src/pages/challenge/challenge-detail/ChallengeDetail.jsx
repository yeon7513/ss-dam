import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IoWarningOutline } from "react-icons/io5";

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
    const fetchDetail = async () => {
      if (!selectedCode) return;
      try {
        const res = await fetch(`/api/challenge/${selectedCode}`);
        const resData = await res.json();
        if (res.ok && resData.success && resData.data) {
          setMainDetail(resData.data);
          return;
        }

        /* 단건 조회 실패 시 목록 조회 우회 처리 */
        const listRes = await fetch("/api/challenge");
        const listData = await listRes.json();
        const matched = listData.data?.find(
          (item) => String(item.code) === String(selectedCode),
        );
        setMainDetail(matched || null);
      } catch (error) {
        console.error("상세 정보 조회 오류:", error);
        setMainDetail(null);
      }
    };

    fetchDetail();
  }, [selectedCode]);

  const statusLabel =
    CHALLENGE_TABS.find((t) => t.value === mainDetail?.progressStatus)?.label ||
    "상태 미정";

  return (
    /* 전체 영역 */
    <main className={styles.wrap}>
      {/* 1열 사이드바 영역 */}
      <aside className={styles.sidebarWrap}>
        <ChallengeSidebar
          selectedCode={selectedCode}
          onSelectChallenge={setSelectedCode}
        />
      </aside>

      {/* 2열 메인 콘텐츠 영역 */}
      <section className={styles.mainContent}>
        {/* 브레드크럼 영역 */}
        <div className={styles.breadcrumb}>
          <ChallengeBreadcrumb detail={mainDetail} />
        </div>

        {/* 헤더 영역 */}
        <div className={styles.headerArea}>
          <span className={styles.statusBadge}>{statusLabel}</span>
          <h1 className={styles.title}>{mainDetail?.title}</h1>

          {/* 부제목/설명 조건부 렌더링 (데이터가 있을 때만 빈 자리 없이 표시) */}
          {(mainDetail?.subTitle || mainDetail?.description) && (
            <p className={styles.subTitle}>
              {mainDetail?.subTitle || mainDetail?.description}
            </p>
          )}

          <div className={styles.categoryTags}>
            {mainDetail?.tags?.map((tag, idx) => (
              <span className={styles.tag} key={idx}>
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
              alt={mainDetail?.title || "챌린지 배너 이미지"}
            />
          ) : (
            <div className={styles.noImage}>
              <IoWarningOutline className={styles.warningIcon} />
              <span>이미지 준비중입니다...</span>
            </div>
          )}
        </div>

        {/* 소개 섹션 영역 */}
        <section className={styles.introSection}>
          <h3 className={styles.sectionTitle}>챌린지 소개</h3>
          <p className={styles.introText}>
            {mainDetail?.content || mainDetail?.description}
          </p>
        </section>
      </section>

      {/* 3열 우측 카드 영역 */}
      <aside className={styles.rightColumn}>
        {selectedCode && <ChallengeInfoCard code={selectedCode} />}
      </aside>
    </main>
  );
};

export default ChallengeDetail;
