import React from "react";
import style from "../styles/Activity.module.css";

const Activity = ({ nombre, dificultad, temporada, duracion, descripcion }) => {
  dificultad = parseInt(dificultad) * 20;

  return (
    <article className={style["activity-container"]}>
      <h3 className={style["activity-name"]}>{nombre}</h3>
      <p className={style["descripcion-actividad"]}>{descripcion.trim()}</p>
      <div className={style["duracion-actividad"]}>
        <h4 className={style["subtitulo-actividad"]}>Duración</h4>
        <p>{duracion} hrs</p>
      </div>
      <div className={style["dificultad-actividad"]}>
        <div className={style.contenedor}>
          <div className={`${style.progreso} ${style["pro-1"]}`}>
            <div
              className={`${style.circle} ${style[`circle${dificultad}`]}`}
            ></div>
            <h1>{dificultad}%</h1>
          </div>
        </div>
        <h4 className={style["subtitulo-actividad"]}>Dificultad</h4>
      </div>
      <div className={style["temporada-actividad"]}>
        <span>{temporada}</span>
        <h4 className={style["subtitulo-actividad"]}>Temporada</h4>
      </div>
    </article>
  );
};

export default Activity;
