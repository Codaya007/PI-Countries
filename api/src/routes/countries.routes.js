const { Router } = require('express');
const { getAllCountries, getCountryAndActivityById: getCountry } = require('../middlewares');

const router = Router();

router.get('/', getAllCountries, (req, res, next) => {
   req.error ? next(req.error) : res.json(req.countries);
});

router.get('/:idPais', getCountry, (req, res, next) => {
   req.error ? next(req.error) : res.json(req.country);
});

module.exports = router;
