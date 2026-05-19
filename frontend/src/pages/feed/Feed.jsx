import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SwiperSlide } from 'swiper/react';
import { searchFeeds } from '../../api/feed';
import Card from '../../components/common/card/Card';
import ImageBox from '../../components/common/image-box/ImageBox';
import Slide from '../../components/common/slide/Slide';
import { HOST } from '../../lib/url';
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
          <div>
            <Slide>
              {feed.images.map((image, idx) => (
                <SwiperSlide key={idx}>
                  <ImageBox src={`${HOST}${image.path}`} width="300" />
                </SwiperSlide>
              ))}
            </Slide>
          </div>
          <div className={styles.title}>
            <span>{feed.chalTitle}</span>
            <h3>{feed.title}</h3>
          </div>
          <div className={styles.content}>
            <p>{feed.content}</p>
            <div>
              {feed.hashtags.map((tag, idx) => (
                <span key={idx}>#{tag.tagName}</span>
              ))}
            </div>
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
