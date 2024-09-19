import axios from "axios";

const clienteAxios = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
});

export default clienteAxios;

//BaseUrL tiene el endpoint de las peticiones. se reemplaza en los componentes, es decir, antes estaba asi:
// try {
//     const url = `${import.meta.env.VITE_BACKEND_URL}/api/veterinarios/confirmar/${id}`;

    //esa URL es la que se reemplaza

//     const { data } = await axios(url); //envia la peticion. almacena en data la respuesta del backend- seteamos la varibles a renderizar

        // await for clienteAxios {donde tiene la url}

//     setCuentaConfirmada(true);
//     setAlerta({
//       msg: data.msg,
//     });
//   } catch (error) {
//     setAlerta({
//       msg: error.response.data.msg,
//       error: true,
//     });
//   }


// try {
     //variable de entorno {import.meta.env !=process.env en backend} esta dentro de clienteAxios
//      await clienteAxios.post('/veterinarios', { nombre, email, password });

        //clienteAxios tiene la baseURL, luego .post('/'veterinarios' se concatena a la base, {objeto del post})

//      setAlerta({msg:'Usuaro Creado Correctamente. Revisa tu Email', error: false});
//    } catch (error) {
//      setAlerta({
//        msg: error.response.data.msg,
//        error:true
//      })
//    }
