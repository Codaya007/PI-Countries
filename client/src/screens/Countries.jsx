import React, { useEffect, useState } from "react";
import Continent from "../components/Continent";
import Country from "../components/Country";
import Searcher from "../components/Searcher";
import PageButton from "../components/PageButton";
import { connect } from "react-redux";
import * as actionCreators from "../actions";
import { bindActionCreators } from "redux";
import Message from "../components/Message";
import Loading from "../components/Loading";
import styles from "../styles/CountriesPage.module.css";
import stylesPage from "../styles/PageButton.module.css";

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
  const [currentPagesInterval, setCurrentPagesInterval] = useState({
    start: 0,
    end: 0,
  });

  useEffect(() => {
    sort();
  }, [options.sort, options.sortBy, sort]);

  useEffect(() => {
    paginatedCountries.length > 5
      ? setCurrentPagesInterval({
          start: 0,
          end: 4,
        })
      : setCurrentPagesInterval({ start: 0, end: 0 });
  }, [paginatedCountries]);

  return (
    <div className={styles["countries-page-container"]}>
      <Searcher />
      {continents.length > 0 && (
        <div className={styles["continents-container"]}>
          <h3 className={styles["continents-title"]}>Continentes</h3>
          {continents.map((continent) => (
            <Continent
              active={options.continent === continent.nombre}
              key={continent.nombre}
              continent={continent}
              handleClick={() => {
                setOptions("continent", continent.nombre);
                filterByContinent(continent.nombre);
              }}
            />
          ))}
        </div>
      )}
      {loading && <Loading className={styles["countries-container"]} />}
      {!loading &&
        (paginatedCountries.length > 0 ? (
          <div className={styles["countries-container"]}>
            {paginatedCountries[currentPage - 1].map((country) => {
              return <Country key={country.id} country={country} />;
            })}
          </div>
        ) : (
          <Message
            className={styles["countries-container"]}
            content={
              "No se encontró ninguna coincidencia" +
              (options.continent !== "Todos" ? ` en ${options.continent}` : "")
            }
          />
        ))}
      {!loading && paginatedCountries.length > 1 && (
        <div className={styles["pagination-container"]}>
          {paginatedCountries.length > 5 && currentPagesInterval.start >= 1 && (
            <button
              className={stylesPage.previous}
              onClick={() =>
                setCurrentPagesInterval({
                  start: currentPagesInterval.start - 1,
                  end: currentPagesInterval.end - 1,
                })
              }
            >
              "-"
            </button>
          )}
          {paginatedCountries
            .slice(currentPagesInterval.start, currentPagesInterval.start + 5)
            .map((group, index) => {
              return (
                <PageButton
                  active={
                    currentPage === currentPagesInterval.start + index + 1
                  }
                  key={`Group${index}`}
                  content={currentPagesInterval.start + index + 1}
                  handleClick={() =>
                    changePage(currentPagesInterval.start + index + 1)
                  }
                />
              );
            })}
          {paginatedCountries.length > 5 &&
            currentPagesInterval.end + 1 < paginatedCountries.length && (
              <button
                className={stylesPage.next}
                onClick={() =>
                  setCurrentPagesInterval({
                    start: currentPagesInterval.start + 1,
                    end: currentPagesInterval.end + 1,
                  })
                }
              >
                "-"
              </button>
            )}
        </div>
      )}
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
