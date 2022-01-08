import React, { useEffect, useState } from "react";
import InputForm from "../components/InputForm";
import Loading from "../components/Loading";
import Button from "../components/Button";
import validateForm from "../helpers/validateForm";
import { TEMPORADAS } from "../assets/constants";
import { connect } from "react-redux";
import { createActivity } from "../actions";

// INICIALIZACIONES DE ESTADO
const initialForm = {
  nombre: "",
  dificultad: "1",
  duracion: 60,
  temporada: "Verano",
  paises: [],
};

const initialPaisesForm = {
  current: "",
  seleccionados: [],
  ids: [],
};

const FormActivity = ({ createActivity, countries, loading }) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [response, setResponse] = useState(null);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = validateForm(form);
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      createActivity(form);
      setResponse(true);
      setForm(initialForm); //limpiamos el form
      setPaisesForm(initialPaisesForm);

      // let response = createActivity(form);
      // si el formulario se envió exitosamente
      // if (response) {
      //   setResponse(true);
      //   setForm(initialForm); //limpiamos el form
      //   setPaisesForm(initialPaisesForm);
      //   setTimeout(() => {
      //     setResponse(false);
      //   }, 4000);
      // }
    } else {
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
    } else {
      setPaisesForm({ ...paisesForm, current: "" });
    }
  };

  useEffect(() => {
    setPaises(countries);
  }, [countries]);

  useEffect(() => {
    setForm((prev) => ({ ...prev, paises: paisesForm.ids }));
  }, [paisesForm.ids]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Crear nueva actividad:</h1>
        <InputForm
          title="Nombre de la actividad:"
          type="text"
          name="nombre"
          value={form.nombre}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />
        {errors.nombre && <span>{errors.nombre}</span>}
        <InputForm
          title="Dificultad:"
          type="range"
          min={1}
          max={5}
          name="dificultad"
          value={form.dificultad}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />
        {errors.dificultad && <span>{errors.dificultad}</span>}
        <InputForm
          title="Duración en min:"
          type="number"
          name="duracion"
          value={form.duracion}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />
        {errors.duracion && <span>{errors.duracion}</span>}
        <InputForm
          select
          title="Temporada propicia para realizar la actividad:"
          name="temporada"
          options={TEMPORADAS}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />
        {errors.temporada && <span>{errors.temporada}</span>}

        {/* PAISES DONDE SE PRACTICA LA ACTIVIDAD */}

        <label>
          Seleccione los países donde puede practicar esta actividad:
        </label>
        <input
          type="text"
          list="paises"
          value={paisesForm.current}
          name="current"
          onChange={(e) =>
            setPaisesForm({ ...paisesForm, current: e.target.value })
          }
        />
        <input
          type="button"
          value={"Añadir país"}
          name="paises"
          onClick={handleClickBandera}
        />
        {errors.paises && <span>{errors.paises}</span>}

        {/* MUESTRO LOS PAISES QUE HE SELECCIONADO */}
        <datalist id="paises">
          {paises.map((pais) => (
            <option key={pais.id} value={pais.nombre}>
              {pais.nombre}
            </option>
          ))}
        </datalist>
        <p>Paises donde se practica la actividad:</p>
        <div>
          {paisesForm.seleccionados.length ? (
            paisesForm.seleccionados.map((pais) => (
              <img
                key={pais.id}
                src={pais.imagen_bandera}
                alt={pais.nombre}
                title={`Eliminar ${pais.nombre}`}
                onClick={handleClickBandera}
                name={pais.id}
              />
            ))
          ) : (
            <span>Aún no ha seleccionado ningún país</span>
          )}
        </div>

        {loading && <Loading />}
        {Object.keys(errors).length === 0 && !loading && (
          <Button normal content="Crear" type="submit" />
        )}
      </form>
      {response && <div>'Formulario enviado exitosamente'</div>}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    countries: state.countries,
    loading: state.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createActivity: (activity) => {
      dispatch(createActivity(activity));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormActivity);
