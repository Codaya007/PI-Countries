import React from "react";

const Continent = ({ nombre, imagen, handleClick, active }) => {
  return (
    <div
      style={{
        display: "inline-block",
        cursor: "pointer",
        backgroundColor: `${active ? "#C5EADB" : "#F1F9F6"}`,
        borderRadius: "20px",
        margin: "1rem",
      }}
      onClick={handleClick}
    >
      <img
        style={{ width: "160px" }}
        src={imagen}
        alt={nombre}
        title={nombre === "Todos" ? "Todos los países" : `Países de ${nombre}`}
      />
      <h3>{nombre}</h3>
    </div>
  );
};

export default Continent;
