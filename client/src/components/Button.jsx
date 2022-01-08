import React from "react";
import { Link } from "react-router-dom";

const Button = ({ normal, content, type = null, href = "/countries" }) => {
  return normal ? (
    <button type={type}>{content}</button>
  ) : (
    <Link to={href}>
      <button>{content}</button>
    </Link>
  );
};

export default Button;
