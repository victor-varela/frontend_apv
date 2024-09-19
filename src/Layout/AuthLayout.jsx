import { Outlet } from "react-router-dom"; //aca sustituye el componente en App.jsx - va junto a la prop index {que es la PRIMER pagina luego del componente padre {AuthLayout}}
const AuthLayout = () => {
  return (
    <>
      <main className="container md:grid md:grid-cols-2 mt-12 mx-auto gap-12 px-7 items-center">
        <Outlet />
      </main>
    </>
  );
};

export default AuthLayout;
