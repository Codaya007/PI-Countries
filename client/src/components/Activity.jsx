import React from "react";

const Activity = ({ nombre, dificultad, temporada, duracion }) => {
  return (
    <div>
      <h3>{nombre}</h3>
      <h4>Duración (min):</h4>
      <span>{duracion}</span>
      <h4>Dificultad:</h4>
      <span>{dificultad}</span>
      <h4>Temporada:</h4>
      <span>{temporada}</span>
    </div>
  );
};

export default Activity;
