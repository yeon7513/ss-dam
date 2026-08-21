import React from "react";
import { Link, Outlet } from "react-router-dom";
import styles from "./About.module.scss";

const About = () => {

  return (
    <main>
      <ul className={styles.tabMenus}>
        <li className={styles.tabItem}>
          <Link to="/about/challenge_guide">챌린지 참여 가이드</Link>
        </li>
        <li className={styles.tabItem}>
          <Link to="/about/market_guide">다시쓰담 이용 가이드</Link>
        </li>
      </ul>

      <Outlet />
    </main>
  );
};

export default About;
