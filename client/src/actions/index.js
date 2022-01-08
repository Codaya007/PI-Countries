import { URL_GET_ALL_CONTINENTS, URL_GET_ALL_COUNTRIES, URL_GET_COUNTRIES_BY_CONTINENT, URL_POST_ACTIVITY, URL_SEARCH } from '../assets/constants';
import { helpHttp } from '../helpers/helpHttp';
import {
   SORT_BY_POPULATION,
   SORT_ASC, SORT_DESC,
   GET_CONTINENTS,
   SEARCH_COUNTRIES,
   RESTART_FILTERS,
   FILTER_BY_ACTIVITY,
   FILTER_BY_CONTINENT,
   SET_LOADING,
   GET_COUNTRIES
} from './types';

// ACCIONES DE PETICIONES DE INFORMACIÓN
export function getAllCountries() {
   return async (dispatch) => {
      dispatch({ type: SET_LOADING, payload: true });
      try {
         const countries = await helpHttp().get(URL_GET_ALL_COUNTRIES);
         dispatch({ type: GET_COUNTRIES, countries: countries.data });
      } catch (err) {
         console.log(err);
      } finally {
         dispatch({ type: SET_LOADING, payload: false });
      }
   };
}

export function getContinents() {
   return async (dispatch) => {
      dispatch({ type: SET_LOADING, payload: true });
      try {
         const reqSvgs = require.context(
            "../assets/images/continentes",
            true,
            /\.svg$/
         );

         const svgs = reqSvgs.keys().reduce((images, path) => {
            images[path.substring(2, path.length - 4)] = reqSvgs(path);
            return images;
         }, {});
         console.log(svgs);

         const response = await helpHttp().get(URL_GET_ALL_CONTINENTS);
         let continents = response.data;
         continents.unshift({ nombre: "Todos" });

         continents = continents.map((continent) => ({
            ...continent,
            imagen: svgs[continent.nombre].default,
         }));

         dispatch({ type: GET_CONTINENTS, continents });
      } catch (err) {
         console.log(err);
      } finally {
         dispatch({ type: SET_LOADING, payload: false });
      }
   };
}

export function searchCountries(search) {
   return async (dispatch) => {
      try {
         dispatch({ type: SET_LOADING, payload: true });
         const response = await helpHttp()
            .get(URL_SEARCH + search)

         dispatch({ type: SEARCH_COUNTRIES, countries: response.data });
      } catch (err) {
         console.log(err);
      } finally {
         dispatch({ type: SET_LOADING, payload: false });
      }
   }
}

export function createActivity(activity) {
   return async (dispatch) => {
      dispatch({ type: SET_LOADING, payload: true });
      let response;
      try {
         helpHttp()
            .post(URL_POST_ACTIVITY, {
               body: activity,
               headers: {
                  "Content-Type": "application/json",
               },
            })
         response = true;
      } catch (err) {
         console.log(err);
         response = false;
      } finally {
         dispatch({ type: SET_LOADING, payload: false });
      }

      return response;
   }
}

// ACCIONES DE ORDENAMIENTO
export function sortByPopulation() {
   return { type: SORT_BY_POPULATION };
}

export function sortAsc() {
   return { type: SORT_ASC };
}

export function sortDesc() {
   return { type: SORT_DESC };
}


// ACCIONES DE FILTRADO

export function restartFilters() {
   return { type: RESTART_FILTERS };
}

export function filterByActivity(typeActivity) {
   return { type: FILTER_BY_ACTIVITY, typeActivity };
}

export function filterByContinent(continent) {
   return async (dispatch) => {
      try {
         dispatch({ type: SET_LOADING, payload: true });
         const response = await helpHttp()
            .get(URL_GET_COUNTRIES_BY_CONTINENT + continent)

         dispatch({ type: FILTER_BY_CONTINENT, countries: response.data });
      } catch (err) {
         console.log(err);
      } finally {
         dispatch({ type: SET_LOADING, payload: false });
      }
   }
}


