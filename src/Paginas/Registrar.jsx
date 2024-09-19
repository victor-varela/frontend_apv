import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
// import axios from "axios"; una vez creado clienteAxios no hace falta este import
import clienteAxios from "../config/axios";

const Registrar = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");

  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Verificamos campos vacios, password iguales y longitud de password
    if ([nombre, email, password, repetirPassword].includes("")) {
      return setAlerta({ msg: "Hay un campo vacio", error: true });
    }

    if (password != repetirPassword) {
      return setAlerta({ msg: "Los password no son iguales", error: true });
    }

    if (password.length < 6) {
      return setAlerta({
        msg: "El password debe tener al menos 6 caracteres",
        error: true,
      });
    }

    //Paso las validaciones- Seteamos alerta a vacio
    setAlerta({});

    //Crear el usuario en la API
    try {
     //variable de entorno {import.meta.env !=process.env en backend} esta dentro de clienteAxios
      await clienteAxios.post('/veterinarios', { nombre, email, password });
      setAlerta({msg:'Usuaro Creado Correctamente. Revisa tu Email', error: false});
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error:true
      })
    }
  };

  const { msg } = alerta;

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Crea tu Cuenta y Administra tus{" "}
          <span className="text-black">Pacientes</span>
        </h1>
      </div>
      <div className="mt-14 md:mt-5 bg-white border rounded-xl shadow-lg py-10 px-5">
        {msg && <Alerta alerta={alerta} />}

        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label className="font-bold text-xl block text-gray-600 uppercase">
              Nombre
            </label>
            <input
              type="text"
              placeholder="Tu nombre"
              className="border rounded-xl lg:w-1/2 w-full bg-gray-50 p-3 mt-3"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label className="font-bold text-xl block text-gray-600 uppercase">
              Email
            </label>
            <input
              type="email"
              placeholder="Tu email"
              className="border rounded-xl lg:w-1/2 w-full bg-gray-50 p-3 mt-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label className="font-bold text-xl block text-gray-600 uppercase">
              Password
            </label>
            <input
              type="password"
              placeholder="Tu password"
              className="border rounded-xl lg:w-1/2 w-full bg-gray-50 p-3 mt-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="my-5">
            <label className="font-bold text-xl block text-gray-600 uppercase">
              Repetir Password
            </label>
            <input
              type="password"
              placeholder="Repite tu password"
              className="border rounded-xl lg:w-1/2 w-full bg-gray-50 p-3 mt-3"
              value={repetirPassword}
              onChange={(e) => setRepetirPassword(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="CREAR CUENTA"
            className="bg-indigo-700 hover:bg-indigo-800 hover:cursor-pointer py-3 mt-5 px-10 
            text-white rounded-xl font-bold w-full md:w-auto"
          />
        </form>
        <nav className="mt-10 lg:flex lg:justify-between">
          <Link to="/" className="block text-center text-gray-500">
            ¿Tienes una cuenta? Inicia Sesion
          </Link>
          <Link
            to="/olvide-password"
            className="block text-center text-gray-500"
          >
            Olvide mi Password
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Registrar;

//Este componente se comunica con el backend por medio de axios. Envia los datos del veterinario para registrarse. Por ello async await y los metodos de axios, acceso a la data desde el servidor, etc

//La comunicacion se hace a la url del servidor {http://localhost:400/api/veterianrios} es la url en registrar veterinarios de backend y es con un POST (aca entra axios para facilitar el codigo. Es como sequelize o mongoose...) es POST por lo que hicimos en backend y este definido en postman

//const respuesta = await axios.post(url, {nombre, email, password}, ) toma la url, los datos que enviamos y luego la config. En este caso no tiene opciones de configuracion la peticion porque de area publica

//CORS (Cross-Origin Resource Sharing): Si estás realizando una solicitud desde un navegador y el servidor no permite el acceso desde tu dominio (problemas de CORS), es posible que se bloquee la solicitud. Por ello hay que indicar cuales dominios pueden tener acceso al servidor. Los CORS son una forma de proteger la api
