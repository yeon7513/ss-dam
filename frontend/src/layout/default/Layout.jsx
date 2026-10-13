import { Link, Outlet } from "react-router-dom";
import Footer from "./footer/Footer.jsx";
import Header from "./header/Header.jsx";
import styles from "./Layout.module.scss";
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import { useAuth } from "../../context/AuthContext.jsx";

function Layout() {
  const { isLoggedIn } = useAuth();


  return (
    <div className={styles.wrapper}>
      <Header />
      <Outlet />
      <Footer />
      {isLoggedIn && (
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
