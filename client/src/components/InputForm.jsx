import React from "react";
import styles from "../styles/Input.module.css";

const InputForm = ({
  select,
  options,
  title,
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
      <label className={styles["label-form"]}>{title}</label>
      {select ? (
        <select
          className={styles["input-form"]}
          name={name}
          id={name}
          onChange={handleChange}
          onBlur={handleBlur}
        >
          {options.length &&
            options.map((elem) => (
              <option value={elem} key={elem}>
                {elem}
              </option>
            ))}
        </select>
      ) : (
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
      )}
    </div>
  );
};

export default InputForm;
