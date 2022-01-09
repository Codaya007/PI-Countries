import { URL_GET_ALL_CONTINENTS, URL_GET_ALL_COUNTRIES, URL_GET_COUNTRIES_BY_CONTINENT, URL_POST_ACTIVITY, URL_SEARCH_BY_NAME, URL_SEARCH_BY_ACTIVITY } from '../assets/constants';
import { helpHttp } from '../helpers/helpHttp';
import {
   GET_CONTINENTS,
   FILTER_BY_NAME,
   RESTART_FILTERS,
   FILTER_BY_CONTINENT,
   SET_LOADING,
   GET_COUNTRIES,
   SET_OPTIONS,
   RESTART_COUNTRIES,
   SORT,
   FILTER_BY_ACTIVITY,
} from './types';
import { toast } from "react-toastify";

// ACCIONES DE PETICIONES DE INFORMACIÓN
export function getAllCountries() {
   return async (dispatch) => {
      dispatch({ type: SET_LOADING, payload: true });
      try {
         const countries = await helpHttp().get(URL_GET_ALL_COUNTRIES);
         dispatch({ type: GET_COUNTRIES, countries: countries.data });
         dispatch({ type: SORT });
      } catch (err) {
         console.log(err);
         toast.error("No se han podido obtener los países");
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
         // console.log(svgs);

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
         toast.error("No se han podido obtener los continentes");
      } finally {
         dispatch({ type: SET_LOADING, payload: false });
      }
   };
}

export function searchByName(query) {
   return async (dispatch) => {
      try {
         dispatch({ type: SET_LOADING, payload: true });
         const response = await helpHttp()
            .get(URL_SEARCH_BY_NAME + query)

         dispatch({ type: FILTER_BY_NAME, countries: response.data });
         dispatch({ type: SORT });
      } catch (err) {
         console.log(err);
         dispatch({ type: FILTER_BY_NAME, countries: [] });
         toast.error("Ningún país coincide con el criterio de búsqueda");
      } finally {
         dispatch({ type: SET_LOADING, payload: false });
      }
   }
}

export function createActivity(activity) {
   return async (dispatch) => {
      dispatch({ type: SET_LOADING, payload: true });
      try {
         await helpHttp()
            .post(URL_POST_ACTIVITY, {
               body: activity,
               headers: {
                  "Content-Type": "application/json",
               },
            })
         toast.success("La actividad ha sido creada exitosamente!");
      } catch (err) {
         console.log(err);
         toast.error("Ha ocurrido un error! No se ha podido crear la actividad");
      } finally {
         dispatch({ type: SET_LOADING, payload: false });
      }

   }
}

export function searchByActivity(query) {
   return async (dispatch) => {
      try {
         dispatch({ type: SET_LOADING, payload: true });
         const response = await helpHttp()
            .get(URL_SEARCH_BY_ACTIVITY + query)

         dispatch({ type: FILTER_BY_ACTIVITY, countries: response.data });
         dispatch({ type: SORT });
      } catch (err) {
         console.log(err);
         dispatch({ type: FILTER_BY_ACTIVITY, countries: [] });
         toast.error("Ningún país coincide con el criterio de búsqueda");
      } finally {
         dispatch({ type: SET_LOADING, payload: false });
      }
   }
}

// ACCIONES DE ORDENAMIENTO
export function setOptions(name, value) {
   return { type: SET_OPTIONS, payload: { name, value } };
}

export function sort() {
   return { type: SORT };
}

// ACCIONES DE FILTRADO
export function restartFilters() {
   return { type: RESTART_FILTERS };
}

export function filterByContinent(continent) {
   return async (dispatch) => {
      if (continent === "Todos") {
         dispatch({ type: RESTART_COUNTRIES });
         dispatch({ type: SORT });
      } else {
         try {
            dispatch({ type: SET_LOADING, payload: true });
            const response = await helpHttp()
               .get(URL_GET_COUNTRIES_BY_CONTINENT + continent)

            dispatch({ type: FILTER_BY_CONTINENT, countries: response.data });
            dispatch({ type: SORT });
         } catch (err) {
            console.log(err);
            dispatch({ type: FILTER_BY_CONTINENT, countries: [] });
            toast.error("Ningún país coincide con el criterio de búsqueda");
         } finally {
            dispatch({ type: SET_LOADING, payload: false });
         }

      }
   }
}
