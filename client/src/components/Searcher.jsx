import React, { useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { bindActionCreators } from "redux";
import * as actionCreators from "../actions";
import Button from "./Button";

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
      toast.warn("Primero escriba su consulta");
    } else if (options.searchBy === "pais") {
      searchByName(query);
    } else {
      // busco por actividad
      searchByActivity(query);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <select name={"searchBy"} id={"searchBy"} onChange={handleChange}>
          <option
            selected={options.searchBy === "pais"}
            value={"pais"}
            key={"pais"}
          >
            {"Por país"}
          </option>
          <option
            selected={options.searchBy === "actividad"}
            value={"actividad"}
            key={"actividad"}
          >
            {"Por actividad"}
          </option>
        </select>
        <input
          type="search"
          placeholder={
            options.searchBy === "pais"
              ? "¿Qué país desea buscar?"
              : "¿Qué actividad desea buscar?"
          }
          name="query"
          id="query"
          value={query}
          onChange={handleChange}
        />
        <Button normal type="submit" content={"Buscar"} />
      </form>
      <div>
        <select name={"sortBy"} id={"sortBy"} onChange={handleChange}>
          <option
            selected={options.sortBy === "nombre"}
            value={"nombre"}
            key={"nombre"}
          >
            {"Por nombre"}
          </option>
          <option
            selected={options.sortBy === "poblacion"}
            value={"poblacion"}
            key={"poblacion"}
          >
            {"Por población"}
          </option>
        </select>
        <select name={"sort"} id={"sort"} onChange={handleChange}>
          <option selected={options.sort === "asc"} value={"asc"} key={"asc"}>
            {"Ascendente"}
          </option>
          <option
            selected={options.sort === "desc"}
            value={"desc"}
            key={"desc"}
          >
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
