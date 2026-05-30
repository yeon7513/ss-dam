import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { searchFeedByCode } from "../../../api/feed";
import Thumbnail from "../../../components/common/card/thumbnail/Thumbnail";
import ProfileCard from "../../../components/profile-card/ProfileCard";
import styles from "./FeedDetail.module.scss";

const FeedDetail = () => {
  const [detail, setDetail] = useState(null);

  const { code } = useParams();

  // 피드 상세 조회 데이터 불러오기
  useEffect(() => {
    const handleLoadFeedDetail = async () => {
      const feedDetail = await searchFeedByCode(code);

      if (feedDetail) {
        setDetail(feedDetail);
      }
    };

    handleLoadFeedDetail();
  }, [code]);

  console.log("detail: ", detail);

  if (detail === null) {
    return <div>데이터를 불러오는 중입니다.</div>;
  }

  return (
    <div className={styles.feedDetail}>
      <div className={styles.title}>
        <button>
          <FaArrowLeft />
        </button>
        <div>
          <span>{detail.chalTitle}</span>
          <h2>{detail.title}</h2>
        </div>
      </div>

      <div className={styles.container}>
        {/* 이미지 슬라이드 */}
        <div className={styles.thumbnails}>
          <Thumbnail images={detail.images || null} />
        </div>
        <div className={styles.contents}>
          <ProfileCard memberProfile={detail.memberProfiles[0]} />
          <p>{detail.content}</p>
        </div>
      </div>
    </div>
  );
};

export default FeedDetail;
