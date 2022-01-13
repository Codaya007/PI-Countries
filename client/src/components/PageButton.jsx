import React from "react";
import styles from "../styles/PageButton.module.css";

const PageButton = ({ active, content, handleClick }) => {
  return (
    <button
      className={active ? styles["active-page"] : styles.page}
      onClick={handleClick}
    >
      {content}
    </button>
  );
};

export default PageButton;
