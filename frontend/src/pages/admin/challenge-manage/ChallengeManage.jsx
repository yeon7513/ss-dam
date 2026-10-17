import { Link, useNavigate } from "react-router-dom";
import { formatImagePath } from "../../../utils/formatImagePath";

// 공통 UI 컴포넌트
import Pagination from "../../../components/common/pagination/Pagination";
import SearchFilterBar from "../../../components/dashboard/search-filter-bar/SearchFilterBar.jsx";
import PanelHeader from "../../../layout/admin/panel-header/PanelHeader.jsx";

// 공통 훅
import { useLoadData } from "../../../hooks/useLoadData.js";
import { useSearchQuery } from "../../../hooks/useSearchQuery.js";

// 상수
import {
  ADMIN_CHALLENGE_INITIAL_FILTERS,
  ADMIN_CHALLENGE_POST_STATUS_OPTIONS,
  ADMIN_CHALLENGE_PROGRESS_OPTIONS,
  ADMIN_CHALLENGE_SELECT_OPTIONS,
  toOptionName,
} from "../../../constants/admin-challenge/ChallengeManage.constants.js";

import styles from "./ChallengeManage.module.scss";

export default function ChallengeManage() {
  const navigate = useNavigate();

  // 검색 조건 <-> 주소줄 쿼리스트링 동기화
  const { searchFilter, queryString, handleSearch, handleChangePages } =
    useSearchQuery(ADMIN_CHALLENGE_INITIAL_FILTERS);

  // 챌린지 목록 조회 (백엔드 파라미터 이름이 공통 필터와 같아서 그대로 전송)
  const { data, loading, error, refetch } = useLoadData(
    `/api/admin/challenge${queryString}`,
  );

  const challenges = data?.content || [];
  const pager = data?.pager || null;

  return (
    <div className={styles.container}>
      <PanelHeader title="챌린지 진행 현황" onRefresh={refetch} />

      {/* 공통 검색 필터 (기간 + 진행/공개 상태 + 정렬 + 검색) */}
      {/* 하단 버튼: [초기화] [챌린지 등록] */}
      <SearchFilterBar
        key={queryString}
        initFilter={ADMIN_CHALLENGE_INITIAL_FILTERS}
        searchFilter={searchFilter}
        selectGroups={ADMIN_CHALLENGE_SELECT_OPTIONS}
        ctaButton={{
          label: "챌린지 등록",
          onClick: () => navigate("/admin/challenge_manage/register"),
        }}
        onSearch={handleSearch}
      />

      {/* 챌린지 카드 목록 */}
      {loading ? (
        <p className={styles.message}>챌린지 목록을 불러오는 중입니다.</p>
      ) : error ? (
        <p className={styles.error} role="alert">
          {error?.message || "챌린지 목록을 불러오지 못했습니다."}
        </p>
      ) : challenges.length === 0 ? (
        <p className={styles.message}>조회된 챌린지가 없습니다.</p>
      ) : (
        <div className={styles.challengeList}>
          {challenges.map((challenge) => (
            <Link
              key={challenge.code}
              to={`/admin/challenge_manage/${challenge.code}`}
              className={styles.challengeCard}
            >
              <div className={styles.thumbnail}>
                {challenge.thumbnail ? (
                  <img
                    src={formatImagePath(challenge.thumbnail)}
                    alt={`${challenge.title} 대표 이미지`}
                  />
                ) : (
                  <span>이미지 없음</span>
                )}
              </div>

              <div className={styles.cardContent}>
                <div className={styles.titleRow}>
                  <span className={styles.status}>
                    {toOptionName(ADMIN_CHALLENGE_PROGRESS_OPTIONS, challenge.progressStatus)}
                  </span>
                  <h2>{challenge.title}</h2>
                </div>

                <p>
                  {challenge.startDate} ~ {challenge.endDate}
                </p>

                <p className={styles.description}>{challenge.content}</p>

                <div className={styles.meta}>
                  <span>참여자 {challenge.participantCount ?? 0}명</span>
                  <span>달성률 {challenge.achievementRate ?? 0}%</span>
                  <span>
                    {toOptionName(ADMIN_CHALLENGE_POST_STATUS_OPTIONS, challenge.postStatus)}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* 페이지 이동 */}
      {!loading && !error && pager && (
        <Pagination pager={pager} onChangePage={handleChangePages} />
      )}
    </div>
  );
}