import cn from "classnames";
import { Link } from "react-router-dom";
import Sidebar from "../../../layout/sidebar/SideBar";
import { FEED_MENU } from "../../../lib/sideMenu";
import ProfileCard from "../../profile-card/ProfileCard";
import styles from "./SideNav.module.scss";

function SideNav({ className, isLoggedIn = true }) {
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
    <Sidebar className={cn(styles.feedNav, className)}>
      <li>
        {isLoggedIn ? (
          <>
            <div>
              <ProfileCard />
            </div>
            <Link to="/feed/register">피드 작성</Link>
          </>
        ) : (
          <>
            <p>로그인하고 더 많은 친환경 챌린지를 확인하세요!</p>
            <Link to="/login">로그인</Link>
          </>
        )}
      </li>
      <li>
        <ul>
          {filteringMenuItems.map((menu) => (
            <li key={menu.id}>
              <Link to={menu.path}>{menu.label}</Link>
            </li>
          ))}
        </ul>
      </li>
      <li>
        <Link to="">공지사항</Link>
      </li>
      <li>
        <Link to="/about/challenge_guide">이용가이드</Link>
      </li>
    </Sidebar>
  );
}

export default SideNav;
