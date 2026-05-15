import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { searchFeedByCode } from '../../../api/feed';
import { HOST } from '../../../lib/url';

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

  console.log('detail: ', detail);

  if (detail === null) {
    return <div>데이터를 불러오는 중입니다.</div>;
  }

  return (
    <div>
      <h2>FeedDetail</h2>

      {detail.images.map((image) => (
        <img src={HOST + image.path} alt="" width="300" />
      ))}
    </div>
  );
};

export default FeedDetail;
