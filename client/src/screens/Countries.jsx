import React from "react";
import Continent from "../components/Continent";
import Country from "../components/Country";
import Searcher from "../components/Searcher";
import { connect } from "react-redux";
import * as actionCreators from "../actions";
import { bindActionCreators } from "redux";

const Countries = ({
  countries,
  continents,
  loading,
  restartFilters,
  filterByContinent,
}) => {
  return (
    <div>
      <h1>Países del Mundo</h1>
      <Searcher />
      {!loading &&
        continents.length > 0 &&
        continents.map((continent) => (
          <Continent
            key={continent.nombre}
            nombre={continent.nombre}
            imagen={continent.imagen}
            handleClick={
              continent.nombre !== "Todos"
                ? () => filterByContinent(continent.nombre)
                : restartFilters
            }
          />
        ))}
      {!loading &&
        countries.length > 0 &&
        countries.map((country) => {
          return (
            <Country
              key={country.id}
              id={country.id}
              imagen_bandera={country.imagen_bandera}
              nombre={country.nombre}
              continente={country.continente}
            />
          );
        })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    continents: state.continents,
    countries: state.countriesFiltered,
    loading: state.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Countries);
