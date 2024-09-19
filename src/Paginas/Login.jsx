import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import clienteAxios from "../config/axios";
import Alerta from "../components/Alerta";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [alerta, setAlerta] = useState({});

  const {setAuth} = useAuth();

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([email, password].includes('')) {
      setAlerta({ msg: "Todos los campos son obligatorios", error: true });
      return;
    }

    //Enviamos peticion
    try {
      const { data } = await clienteAxios.post("/veterinarios/login", {
        email,
        password,
      });
      
      //Almacenamos token en localStorage y seteamos Auth
      setAuth(data);
      localStorage.setItem('apv_token_', data.token);
      //Redireccionamos hacia '/admin'
      navigate('/admin')
    } catch (error) {
      console.log(error.response.data.msg);
      setAlerta({ msg: error.response.data.msg, error: true });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Inicia Sesion y Administra tus{" "}
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
              placeholder="Email de Registro"
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
              placeholder="Tu Password"
              className="border rounded-xl lg:w-1/2 w-full bg-gray-50 p-3 mt-3"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="INICIAR SESION"
            className="bg-indigo-700 hover:bg-indigo-800 hover:cursor-pointer py-3 mt-5 px-10 
            text-white rounded-xl font-bold w-full md:w-auto"
          />
        </form>
        <nav className="mt-10 lg:flex lg:justify-between">
          <Link to="/registrar" className="block text-center text-gray-500">
            ¿No tienes una cuenta? Registrate
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

export default Login;

//Antes este componente obtenia como respuesta solamente el token para guardar en storage y le dejaba a authProvider a que hiciera la peticion al back y obtiviera los datos del perfil.
//AHORA obtenemos directamente desde login los datos del usuario-- le adelantamos la peticion a authProvider para que pueda renderizar la primera vez el componente rutaProtegida.. luego cada vez que carga la pagina el authProvider, como tiene useEffect, va a hacer la peticion y confirmar que el usuario siga autenticado, es decir, que exista un token y que devuelva los datos de la peticion.
