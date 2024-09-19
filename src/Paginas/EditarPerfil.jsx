import { useEffect, useState } from "react";
import AdminNav from "../components/AdminNav";
import useAuth from "../hooks/useAuth";
import Alerta from "../components/Alerta";

const EditarPerfil = () => {
  const { auth, actualizarPerfil} = useAuth();
  const [perfil, SetPerfil] = useState({
    nombre:'',
    telefono:'',
    web:'',
    email:''
  });

  const [alerta, setAlerta] = useState({});

  //AL cargar el componente llena los campos del formulario con la data de auth
  useEffect(()=>{
    SetPerfil(auth)
  },[auth])
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { nombre, email } = perfil;

    if ([nombre, email].includes("")) {
      setAlerta({msg:'Email y Nombre son obligatorios', error:true})
      return;
    }

    const resultado = await actualizarPerfil(perfil) 
    setAlerta(resultado)
  };

  const {msg} = alerta

  return (
    <>
      <AdminNav />
      <h2 className="font-black text-3xl uppercase text-center mt-10">
        Editar Perfil
      </h2>
      <p className="text-xl text-center mt-5 mb-10">
        Modifica tu{" "}
        <span className="text-indigo-600 font-bold">Informacion aqui</span>
      </p>
      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
        {msg && <Alerta alerta={alerta} />}

          <form onSubmit={handleSubmit}>
            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">
                Nombre
              </label>
              <input
                type="text"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="nombre"
                value={perfil.nombre || ""}
                onChange={(e) =>
                  SetPerfil({
                    ...perfil,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">
                Sitio Web
              </label>
              <input
                type="text"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="web"
                value={perfil.web || ""}
                onChange={(e) =>
                  SetPerfil({
                    ...perfil,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">
                Telefono
              </label>
              <input
                type="text"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="telefono"
                value={perfil.telefono || ""}
                onChange={(e) =>
                  SetPerfil({
                    ...perfil,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">Email</label>
              <input
                type="email"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="email"
                value={perfil.email || ""}
                onChange={(e) =>
                  SetPerfil({
                    ...perfil,
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

export default EditarPerfil;

//Nos servimos del state UseAuth para tener la informacion del usuario logeado.

//Creamos un objeto 'temporal' con la informacio a editar del usuario y luego lo reemplazamos en el state

//Creamos un state Local para los campos del formulario y asi podemos servirnos del 'onchange'. Cuando tengamos todos los campos es que vamos a modificar el state del CONTEXT- Con la tecnica del [nombre del input igual al nombre del campo en el objeto] podemos asignar el valor de e.target.value

//Cuando llamamos a actualizarPerfil, esta funcion envia los datos hacia el back - en el back, luego de verificar si existe el id, actualiza los campos y luego GUARDA en la BASE DE DATOS. ES AHI CUANDO SE SINCRONIZA LA BD CON EL STATE AUTH, ya que al cargar el componente llena el formulario con la info de auth

//La funcion actualizarPerfil que retorna?? retorna un objeto con el formato de alerta. Por eso lo guardamos en una variable y se la pasamos al componente alerta para que se muestre en la UI 

//Debido a que actualizarPerfil es una funcion asincrona {lo puedes ver en el provider, ya que comunica front y back} en éste componente debe tener el AWAIT para que el codigo espere la ejecucion de la funcion
