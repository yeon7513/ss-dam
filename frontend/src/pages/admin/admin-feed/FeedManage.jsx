import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

// 공통 UI 컴포넌트
import Pagination from "../../../components/common/pagination/Pagination";
import SearchFilterBar from "../../../components/dashboard/search-filter-bar/SearchFilterBar.jsx";
import FeedCard from "../../../components/feed/feed-card/FeedCard";
import PanelHeader from "../../../layout/admin/panel-header/PanelHeader.jsx";

// 공통 훅 & 유틸
import { useLoadData } from "../../../hooks/useLoadData";
import { useSearchQuery } from "../../../hooks/useSearchQuery";
import { buildQueryString } from "../../../utils/buildQueryString.js";

// 상수
import {
  ADMIN_FEED_CHALLENGE_SELECT,
  ADMIN_FEED_INITIAL_FILTERS,
  ADMIN_FEED_SORT,
  ADMIN_FEED_STATUS_TABS,
  ADMIN_FEED_TAG_GROUPS,
} from "../../../constants/admin-feed/FeedManage.constants.js";

import styles from "./FeedManage.module.scss";

export default function FeedManage() {
  const navigate = useNavigate();

  // 검색 조건 <-> 주소줄 쿼리스트링 동기화
  const { searchFilter, queryString, handleChangePages, handleSearch } =
    useSearchQuery(ADMIN_FEED_INITIAL_FILTERS);

  // SearchFilterBar 공통 날짜 이름(fromDate, toDate)을
  // 피드 API 파라미터 이름(startDate, endDate)으로 변환
  const apiQueryString = buildQueryString({
    ...searchFilter,
    startDate: searchFilter.fromDate,
    endDate: searchFilter.toDate,
    fromDate: "",
    toDate: "",
  });

  // 피드 목록 조회
  const { data, loading, error, refetch } = useLoadData(
    `/api/admin/feeds${apiQueryString}`,
  );

  // 챌린지 목록 조회 (챌린지 셀렉트 옵션용)
  const { data: challengeData } = useLoadData(
    "/api/admin/challenge?perPage=100",
  );

  // 챌린지 셀렉트 그룹 조립 (상수 + API 옵션)
  const selectGroups = useMemo(() => {
    const list = Array.isArray(challengeData)
      ? challengeData
      : challengeData?.content || [];

    return [
      {
        ...ADMIN_FEED_CHALLENGE_SELECT,
        options: list.map((item) => ({
          code: String(item.id || item.challengeCode || item.code),
          name: item.title,
        })),
      },
    ];
  }, [challengeData]);

  const feedList =
    data?.content || data?.feeds?.content || (Array.isArray(data) ? data : []);

  const pager = data?.pager || data?.feeds?.pager || null;
  const reportedCount = data?.reportedCount || 0;

  // 신고된 피드 탭에 뱃지 표시
  const tabsWithBadge = ADMIN_FEED_STATUS_TABS.map((tab) => ({
    ...tab,
    badge: tab.showBadge && reportedCount > 0 ? reportedCount : undefined,
  }));

  // 상태 탭 변경
  const handleTabChange = (statusValue) => {
    handleSearch({ status: statusValue });
  };

  return (
    <div className={styles.dashboardBody}>
      <PanelHeader title="피드 목록" onRefresh={refetch} />

      {/* 공통 검색 필터 (탭 + 작성일 + 챌린지 + 정렬 + 키워드 + 지역 태그) */}
      {/* key: 탭 변경·필터 삭제 등으로 쿼리가 바뀌면 내부 draft 상태를 새로 맞춤 */}
      <SearchFilterBar
        key={queryString}
        initFilter={ADMIN_FEED_INITIAL_FILTERS}
        searchFilter={searchFilter}
        tabMenu={{
          tabs: tabsWithBadge,
          activeStatus: searchFilter.status,
          onTabChange: handleTabChange,
        }}
        selectGroups={selectGroups}
        radioGroups={ADMIN_FEED_SORT}
        tagGroups={ADMIN_FEED_TAG_GROUPS}
        onSearch={handleSearch}
      />

      <div className={styles.mainContainer}>
        <div className={styles.feedCardGrid}>
          {loading ? (
            <div className={styles.emptyState}>
              데이터를 불러오는 중입니다...
            </div>
          ) : error ? (
            <div className={styles.emptyState}>
              데이터를 불러오지 못했습니다 ({error.message})
            </div>
          ) : feedList.length > 0 ? (
            feedList.map((feed) => (
              <FeedCard
                key={feed.id || feed.feedCode || feed.code}
                feed={feed}
                onClickDetail={(code) => navigate(`/admin/feed_manage/${code}`)}
              />
            ))
          ) : (
            <div className={styles.emptyState}>조회된 피드가 없습니다</div>
          )}
        </div>

        {pager && <Pagination pager={pager} onChangePage={handleChangePages} />}
      </div>
    </div>
  );
}