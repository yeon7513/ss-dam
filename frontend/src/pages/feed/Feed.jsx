import { useEffect, useState } from "react";
import SideNav from "../../components/feed/side-nav/FeedSideNav";
import styles from "./Feed.module.scss";
import { handleLoadFeeds } from "../../api/feed.js";
import FeedCard from "../../components/feed/feed-card/FeedCard.jsx";

const Feed = () => {
  const [feeds, setFeeds] = useState([]);

  // 페이지네이션 관련 state
  const [currentPage, setCurrentPage] = useState(1);
  const [searchCode, setSearchCode] = useState(null);
  const [keyword, setKeyword] = useState(null);

  useEffect(() => {
    const fetchFeeds = async () => {
      const pager = {
        page: currentPage,
        perPage: 12,
        search: searchCode,
        keyword: keyword,
      };

      const feeds = await handleLoadFeeds(pager);

      if (feeds) {
        setFeeds(feeds);
      }
    };

    fetchFeeds();
  }, [currentPage, searchCode, keyword]);

  if (feeds.length === 0) {
    return <div>피드 정보를 불러오고 있습니다.</div>;
  }

  return (
    <main className={styles.wrap}>
      <SideNav />
      <div className={styles.container}>
        {/*<SearchBox*/}
        {/*  options={extractOptions(feeds, "chalCode", "chalTitle")}*/}
        {/*  onSearchCodeChange={setSearchCode}*/}
        {/*  onKeywordChange={setKeyword}*/}
        {/*  onSubmit={null} // 검색 핸들러 아직 작성 안함!! (테스트 안해봄)*/}
        {/*/>*/}
        <div className={styles.list}>
          {feeds.map((feed) => (
            <FeedCard key={feed.code} feed={feed} />
          ))}
        </div>
        {/*<Pagination page={currentPage}/>*/}
      </div>
    </main>
  );
};

export default Feed;
