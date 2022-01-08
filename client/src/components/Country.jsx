import React from "react";
import { Link } from "react-router-dom";
import Bandera from "./Bandera";

const Country = ({ id, imagen_bandera, nombre, continente }) => {
  return (
    <div style={{ display: "inline-block" }}>
      <Link to={`/countries/${id}`}>
        <Bandera imagen_bandera={imagen_bandera} nombre={nombre} />
      </Link>
      <h2>{nombre}</h2>
      <h3>{continente}</h3>
    </div>
  );
};

export default Country;
