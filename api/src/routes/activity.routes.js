const { Router } = require('express');
const { Activity } = require('../db');
const { getAllActivities } = require('../middlewares');

const router = Router();

function capitalize(str) {
   return str.charAt(0).toUpperCase() + str.slice(1);
}

router.get('/', getAllActivities, (req, res, next) => {
   req.error ? next(req.error) : res.json(req.activities);
})

router.post('/', async (req, res, next) => {
   const { nombre, dificultad, duracion, temporada } = req.body;

   if (!nombre) {
      return res.status(400).json('El campo nombre es requerido');
   }

   const newActivity = {
      nombre,
      dificultad,
      duracion,
      temporada: capitalize(temporada)
   };

   try {
      await Activity.create(newActivity);
      res.status(201).end();
   } catch (err) {
      console.log(err);
      next({});
   }


})

module.exports = router;