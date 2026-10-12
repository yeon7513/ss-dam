import React, { useCallback, useMemo } from "react";

import DashboardHeader from "../../../components/admin/dashboard-header/DashboardHeader.jsx";
import Pagination from "../../../components/common/pagination/Pagination";
import FeedCard from "../../../components/feed/feed-card/FeedCard";
import TabMenus from "../../../components/common/tab-menus/TabMenus";
import FeedFilterBar from "./FeedFilterBar.jsx";

import { useSearchQuery } from "../../../hooks/useSearchQuery";
import { useLoadData } from "../../../hooks/useLoadData";

import styles from "./FeedManage.module.scss";

import { INITIAL_FILTERS, TAB_LIST } from "../../../constants/FeedManage.constants.jsx";

export default function FeedManage() {
  const { searchFilter, queryString, handleChangePages, handleSearch } =
    useSearchQuery(INITIAL_FILTERS);

  const { data, loading, error } = useLoadData(
    `/api/admin/feeds${queryString}`,
  );

  const { data: challengeData } = useLoadData(
    "/api/admin/challenge?perPage=100",
  );

  const categoryOptions = useMemo(() => {
    if (!challengeData) return [];
    const list = Array.isArray(challengeData)
      ? challengeData
      : challengeData.content || [];

    return list.map((item) => ({
      code: String(item.id || item.challengeCode || item.code),
      name: item.title,
    }));
  }, [challengeData]);

  const feedList =
    data?.content || data?.feeds?.content || (Array.isArray(data) ? data : []);

  const pager = data?.pager || data?.feeds?.pager || null;
  const reportedCount = data?.reportedCount || 0;

  const tabsWithBadge = TAB_LIST.map((tab) => ({
    ...tab,
    badge: tab.showBadge && reportedCount > 0 ? reportedCount : undefined,
  }));

  const handleTabChange = (statusValue) => {
    handleSearch({ status: statusValue });
  };

  const handleRefresh = useCallback(() => {
    handleSearch(INITIAL_FILTERS);
  }, [handleSearch]);

  return (
    <div className={styles.dashboardBody}>
      <DashboardHeader
        title="피드 목록"
        onRefresh={handleRefresh}
      />

      <div className={styles.mainContainer}>
        <TabMenus
          tabs={tabsWithBadge}
          activeStatus={searchFilter.status || ""}
          onTabChange={handleTabChange}
        />

        <FeedFilterBar
          key={queryString}
          searchFilter={searchFilter}
          categoryOptions={categoryOptions}
          onSearch={handleSearch}
        />

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
              <FeedCard key={feed.id || feed.feedCode} feed={feed} />
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
