import { Navigate, Route, Routes } from "react-router-dom";
import Comment from "./components/feed/comment/Comment";
import Layout from "./layout/Layout";
import About from "./pages/about/About";
import ChallengeGuide from "./pages/about/ChallengeGuide";
import MarketGuide from "./pages/about/MarketGuide";
import FindId from "./pages/auth/find/FindId";
import FindPassword from "./pages/auth/find/FindPassword";
import LogIn from "./pages/auth/log-in/LogIn";
import Done from "./pages/auth/sign-up/Done";
import Info from "./pages/auth/sign-up/Info";
import SignUp from "./pages/auth/sign-up/SignUp";
import Terms from "./pages/auth/sign-up/Terms";
import Verify from "./pages/auth/sign-up/Verify";
import Challenge from "./pages/challenge/Challenge";
import Feed from "./pages/feed/Feed";
import FeedDetail from "./pages/feed/feed-detail/FeedDetail";
import FeedRegister from "./pages/feed/feed-register/FeedRegister";
import Home from "./pages/home/Home";
import Market from "./pages/market/Market";
import ProductRegister from "./pages/market/product-register/ProductRegister";
import MyPage from "./pages/myPage/MyPage";
import MarketDetail from "./pages/market/market-detail/MarketDetail";
import MarketPayment from "./pages/market/market-payment/MarketPayment";
import ChallengeDetail from "./pages/challenge/ChallengeDetail";
import ChallengeRanking from "./pages/challenge/ChallengeRanking";
import Supports from "./pages/support/Supports";
import SupportDetail from "./pages/support/SupportDetail";
import Dashboard from "./pages/myPage/dashboard/Dashboard";
import EditProfile from "./pages/myPage/edit_profile/EditProfile";
import Activities from "./pages/myPage/activities/Activities";
import Deal from "./pages/myPage/deal/Deal";
import Points from "./pages/myPage/points/Points";
import AdminLayout from "./layout/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserManage from "./pages/admin/UserManage";
import FeedManage from "./pages/admin/FeedManage";
import MarketManage from "./pages/admin/MarketManage";
import ChallengeManage from "./pages/admin/ChallengeManage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/feed">
          <Route index element={<Feed />} />
          <Route path="feedRegister" element={<FeedRegister />} />
          <Route path=":code" element={<FeedDetail />} />
        </Route>
        <Route path="/challenge">
          <Route index element={<Challenge />} />
          <Route path="challengeDetail" element={<ChallengeDetail />} />
          <Route path="challengeRanking" element={<ChallengeRanking />} />
        </Route>
        <Route path="/market">
          <Route index element={<Market />} />
          <Route path="productRegister" element={<ProductRegister />} />
          <Route path="marketDetail" element={<MarketDetail />} />
          <Route path="marketPayment" element={<MarketPayment />} />
        </Route>
        <Route path="/myPage">
          <Route index element={<MyPage />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="editProfile" element={<EditProfile />} />
          <Route path="activities" element={<Activities />} />
          <Route path="deal" element={<Deal />} />
          <Route path="points" element={<Points />} />
        </Route>
        <Route path="/comment">
          <Route index element={<Comment />} />
        </Route>
        <Route path="/auth">
          <Route index element={<Navigate to="findId" replace />} />
          <Route path="findId" element={<FindId />} />
          <Route path="findPassword" element={<FindPassword />} />
        </Route>
        <Route path="login" element={<LogIn />} />
        <Route path="signUp" element={<SignUp />}>
          <Route index element={<Terms />} />
          <Route path="verify" element={<Verify />} />
          <Route path="info" element={<Info />} />
          <Route path="done" element={<Done />} />
        </Route>
        <Route path="/about">
          <Route index element={<About />} />
          <Route path="challengeGuide" element={<ChallengeGuide />} />
          <Route path="marketGuide" element={<MarketGuide />} />
        </Route>
        <Route path="supports" element={<Supports />} />
        <Route path="supportDetail" element={<SupportDetail />} />
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="userManage" element={<UserManage />} />
        <Route path="feedManage" element={<FeedManage />} />
        <Route path="marketManage" element={<MarketManage />} />
        <Route path="challengeManage" element={<ChallengeManage />} />
      </Route>
    </Routes>
  );
}

export default App;
