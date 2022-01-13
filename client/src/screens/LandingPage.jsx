import React from "react";
import { Link } from "react-router-dom";
import image from "../assets/images/main.svg";
import styles from "../styles/LandingPage.module.css";
import stylesButton from "../styles/Button.module.css";

const LandingPage = () => {
  return (
    <div className={styles["landing-container"]}>
      <h2 className={styles["landing-title"]}>
        Descubre todos los países del mundo y las actividades en las que puedes
        aventurarte
      </h2>
      <h4 className={styles["landing-subtitle"]}>
        Countries App es una aplicación destinada a mostrarte información de
        diferentes partes del mundo
      </h4>
      <Link className={styles["btn-landing"]} to="/countries">
        <button className={stylesButton["button-primary"]}>
          Empezar a explorar
        </button>
      </Link>
      <img className={styles["landing-img"]} src={image} alt="Countries App" />
    </div>
  );
};

export default LandingPage;
