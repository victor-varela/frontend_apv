import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const NuevoPassword = () => {
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");
  const [alerta, setAlerta] = useState({});
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordModificado, setPasswordModificado] = useState(false);

  const { token } = useParams();

  //Disparamos useEffect para leer token al cargar el componente y condicionar el render
  useEffect(() => {
    const comprobarToken = async () => {
      //Hacemos la peticion al servidor
      try {
        await clienteAxios(`/veterinarios/olvide-password/${token}`); //el verbo http es get para obtener el token-
        setAlerta({ msg: "Ingresa tu Nuevo Password" });
        setTokenValido(true);
      } catch (error) {
        console.log(error);
        setAlerta({ msg: "Hubo un error en el enlace", error: true });
      }
    };
    comprobarToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Validamos password

    if (password === "") {
      setAlerta({ msg: "El password no puede estar vacio", error: true });
      return;
    }

    if (password !== repetirPassword) {
      setAlerta({ msg: "Los password no son iguales", error: true });
      return;
    }

    if (password.length < 6) {
      setAlerta({
        msg: "El password debe tener al menos 6 caracteres",
        error: true,
      });
      return;
    }
    
    try {
      await clienteAxios.post(`/veterinarios/olvide-password/${token}`, {
        password,
      });
      setAlerta({ msg: "Password creado correctamente" });
      setPasswordModificado(true)
    } catch (error) {
      console.log(error);
      setAlerta({ msg: "Hubo un error", error: true });
    }
  };

  const { msg } = alerta;
  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Reestablece tu password y administra tus{" "}
          <span className="text-black">Pacientes</span>
        </h1>
      </div>
      <div className="mt-14 md:mt-5 bg-white border rounded-xl shadow-lg py-10 px-5">
        {msg && <Alerta alerta={alerta} />}

        {tokenValido && (
          <>
              <form onSubmit={handleSubmit}>
                <div className="my-5">
                  <label className="font-bold text-xl block text-gray-600 uppercase">
                    Nuevo Password
                  </label>
                  <input
                    type="password"
                    placeholder="Nuevo password"
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
                    placeholder="Repetir password"
                    className="border rounded-xl lg:w-1/2 w-full bg-gray-50 p-3 mt-3"
                    value={repetirPassword}
                    onChange={(e) => setRepetirPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="GUARDAR NUEVO PASSWORD"
                  className="bg-indigo-700 hover:bg-indigo-800 hover:cursor-pointer py-3 mt-5 px-10 
                text-white rounded-xl font-bold w-full md:w-auto"
                />
              </form>
              {passwordModificado && (
                <Link to="/" className="block text-center text-gray-500 my-5">
                  Iniciar Sesion
                </Link>
              )}
          </>
        )}
      </div>
    </>
  );
};

export default NuevoPassword;

//en el condicional de tokenValido hay que poner un fragment porque retorna mas de un bloque.
