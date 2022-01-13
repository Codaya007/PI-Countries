import React from "react";
import styles from "../styles/PageButton.module.css";

const PageButton = ({ content, handleClick }) => {
  return (
    <button className={styles.page} onClick={handleClick}>
      {content}
    </button>
  );
};

export default PageButton;
