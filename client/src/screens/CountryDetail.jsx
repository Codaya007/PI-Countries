import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { URL_GET_COUNTRY } from "../assets/constants";
import Activity from "../components/Activity";
import Bandera from "../components/Bandera";
import Loading from "../components/Loading";
import Message from "../components/Message";
import { helpHttp } from "../helpers/helpHttp";
import Error404 from "./Error404";
import styles from "../styles/CountryDetailPage.module.css";

const CountryDetail = () => {
  const { id } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getCountry() {
      try {
        const country = await helpHttp().get(URL_GET_COUNTRY + id);

        setCountry(country.data);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    }

    getCountry();
  }, [id]);

  return loading ? (
    <div>
      <Loading />
    </div>
  ) : country ? (
    <>
      <h2 className={styles["title-detail"]}>Información del país</h2>
      <div className={styles["country-detail-container"]}>
        <div className={styles["country-detail-flag"]}>
          <Bandera
            nombre={country.nombre}
            imagen_bandera={country.imagen_bandera}
            id={id}
          />
        </div>
        <h1 className={styles["country-detail-title"]}>
          {country.nombre} {id}
        </h1>
        <div className={styles["country-detail-content"]}>
          <h3>Continente: </h3>
          <p>{country.continente}</p>
          <h3>Capital: </h3>
          <p>{country.capital}</p>
          <h3>Subregión: </h3>
          <p>{country.subregion}</p>
          <h3>Área: </h3>
          <p>
            {country.area} Km<sup>2</sup>
          </p>
          <h3>Población: </h3>
          <p>{country.poblacion} habitantes</p>
        </div>
      </div>
      <h2 className={styles["title-detail"]}>
        Actividades que se pueden realizar:{" "}
      </h2>
      <div>
        {country.actividades.length > 0 ? (
          country.actividades.map((actividad) => {
            const { nombre, descripcion, duracion, dificultad, temporada, id } =
              actividad;
            return (
              <Activity
                key={id}
                nombre={nombre}
                descripcion={descripcion}
                duracion={duracion}
                dificultad={dificultad}
                temporada={temporada}
              />
            );
          })
        ) : (
          <Message content={"No hay actividades por mostrar"} />
        )}
      </div>
    </>
  ) : (
    <Error404 content={"No se ha podido encontrar el país solicitado"} />
  );
};

export default CountryDetail;
