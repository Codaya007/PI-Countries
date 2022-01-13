import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Button.module.css";

const Button = ({
  normal,
  content,
  className,
  type = null,
  href = "/countries",
  handleClick,
}) => {
  return normal ? (
    <button
      className={className || styles["button-primary"]}
      onClick={handleClick}
      type={type}
    >
      {content}
    </button>
  ) : (
    <Link to={href}>
      <button className={className || styles["button-primary"]}>
        {content}
      </button>
    </Link>
  );
};

export default Button;
