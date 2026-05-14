import { Link } from 'react-router-dom';

const FindId = () => {
  return (
    <div>
      <h2>FindId</h2>
      <Link to="/auth/findPassword">비밀번호 찾기</Link>
    </div>
  );
};

export default FindId;
