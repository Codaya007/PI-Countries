import React, { useEffect, useState } from "react";
import InputForm from "../components/InputForm";
import validateForm from "../helpers/validateForm";
import { TEMPORADAS } from "../assets/constants";
import { connect } from "react-redux";
import { createActivity, addNotification } from "../actions";
import styles from "../styles/FormActivity.module.css";
import stylesButton from "../styles/Button.module.css";
import stylesInputs from "../styles/Input.module.css";
import Message from "../components/Message";

// INICIALIZACIONES DE ESTADO
const initialForm = {
  nombre: "",
  descripcion: "",
  dificultad: "1",
  duracion: "1",
  temporada: "Verano",
  paises: [],
};

const initialPaisesForm = {
  current: "",
  seleccionados: [],
  ids: [],
};

const FormActivity = ({
  createActivity,
  countries,
  loadingRequest,
  addNotification,
}) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [paisesForm, setPaisesForm] = useState(initialPaisesForm);
  const [paises, setPaises] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prevState) => {
      return {
        ...prevState,
        [name]: name === "paises" ? paisesForm.ids : value,
      };
    });
  };

  // Cuando el input pierda el foco de atención, se tienen que validar los campos
  const handleBlur = (event) => {
    // para no repetir código:
    handleChange(event);
    setErrors(validateForm(form));
  };

  const resetForm = () => {
    setForm(initialForm); //limpiamos el form
    setPaises([...paises, ...paisesForm.seleccionados]);
    setPaisesForm(initialPaisesForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = validateForm(form);
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      addNotification({
        description: "Enviando el formulario",
        type: "info",
      });

      createActivity({
        ...form,
        nombre: form.nombre.trim(),
        descripcion: form.descripcion.trim(),
      });
      resetForm();
    } else {
      addNotification({
        description: "El formulario contiene errrores",
        type: "error",
      });
      return;
    }
  };

  const handleClickBandera = (event) => {
    if (!paisesForm.current) {
      return;
    }

    const paisSeleccionado = paises.find(
      (pais) => pais.nombre === paisesForm.current
    );
    // quito el pais seleccionado de las opciones
    setPaises(paises.filter((pais) => pais.nombre !== paisesForm.current));

    if (!paisesForm.ids.includes(paisSeleccionado.id)) {
      setPaisesForm({
        current: "",
        seleccionados: [...paisesForm.seleccionados, paisSeleccionado],
        ids: [...paisesForm.ids, paisSeleccionado.id],
      });
      paisesForm.seleccionados.length === 0 &&
        addNotification({
          description: "Para quitar un país del listado presione su bandera",
          type: "info",
        });
    } else {
      setPaisesForm({ ...paisesForm, current: "" });
    }
  };

  const deleteBandera = (event) => {
    const { name } = event.target;

    const countryToDelete = paisesForm.seleccionados.find(
      (pais) => pais.id === name
    );
    countryToDelete &&
      addNotification({
        description: `Se ha quitado ${countryToDelete.nombre}`,
        type: "success",
      });
    setPaises([...paises, countryToDelete]);
    setPaisesForm({
      ...paisesForm,
      seleccionados: paisesForm.seleccionados.filter(
        (pais) => pais.id !== name
      ),
      ids: paisesForm.ids.filter((idPais) => name !== idPais),
    });
  };

  useEffect(() => {
    setPaises(countries);
  }, [countries]);

  useEffect(() => {
    setForm((prev) => ({ ...prev, paises: paisesForm.ids }));
  }, [paisesForm.ids]);

  useEffect(() => {
    setErrors(validateForm(form));
  }, [form]);

  useEffect(() => {
    addNotification({
      description: "Rellene todos los campos para poder enviar el formulario",
      type: "info",
    });
  }, [addNotification]);

  return (
    <div className={styles["form-container"]}>
      <form className={styles["inputs-form"]} onSubmit={handleSubmit}>
        {/* NOMBRE DE LA ACTIVIDAD */}
        <h1 className={styles["title-form"]}>Crear nueva actividad:</h1>
        <InputForm
          title="Nombre de la actividad:"
          type="text"
          name="nombre"
          value={form.nombre}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />
        {errors.nombre && (
          <Message className={styles["error-form"]} content={errors.nombre} />
        )}

        {/* DESCRIPCIÓN DE LA ACTIVIDAD */}
        <div className={stylesInputs["input-container"]}>
          <label className={stylesInputs["label-form"]}>
            Breve descripción:
          </label>
          <textarea
            className={styles["textarea-form"]}
            name="descripcion"
            value={form.descripcion}
            cols="40"
            rows="3"
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </div>
        {errors.descripcion && (
          <Message
            className={styles["error-form"]}
            content={errors.descripcion}
          />
        )}

        {/* DIFICULTAD DE LA ACTIVIDAD */}
        <InputForm
          title="Dificultad:"
          type="range"
          min={0}
          max={5}
          name="dificultad"
          value={form.dificultad}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />
        {errors.dificultad && (
          <Message
            className={styles["error-form"]}
            content={errors.dificultad}
          />
        )}

        {/* DURACIÓN DE LA ACTIVIDAD */}
        <div className={stylesInputs["input-container"]}>
          <label className={stylesInputs["label-form"]}>
            Duración en horas:
          </label>
          <input
            className={stylesInputs["input-form"]}
            type={"number"}
            value={form.duracion}
            name="duracion"
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        {errors.duracion && (
          <Message className={styles["error-form"]} content={errors.duracion} />
        )}

        {/* TEMPORADA DE LA ACTIVIDAD */}
        <div className={stylesInputs["input-container"]}>
          <label className={stylesInputs["label-form"]}>
            "Temporada propicia para realizar la actividad:"
          </label>
          <select
            className={stylesInputs["input-form"]}
            name={"temporada"}
            value={form.temporada}
            id={"temporada"}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            {TEMPORADAS.length &&
              TEMPORADAS.map((elem) => (
                <option value={elem} key={elem}>
                  {elem}
                </option>
              ))}
          </select>
        </div>
        {errors.temporada && (
          <Message
            className={styles["error-form"]}
            content={errors.temporada}
          />
        )}

        {/* PAISES DONDE SE PRACTICA LA ACTIVIDAD */}
        <div className={stylesInputs["input-container"]}>
          <label className={stylesInputs["label-form"]}>
            Seleccione los países donde puede practicar esta actividad:
          </label>
          <input
            className={stylesInputs["input-country"]}
            type="text"
            list="paises"
            value={paisesForm.current}
            name="current"
            onChange={(e) =>
              setPaisesForm({ ...paisesForm, current: e.target.value })
            }
          />
          <datalist id="paises">
            {paises.map((pais) => (
              <option key={pais.id} value={pais.nombre}>
                {pais.nombre}
              </option>
            ))}
          </datalist>
          <input
            className={stylesInputs["btn-add-country"]}
            type="button"
            value={"Añadir país"}
            name="paises"
            onClick={handleClickBandera}
          />
        </div>
        {errors.paises && (
          <Message className={styles["error-form"]} content={errors.paises} />
        )}

        {/* BOTONES DEL FORMULARIO */}
        <div className={styles["btns-form"]}>
          <input
            className={stylesButton["button-secondary-dark"]}
            type="button"
            value="Limpiar campos"
            onClick={() => {
              resetForm();
              addNotification({
                description: "Se han limpiado los campos!",
                type: "success",
              });
            }}
          />
          {Object.keys(errors).length === 0 && !loadingRequest && (
            <input
              className={stylesButton["button-primary-dark"]}
              type="submit"
              value="Crear actividad"
            />
          )}
        </div>
      </form>
      {/* MUESTRO LOS PAISES QUE HE SELECCIONADO */}
      <div>
        <p className={styles["selected-countries-title"]}>
          Paises seleccionados:
        </p>
        <div>
          {paisesForm.seleccionados.length ? (
            paisesForm.seleccionados.map((pais) => (
              <div className={styles["container-bandera"]}>
                <button name={pais.id} onClick={deleteBandera}>
                  x
                </button>
                <img
                  className={styles.bandera}
                  key={pais.id}
                  src={pais.imagen_bandera}
                  alt={pais.nombre}
                  title={`Eliminar ${pais.nombre}`}
                  name={pais.id}
                />
              </div>
            ))
          ) : (
            <Message content={"Aún no ha seleccionado ningún país"} />
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    countries: state.countries,
    loadingRequest: state.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createActivity: (activity) => {
      dispatch(createActivity(activity));
    },
    addNotification: (notification) => {
      // console.log("despachando accion");
      dispatch(addNotification(notification));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormActivity);
