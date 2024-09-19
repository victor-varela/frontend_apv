import { useState } from "react";
import Formulario from "../components/Formulario";
import ListadoPacientes from "../components/ListadoPacientes";
const AdministrarPacientes = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  return (
    <div className="flex flex-col md:flex-row">
      <button 
        type="button"
        className="block bg-indigo-600 mx-auto p-3 text-white font-bold uppercase rounded-md mb-10 md:hidden"
        onClick={()=>setMostrarFormulario(!mostrarFormulario)}

      >{mostrarFormulario ? 'Ocultar Formulario' : 'Mostrar Formulario'}</button>
      <div
        className={`${ mostrarFormulario ? "block" : "hidden"} md:block md:w-1/2 lg:w-2/5`}
      >
        <Formulario />
      </div>

      <div className="md:w-1/2 lg:w-3/5">
        <ListadoPacientes />
      </div>
    </div>
  );
};

export default AdministrarPacientes;

//El formulario se muestra dependiendo del tamaño del dispositivo (usamos un state para ello). En el div donde esta formulario es donde se  evalua la condicion: {`${mostrarFormulario?   :   } md:w-1/2 lg:w-2/5`} despues de ${---- } aplica las clases que vienen md:w-1/2 lg:w-2/5

//Cuando las clases tienen condicional se escribe: ClassName={} --llaves y backticks ``
