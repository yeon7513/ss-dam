import React from "react";
import styles from "./Footer.module.scss";

function Footer() {
  return (
    <footer className={styles.container}>
      <p className={styles.copyright}>
        © 2026. RETURN ZERO All rights reserved.
      </p>
      <span className={styles.logoText}>쓰담쓰담</span>
    </footer>
  );
}

export default Footer;
