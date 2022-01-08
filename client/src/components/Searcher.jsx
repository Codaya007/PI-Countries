import React, { useState } from "react";
import { connect } from "react-redux";
import { searchCountries } from "../actions";

const Searcher = ({ searchCountries }) => {
  const [search, setSearch] = useState("");

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // implemento la acción searchCountries
    search && searchCountries(search);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="search"
        placeholder="Qué país desea buscar?"
        name="name"
        id="name"
        onChange={handleChange}
      />
      <input type="submit" value="Buscar" />
    </form>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchCountries: (query) => {
      dispatch(searchCountries(query));
    },
  };
};

export default connect(null, mapDispatchToProps)(Searcher);
