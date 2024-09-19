import { useState, useEffect } from "react";
import Alerta from "./Alerta";
import usePacientes from "../hooks/usePacientes";

const Formulario = () => {
  const [nombre, setNombre] = useState("");
  const [propietario, setPropietario] = useState("");
  const [email, setEmail] = useState("");
  const [sintomas, setSintomas] = useState("");
  const [fecha, setFecha] = useState("");
  const [id, setId] = useState(null);

  const [alerta, setAlerta] = useState({});

  const { guardarPaciente, paciente, setPaciente } = usePacientes();
  
  //Detectamos cuando paciente a editar tiene algo o cambió -Esta disponible en el state desde el Provider
  useEffect(() => {
    if (paciente?.nombre) {
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setSintomas(paciente.sintomas);
      setFecha(paciente.fecha); //el formato coincide con yyy-mm-dd y se mantiene el formato original en la BD
      setId(paciente._id); //Para verificar si estamos editando
    }
  }, [paciente]);

  const handleSUbmit = (e) => {
    e.preventDefault();

    if ([nombre, propietario, email, fecha, sintomas, id].includes("")) {
      setAlerta({ msg: "Todos los campos son obligatorios", error: true });
      return;
    }

    //Paso la validacion

    //Borramos alerta
    setAlerta({});

    //Llamamos guardarPaciente{es un objeto}-USAMOS EL PROVIDER
    guardarPaciente({ nombre, propietario, email, fecha, sintomas, id });
    setAlerta({ msg: "Guardado Correctamente" });
    setTimeout(() => {
      setAlerta({})
    }, 2000);

    //Reseteamos el formulario
    setNombre('')
    setEmail('')
    setPropietario('')
    setSintomas('')
    setFecha('')
    setId('')
    setPaciente({})
  };

  const { msg } = alerta;
  return (
    <>
      <h2 className="text-3xl font-black text-center">
        Administrador de Pacientes
      </h2>
      <p className="text-xl mt-5 mb-10 text-center">
        Registra tus Pacientes y {""}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>

      <form
        className="bg-white shadow-md rounded-md p-5 mb-10 lg:mb-5"
        onSubmit={handleSUbmit}
      >
        <div className="mb-5">
          <label
            htmlFor="mascota"
            className="text-gray-700 uppercase font-bold"
          >
            Nombre Mascota
          </label>
          <input
            id="nombre"
            type="text"
            placeholder="Nombre de la mascota"
            className="block w-full p-2 border-2 mt-2 placeholder-gray-400 rounded-md"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="propietario"
            className="text-gray-700 uppercase font-bold"
          >
            Nombre propietario
          </label>
          <input
            id="propietario"
            type="text"
            placeholder="Nombre del propietario"
            className="block w-full p-2 border-2 mt-2 placeholder-gray-400 rounded-md"
            value={propietario}
            onChange={(e) => setPropietario(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="text-gray-700 uppercase font-bold">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email del propietario"
            className="block w-full p-2 border-2 mt-2 placeholder-gray-400 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="fecha" className="text-gray-700 uppercase font-bold">
            fecha alta
          </label>
          <input
            id="fecha"
            type="date"
            className="block w-full p-2 border-2 mt-2 placeholder-gray-400 rounded-md"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="sintomas"
            className="text-gray-700 uppercase font-bold"
          >
            sintomas
          </label>
          <textarea
            id="sintomas"
            placeholder="Escribe los sintomas"
            className="block w-full p-2 border-2 mt-2 placeholder-gray-400 rounded-md"
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
          />
        </div>
        <input
          type="submit"
          value={id ? "Guardar Cambios" : "Agregar Paciente"}
          className="bg-indigo-600 w-full text-white p-2 hover:bg-indigo-700 cursor-pointer transition-colors uppercase font-bold"
        />
      </form>
      {msg && <Alerta alerta={alerta} />}
    </>
  );
};

export default Formulario;

//Este formulario envia los datos al backend y es recomendable que los nombres de los campos sean iguales al MODELO.

//Cuando editamos, debemos RELLENAR los campos del paciente seleccionado en el FORMULARIO. Por ello nos servimos de las funciones del PROVIDER {paciente, setPaciente} en singular--- se puede llamar pacienteSeleccionado y setPacienteSeleccionado

//Usamos useEffect con la dependencia de paciente (edicion) para estar atentos si cambia de estado / tiene algo, quiere decir que debemos rellenar el formulario con esa informacion

// ?. (Encadenamiento Opcional): Esta sintaxis verifica si paciente es null o undefined antes de intentar acceder a la propiedad nombre.
// Si paciente es null o undefined, la expresión se evalúa como undefined y no causa un error.
// Si paciente no es null ni undefined, entonces intenta acceder a paciente.nombre.
