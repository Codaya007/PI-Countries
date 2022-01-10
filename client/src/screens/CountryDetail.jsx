import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { URL_GET_COUNTRY } from "../assets/constants";
import Activity from "../components/Activity";
import Bandera from "../components/Bandera";
import Loading from "../components/Loading";
import { helpHttp } from "../helpers/helpHttp";
import Error404 from "./Error404";

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
        toast.warn("No se ha podido encontrar el país solicitado", {
          autoClose: 2000,
        });
      } finally {
        setLoading(false);
      }
    }

    getCountry();
  }, [id]);

  return loading ? (
    <Loading />
  ) : country ? (
    <div>
      <Bandera
        nombre={country.nombre}
        imagen_bandera={country.imagen_bandera}
        id={id}
      />
      <h1>
        {country.nombre} {id}
      </h1>
      <h3>Continente: </h3>
      <p>{country.continente}</p>
      <h3>Capital: </h3>
      <p>{country.capital}</p>
      <h3>Subregión: </h3>
      <p>{country.subregion}</p>
      <h3>Área: </h3>
      <p>{country.area}</p>
      <h3>Población: </h3>
      <p>{country.poblacion}</p>
      <h3>Actividades que se pueden realizar: </h3>
      <div>
        {country.actividades.length > 0 ? (
          country.actividades.map((actividad) => {
            const { nombre, duracion, dificultad, temporada, id } = actividad;
            return (
              <Activity
                key={id}
                nombre={nombre}
                duracion={duracion}
                dificultad={dificultad}
                temporada={temporada}
              />
            );
          })
        ) : (
          <div>No hay actividades</div>
        )}
      </div>
    </div>
  ) : (
    <Error404 content={"No se ha podido encontrar el país solicitado"} />
  );
};

export default CountryDetail;
