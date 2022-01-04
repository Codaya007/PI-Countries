const { Country } = require('../db');

module.exports = async (req, res, next) => {
   const { idPais } = req.params;

   try {
      const country = await Country.findByPk(idPais.toUpperCase());
      country ? req.country = country : req.error = {
         status: 404,
         message: 'Country not found'
      };
   } catch (err) {
      console.log(err);
      req.error = {};
   }

   next();
}