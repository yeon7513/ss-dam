import { Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import SignUp from './pages/auth/sign-up/SignUp';
import Challenge from './pages/challenge/Challenge';
import Comment from './pages/comment/Comment';
import Feed from './pages/feed/Feed';
import FeedRegister from './pages/feed/feed-register/FeedRegister';
import Home from './pages/home/Home';
import Market from './pages/market/Market';
import ProductRegister from './pages/market/product-register/ProductRegister';
import MyPage from './pages/myPage/MyPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/feed">
          <Route index element={<Feed />} />
          <Route path="feedRegister" element={<FeedRegister />} />
        </Route>
        <Route path="/challenge">
          <Route index element={<Challenge />} />
        </Route>
        <Route path="/market">
          <Route index element={<Market />} />
          <Route path="productRegister" element={<ProductRegister />} />
        </Route>
        <Route path="/myPage">
          <Route index element={<MyPage />} />
        </Route>
        <Route path="/comment">
          <Route index element={<Comment />} />
        </Route>
        <Route path="/signUp" element={<SignUp />} />
      </Route>
    </Routes>
  );
}

export default App;
