import { useParams } from "react-router-dom";

const FeedDetail = () => {
  const { code } = useParams();
  console.log({ code });
  return (
    <div>
      <h2>FeedDetail</h2> {/* 피드 상세 */}
    </div>
  );
};

export default FeedDetail;
