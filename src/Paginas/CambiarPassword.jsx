import { useState } from "react";
import useAuth from "../hooks/useAuth";
import AdminNav from "../components/AdminNav";
import Alerta from "../components/Alerta";

const CambiarPassword = () => {
  const { guardarPassword } = useAuth();
  const [alerta, setAlerta] = useState({});
  const [password, setPassword] = useState({
    password: "",
    new_password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Validamos que no esten vacios los campos
    if (Object.values(password).some((key) => key === "")) {
      setAlerta({ msg: "Todos los campos son obligatorios", error: true });
      return;
    }

    //Validamos longitud de nuevo password
    const { new_password } = password;

    if (new_password.length < 6) {
      setAlerta({
        msg: "El password debe tener al menos 6 caracteres",
        error: true,
      });
      return;
    }

    setAlerta({});

    //Llamamos la funcion del provider
    const resultado = await guardarPassword(password);
    setAlerta(resultado);
    setTimeout(() => {
      setAlerta({});
    }, 3000);
  };

  const { msg } = alerta;
  return (
    <>
      <AdminNav />
      <h2 className="font-black text-3xl uppercase text-center mt-10">
        Cambiar Password
      </h2>
      <p className="text-xl text-center mt-5 mb-10">
        Modifica tu{" "}
        <span className="text-indigo-600 font-bold">password aqui</span>
      </p>
      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
          {msg && <Alerta alerta={alerta} />}

          <form onSubmit={handleSubmit}>
            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">
                Password Actual
              </label>
              <input
                type="password"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="password"
                placeholder="Escribe tu password actual"
                onChange={(e) =>
                  setPassword({
                    ...password,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">
                Nuevo Password
              </label>
              <input
                type="password"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="new_password"
                placeholder="Escribe tu nuevo password"
                onChange={(e) =>
                  setPassword({
                    ...password,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>

            <input
              type="submit"
              value={"Guardar Cambios"}
              className="bg-indigo-600 py-3 px-10 w-full text-white font-bold uppercase mt-5 rounded-lg hover:bg-indigo-700 cursor-pointer"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default CambiarPassword;

//La separacion de funciones dicta que para guardarPassword se debe: llamar la funcion en el componente {es una funcion de 'comunicacion' de front-back}-- esta funcion ejecuta la logica en el componente provider correspondiente, {es una funcion de comunicacion de back a BD}
