import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./Layout/AuthLayout";
import RutaProtegida from "./Layout/RutaProtegida";
import Login from "./Paginas/Login";
import Registrar from "./Paginas/Registrar";
import OlvidePassword from "./Paginas/OlvidePassword";
import NuevoPassword from "./Paginas/NuevoPassword";
import ConfirmarCuenta from "./Paginas/ConfirmarCuenta";
import AdministrarPacientes from "./Paginas/AdministrarPacientes";
import EditarPerfil from "./Paginas/EditarPerfil";
import CambiarPassword from "./Paginas/CambiarPassword";

import { AuthProvider } from "./context/AuthProvider";
import { PacientesProvider } from "./context/PacientesProvider";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="olvide-password" element={<OlvidePassword />} />
              <Route path="olvide-password/:token" element={<NuevoPassword />} />
              <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
              <Route path="registrar" element={<Registrar />} />
            </Route>

            <Route path="/admin" element={<RutaProtegida />}>
              <Route index element={<AdministrarPacientes />} />
              <Route path="perfil" element={<EditarPerfil />} />
              <Route path="cambiar-password" element={<CambiarPassword />} />
            </Route>
          </Routes>
        </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

//BrowserRouter tambien se puede importar con un alias {as Router}. Este componente envuelve todas las rutas.

//AuthLayout es el padre y tiene paginas 'asociadas', tiene el DISEÑO PRINCIPAL, es como un contenedor en Css por eso los otros <Route /> dentro de este elemento {agrupa a todos los elementos que son parte del elemento padre y tienen su propio diseño}. Permite ir llamando a los componentes de cada PAGINA PRINCIPAL.

//AuthLayout tiene el componente <Outlet /> el cual se inyecta los hijos de AuthLayout. La ruta "/" es la base (igual que en express) y los hijos tienen en el path='ruta'. React ya sabe, gracias a que esta agrupado con un <Route />, que las rutas o path de los hijos le va a concatenar la ruta base. Asi "/" + 'registrar'.
