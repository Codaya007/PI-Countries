import React from "react";
import styles from "../styles/Bandera.module.css";

const Bandera = ({ className, imagen_bandera, nombre, title }) => {
  return (
    <>
      <img
        className={className || styles["bandera"]}
        src={imagen_bandera}
        alt={nombre}
        title={title || "Bandera de " + nombre}
      />
    </>
  );
};

export default Bandera;
