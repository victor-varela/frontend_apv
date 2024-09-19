import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Header = () => {

  const {cerrarSesion} = useAuth();
  return (
    <header className="bg-indigo-600 py-10 fixed w-full">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row justify-between items-center">
        <h1 className=" text-center text-indigo-200 font-bold text-2xl">
          Administrador de pacientes de{" "}
          <span className="text-white font-black">Veterinaria</span>
        </h1>
        <nav className=" flex flex-col items-center lg:flex-row gap-4 mt-5 lg:mt-0">
          <Link
            className="text-white text-sm uppercase font-bold"
            to={"/admin"}
          >
            Pacientes
          </Link>
          <Link
            className="text-white text-sm uppercase font-bold"
            to={"/admin/perfil"}
          >
            Perfil
          </Link>
          <button
            className="text-white text-sm uppercase font-bold"
            type="button"
            onClick={cerrarSesion}
          >
            Cerrar Sesion
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
