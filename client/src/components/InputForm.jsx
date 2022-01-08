import React from "react";

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
  if (select) {
    return (
      <>
        <label>{title}</label>
        <select
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
      </>
    );
  } else {
    return (
      <div>
        <label>{title}</label>
        <input
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
  }
};

export default InputForm;
