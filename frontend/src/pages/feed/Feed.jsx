import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { searchFeeds } from '../../api/feed';
import Card from '../../components/common/card/Card';
import Thumbnail from '../../components/common/card/thumbnail/Thumbnail';
import Slide from '../../components/common/slide/Slide';
import ProfileCard from '../../components/profile-card/ProfileCard';
import styles from './Feed.module.scss';

const Feed = () => {
  const [feeds, setFeeds] = useState([]);

  useEffect(() => {
    const handleLoadFeedDetail = async () => {
      const feeds = await searchFeeds();

      if (feeds) {
        setFeeds(feeds);
      }
    };

    handleLoadFeedDetail();
  }, []);

  console.log('feeds: ', feeds);

  if (feeds.length < 0) {
    return <div>피드 정보를 불러오고 있습니다.</div>;
  }

  return (
    <div>
      {feeds.map((feed) => (
        <Card key={feed.code}>
          {/* 프로필 카드 */}
          <ProfileCard memberProfile={feed.memberProfiles[0]} />

          {/* 이미지 슬라이드 */}
          <div>
            <Slide>
              <Thumbnail images={feed.images.length > 0 ? feed.images : []} />
            </Slide>
          </div>

          {/* 제목 */}
          <div className={styles.title}>
            <span>{feed.chalTitle}</span>
            <h3>{feed.title}</h3>
          </div>

          {/* 콘텐츠 (내용) */}
          <div className={styles.content}>
            <p>{feed.content}</p>
            <div>
              {feed.hashtags.map((tag, idx) => (
                <span key={idx}>#{tag.tagName}</span>
              ))}
            </div>

            {/* 좋아요 & 댓글 & 작성일(시간) */}
            <div className={styles.info}>
              <div className={styles.count}>
                <span>{feed.countFeedLike}</span>
                <span>{feed.countComment}</span>
              </div>
              <div>
                <span>{feed.createdAt}</span>
              </div>
            </div>
          </div>
        </Card>
      ))}

      <hr />
      <Link to="/feed/feedRegister">피드 등록</Link>
    </div>
  );
};

export default Feed;
