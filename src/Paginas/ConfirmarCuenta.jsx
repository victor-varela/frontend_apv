import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import axios from "axios";//una vez creado el cliente axios no hace falta este import
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const ConfirmarCuenta = () => {
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const confirmarCuenta = async () => {
      //hace la peticion al backend--> axios| async- await
      try {
        const url = `/veterinarios/confirmar/${id}`;
        const { data } = await clienteAxios(url); //envia la peticion. almacena en data la respuesta del backend- seteamos la varibles a renderizar
        setCuentaConfirmada(true);
        setAlerta({
          msg: data.msg,
        });
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true,
        });
      }
      setCargando(false);
    };

    confirmarCuenta();
  }, []);

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Confirma tu Cuenta y Administra tus{" "}
          <span className="text-black">Pacientes</span>
        </h1>
      </div>

      <div className="mt-14 md:mt-5 bg-white border rounded-xl shadow-lg py-10 px-5">
        {!cargando && 
          <Alerta 
            alerta={alerta} 
        />}
        
        {cuentaConfirmada &&
        (
          <Link to="/" className="block text-center text-gray-500">
            Iniciar Sesion
          </Link>
        )}
      </div>
    </>
  );
};

export default ConfirmarCuenta;

//Tomamos el token de la URL y lo enviamos hacia el backend
//Usamo useEffect para ejecutar la confirmacion una vez cargado el componente: esto hara que se ejecute el codigo del controlador el cual elimina el token y cambia confirmado a true. De esta forma el token no puede volver a usarse

//Axios es un 'traductor' de peticiones (get, put, patch, delete). En sus metodos esta por defecto el get. Por ello: axios()--> tiene implicito el verbo get. En este caso la peticion es tambien get (ver backend y postman/confirmar cuenta). En el useEffect --> se declara otra funcion para poder asignarle la asincronia (no puede ser directamente en el useEffect) por ello se vuelve a llamar a esa funcion al terminar el try catch. Se puede evitar tener que declarar otra funcion pero seria una funcion anonima async : useEffect(() => {
//     (async () => {
//       try {
//           const { data } = await axios(`http://localhost:4000/api/veterinarios/confirmar/${id}`);
//           console.log(data);
//       } catch (error) {
//           console.error("Error al confirmar la cuenta:", error);
//       }
//   })(); este parentesis manda a llamar la funcion anonima-- no cambia mucho a mi entender
// }, [id]);
