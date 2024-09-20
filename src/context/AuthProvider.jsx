import { useState, useEffect, createContext} from "react"; //creamos el context y luego lo usamos en el custom hook
import {useNavigate} from 'react-router-dom';
import clienteAxios from "../config/axios";

//Nombrar el context
const AuthContext = createContext(); //referencia de como se llama el context(AuthContext) de este provider (AuthProvider)

//el Provider retorna el context
const AuthProvider = ({ children }) => {
  //States disponibles globalmente
  const [auth, setAuth] = useState({});
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem("apv_token_");

      //Verificamos si existe token antes del request/peticion
      if (!token) {
        setCargando(false);
        return;
      }

      //Iniciamos la peticion

      //creamos la variable de configuracion que tiene el headers con el bearer token. Esto reemplaza postman. Authoriztion type (Bearer Token) y el tipo de request (application/json)
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      //Hacemos la peticion
      try {
        const { data } = await clienteAxios("/veterinarios/perfil", config);
        setAuth(data);
        navigate('/admin')
      } catch (error) {
        console.log(error.response.data.msg);
        setAuth({});
      }

      setCargando(false);
    };
    autenticarUsuario();
  }, []);

  //Function cerrar sesion. Eliminamos token y seteamos auth a vacio. esto direcciona a login
  const cerrarSesion = () => {
    localStorage.removeItem("apv_token_");
    setAuth({});  
  };

  //Function Editar Perfil
  const actualizarPerfil = async datos => {
    //Hacemos peticion //Verificamos si existe token antes del request/peticion
    const token = localStorage.getItem("apv_token_");
    if (!token) {
      setCargando(false);
      return;
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const url = `/veterinarios/perfil/${datos._id}`;
      const {data} = await clienteAxios.put(url, datos, config);
      
      return {
        msg:'Guardado Correctamente'
      }
      
    } catch (error) {
      return {
        msg: error.response.data.msg,
        error: true
      }
    }
  };

  const guardarPassword = async (datos) =>{
    const token = localStorage.getItem('apv_token_');
    if (!token) {
      setCargando(false);
      return;
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const {data} = await clienteAxios.put('/veterinarios/actualizar-password', datos, config)
      return {
        msg: data.msg
      }
    } catch (error) {
      return {
        msg:error.response.data.msg,
        error: true
      }
    }
    
  }

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        cargando,
        cerrarSesion,
        actualizarPerfil,
        guardarPassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;

//AuthContext se exporta por separado, y como default, para permitir que otros componentes accedan al contexto sin tener que recordar su nombre exacto.

//en la prop value del provider declaramos los states/funciones, metodos que van a estar DISPONIBLES para usar en los otros componentes
//luego en los componentes donde necesitamos los states/funciones/etc lo declaramos con destructuring de useAuth (el custom hook) eje: const{aut} = useAuth()

//Como este provider rodea toda la app es aqui donde evaluamos si el user esta autenticado por medio de useEffect (cuando cargue la app)

//El useEffect garantiza que en cada recarga de pagina de TODA la app se este verificando si el usuario esta autenticado. Esto para porque es un PROVIDER envuelve toda la APP y el useEffect sin dependencias se ejecuta SIEMPRE que recarga la pagina- una recagra = ejecuta el controler perfil de backend. Aca puede tener un problema por la demora en extraer esa info que es la que cuando esta presente permite que renderice el componente. Por eso, ANTES, en la llamada al backend al controler autenticar desde Login.jsx, en lugar de solo generar el jwt - ir a Login.jsx setear token en localStorage debemos Cambiar la respuesta del back y que no sea solo el token sino la info que guardabamos en auth.

//Es decir, desde el mismo Login.jsx estamos guardando la respuesta del back en setAuth. Lo que antes haciamos cuando Login redireccionaba a '/' y ahi se ejecuta authProvider quien tambien hace la misma peticion. Pero al no esperar a que Provider haga la peticion sino que ya viene desde Login los datos, pues se puede renderizar.
