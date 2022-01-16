import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/images/logo.svg";
import styles from "../styles/NavBar.module.css";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      {/* LOGO */}
      <Link to="/" className={styles["marca-container"]}>
        <img className={styles.logo} src={Logo} alt="Logo Principal" />
        <p className={styles.marca}>Countries App</p>
      </Link>
      {/* ENLACES */}
      <ul className={styles["nav-links"]}>
        <input type="checkbox" id="checkbox_toggle" />
        <label htmlFor="checkbox_toggle" className={styles["hamburger"]}>
          &#9776;
        </label>
        <div className={styles["menu"]}>
          <li>
            <Link to="/countries">Paises</Link>
          </li>
          <li>
            <Link to="/activities/create">Crear Actividad</Link>
          </li>
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
