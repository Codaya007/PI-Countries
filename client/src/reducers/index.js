import { ADD_NOTIFICATION, CHANGE_PAGE, DELETE_NOTIFICATION, GET_COUNTRIES, RESTART_COUNTRIES, SET_OPTIONS } from '../actions/types';
import {
   SORT,
   GET_CONTINENTS,
   FILTER_BY_NAME,
   RESTART_FILTERS,
   FILTER_BY_ACTIVITY,
   FILTER_BY_CONTINENT,
   SET_LOADING,
   PAGINATE_COUNTRIES
} from '../actions/types';

const initialState = {
   countries: [],
   continents: [],
   countriesFiltered: [],
   paginatedCountries: [],
   currentPage: 1,
   loading: true,
   notifications: [],
   options: {
      searchBy: "pais",
      sort: "asc",
      sortBy: "nombre",
      continent: "Todos"
   }
};

const reducer = (state = initialState, action) => {
   let filtered;
   let notifications;
   let { type, payload } = action;

   switch (type) {
      case ADD_NOTIFICATION:
         // console.log(payload);
         notifications = [...state.notifications];
         notifications.push(payload);
         return { ...state, notifications };
      case DELETE_NOTIFICATION:
         const { id } = payload;
         let notificationsList = [...state.notifications];
         // Filtro para quitar la que coincida con el id pasado
         notifications = notificationsList.filter((e) => e.id !== id);
         return { ...state, notifications };
      case SET_OPTIONS:
         const { name, value } = payload;
         return { ...state, options: { ...state.options, [name]: value } };
      case GET_COUNTRIES:
         return { ...state, countries: action.countries, countriesFiltered: action.countries };
      case SET_LOADING:
         return { ...state, loading: payload };
      case GET_CONTINENTS:
         return { ...state, continents: action.continents };
      case FILTER_BY_NAME:
      case FILTER_BY_ACTIVITY:
      case FILTER_BY_CONTINENT:
         filtered = action.countries;

         if (filtered.length === 0) {
            return { ...state, countriesFiltered: filtered };
         } else {
            if (state.options.continent !== "Todos") {
               filtered = filtered.filter(pais => pais.continente === state.options.continent)
            }
            return { ...state, currentPage: 1, countriesFiltered: filtered };
         }
      case RESTART_FILTERS:
         return { ...state, options: initialState.options };
      case RESTART_COUNTRIES:
         return { ...state, countriesFiltered: state.countries };
      // tengo q implementar una ruta en el back para poder filtrar por actividad:
      case CHANGE_PAGE:
         return { ...state, currentPage: payload || 1 };
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
      case PAGINATE_COUNTRIES:
         filtered = [...state.countriesFiltered];
         let paginatedCountries = [];
         if (filtered.length > 0) {
            paginatedCountries.push(filtered.splice(0, 9))
            while (filtered.length > 0) {
               paginatedCountries.push(filtered.splice(0, 10))
            }
         }
         return { ...state, paginatedCountries };
      default:
         return { ...state }
   }
}

export default reducer;