import { GET_COUNTRIES } from '../actions/types';
import {
   SORT_BY_POPULATION,
   SORT_ASC, SORT_DESC,
   GET_CONTINENTS,
   SEARCH_COUNTRIES,
   RESTART_FILTERS,
   FILTER_BY_ACTIVITY,
   FILTER_BY_CONTINENT,
   SET_LOADING
} from '../actions/types';

const initialState = {
   countries: [],
   continents: [],
   countriesFiltered: [],
   loading: null
};

const reducer = (state = initialState, action) => {
   let filtered;
   switch (action.type) {
      case GET_COUNTRIES:
         return { ...state, countries: action.countries, countriesFiltered: action.countries };
      case SET_LOADING:
         return { ...state, loading: action.payload };
      case GET_CONTINENTS:
         return { ...state, continents: action.continents };
      case SEARCH_COUNTRIES:
      case FILTER_BY_CONTINENT:
         return { ...state, countriesFiltered: action.countries };
      case RESTART_FILTERS:
         return { ...state, countriesFiltered: state.countries };
      // tengo q implementar una ruta en el back para poder filtrar por actividad:
      case FILTER_BY_ACTIVITY:
      case SORT_ASC:
         filtered = [...state.countriesFiltered];
         filtered = filtered.sort((countryA, countryB) => countryA.nombre.localeCompare(countryB.nombre));
         return { ...state, countriesFiltered: filtered };
      case SORT_DESC:
         filtered = [...state.countriesFiltered];
         filtered = filtered.sort((countryA, countryB) => countryB.nombre.localeCompare(countryA.nombre));
         return { ...state, countriesFiltered: filtered };
      case SORT_BY_POPULATION:
         filtered = [...state.countriesFiltered];
         if (action.sort === "desc") {
            filtered = filtered.sort((countryA, countryB) => countryB.poblacion - countryA.poblacion);
         } else {
            filtered = filtered.sort((countryA, countryB) => countryA.poblacion - countryB.poblacion);
         }
         return { ...state, countriesFiltered: filtered };
      default:
         return { ...state }
   }
}

export default reducer;