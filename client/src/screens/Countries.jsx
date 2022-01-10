import React, { useEffect } from "react";
import Continent from "../components/Continent";
import Country from "../components/Country";
import Searcher from "../components/Searcher";
import PageButton from "../components/PageButton";
import { connect } from "react-redux";
import * as actionCreators from "../actions";
import { bindActionCreators } from "redux";
import Message from "../components/Message";
import Loading from "../components/Loading";

const Countries = ({
  continents,
  loading,
  filterByContinent,
  options,
  setOptions,
  sort,
  paginatedCountries,
  currentPage,
  changePage,
}) => {
  useEffect(() => {
    sort();
  }, [options.sort, options.sortBy, sort]);

  return (
    <div>
      <h1>Países del Mundo</h1>
      <Searcher />
      {continents.length > 0 && (
        <div>
          {continents.map((continent) => (
            <Continent
              active={options.continent === continent.nombre}
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
      {loading && <Loading />}
      {!loading &&
        (paginatedCountries.length > 0 ? (
          <div>
            {paginatedCountries[currentPage - 1].map((country) => {
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
        ) : (
          <Message content={"No se encontró ninguna coincidencia"} />
        ))}
      {!loading &&
        paginatedCountries.length > 1 &&
        paginatedCountries.map((group, index) => {
          return (
            <PageButton
              key={`Group${index}`}
              content={index + 1}
              handleClick={() => changePage(index + 1)}
            />
          );
        })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    continents: state.continents,
    loading: state.loading,
    options: state.options,
    paginatedCountries: state.paginatedCountries,
    currentPage: state.currentPage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Countries);
