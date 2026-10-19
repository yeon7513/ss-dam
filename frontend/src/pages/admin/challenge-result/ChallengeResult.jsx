import { useMemo } from "react";
import { Link } from "react-router-dom";
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
  ADMIN_CHALLENGE_RESULT_CHALLENGE_SELECT,
  ADMIN_CHALLENGE_RESULT_INITIAL_FILTERS,
  ADMIN_CHALLENGE_RESULT_SORT_SELECT,
} from "../../../constants/admin-challenge/ChallengeResult.constants.js";

import styles from "./ChallengeResult.module.scss";

function formatDate(value) {
  return value ? String(value).slice(0, 10) : "-";
}

function formatNumber(value) {
  return value == null ? "-" : Number(value).toLocaleString("ko-KR");
}

function formatRate(value) {
  if (value == null) return "-";

  return `${Number(value).toLocaleString("ko-KR", {
    maximumFractionDigits: 1,
  })}%`;
}

function paymentLabel(value) {
  if (value === true) return "포인트 지급 완료";
  if (value === false) return "포인트 지급 미완료";

  return "포인트 지급 여부 확인 불가";
}

export default function ChallengeResult() {
  // 검색 조건 <-> 주소줄 쿼리스트링 동기화
  const { searchFilter, queryString, handleSearch, handleChangePages } =
    useSearchQuery(ADMIN_CHALLENGE_RESULT_INITIAL_FILTERS);

  // 종료 챌린지 목록 조회 (백엔드 파라미터 이름이 공통 필터와 같아서 그대로 전송)
  const { data, loading, error, refetch } = useLoadData(
    `/api/admin/challenge/result${queryString}`,
  );

  // 챌린지 선택 옵션용 - 종료된 챌린지 목록
  const { data: endedChallengeData } = useLoadData(
    "/api/admin/challenge?progressStatus=ENDED&perPage=100",
  );

  // 셀렉트 그룹 조립: 챌린지(API) + 정렬(상수)
  const selectGroups = useMemo(() => {
    const list = Array.isArray(endedChallengeData)
      ? endedChallengeData
      : endedChallengeData?.content || [];

    return [
      {
        ...ADMIN_CHALLENGE_RESULT_CHALLENGE_SELECT,
        options: list.map((item) => ({
          code: String(item.code),
          name: item.title,
        })),
      },
      ADMIN_CHALLENGE_RESULT_SORT_SELECT,
    ];
  }, [endedChallengeData]);

  const challenges = data?.content || [];
  const pager = data?.pager || null;

  return (
    <div className={styles.container}>
      <PanelHeader title="종료 데이터 분석" onRefresh={refetch} />

      {/* 공통 검색 필터 (기간 + 챌린지 + 정렬 + 검색) */}
      {/* 기간: 선택한 기간과 진행 기간이 겹치는 챌린지를 조회 */}
      <SearchFilterBar
        key={queryString}
        initFilter={ADMIN_CHALLENGE_RESULT_INITIAL_FILTERS}
        searchFilter={searchFilter}
        selectGroups={selectGroups}
        onSearch={handleSearch}
      />

      <div className={styles.summary}>
        {loading
          ? "조회 중"
          : error
            ? "조회 실패"
            : `총 ${formatNumber(pager?.total ?? 0)}개`}
      </div>

      <section aria-label="종료 챌린지 목록" aria-busy={loading}>
        {loading ? (
          <p className={styles.message} role="status">
            종료 챌린지를 불러오는 중입니다.
          </p>
        ) : error ? (
          <div className={styles.message} role="alert">
            <p>{error?.message || "종료 챌린지를 불러오지 못했습니다."}</p>
            <button type="button" onClick={refetch}>
              다시 시도
            </button>
          </div>
        ) : challenges.length === 0 ? (
          <p className={styles.message}>
            조회 조건에 맞는 종료 챌린지가 없습니다.
          </p>
        ) : (
          <div className={styles.list}>
            {challenges.map((challenge) => (
              <Link
                key={challenge.code}
                to={`/admin/challenge-result/${challenge.code}`}
                className={styles.card}
              >
                <div className={styles.thumbnail}>
                  {challenge.thumbnail ? (
                    <img
                      src={formatImagePath(challenge.thumbnail)}
                      alt=""
                      loading="lazy"
                    />
                  ) : (
                    <span>이미지 없음</span>
                  )}
                </div>

                <div className={styles.cardContent}>
                  <div className={styles.titleRow}>
                    <span className={styles.status} data-status="ENDED">종료</span>
                    <h2>{challenge.title}</h2>
                  </div>

                  <p className={styles.period}>
                    {formatDate(challenge.startDate)}
                    {" ~ "}
                    {formatDate(challenge.endDate)}
                  </p>

                  <p className={styles.description}>
                    {challenge.content || "등록된 설명이 없습니다."}
                  </p>

                  <div className={styles.footer}>
                    <div className={styles.author}>
                      <strong>{challenge.adminId || "관리자"}</strong>
                      <span>{challenge.adminRole || ""}</span>
                    </div>

                    <div className={styles.badges}>
                      <span>{paymentLabel(challenge.rewardPaid)}</span>

                      <span>
                        평균 달성률{" "}
                        {formatRate(challenge.averageAchievementRate)}
                      </span>

                      <span>
                        참여 {formatNumber(challenge.participantCount)}명
                      </span>

                      <span>등록 {formatDate(challenge.createdAt)}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* 페이지 이동 */}
      {!loading && !error && pager && pager.last > 1 && (
        <Pagination pager={pager} onChangePage={handleChangePages} />
      )}
    </div>
  );
}
