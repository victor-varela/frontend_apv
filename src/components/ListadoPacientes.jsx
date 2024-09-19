import usePacientes from "../hooks/usePacientes"
import Paciente from "./Paciente"

const ListadoPacientes = () => {
  const { pacientes } = usePacientes()
  
  
  return (
    <>
        {pacientes.length ? 
        (
          <>
            <h2 className="text-3xl font-black text-center">Listado de Pacientes</h2>
              <p className="text-xl mb-10 text-center mt-14 xl:mt-5">Administra tus {''}
                <span className="text-indigo-600 font-bold">Pacientes y citas</span>
              </p>
            {pacientes.map(paciente =>(
              <Paciente 
                key={paciente._id}
                paciente={paciente}
              />
            ))}
          </>
        )
        : 
        (
          <>
            <h2 className="text-3xl font-black text-center">No Hay Pacientes</h2>
              <p className="text-xl mt-5 mb-10 text-center">Agrega tus pacientes y {' '}
                <span className="text-indigo-600 font-bold">Administralos</span>
              </p>
          </>
          
        )}
    </>
  )
}

export default ListadoPacientes

//Usamos el hook usePacientes para obtener los datos de los pacienes que se renderizan en este componente
//Ya que los pacientes estan en context los podemos acceder con su custom hook-- es la ventaja de context--
//Tenemos una coleccion {pacientes} se recomienda crear un nuevo componente para mostrar los resultados
//Usamos la instancia de pacientes para iterarlo y asi llamar al componente se usa parentesis en el map porque estamos retornando un componente completo. Cuando iteramos en JSx requerimos un key ( usamos el generado por mongoDb)