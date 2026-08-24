import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import styles from "./About.module.scss";
import cn from "classnames";

const About = () => {
  const { pathname } = useLocation();

  return (
    <main className={styles.wrap}>
      <ul className={styles.tabMenus}>
        <li className={cn(styles.tabItem, pathname.includes("challenge_guide") && styles.active)}>
          <Link to="/about/challenge_guide">챌린지 참여 가이드</Link>
        </li>
        <li className={cn(styles.tabItem, pathname.includes("market_guide") && styles.active)}>
          <Link to="/about/market_guide">다시쓰담 이용 가이드</Link>
        </li>
      </ul>

      <Outlet />
    </main>
  );
};

export default About;
