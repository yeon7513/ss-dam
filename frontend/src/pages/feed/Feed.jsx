import { useEffect, useState } from "react";
import { IoChatbubbleEllipses, IoHeartSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { searchFeeds } from "../../api/feed";
import Card from "../../components/common/card/Card";
import Thumbnail from "../../components/common/card/thumbnail/Thumbnail";
import Pagination from "../../components/common/pagination/Pagination";
import SearchBox from "../../components/common/search-box/SearchBox";
import Hashtag from "../../components/feed/hashtag/Hashtag";
import SideNav from "../../components/feed/side-nav/FeedSideNav";
import ProfileCard from "../../components/profile-card/ProfileCard";
import { extractOptions } from "../../utils/extractSearchOptions";
import styles from "./Feed.module.scss";

const Feed = () => {
  const [feeds, setFeeds] = useState([]);

  // 페이지네이션 관련 state
  const [currentPage, setCurrentPage] = useState(1);
  const [searchCode, setSearchCode] = useState(0);
  const [keyword, setKeyword] = useState(null);

  const navigate = useNavigate();

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

  const handleClickDetail = (code) => {
    navigate(`/feed/${code}`);
  };

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
            <Card
              key={feed.code}
              className={styles.item}
              onClick={() => handleClickDetail(feed.code)}
            >
              {/* 프로필 카드 */}
              <ProfileCard memberProfile={feed.memberProfiles[0]} />

              {/* 이미지 슬라이드 */}
              <div className={styles.thumbnails}>
                <Thumbnail images={feed.images || null} />
              </div>

              {/* 본문 */}
              <div className={styles.contents}>
                {/* 제목 */}
                <div className={styles.title}>
                  <span>{feed.chalTitle}</span>
                  <h3>{feed.title}</h3>
                </div>

                {/* 콘텐츠 (내용) */}
                <div className={styles.detail}>
                  <p>{feed.content}</p>
                  <div className={styles.hashtags}>
                    {feed.hashtags.map((tag, idx) => (
                      <Hashtag key={idx}>
                        <span>#{tag.tagName}</span>
                      </Hashtag>
                    ))}
                  </div>
                </div>

                {/* 좋아요 & 댓글 & 작성일(시간) */}
                <div className={styles.info}>
                  <div className={styles.count}>
                    <div className={styles.icon}>
                      <span className={styles.like}>
                        <IoHeartSharp />
                      </span>
                      {feed.countFeedLike}
                    </div>
                    <div className={styles.icon}>
                      <span className={styles.comment}>
                        <IoChatbubbleEllipses />
                      </span>
                      {feed.countComment}
                    </div>
                  </div>
                  <div>
                    <span>{feed.createdAt}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <Pagination page={currentPage} />
      </div>
    </main>
  );
};

export default Feed;
