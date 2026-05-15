import { Link } from 'react-router-dom';

const FindPassword = () => {
  return (
    <div>
      <h2>FindPassword</h2>
      <Link to="/auth/findId">아이디 찾기</Link>
    </div>
  );
};

export default FindPassword;
