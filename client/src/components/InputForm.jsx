import React from "react";
import styles from "../styles/Input.module.css";

const InputForm = ({
  name,
  value,
  type,
  handleChange = null,
  handleBlur = null,
  min = 0,
  max = 100,
}) => {
  return (
    <div className={styles["input-container"]}>
      <input
        className={styles["input-form"]}
        type={type}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        name={name}
        min={type === "range" ? min : null}
        max={type === "range" ? max : null}
      />
    </div>
  );
};

export default InputForm;
