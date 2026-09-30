import { Link, Outlet } from "react-router-dom";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import styles from "./Layout.module.scss";
import { HiChatBubbleLeftRight } from "react-icons/hi2";

function Layout() {
  const isLogin = sessionStorage.getItem("userCode") !== null;

  console.log(isLogin);

  return (
    <div className={styles.wrapper}>
      <Header />
      <Outlet />
      <Footer />
      {isLogin && (
        <div className={styles.chatIcon}>
          <Link to="/chat">
            <HiChatBubbleLeftRight />
          </Link>
        </div>
      )}
    </div>
  );
}

export default Layout;
