import { useState } from "react";
import SideNav from "../../components/feed/side-nav/FeedSideNav";
import styles from "./Feed.module.scss";
import FeedCard from "../../components/feed/feed-card/FeedCard.jsx";
import { useLoadData } from "../../hooks/useLoadData.js";
import SearchBox from "../../components/common/search-box/SearchBox.jsx";
import Pagination from "../../components/common/pagination/Pagination.jsx";

const Feed = () => {
  // 페이지네이션 관련 state
  const [currentPage, setCurrentPage] = useState(1);
  const [searchCode, setSearchCode] = useState(null);
  const [keyword, setKeyword] = useState(null);

  // 쿼리스트링 생성
  const queryParams = new URLSearchParams({
    page: currentPage,
    perPage: 12,
    ...(searchCode && { search: searchCode }),
    ...(keyword && { keyword: keyword }),
  }).toString();

  // 피드 목록 조회 (커스텀 훅 적용)
  const {
    data,
    loading,
    error,
  } = useLoadData(`/api/feeds?${queryParams}`);

  // 검색용 챌린지 카테고리 조회
  const { data: categories } = useLoadData("/api/categories/challenge/all");

  const feeds = data || [];

  // 로딩 및 에러 처리
  if (loading) {
    return <div>피드 정보를 불러오고 있습니다.</div>;
  }
  if (error) {
    return <div>에러가 발생했습니다. {error}</div>;
  }

  console.log(feeds);

  return (
    <main className={styles.wrap}>
      <SideNav />
      <div className={styles.container}>
        {/* 검색 */}
        <SearchBox
          options={categories}
          onSearchCodeChange={setSearchCode}
          onKeywordChange={setKeyword}
          onSubmit={() => setCurrentPage(1)} // 검색 핸들러 아직 작성 안함!! (테스트 안해봄)
        />
        {/* 목록 렌더링 */}
        <div className={styles.list}>
          {feeds.length > 0 ? (
            feeds.map((feed) => <FeedCard key={feed.code} feed={feed} />)
          ) : (
            <p>검색된 피드가 없습니다.</p>
          )}
        </div>
        {/* 페이지네이션 */}
        <Pagination page={currentPage} />
      </div>
    </main>
  );
};

export default Feed;
