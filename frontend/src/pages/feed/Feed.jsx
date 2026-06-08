import { useEffect, useState } from "react";
import { searchFeeds } from "../../api/feed";
import Pagination from "../../components/common/pagination/Pagination";
import SearchBox from "../../components/common/search-box/SearchBox";
import FeedCard from "../../components/feed/feed-card/FeedCard";
import SideNav from "../../components/feed/side-nav/FeedSideNav";
import { extractOptions } from "../../utils/extractSearchOptions";
import styles from "./Feed.module.scss";

const Feed = () => {
  const [feeds, setFeeds] = useState([]);

  console.log(feeds);

  // 페이지네이션 관련 state
  const [currentPage, setCurrentPage] = useState(1);
  const [searchCode, setSearchCode] = useState(0);
  const [keyword, setKeyword] = useState(null);

  useEffect(() => {
    const handleLoadFeedDetail = async () => {
      const pager = {
        page: currentPage,
        perPage: 12,
        search: searchCode,
        keyword: keyword,
      };

      const feeds = await searchFeeds(pager);

      if (feeds) {
        setFeeds(feeds);
      }
    };

    handleLoadFeedDetail();
  }, [currentPage, keyword, searchCode]);

  if (feeds.length === 0) {
    return <div>피드 정보를 불러오고 있습니다.</div>;
  }

  return (
    <main className={styles.wrap}>
      <SideNav />
      <div className={styles.container}>
        <SearchBox
          options={extractOptions(feeds, "chalCode", "chalTitle")}
          onSearchCodeChange={setSearchCode}
          onKeywordChange={setKeyword}
          onSubmit={null} // 검색 핸들러 아직 작성 안함!! (테스트 안해봄)
        />
        <div className={styles.list}>
          {feeds.map((feed) => (
            <FeedCard key={feed.code} feed={feed} />
          ))}
        </div>
        <Pagination page={currentPage} />
      </div>
    </main>
  );
};

export default Feed;
