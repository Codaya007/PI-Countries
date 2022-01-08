import React, { useEffect } from "react";
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
  filterByContinent,
  options,
  setOptions,
  sort,
}) => {
  useEffect(() => {
    sort();
  }, [options.sort, options.sortBy]);

  return (
    <div>
      <h1>Países del Mundo</h1>
      <Searcher />
      {!loading && continents.length > 0 && (
        <div>
          {continents.map((continent) => (
            <Continent
              key={continent.nombre}
              nombre={continent.nombre}
              imagen={continent.imagen}
              handleClick={() => {
                setOptions("continent", continent.nombre);
                filterByContinent(continent.nombre);
              }}
            />
          ))}
        </div>
      )}
      {!loading && countries.length > 0 && (
        <div>
          {countries.map((country) => {
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
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    continents: state.continents,
    countries: state.countriesFiltered,
    loading: state.loading,
    options: state.options,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Countries);
