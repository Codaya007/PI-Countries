import React from "react";
import styles from "../styles/Continent.module.css";

const Continent = ({ nombre, imagen, handleClick, active }) => {
  return (
    <div
      className={
        active
          ? `${styles["continent-container"]} ${styles["continent-active"]}`
          : styles["continent-container"]
      }
      onClick={handleClick}
    >
      <img
        className={styles["continent-image"]}
        src={imagen}
        alt={nombre}
        title={nombre === "Todos" ? "Todos los países" : `Países de ${nombre}`}
      />
      <h3 className={styles["continent-title"]}>{nombre}</h3>
    </div>
  );
};

export default Continent;
