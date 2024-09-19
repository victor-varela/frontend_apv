import { Outlet, Navigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useAuth from "../hooks/useAuth";

const RutaProtegida = () => {
  const { auth, cargando } = useAuth();
  
  if (cargando) return 'Cargando...';
 
  return (
    <>
      <Header />
      {auth?._id ? (
        <main className="container mx-auto px-4 pt-64 lg:pt-40">
          <Outlet />
        </main>
      ) : <Navigate to={"/"} />}
      <Footer />
    </>
  );
};

export default RutaProtegida;

//Este es el componente padre de las rutas protegidas por ello usamos la informacion de useAuth para validar si el user esta autenticado. Si esta autenticado va a tener acceso al outlet, es decir, a todos lo hijos de esta ruta. Usamos el custom hook useAuth porque asi es como EXTRAMEOS la info del CONTEXT, ahi tenemos la informacion de autenticacion.

//Al depender de una peticion al servidor, debemos declarar un state cargando en AUTHPROVIDER para asegurarnos de que una vez que culmino la peticion nos traiga el resultado. Si no hacemos eso, lo que va a pasar es que siempre va a estar como objeto vacio la variable auth porque no espera el resultado de la peticion y es al final de ese codigo donde seteamos auth con la respuesta del servidor.En este ejemplo, lo dicho anteriormente no funciona tambien ya que hay que actualizar la variable auth desde el backend-- investigar mejor---

//Navigate de react-router-dom es quien redirecciona al user. Lo usamos para el render segun cumpla la condicion de autenticado o no. Si no esta autenticado lo enviamos a '/' login. -->> si esta autenticado renderiza Outlet (los hijos de ruta protegida) sino va a login

//OJO: para que renderice este componente el objeto auth debe estar lleno. Por ello en el backend debemos ya incluir las propiedades de este objeto.
