import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import SignUp from "./pages/auth/sign-up/SignUp";
import Challenge from "./pages/challenge/Challenge";
import Comment from "./components/feed/comment/Comment";
import Feed from "./pages/feed/Feed";
import FeedRegister from "./pages/feed/feed-register/FeedRegister";
import Home from "./pages/home/Home";
import Market from "./pages/market/Market";
import ProductRegister from "./pages/market/product-register/ProductRegister";
import MyPage from "./pages/myPage/MyPage";
import FindId from "./pages/auth/find/FindId";
import FindPassword from "./pages/auth/find/FindPassword";
import LogIn from "./pages/auth/log-in/LogIn";
import Terms from "./pages/auth/sign-up/Terms";
import Verify from "./pages/auth/sign-up/Verify";
import Info from "./pages/auth/sign-up/Info";
import Done from "./pages/auth/sign-up/Done";
import ChallengeGuide from "./pages/about/ChallengeGuide";
import About from "./pages/about/About";
import MarketGuide from "./pages/about/MarketGuide";
import FeedDetail from "./pages/feed/feed-detail/FeedDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/feed">
          <Route index element={<Feed />} />
          <Route path=":code" element={<FeedDetail />} />
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
        <Route path="/auth">
          <Route index element={<LogIn />} />
          <Route path="signUp" element={<SignUp />}>
            <Route index element={<Terms />} />
            <Route path="verify" element={<Verify />} />
            <Route path="info" element={<Info />} />
            <Route path="done" element={<Done />} />
          </Route>
          <Route path="findId" element={<FindId />} />
          <Route path="findPassword" element={<FindPassword />} />
        </Route>
        <Route path="/about">
          <Route index element={<About />} />
          <Route path="challengeGuide" element={<ChallengeGuide />} />
          <Route path="marketGuide" element={<MarketGuide />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
