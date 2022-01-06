const { Router } = require('express');
const { Activity } = require('../db');
const { getCountryById, capitalize } = require('../helpers');
const { getAllActivities } = require('../middlewares');
const { check, validationResult } = require('express-validator');

const router = Router();

// @route GET /activities
// @desc Get all categories
// @access Public
router.get('/', getAllActivities, (req, res, next) => {
   req.error ? next(req.error) : res.json(req.activities);
})

// @route POST /activities
// @desc Create a new activity
// @access Public
router.post('/',
   [
      check('nombre', 'El campo nombre es requerido').trim().isString().notEmpty(),
      check('nombre', 'El campo nombre no puede estar vacío').trim().notEmpty(),
      check('dificultad', 'Debe ser un numero entre 1 y 5').isNumeric({ min: 1, max: 5 }).optional(),
      check('dificultad', 'Debe ser un numero entero').custom((value) => value % 1 === 0).optional(),
      check('duracion', 'Debe ser un numero entero correspondiente a los minutos de duracion').isNumeric().optional
         (),
      check('temporada', 'Debe ser un valor valido: invierno, verano, primavera, otoño').trim().isString().custom((str) => {
         return ['Invierno', 'Verano', 'Primavera', 'Otoño'].includes(capitalize(str));
      }).optional(),
      check('paises', 'Debe ser un array con los ids de paises validos').isArray().optional()
   ],
   async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return next({
         message: 'Ha fallado la validación',
         errors
      });

      let { nombre, dificultad, duracion, temporada, paises = [] } = req.body;

      const newActivity = {
         nombre,
         dificultad,
         duracion,
         temporada: capitalize(temporada)
      };

      try {
         let activityCreated = await Activity.create(newActivity);

         if (paises.length) {
            try {
               paises = paises.map((idPais) => getCountryById(idPais));
               paises = await Promise.all(paises);

               const errors = [];

               paises.forEach(async (response) => {
                  if (response.error) return errors.push(response.error);

                  await activityCreated.addCountry(response.country);
               })

               if (errors.length) {
                  return res.status(400).json({
                     message: 'Se ha creado la actividad con errores',
                     errors
                  });
               }

            } catch (err) {
               // console.log(err);
               return res.status(201).json({
                  message: 'Se ha creado la actividad pero no ha podido enlazarse a los países indicados'
               });
            }
         }

         res.status(201).end();
      } catch (err) {
         // console.log(err);
         next({});
      }


   })

module.exports = router;