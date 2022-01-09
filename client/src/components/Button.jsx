import React from "react";
import { Link } from "react-router-dom";

const Button = ({
  normal,
  content,
  type = null,
  href = "/countries",
  handleClick,
}) => {
  return normal ? (
    <button onClick={handleClick} type={type}>
      {content}
    </button>
  ) : (
    <Link to={href}>
      <button>{content}</button>
    </Link>
  );
};

export default Button;
