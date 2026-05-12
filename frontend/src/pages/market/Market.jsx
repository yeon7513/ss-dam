import { Link } from 'react-router-dom';

const Market = () => {
  return (
    <div>
      <h2>마켓 페이지</h2>
      <p>여기에 백엔드에서 가져온 마켓 목록이 보일 거예요!</p>
      <Link to="/market/productRegister">물품 등록</Link>
    </div>
  );
};

export default Market;
