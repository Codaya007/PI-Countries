import React, { useEffect, useState } from "react";
import InputForm from "../components/InputForm";
import Button from "../components/Button";
import validateForm from "../helpers/validateForm";
import { TEMPORADAS } from "../assets/constants";
import { connect } from "react-redux";
import { createActivity } from "../actions";
import { toast } from "react-toastify";

// INICIALIZACIONES DE ESTADO
const initialForm = {
  nombre: "",
  dificultad: "1",
  duracion: { fecha_inicio: "", fecha_fin: "" },
  temporada: "Verano",
  paises: [],
};

const initialPaisesForm = {
  current: "",
  seleccionados: [],
  ids: [],
};

const FormActivity = ({ createActivity, countries, loadingRequest }) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [paisesForm, setPaisesForm] = useState(initialPaisesForm);
  const [paises, setPaises] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "fecha_inicio" || name === "fecha_fin") {
      setForm((prevState) => {
        return {
          ...prevState,
          duracion: { ...prevState.duracion, [name]: value },
        };
      });
    } else {
      setForm((prevState) => {
        return {
          ...prevState,
          [name]: name === "paises" ? paisesForm.ids : value,
        };
      });
    }
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
      createActivity({
        ...form,
        duracion: form.duracion.fecha_inicio + " " + form.duracion.fecha_fin,
      });
      resetForm();
    } else {
      toast.warn("El formulario no puede enviarse ya que contiene errores");
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
      paisesForm.seleccionados.length === 1 &&
        toast.info("Para quitar un país del listado presione su bandera");
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
      toast.success(`Se ha quitado ${countryToDelete.nombre}`, {
        autoClose: 2100,
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
    toast.info("Rellene todos los campos para poder enviar", {
      autoClose: 2000,
      hideProgressBar: true,
    });
  }, []);

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
        <div>
          <label>Fechas:</label>
          <label>Inicio</label>
          <input
            type={"date"}
            value={form.duracion.fecha_inicio}
            name="fecha_inicio"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <label>Fin</label>
          <input
            type={"date"}
            value={form.duracion.fecha_fin}
            name="fecha_fin"
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
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
                onClick={deleteBandera}
                name={pais.id}
              />
            ))
          ) : (
            <span>Aún no ha seleccionado ningún país</span>
          )}
        </div>

        {Object.keys(errors).length === 0 && !loadingRequest && (
          <Button normal content="Crear actividad" type="submit" />
        )}
        <input
          type="button"
          value="Limpiar campos"
          onClick={() => {
            resetForm();
            toast.info("Se han limpiado los campos!", {
              autoClose: 1600,
              hideProgressBar: true,
            });
          }}
        />
      </form>
    </>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormActivity);
