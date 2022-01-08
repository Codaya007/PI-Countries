
export function compareName(objectA, objectB) {
   if (objectA.nombre.toLowerCase() < objectB.nombre.toLowerCase()) {
      return -1;
   }
   if (objectA.nombre.toLowerCase() > objectB.nombre.toLowerCase()) {
      return 1;
   }
   return 0;
}