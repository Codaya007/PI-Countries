import { TEMPORADAS } from "../assets/constants";

const validateForm = (form) => {
   const { nombre, dificultad, duracion, temporada, paises } = form;
   const errors = {};

   if (!nombre.trim()) {
      errors.nombre = "El campo 'nombre' es un campo requerido";
   } else if (nombre.trim().length > 100) {
      errors.nombre = "La extensión máxima de este campo es de 100 caracteres";
   }

   if (!dificultad.trim()) {
      errors.dificultad = "El campo 'dificultad' es un campo requerido";
   } else if (isNaN(parseInt(dificultad))) {
      errors.dificultad = "Tipo de dato inválido! Debe ser un número";
   } else if (dificultad < 1 || dificultad > 5) {
      errors.dificultad = "El nivel de dificultad permitido es de 1 a 5";
   }

   if (!duracion) {
      errors.duracion = "El campo 'duración' es un campo requerido";
   } else if (isNaN(parseInt(duracion))) {
      errors.duracion = "El campo duración debe ser un número! ";
   } else if (parseFloat(duracion) % 1 > 0) {
      errors.duracion = "El campo duración debe ser un número entero";
   }

   if (!temporada.trim()) {
      errors.temporada = "El campo 'temporada' es un campo requerido";
   } else if (!TEMPORADAS.includes(temporada)) {
      errors.temporada =
         "Los valores permitidos para el campo temporada son Invierno, Verano, Primavera y Otoño";
   }

   for (let i = 0; i < paises.length; i++) {
      if (!paises[i].trim()) {
         console.log(paises[i]);
         errors.paises = "El campo países contiene un valor no válido!";
         break;
      } else if (paises[i].length > 3) {
         errors.paises = "El campo países contiene un código no válido";
         break;
      }
   }

   return errors;
};

export default validateForm;