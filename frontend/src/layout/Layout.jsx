import { Outlet } from "react-router-dom";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import styles from "./Layout.module.scss";

function Layout() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
