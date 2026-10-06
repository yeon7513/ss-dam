import React from 'react';
import { IoIosClose } from "react-icons/io";
import cn from "classnames";
import styles from "./CloseButton.module.scss";

function CloseButton({ className, ...props }) {
  return (
    <button type="button" className={cn(styles.closeButton, className)} {...props}>
      <IoIosClose className={styles.closeIcon} />
    </button>
  );
}

export default CloseButton;
