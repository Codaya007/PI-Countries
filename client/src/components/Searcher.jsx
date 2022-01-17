import React, { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "../actions";
import Button from "./Button";
import styles from "../styles/Searcher.module.css";
import inputStyles from "../styles/Input.module.css";

const Searcher = ({ searchByName, searchByActivity, options, setOptions }) => {
  // un estado local para controlar el valor de la consulta
  const [query, setQuery] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    name === "query" ? setQuery(value) : setOptions(name, value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // REALIZO LA BÚSQUEDA
    if (!query) {
      alert("Primero escriba su consulta");
    } else if (options.searchBy === "pais") {
      searchByName(query);
    } else {
      // busco por actividad
      searchByActivity(query);
    }
  };

  return (
    <>
      <form className={styles.searcher} onSubmit={handleSubmit}>
        <select
          title="searchBy"
          className={styles.searchBy}
          name={"searchBy"}
          value={options.searchBy}
          id={"searchBy"}
          onChange={handleChange}
        >
          <option value={"pais"} key={"pais"}>
            {"País"}
          </option>
          <option value={"actividad"} key={"actividad"}>
            {"Actividad"}
          </option>
        </select>
        <input
          className={styles["input-search"]}
          type="search"
          placeholder={
            options.searchBy === "pais"
              ? "Buscar país..."
              : "Buscar actividad..."
          }
          name="query"
          id="query"
          value={query}
          onChange={handleChange}
        />
        <Button
          className={styles["btn-search"]}
          normal
          type="submit"
          content={"B"}
        />
      </form>
      <div className={styles.filters}>
        <label className={inputStyles["label-form"]}>Ordenar por</label>
        <select
          title="sortBy"
          className={styles.sortBy}
          name={"sortBy"}
          id={"sortBy"}
          onChange={handleChange}
          value={options.sortBy}
        >
          <option value={"nombre"} key={"nombre"}>
            {"Nombre"}
          </option>
          <option value={"poblacion"} key={"poblacion"}>
            {"Población"}
          </option>
        </select>
        <select
          title="sort"
          className={styles.sort}
          name={"sort"}
          id={"sort"}
          onChange={handleChange}
          value={options.sort}
        >
          <option value={"asc"} key={"asc"}>
            {"Ascendente"}
          </option>
          <option value={"desc"} key={"desc"}>
            {"Descendente"}
          </option>
        </select>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    options: state.options,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Searcher);
