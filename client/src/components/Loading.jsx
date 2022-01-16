import React from "react";
import styles from "../styles/Preloader.module.css";

const Loading = ({ className }) => {
  return (
    <div className={className}>
      <h2>Cargando...</h2>
      <div className={styles.preloader}></div>
    </div>
  );
};

export default Loading;
