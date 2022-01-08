import { GET_COUNTRIES, RESTART_COUNTRIES, SET_OPTIONS } from '../actions/types';
import {
   SORT,
   GET_CONTINENTS,
   SEARCH_COUNTRIES,
   RESTART_FILTERS,
   FILTER_BY_ACTIVITY,
   FILTER_BY_CONTINENT,
   SET_LOADING,
   RESTART_CONTINENT
} from '../actions/types';

const initialState = {
   countries: [],
   continents: [],
   countriesFiltered: [],
   loading: null,
   options: {
      searchBy: "pais",
      sort: "asc",
      sortBy: "nombre",
      continent: "Todos"
   }
};

const reducer = (state = initialState, action) => {
   let filtered;

   switch (action.type) {
      case SET_OPTIONS:
         const { name, value } = action.payload;
         return { ...state, options: { ...state.options, [name]: value } };
      case GET_COUNTRIES:
         return { ...state, countries: action.countries, countriesFiltered: action.countries };
      case SET_LOADING:
         return { ...state, loading: action.payload };
      case GET_CONTINENTS:
         return { ...state, continents: action.continents };
      case RESTART_CONTINENT:
         return { ...state, options: { ...state.options, continent: "Todos" } };
      case SEARCH_COUNTRIES:
      case FILTER_BY_ACTIVITY:
      case FILTER_BY_CONTINENT:
         return { ...state, countriesFiltered: action.countries };
      case RESTART_FILTERS:
         return { ...state, options: initialState.options };
      case RESTART_COUNTRIES:
         return { ...state, countriesFiltered: state.countries };
      // tengo q implementar una ruta en el back para poder filtrar por actividad:
      case SORT:
         const { sort, sortBy } = state.options;
         // console.log("Imprimiendo desde reducer sort: ")
         // console.log(state.options);
         if (sortBy === "nombre") {
            if (sort === "asc") {
               // console.log('Ordenando por nombre ascendentemente');
               filtered = [...state.countriesFiltered];
               filtered = filtered.sort((countryA, countryB) => countryA.nombre.localeCompare(countryB.nombre));
               return { ...state, countriesFiltered: filtered };
            } else {
               // console.log('Ordenando por nombre descendentemente');
               filtered = [...state.countriesFiltered];
               filtered = filtered.sort((countryA, countryB) => countryB.nombre.localeCompare(countryA.nombre));
               return { ...state, countriesFiltered: filtered };
            }
         } else {
            if (sort === "asc") {
               // console.log('Ordenando por poblacion ascendentemente');
               filtered = [...state.countriesFiltered];
               filtered = filtered.sort((countryA, countryB) => countryA.poblacion - countryB.poblacion);
               return { ...state, countriesFiltered: filtered };
            } else {
               // console.log('Ordenando por poblacion descendentemente');
               filtered = [...state.countriesFiltered];
               filtered = filtered.sort((countryA, countryB) => countryB.poblacion - countryA.poblacion);
               return { ...state, countriesFiltered: filtered };
            }
         }
      default:
         return { ...state }
   }
}

export default reducer;