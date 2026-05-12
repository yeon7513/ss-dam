import { Link } from 'react-router-dom';

const Feed = () => {
  return (
    <div>
      <h2>피드 페이지</h2>
      <p>여기에 백엔드에서 가져온 피드 목록이 보일 거예요!</p>
      <Link to="/feed/feedRegister">피드 등록</Link>
    </div>
  );
};

export default Feed;
