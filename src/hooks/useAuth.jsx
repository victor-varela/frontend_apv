import { useContext } from "react"; //este hook es quien permite EXTRER los datos. Datos que ya creamos con createContext en el Provider
import AuthContext from "../context/AuthProvider"; //por eso se exporta por separado desde el provider. Permite identificar de CUAL context extraer los datos

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;

//creo que se usa asi para mejor legibilidad. El context ya fue creado en la funcion provider. Una vez creado, se usa el hoook useContext(nombreDelContex) y en los value del provider declaramos las variables, states, funciones disponibles... es algo asi como las clases y tener acceso a sus metodos...

//Este hook retorna todo el objeto que esta en el provider, es decir, todo el Objeto. Ese objeto tiene las propiedades/variables value={
// auth, setAuth}
