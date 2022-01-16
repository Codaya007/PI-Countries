import React from "react";
import { Link } from "react-router-dom";
import Bandera from "./Bandera";
import styles from "../styles/Country.module.css";
import stylesButton from "../styles/Button.module.css";

const Country = ({ country }) => {
  const { id, imagen_bandera, nombre, continente } = country;
  return (
    <div className={styles["country-card-container"]}>
      <Link to={`/countries/${id}`}>
        <Bandera
          className={styles["bandera-circular"]}
          imagen_bandera={imagen_bandera}
          nombre={nombre}
        />
      </Link>
      <div className={styles["country-info"]}>
        <h2 className={styles["country-title"]}>{nombre}</h2>
        <h3 className={styles["country-card-subtitle"]}>{continente}</h3>
        <Link className={styles["btn-country"]} to={`/countries/${id}`}>
          <button className={stylesButton["button-secondary"]}>Ver más</button>
        </Link>
      </div>
    </div>
  );
};

export default Country;
