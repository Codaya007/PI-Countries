import React from "react";

const Continent = ({ nombre, imagen, handleClick }) => {
  return (
    <div
      style={{ display: "inline-block", cursor: "pointer" }}
      onClick={handleClick}
    >
      <img
        style={{ width: "150px" }}
        src={imagen}
        alt={nombre}
        title={nombre === "Todos" ? "Todos los países" : `Países de ${nombre}`}
      />
      <h3>{nombre}</h3>
    </div>
  );
};

export default Continent;
