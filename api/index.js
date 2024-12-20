//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn, Country } = require('./src/db.js');
const getAllCountriesAPI = require('./src/helpers/getAllCountriesAPI.js');
const { PORT } = process.env;
const activities = require("./src/data/activities.js");
const { createActivity } = require("./src/helpers/index.js")

// Syncing all the models at once.
conn.sync({ force: true })
  .then(async () => {

    console.log("Después de establecer la conexión")
    try {
      // AÑADO LOS PAISES
      let response = await getAllCountriesAPI();

      console.log("RESPONSE: ", response)

      if (response.error) {
        throw new Error(response.error);
      } else {
        let countriesMaped = response.countries.map((country) => {
          return {
            id: country.cca3.toUpperCase(),
            nombre: country.name.common,
            imagen_bandera: country.flags ? country.flags[1] : 'https://www.barcelonabeta.org/sites/default/files/2018-04/default-image_0.png',
            continente: country.continents ? country.continents[0] : "Desconocido",
            capital: country.capital ? country.capital.toString() : "Desconocida",
            subregion: country.subregion,
            area: country.area,
            poblacion: country.population
          };
        });

        // ya que tengo cada país con los datos que necesito, procedo a guardarlos en la DB
        await Country.bulkCreate(countriesMaped, { validate: true });
        console.log("Países insertados correctamente");
      }

      // AÑADO LAS ACTIVIDADES
      activities.map(activity => createActivity(activity));

    } catch (err) {
      console.log(err);
      console.log('No ha sido posible inicializar la BD')
    } finally {
      server.listen(PORT || 5000, () => {
        console.log(`Listening at port ${PORT || 5000}`); // eslint-disable-line no-console
      })
    }
  })
  .catch((err) => {
    console.log(err);
    console.log(`No se ha podido conectar a la BBDD`);
  });

// ID (Código de 3 letras) => cca3
// nombre       => name.common
// bandera img  => flags.png
// Continente   => continents
// Capital      => capital
// Subregión    => subregion
// Área         => area
// Población    => population