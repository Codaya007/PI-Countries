import { TEMPORADAS } from "../assets/constants";

const validateForm = (form) => {
   const { nombre, dificultad, duracion, temporada, paises, descripcion } = form;
   const errors = {};

   if (!nombre.trim()) {
      errors.nombre = "El campo nombre es requerido";
   } else if (nombre.trim().length > 60) {
      errors.nombre = "La extensión máxima de este campo es de 100 caracteres";
   }

   if (!dificultad.trim()) {
      errors.dificultad = "El campo 'dificultad' es requerido";
   } else if (isNaN(parseInt(dificultad))) {
      errors.dificultad = "Tipo de dato inválido! Debe ser un número";
   } else if (dificultad < 1 || dificultad > 5) {
      errors.dificultad = "El nivel de dificultad permitido es de 1 a 5";
   }

   if (!duracion) {
      errors.duracion = "El campo duración es requerido";
   } else if (isNaN(parseFloat(duracion))) {
      errors.duracion = "El campo duración debe ser un número";
   } else if (parseFloat(duracion) < 1 || parseFloat(duracion) > 48) {
      errors.duracion = "Los valores aceptados son de 1 a 48"
   }

   if (!temporada.trim()) {
      errors.temporada = "El campo temporada es requerido";
   } else if (!TEMPORADAS.includes(temporada)) {
      errors.temporada =
         "Los valores permitidos para el campo temporada son Invierno, Verano, Primavera y Otoño";
   }

   if (!descripcion.trim()) {
      errors.descripcion = "El campo descripción es requerido";
   } else if (descripcion.trim().length > 210) {
      errors.descripcion = "La descripción tiene un límite de 210 caracteres.";
   }

   if (paises.length === 0) {
      errors.paises = "Seleccione al menos un país"
   } else {
      for (let i = 0; i < paises.length; i++) {
         if (!paises[i].trim()) {
            // console.log(paises[i]);
            errors.paises = "El campo países contiene un valor no válido!";
            break;
         } else if (paises[i].length > 3) {
            errors.paises = "El campo países contiene un código no válido";
            break;
         }
      }
   }

   return errors;
};

export default validateForm;