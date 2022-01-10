import React from "react";

const Activity = ({ nombre, dificultad, temporada, duracion }) => {
  duracion = duracion.split(" ");
  return (
    <article>
      <h3>{nombre}</h3>
      <h4>
        Del {duracion[0]} al {duracion[1]}
      </h4>
      <h4>Dificultad</h4>
      <span>{dificultad}</span>
      <h4>Temporada</h4>
      <span>{temporada}</span>
    </article>
  );
};

export default Activity;
