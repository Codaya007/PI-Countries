import React from "react";

const Bandera = ({ border, width, circle, imagen_bandera, nombre, title }) => {
  return (
    <>
      <img src={imagen_bandera} alt={nombre} title={title || nombre} />
    </>
  );
};

export default Bandera;
