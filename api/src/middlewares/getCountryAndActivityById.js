const { Country, Activity } = require('../db');

module.exports = async (req, res, next) => {
   const { idPais } = req.params;

   try {
      let country = await Country.findOne({
         where: {
            id: idPais.toUpperCase()
         },
         include: {
            model: Activity,
            through: {
               attributes: []
            }
         }
      });
      country = country.toJSON();
      country.activities = country.Activities;
      delete country.Activities;

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