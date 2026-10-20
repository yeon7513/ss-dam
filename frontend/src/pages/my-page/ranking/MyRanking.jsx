import { useState } from "react";
import StatCard from "../../../components/common/card/StatCard.jsx";
import DataTable from "../../../components/common/data-table/DataTable.jsx";
import ImageBox from "../../../components/common/image-box/ImageBox.jsx";
import RatingIcon from "../../../components/common/icons/RatingIcon.jsx";
import Pagination from "../../../components/common/pagination/Pagination.jsx";
import { useLoadData } from "../../../hooks/useLoadData.js";
import MyChallengeChart from "./MyChallengeChart.jsx";
import styles from "./MyRanking.module.scss";

const formatNumber = (value) =>
  value == null ? "-" : Number(value).toLocaleString("ko-KR");

const RATING_NAMES = ["씨앗", "새싹", "줄기", "가지", "나무"];

const RANKING_COLUMNS = [
  {
    header: "순위",
    accessor: "ranking",
    render: (row) => `${formatNumber(row.ranking)}위`,
  },
  {
    header: "회원",
    accessor: "name",
    render: (row) => (
      <div className={styles.rankingMember}>
        <ImageBox
          src={row.profileImage}
          alt={`${row.name || "회원"} 프로필`}
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />

        <span>
          {row.name}
          {row.mine && <strong> (나)</strong>}
        </span>
      </div>
    ),
  },
  {
    header: "등급",
    accessor: "ratingName",
    render: (row) => (
      <span className={styles.rating}>
        {RATING_NAMES.includes(row.ratingName) && (
          <RatingIcon rating={RATING_NAMES.indexOf(row.ratingName)} />
        )}
        {row.ratingName}
      </span>
    ),
  },
  {
    header: "누적 활동 점수",
    accessor: "ratingScore",
    render: (row) => `${formatNumber(row.ratingScore)}점`,
  },
  {
    header: "완료한 챌린지",
    accessor: "completedChallengeCount",
    render: (row) => `${formatNumber(row.completedChallengeCount)}개`,
  },
];

export default function MyRanking() {
  const [page, setPage] = useState(1);

  const {
    data: profile,
    loading,
    error,
  } = useLoadData("/api/mypage/profile");

  const {
    data: recentChallenges,
    loading: progressLoading,
    error: progressError,
  } = useLoadData("/api/mypage/challenges/recent-progress");

  const {
    data: myRanking,
    loading: myRankingLoading,
    error: myRankingError,
  } = useLoadData("/api/mypage/rankings/me");

  const {
    data: rankingPage,
    loading: rankingLoading,
    error: rankingError,
  } = useLoadData(`/api/mypage/rankings?page=${page}&perPage=10`);

  if (loading) {
    return (
      <div className={styles.state} role="status">
        내 랭킹 정보를 불러오는 중입니다.
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className={styles.state} role="alert">
        내 랭킹 정보를 불러오지 못했습니다.
        잠시 후 다시 시도해 주세요.
      </div>
    );
  }

  const summaryCards = [
    {
      title: "누적 활동 점수",
      value: `${formatNumber(profile.ratingScore)}점`,
    },
    {
      title: "전체 순위",
      value: myRankingLoading
        ? "조회 중"
        : myRankingError || !myRanking
          ? "조회 실패"
          : `${formatNumber(myRanking.ranking)}위`,
    },
    {
      title: "누적 획득 그루",
      value: `${formatNumber(profile.totalEarnedPoint)}그루`,
    },
    {
      title: "완료한 챌린지",
      value: `${formatNumber(profile.completedChallengeCount)}개`,
    },
  ];

  return (
    <div className={styles.page}>
      <h2 className={styles.pageTitle}>내 랭킹 조회</h2>

      <div className={styles.topGrid}>
        {/* ① 프로필 */}
        <section className={styles.profilePanel} aria-label="내 프로필">
          <div className={styles.imageWrap}>
            <ImageBox
              className={styles.profileImage}
              src={profile.profileImage}
              alt={`${profile.name || "회원"} 프로필`}
            />
          </div>

          <div className={styles.profileInfo}>
            <strong className={styles.name}>{profile.name}</strong>
            <span className={styles.rating}>
              <RatingIcon rating={Number(profile.rating)} />
              {profile.ratingName}
            </span>

            <p className={styles.nextRating}>
              {profile.maxRating
                ? "최고 등급에 도달했어요!"
                : profile.nextRatingName
                  ? `${profile.nextRatingName}까지 ${formatNumber(
                      profile.remainingScore,
                    )}점 남았어요`
                  : "등급 정보를 준비 중입니다."}
            </p>
          </div>
        </section>

        {/* ② 개인 참여도 차트 */}
        <section className={styles.challengePanel}>
          <div className={styles.panelHeader}>
            <h3>챌린지 참여도</h3>
            <span>최근 참여한 챌린지 최대 5개</span>
          </div>

          {progressLoading ? (
            <div className={styles.chartPlaceholder} role="status">
              챌린지 참여도를 불러오는 중입니다.
            </div>
          ) : progressError ? (
            <div className={styles.chartPlaceholder} role="alert">
              챌린지 참여도를 불러오지 못했습니다.
            </div>
          ) : !recentChallenges?.length ? (
            <div className={styles.chartPlaceholder}>
              참여한 챌린지가 없습니다.
            </div>
          ) : (
            <MyChallengeChart challenges={recentChallenges} />
          )}
          {!progressLoading && !progressError && recentChallenges?.length > 0 && (
            <p className={styles.chartHint}>
              면적은 내 인증 피드 수, 색의 진하기는 달성률입니다.
            </p>
          )}
        </section>

        {/* ③ 공통 요약 카드 4개 */}
        <section className={styles.summaryPanel} aria-label="활동 요약">
          {summaryCards.map((card) => (
            <StatCard
              key={card.title}
              title={card.title}
              value={card.value}
            />
          ))}
        </section>
      </div>

      {/* ④ 전체 회원 랭킹 */}
      <section
        aria-label="전체 회원 랭킹"
        style={{ marginTop: 24 }}
      >
        <h3>전체 회원 랭킹</h3>

        {rankingLoading ? (
          <p role="status">랭킹을 불러오는 중입니다.</p>
        ) : rankingError ? (
          <p role="alert">랭킹을 불러오지 못했습니다.</p>
        ) : (
          <>
            <DataTable
              className={styles.rankingTable}
              columns={RANKING_COLUMNS}
              data={rankingPage?.content ?? []}
              totalCount={rankingPage?.pager?.total ?? 0}
            />

            {rankingPage?.content?.length > 0 && (
              <Pagination
                pager={rankingPage.pager}
                onChangePage={setPage}
              />
            )}
          </>
        )}
      </section>
    </div>
  );
}
