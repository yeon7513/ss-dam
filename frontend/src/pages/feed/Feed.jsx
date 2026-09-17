import { useState } from "react";
import FeedSideNav from "../../components/feed/side-nav/FeedSideNav";
import styles from "./Feed.module.scss";
import FeedCard from "../../components/feed/feed-card/FeedCard.jsx";
import { useLoadData } from "../../hooks/useLoadData.js";
import SearchBox from "../../components/common/search-box/SearchBox.jsx";
import Pagination from "../../components/common/pagination/Pagination.jsx";
import Modal from "../../components/common/modal/Modal.jsx";
import FeedDetail from "./feed-detail/FeedDetail.jsx";
import { useLocation } from "react-router-dom";
import TabMenus from "../../components/common/tab-menus/TabMenus.jsx";
import { useSearchQuery } from "../../hooks/useSearchQuery.js";

const SORT_MENU = [
  { label: "최신순", value: "createdAt" },
  { label: "인기순", value: "popular" },
]

const Feed = () => {
  // 페이지네이션 & 검색 관련
  const { queryString, handleChangePages, handleSearch, searchFilter } = useSearchQuery({
    page: 1,
    perPage: 12,
    chalCode: null,
    keyword: '',
    sortTarget: 'createdAt',
  });
  // 피드 목록 조회 (커스텀 훅 적용)
  const { data, loading, error } = useLoadData(`/api/feeds${queryString}`);
  // 검색용 챌린지 카테고리 조회
  const { data: categories } = useLoadData("/api/challenge/categories");

  const feeds = data?.content || [];

  const [sort, setSort] = useState(SORT_MENU[0].value);
  const handleClickSort = (sort) => {
    setSort(sort);
    handleSearch({
      sortTarget: sort,
    })
  }

  // 등록 및 수정 시 바로 띄워줄 code값
  // -> 완료 후 작성 또는 수정된 피드를 바로 모달로 띄우기 위해 사용
  const location = useLocation();
  const newCode = location.state?.code;

  // 모달 관련 state & function
  // 즉, 선택된 피드의 code를 관리함. null이면? 모달 닫힘
  const [selectedFeedCode, setSelectedFeedCode] = useState(null);

  const handleOpenDetail = (code) => {
    setSelectedFeedCode(code);
  };

  const handleCloseDetail = () => {
    setSelectedFeedCode(null);
  };

  return (
    <main className={styles.wrap}>
      <FeedSideNav />
      <div className={styles.container}>
        <div className={styles.filterBar}>
          {/* 정렬 */}
          <TabMenus
            className={styles.sortTab}
            tabs={SORT_MENU}
            activeStatus={sort}
            onTabChange={handleClickSort} />
          {/* 검색 */}
          <SearchBox
            name="chalCode"
            initSelectValue={searchFilter.chalCode}
            initKeyword={searchFilter.keyword}
            options={categories}
            onSearch={handleSearch}
          />
        </div>
        {/* 목록 렌더링 */}
        <div className={styles.list}>
          {feeds.length > 0 ? (
            feeds.map((feed) => <FeedCard key={feed.code} feed={feed} onClickDetail={handleOpenDetail} />)
          ) : (
            <p>검색된 피드가 없습니다.</p>
          )}
        </div>

        {/* 피드가 선택되었을 때만 모달 렌더링 */}
        <Modal
          // isOpen={true}
          isOpen={selectedFeedCode !== null}
          onClose={handleCloseDetail}>
          {selectedFeedCode && (
            <FeedDetail code={selectedFeedCode || newCode} onClose={handleCloseDetail} />
          )}
        </Modal>

        {/* 페이지네이션 */}
        <Pagination pager={data?.pager} onChangePage={handleChangePages} />
      </div>
    </main>
  );
};

export default Feed;
