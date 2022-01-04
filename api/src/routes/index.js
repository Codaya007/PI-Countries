const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: 
// const authRouter = require('./auth.routes');
const countriesRouter = require('./countries.routes');
const activityRouter = require('./activity.routes');

const router = Router();

// Configurar los routers
// Ejemplo: 
// router.use('/auth', authRouter);
router.use('/countries', countriesRouter);
router.use('/activity', activityRouter);


module.exports = router;
