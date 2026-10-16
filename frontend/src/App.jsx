import { Navigate, Route, Routes } from "react-router-dom";
import AdminLayout from "./layout/admin/AdminLayout.jsx";
import Layout from "./layout/default/Layout.jsx";
import About from "./pages/about/About";
import ChallengeGuide from "./pages/about/challenge-guide/ChallengeGuide.jsx";
import MarketGuide from "./pages/about/market-guide/MarketGuide.jsx";
import AccountRegister from "./pages/admin/account-manage/account-register/AccountRegister.jsx";
import AccountManage from "./pages/admin/account-manage/AccountManage.jsx";
import AdminActivityLogs from "./pages/admin/activity-log/AdminActivityLogs";
import FeedManage from "./pages/admin/admin-feed/FeedManage";
import FeedManageDetail from "./pages/admin/admin-feed/FeedManageDetail.jsx";
import ChallengeManage from "./pages/admin/challenge-manage/ChallengeManage.jsx";
import ChallengeManageDetail from "./pages/admin/challenge-manage/ChallengeManageDetail.jsx";
import ChallengeRegister from "./pages/admin/challenge-manage/register/ChallengeRegister.jsx";
import ChallengeUpdate from "./pages/admin/challenge-manage/update/ChallengeUpdate.jsx";
import ChallengeResult from './pages/admin/challenge-result/ChallengeResult';
import ChallengeResultDetail from './pages/admin/challenge-result/ChallengeResultDetail';
import MarketManage from "./pages/admin/market/MarketManage";
import MarketManageDetail from "./pages/admin/market/MarketManageDetail.jsx";
import OperationStatus from "./pages/admin/OperationStatus";
import AdminReports from "./pages/admin/reports/AdminReports";
import UserManageDetail from "./pages/admin/user/user-manage-detail/UserManageDetail.jsx";
import UserManage from "./pages/admin/user/UserManage.jsx";
import FindId from "./pages/auth/find-account/find-id/FindId.jsx";
import FindPassword from "./pages/auth/find-account/find-password/FindPassword.jsx";
import FindAccount from "./pages/auth/find-account/FindAccount.jsx";
import LogIn from "./pages/auth/log-in/LogIn";
import Done from "./pages/auth/sign-up/Done";
import Info from "./pages/auth/sign-up/Info";
import SignUp from "./pages/auth/sign-up/SignUp";
import Terms from "./pages/auth/sign-up/Terms";
import Verify from "./pages/auth/sign-up/Verify";
import Challenge from "./pages/challenge/Challenge";
import ChallengeDetail from "./pages/challenge/ChallengeDetail";
import ChallengeRanking from "./pages/challenge/ChallengeRanking";
import Chat from "./pages/chat/Chat.jsx";
import Error from "./pages/error/Error.jsx";
import Feed from "./pages/feed/Feed";
import FeedRegister from "./pages/feed/feed-register/FeedRegister";
import FeedUpdate from "./pages/feed/feed-update/FeedUpdate.jsx";
import Home from "./pages/home/Home";
import Market from "./pages/market/Market";
import MarketPayment from "./pages/market/market-payment/MarketPayment";
import ProductDetail from "./pages/market/product-detail/ProductDetail.jsx";
import ProductRegister from "./pages/market/product-register/ProductRegister";
import ProductUpdate from "./pages/market/product-update/ProductUpdate.jsx";
import Deal from "./pages/my-page/deal/Deal";
import EditProfile from "./pages/my-page/edit_profile/EditProfile";
import MyPage from "./pages/my-page/MyPage.jsx";
import Points from "./pages/my-page/points/Points";
import SupportDetail from "./pages/support/SupportDetail";
import Supports from "./pages/support/Supports";
import AdminRoute from "./routes/AdminRoute.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* 메인(index) */}
        <Route index element={<Home />} />

        {/* 피드 */}
        <Route path="/feed">
          <Route index element={<Feed />} />
          {/*<Route element={<ProtectedRoute />}>*/}
          <Route path="register" element={<FeedRegister />} />
          <Route path="edit/:code" element={<FeedUpdate />} />
          {/*</Route>*/}
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
          <Route path=":code" element={<ProductDetail />} />
          {/*<Route element={<ProtectedRoute />}>*/}
          <Route path="register" element={<ProductRegister />} />
          <Route path="edit/:code" element={<ProductUpdate />} />
          {/*</Route>*/}
          <Route path="payment" element={<MarketPayment />} />
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
        <Route path="/supports">
          <Route index element={<Supports />} />
          <Route path=":code" element={<SupportDetail />} />
          <Route path="find_account" element={<FindAccount />}>
            <Route index element={<Navigate to="id" replace />} />
            <Route path="id" element={<FindId />} />
            <Route path="password" element={<FindPassword />} />
          </Route>
        </Route>

        {/* 일반회원 - 마이페이지 */}
        <Route element={<ProtectedRoute />}>
          <Route path="/mypage" element={<MyPage />}>
            <Route path="edit_profile" element={<EditProfile />} />
            <Route path="deal" element={<Deal />} />
            <Route path="points" element={<Points />} />
          </Route>
        </Route>
      </Route>

      {/* 관리자 - 대시보드 */}
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          {/* 운영 현황 */}
          <Route index element={<OperationStatus />} />

          {/* 미처리 신고 */}
          <Route path="reports" element={<AdminReports />} />

          {/* 회원 관리 */}
          <Route path="user_manage" element={<UserManage />} />
          <Route path="user_manage/:code" element={<UserManageDetail />} />

          {/* 피드 관리 */}
          <Route path="feed_manage">
            <Route index element={<FeedManage />} />
            <Route path=":code" element={<FeedManageDetail />} />
          </Route>

          {/* 마켓 관리 */}
          <Route path="market_manage">
            <Route index element={<MarketManage />} />
            <Route path=":code" element={<MarketManageDetail />} />
          </Route>

          {/* 챌린지 관리 */}
          <Route path="challenge_manage">
            <Route index element={<ChallengeManage />} />
            <Route path="register" element={<ChallengeRegister />} />
            <Route path="edit/:code" element={<ChallengeUpdate />} />
            <Route path=":code" element={<ChallengeManageDetail />} />

          </Route>

          {/* 챌린지 종료 데이터 분석 */}
          <Route path="challenge-result" element={<ChallengeResult />} />
          <Route path="challenge-result/:code" element={<ChallengeResultDetail />} />

          {/* 시스템 관리 */}
          <Route path="activity-logs" element={<AdminActivityLogs />} />
          <Route path="system_manage">
            <Route index element={<AccountManage />} />
            <Route path="account_register" element={<AccountRegister />} />
          </Route>

        </Route>
      </Route>

      {/* 채팅 페이지 */}
      <Route element={<ProtectedRoute />}>
        <Route path="/chat" element={<Chat />} />
      </Route>

      {/* 에러 페이지 */}
      <Route path="/error/:errCode" element={<Error />} />
      <Route path="*" element={<Navigate to="/error/404" replace />} />
    </Routes>
  );
}

export default App;
