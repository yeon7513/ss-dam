import { useState } from "react";
import SideNav from "../../components/feed/side-nav/FeedSideNav";
import styles from "./Feed.module.scss";
import FeedCard from "../../components/feed/feed-card/FeedCard.jsx";
import { useLoadData } from "../../hooks/useLoadData.js";
import SearchBox from "../../components/common/search-box/SearchBox.jsx";
import Pagination from "../../components/common/pagination/Pagination.jsx";
import Modal from "../../components/common/modal/Modal.jsx";
import FeedDetail from "./feed-detail/FeedDetail.jsx";
import { useLocation, useSearchParams } from "react-router-dom";
import { buildQueryString } from "../../utils/buildQueryString.js";

const Feed = () => {
  // 페이지네이션 관련 state
  const [searchParams, setSearchParams] = useSearchParams();

  // URL 쿼리스트링에서 현재 상태 읽어오기 (없으면 기본값 적용)
  const currentPage = Number(searchParams.get('page')) || 1;
  const searchCode = searchParams.get('searchCode') || 0;
  const keyword = searchParams.get('keyword') || '';

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

  // 페이지 변경 핸들러
  const handleChangePage = (newPage) => {
    // 기존 검색 조건 유지하면서 page 번호만 변경
    const nextQuery = buildQueryString({
      page: newPage,
      perPage: 12,
      searchCode,
      keyword,
    });
    setSearchParams(nextQuery); // URL 변경 -> 자동으로 API 재요청 & UI 업데이트
  };

  // 검색 핸들러
  const handleSearch = (newSearchCode, newKeyword) => {
    // 새로운 검색 조건 적용 + 페이지는 1페이지로 리셋
    const nextQuery = buildQueryString({
      page: 1,
      perPage: 12,
      searchCode: newSearchCode,
      keyword: newKeyword,
    });
    setSearchParams(nextQuery); // URL 변경
  };

  // buildQueryString 유틸 함수로 API를 호출할 쿼리스트링 생성
  const queryString = buildQueryString({
    page: currentPage,
    perPage: 12,
    searchCode: searchCode,
    keyword: keyword,
  });

  // 피드 목록 조회 (커스텀 훅 적용)
  const { data, loading, error } = useLoadData(`/api/feeds${queryString}`);
  // 검색용 챌린지 카테고리 조회
  const { data: categories } = useLoadData("/api/challenge/categories");

  const feeds = data?.content || [];


  // 로딩 및 에러 처리
  if (loading) {
    return <div>피드 정보를 불러오고 있습니다.</div>;
  }
  if (error) {
    return <div>에러가 발생했습니다. {error}</div>;
  }

  return (
    <main className={styles.wrap}>
      <SideNav />
      <div className={styles.container}>
        {/* 검색 */}
        <SearchBox
          initSearchCode={searchCode}
          initKeyword={keyword}
          options={categories}
          onSubmit={handleSearch} // 검색 핸들러 아직 작성 안함!! (테스트 안해봄)
        />
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
        <Pagination pager={data?.pager} onChangePage={handleChangePage} />
      </div>
    </main>
  );
};

export default Feed;
