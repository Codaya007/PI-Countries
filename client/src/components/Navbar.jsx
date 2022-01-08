import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <img src="" alt="Logo Principal" />
      <Link to="/countries">Paises</Link>
      <Link to="/activities/create">Crear Actividad</Link>
    </div>
  );
};

export default Navbar;
