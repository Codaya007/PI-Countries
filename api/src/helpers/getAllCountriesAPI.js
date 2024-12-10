const axios = require('axios');

module.exports = async () => {
   let data = {};
   const urlAPI = 'https://restcountries.com/v3/all';

   try {
      const response = await axios.get(urlAPI);

      // Verificar si la respuesta tiene los datos esperados
      console.log("RESPUESTA PAÍSES: ", response.data);

      data.countries = response.data;
   } catch (err) {
      console.log("Error al obtener los países:", err);

      // Verificar si el error tiene una respuesta
      if (err.response) {
         data.error = {
            status: err.response.status,
            message: err.response.statusText
         };
      } else {
         data.error = {
            message: "Error desconocido al acceder a la API"
         };
      }
   }

   return data;
}
