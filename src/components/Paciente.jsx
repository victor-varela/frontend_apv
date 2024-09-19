import usePacientes from "../hooks/usePacientes";

const Paciente = ({ paciente }) => {
  const { setEdicion, EliminarPaciente } = usePacientes();
  const formatearFecha = (fecha) => {
    const nuevaFecha = new Date(fecha);

    return new Intl.DateTimeFormat("es-Es", { dateStyle: "short" }).format(
      nuevaFecha
    );
  };

  const { email, nombre, fecha, propietario, sintomas, _id } = paciente;
  return (
    <div className="mx-5 bg-white my-10 shadow-md px-5 py-10 rounded-xl">
      <p className="font-bold uppercase text-indigo-800 my-2">
        Nombre:{" "}
        <span className="normal-case text-black font-normal ">{nombre}</span>
      </p>
      <p className="font-bold uppercase text-indigo-800 my-2">
        Propietario:{" "}
        <span className="normal-case text-black font-normal ">
          {propietario}
        </span>
      </p>
      <p className="font-bold uppercase text-indigo-800 my-2">
        Email:{" "}
        <span className="normal-case text-black font-normal ">{email}</span>
      </p>
      <p className="font-bold uppercase text-indigo-800 my-2">
        Fecha Alta:{" "}
        <span className="normal-case text-black font-normal ">
          {formatearFecha(fecha)}
        </span>
      </p>
      <p className="font-bold uppercase text-indigo-800 my-2">
        Sintomas:{" "}
        <span className="normal-case text-black font-normal ">{sintomas}</span>
      </p>
      <div className="flex flex-col gap-2 sm:flex-row lg:gap-0 justify-between my-5">
        <button
          type="button"
          className="uppercase px-10 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg"
          onClick={() => setEdicion(paciente)}
        >
          Editar
        </button>
        <button
          type="button"
          className="uppercase px-10 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg"
          onClick={()=>EliminarPaciente(paciente)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default Paciente;

//Con este componente creamos la estructura y se replica desde Listado Pacientes con el .map

//Editar: almacenamos en un STATE en PacientesProvider el objeto paciente que seleccionamos- luego debemos leer ese objeto en FORMULARIO ya que ahi vamos a mostrar los datos del paciente que selecciono el usuario, vamos a rellenar los campos del formulario con ese objeto
