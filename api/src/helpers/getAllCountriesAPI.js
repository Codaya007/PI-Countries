const { default: axios } = require("axios");

module.exports = async () => {
   let data = {};
   const urlAPI = 'https://restcountries.com/v3/all';

   console.log({ urlAPI })

   try {
      const response = await axios.get(urlAPI, { timeout: 6000 }); // Timeout de 5 segundos

      console.log("RESPUESTA PAÍSES: ", response);

      data.countries = response.data;
   } catch (err) {
      console.log("Error al obtener países:", err);

      if (err.response) {
         // Error de respuesta HTTP
         data.error = {
            status: err.response.status,
            message: err.response.statusText
         };
      } else if (err.request) {
         // Error de solicitud (sin respuesta)
         data.error = {
            status: 'No response',
            message: 'No se recibió respuesta de la API'
         };
      } else {
         // Error desconocido
         data.error = {
            status: 'Unknown Error',
            message: err.message
         };
      }
   }

   return data;
}
