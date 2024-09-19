import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const OlvidePassword = () => {
  const [email, setEmail] = useState("");
  const [alerta, setAlerta] = useState({});

  //Esta funcion envia los datos al servidor (POST)---> necesita async, clienteAxios(URL)
  const handleSubmit = async (e) => {
    e.preventDefault();

    //Validamos
    if (email === "" || email.length < 6) {
      setAlerta({ msg: "Email invalido", error: true });
      return;
    }

    //Enviamos peticion al servidor
    try {
      //Extraemos el obj respuesta y enviamos datos{email}
      const { data } = await clienteAxios.post("veterinarios/olvide-password", {
        email,
      });
      
      setAlerta({ msg: data.msg });
    } catch (error) {
      setAlerta({ msg: error.response.data.msg, error: true });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Recupera tu acceso y no pierdas tus{" "}
          <span className="text-black">Pacientes</span>
        </h1>
      </div>
      <div className="mt-14 md:mt-5 bg-white border rounded-xl shadow-lg py-10 px-5">

        {msg && <Alerta 
          alerta={alerta} 
        />}

        <form onSubmit={handleSubmit}>
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

          <input
            type="submit"
            value="ENVIAR INSTRUCCIONES"
            className="bg-indigo-700 hover:bg-indigo-800 hover:cursor-pointer py-3 mt-5 px-10 
            text-white rounded-xl font-bold w-full md:w-auto"
          />
        </form>
        <nav className="mt-10 lg:flex lg:justify-between">
          <Link to="/" className="block text-center text-gray-500">
            ¿Tienes una cuenta? Inicia Sesion
          </Link>
          <Link to="/registrar" className="block text-center text-gray-500">
            ¿No tienes una cuenta? Registrate
          </Link>
        </nav>
      </div>
    </>
  );
};

export default OlvidePassword;
