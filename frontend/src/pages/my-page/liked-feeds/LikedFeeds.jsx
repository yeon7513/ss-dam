import { useState } from "react";
import SearchBox from "../../../components/common/search-box/SearchBox.jsx";
import Pagination from "../../../components/common/pagination/Pagination.jsx";
import Modal from "../../../components/common/modal/Modal.jsx";
import FeedCard from "../../../components/feed/feed-card/FeedCard.jsx";
import FeedDetail from "../../feed/feed-detail/FeedDetail.jsx";
import { useLoadData } from "../../../hooks/useLoadData.js";
import layout from "../activities/Activities.module.scss";
import styles from "./LikedFeeds.module.scss";

const number = (value) => Number(value ?? 0).toLocaleString("ko-KR");

export default function LikedFeeds() {
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [selectedCode, setSelectedCode] = useState(null);
  const query = new URLSearchParams({ myLikesOnly: "true", page, perPage: 9, keyword });
  const { data, loading, error, refetch } = useLoadData(`/api/feeds?${query}`);
  const { data: summary, error: summaryError, refetch: refreshSummary } = useLoadData("/api/mypage/liked-feeds/summary");
  const feeds = data?.content ?? [];

  const closeDetail = () => {
    setSelectedCode(null);
    refetch();
    refreshSummary();
  };

  return (
    <section className={layout.wrap}>
      <h2 className={layout.pageTitle}>좋아요 피드</h2>
      <div className={layout.topBar}>
        <SearchBox className={layout.searchBox} name="search" initKeyword=""
          onSearch={({ keyword: value }) => { setPage(1); setKeyword((value ?? "").trim()); }} />
        <ul className={layout.summary}>
          <li><span>즐겨찾기 한 사람들</span><strong>{summaryError ? "-" : number(summary?.totalAuthors)}명</strong></li>
          <li><span>댓글 단 횟수</span><strong>{summaryError ? "-" : number(summary?.totalComments)}회</strong></li>
          <li><span>누른 좋아요 개수</span><strong>{summaryError ? "-" : number(summary?.totalLikes)}개</strong></li>
        </ul>
      </div>
      {loading ? <p className={layout.state} role="status">좋아요 피드를 불러오고 있습니다.</p>
        : error ? <p className={layout.state} role="alert">{error.message || "좋아요 피드를 불러오지 못했습니다."}</p>
          : feeds.length === 0 ? <p className={layout.state}>조회된 좋아요 피드가 없습니다.</p>
            : <div className={styles.grid}>{feeds.map((feed) => (
              <FeedCard key={feed.code} feed={feed} onClickDetail={setSelectedCode} />
            ))}</div>}
      {!loading && !error && data?.pager?.total > 0 && (
        <Pagination pager={data.pager} onChangePage={setPage} />
      )}
      <Modal isOpen={selectedCode !== null} onClose={closeDetail}>
        {selectedCode && <FeedDetail code={selectedCode} onClose={closeDetail} />}
      </Modal>
    </section>
  );
}
