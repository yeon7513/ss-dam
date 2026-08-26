import { Navigate, Route, Routes } from "react-router-dom";
import AdminLayout from "./layout/AdminLayout";
import Layout from "./layout/Layout";
import About from "./pages/about/About";
import ChallengeGuide from "./pages/about/challenge-guide/ChallengeGuide.jsx";
import MarketGuide from "./pages/about/market-guide/MarketGuide.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ChallengeManage from "./pages/admin/ChallengeManage";
import FeedManage from "./pages/admin/FeedManage";
import MarketManage from "./pages/admin/MarketManage";
import UserManage from "./pages/admin/UserManage";
import FindId from "./pages/auth/find/FindId";
import FindPassword from "./pages/auth/find/FindPassword";
import LogIn from "./pages/auth/log-in/LogIn";
import Done from "./pages/auth/sign-up/Done";
import Info from "./pages/auth/sign-up/Info";
import SignUp from "./pages/auth/sign-up/SignUp";
import Terms from "./pages/auth/sign-up/Terms";
import Verify from "./pages/auth/sign-up/Verify";
import Challenge from "./pages/challenge/Challenge";
import ChallengeDetail from "./pages/challenge/ChallengeDetail";
import ChallengeRanking from "./pages/challenge/ChallengeRanking";
import Feed from "./pages/feed/Feed";
import FeedRegister from "./pages/feed/feed-register/FeedRegister";
import Home from "./pages/home/Home";
import Market from "./pages/market/Market";
import MarketDetail from "./pages/market/market-detail/MarketDetail";
import MarketPayment from "./pages/market/market-payment/MarketPayment";
import ProductRegister from "./pages/market/product-register/ProductRegister";
import Activities from "./pages/myPage/activities/Activities";
import Dashboard from "./pages/myPage/dashboard/Dashboard";
import Deal from "./pages/myPage/deal/Deal";
import EditProfile from "./pages/myPage/edit_profile/EditProfile";
import MyPage from "./pages/myPage/MyPage";
import Points from "./pages/myPage/points/Points";
import SupportDetail from "./pages/support/SupportDetail";
import Supports from "./pages/support/Supports";
import AdminRoute from "./components/common/admin/AdminRoute";
import FeedDetail from "./pages/feed/feed-detail/FeedDetail.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* 메인(index) */}
        <Route index element={<Home />} />

        {/* 피드 */}
        <Route path="/feed">
          <Route index element={<Feed />} />
          <Route path="register" element={<FeedRegister />} />
          <Route path="edit/:code" element={<FeedDetail />} />
        </Route>

        {/* 챌린지 */}
        <Route path="/challenge">
          <Route index element={<Challenge />} />
          <Route path=":code" element={<ChallengeDetail />} />
          <Route path="ranking" element={<ChallengeRanking />} />
        </Route>

        {/* 마켓 - 다시쓰담 */}
        <Route path="/market">
          <Route index element={<Market />} />
          <Route path="register" element={<ProductRegister />} />
          <Route path=":code" element={<MarketDetail />} />
          <Route path="payment" element={<MarketPayment />} />
        </Route>

        {/* 아이디 및 비밀번호 찾기 */}
        <Route path="/auth">
          <Route index element={<Navigate to="findId" replace />} />
          <Route path="find_id" element={<FindId />} />
          <Route path="find_password" element={<FindPassword />} />
        </Route>

        {/* 로그인 */}
        <Route path="login" element={<LogIn />} />

        {/* 회원가입 */}
        <Route path="signup" element={<SignUp />}>
          <Route index element={<Terms />} />
          <Route path="verify" element={<Verify />} />
          <Route path="info" element={<Info />} />
          <Route path="done" element={<Done />} />
        </Route>

        {/* 소개 */}
        <Route path="/about" element={<About />}>
          <Route index element={<Navigate to="challenge_guide" replace />} />
          <Route path="challenge_guide" element={<ChallengeGuide />} />
          <Route path="market_guide" element={<MarketGuide />} />
        </Route>

        {/* 고객센터 */}
        <Route path="supports" element={<Supports />} />
        <Route path=":code" element={<SupportDetail />} />

        {/* 일반회원 - 마이페이지 */}
        <Route path="/mypage">
          <Route index element={<MyPage />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="edit_profile" element={<EditProfile />} />
          <Route path="activities" element={<Activities />} />
          <Route path="deal" element={<Deal />} />
          <Route path="points" element={<Points />} />
        </Route>
      </Route>

      {/* 관리자 - 대시보드 */}
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="user_manage" element={<UserManage />} />
          <Route path="feed_manage" element={<FeedManage />} />
          <Route path="market_manage" element={<MarketManage />} />
          <Route path="challenge_manage" element={<ChallengeManage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
