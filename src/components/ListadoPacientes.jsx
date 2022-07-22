import usePacientes from "../hooks/usePacientes"
import Paciente from "./Paciente"


const ListadoPacientes = () => {

  const {pacientes} = usePacientes()


  return (
    <>
      {pacientes.length ? (
        <>
          <p className=" text-xl mb-10 text-center"> Administra tus pacientes y citas</p>


          {pacientes.map(paciente => ( 
            <Paciente
              key={paciente._id}
              paciente={paciente}
            />
          ))}
        </>
      ) : (
        <>
          <p className=" text-xl mt-5 mb-10 text-center"> Comienza agregando pacientes y apareceran aqui</p>

          
        </>
      )}
    </>
  )
}

export default ListadoPacientes