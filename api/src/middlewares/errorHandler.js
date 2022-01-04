module.exports = (err, req, res, next) => {
   err.errors && res.status(400).json(err.errors);

   const status = err.status || 500;
   const message = err.message || 'Server Error';
   console.error(err);
   res.status(status).send(message);
}