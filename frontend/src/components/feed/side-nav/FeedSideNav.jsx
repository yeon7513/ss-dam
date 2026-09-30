import cn from "classnames";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../../layout/sidebar/SideBar";
import { FEED_MENU } from "../../../lib/sideMenu";
import ProfileCard from "../../profile-card/ProfileCard";
import styles from "./FeedSideNav.module.scss";
import Button from "../../common/button/Button.jsx";

function FeedSideNav({ className, isLoggedIn, memberProfile }) {
  const navigate = useNavigate();

  const filteringMenuItems = FEED_MENU.filter((item) => {
    if (item.authMode === "always") {
      return true;
    }

    if (item.authMode === "member") {
      return isLoggedIn;
    }

    return false;
  });

  return (
    <Sidebar className={cn(styles.feedNav, className)} isFixed={false}>
      <li>
        {isLoggedIn ? (
          <div className={styles.profile}>
            <ProfileCard memberProfile={memberProfile} />
            <Link to="/feed/register">피드 작성</Link>
          </div>
        ) : (
          <div className={styles.loginNotice}>
            <p>로그인하고 더 많은 친환경 챌린지를 확인하세요!</p>
            <Button onClick={() => navigate("/login")}>로그인</Button>
          </div>
        )}
      </li>
      <li>
        <ul className={styles.menus}>
          {filteringMenuItems.map((menu) => (
            <li key={menu.id}>
              <Link to={menu.path}>{menu.label}</Link>
            </li>
          ))}
        </ul>
      </li>
      <li>
        <Link to="/supports">공지사항</Link>
      </li>
      <li>
        <Link to="/about/challenge_guide">이용가이드</Link>
      </li>
    </Sidebar>
  );
}

export default FeedSideNav;
