import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/axios";
import useAuth from "../hooks/useAuth";


const PacientesContext = createContext();

export const PacientesProvider = ({ children }) => {
  const [pacientes, setPacientes] = useState([]); //Para extraer LOS pacientes
  const [paciente, setPaciente] = useState({}); //Para editar UN paciente
  const {auth} = useAuth()//para escuchar cuando inicie/cierre sesion el usuario y obtener los pacientes

  //Cargamos los pacientes de la BD al STATE--Llamamos API = useEffect = try catch

  useEffect(() => {
    const obtenerPacientes = async () => {
      const token = localStorage.getItem("apv_token_");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await clienteAxios("/pacientes", config);
        setPacientes(data);
      } catch (error) {
        console.log(error);
      }
    };

    obtenerPacientes();
  }, [auth, pacientes]);

  //Agregamos pacientes creados / editados en formulario a la BD y al STATE
  const guardarPaciente = async (paciente) => {
    //Varibles de la peticion
    const token = localStorage.getItem("apv_token_");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    //Si id existe- Editamos
    if (paciente.id) {
      //Editar registro- Put
      try {
        const { data } = await clienteAxios.put(
          `/pacientes/${paciente.id}`,
          paciente,
          config
        );

        const pacientesActualizado = pacientes.map((pacienteSate) =>pacienteSate.id === data._id ? data : pacienteSate)
        
        setPacientes(pacientesActualizado); //al cambiar el state, hacer un render y muestra el paciente actualizado
      } catch (error) {
        console.log(error.response.data.msg);
      }
    } else {
      try {
        //Nuevo registro- Post

        const { data } = await clienteAxios.post(
          "/pacientes",
          paciente,
          config
        );

        //Eliminamos campos innecesarios de la respuesta para luego agregar al state
        const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data;

        //Agregamos al state
        setPacientes([pacienteAlmacenado, ...pacientes]);
      } catch (error) {
        console.log(error.response.data.msg);
      }
    }
  };

  //Funcion para Editar Paciente
  const setEdicion = (paciente) => {
    //Primero formateamos fecha a tipo yyy-mm-dd a renderizar en formulario
    const { fecha } = paciente;
    const fechaFormateada = new Date(fecha).toISOString().split("T")[0];
    const pacienteActualizado = {
      ...paciente,
      fecha: fechaFormateada,
    };
    setPaciente(pacienteActualizado); //guarda en el state
  };

  const EliminarPaciente = async (paciente) => {
    const { _id, nombre } = paciente;
    const confirmar = confirm(`Desea eliminar a: ${nombre} ?`);

    if (confirmar) {
      try {
        const token = localStorage.getItem("apv_token_");
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await clienteAxios.delete(`/pacientes/${_id}`, config);
        const pacientesActualizado = pacientes.filter(
          (pacienteState) => pacienteState.id !== _id
        );
        setPacientes(pacientesActualizado); //cambia el state--> hace un render actualiza en el DOM
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <PacientesContext.Provider
      value={{
        pacientes,
        guardarPaciente,
        setEdicion,
        paciente,
        EliminarPaciente,
        setPaciente
      }}
    >
      {children}
    </PacientesContext.Provider>
  );
};

export default PacientesContext;

//Creamos guardarPaciente para almacenarlo luego en el state de este Provider. Aca tenemos la funcion setPaciente. EN el formulario llamamos a guradarPaciente y le enviamos el objeto. guardarPaciente se ejecuta en el provider y hace la peticion a la API con los datos recibidos desde el formulario. Con el listado de pacientes en el state podemos renderizarlos.

//FORMULARIO ENVIA DATOS AL CONTEXT
//CONTEXT HACE PETICION A LA API {Desde context, con setPacientes, hace disponibles los daatos en toda la App lo cual es util para renderizarlos}

//EN el SATATE se guardan los paciente que se van creando y con el USEEFFECT cargan los pacientes YA GUARDADOS. Se ejecuta una vez cargado el componente

//LOS PROVIDERS retornan un OBJETO (la variables que estan dentro de value-) por ello para 'seleccionarlas' destructuramos el objeto

// Este componente PacientesProvider es esencial porque:

// Centraliza la gestión del estado relacionado con los pacientes, evitando la duplicación de lógica y asegurando que todos los componentes accedan a una única fuente de verdad.
// Facilita la reutilización y mantenimiento del código, permitiendo que la lógica de negocio se mantenga en un solo lugar.
// Mejora la eficiencia, ya que los datos solo se cargan una vez y están disponibles para toda la aplicación a través del contexto, sin necesidad de múltiples llamadas a la API o pasar props a través de múltiples niveles de componentes.

//EDICION: El componente Paciente envia a traves de onClick={()=>setEdicion(paciente)} el objeto completo de paciente. Se llama a la funcion setEdicion que esta definida en este PROVIDER y recibe el obj. Aca, que ya tenemos el SATATE y es el valor de este PROVIDER, tomamos el objeto y lo asignamos al STATE haciendolo disponible luego para el componente FORMULARIO quien es el que lo necesita para llenar los campos.
