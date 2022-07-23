import {useState, useEffect} from 'react';
import Alerta from './Alerta';
import usePacientes from '../hooks/usePacientes';
import Swal from 'sweetalert2'

const Formulario = () => {

    const [nombre, setNombre] = useState('')
    const [propietario, setPropietario] = useState('')
    const [email, setEmail] = useState('')
    const [fecha, setFecha] = useState('')
    const [sintomas, setSintomas] = useState('')
    const [id , setId] = useState(null);

    const [alerta, setAlerta] = useState({})

    const {guardarPaciente, paciente} = usePacientes()
    

    useEffect(() => {
        if(paciente?.nombre){
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setFecha(paciente.fecha)
            setSintomas(paciente.sintomas)
            setId(paciente._id)
        }
    }, [paciente])

    const handleSubmit = (e) => {
        e.preventDefault();

        if([nombre,propietario,email,fecha,sintomas].includes('')){

            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Hay campos vacios',
                showConfirmButton: false,
                timer: 1500
              })
            // setAlerta({
            //     msg: 'Hay campos vacios',
            //     error: true
            // })
            // setTimeout(() => {
            //     setAlerta({
            //         error:false
            //     })
            // },2000)
            return;
        }


        
        guardarPaciente({nombre,propietario,email,fecha,sintomas, id})
        if(id){
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Paciente Editado Correctamente',
                showConfirmButton: false,
                timer: 1500
              })
              return
        }
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Paciente Agregado Correctamente',
            showConfirmButton: false,
            timer: 1500
          })
        // setAlerta({
        //     msg: 'Guardado correctamente',
        //     error: false
        // })
        // setTimeout(() => {
        //     setAlerta({
        //         error: true
        //     })
        // }, 3000);
        setNombre('')
        setPropietario('')
        setEmail('')
        setFecha('')
        setSintomas('')
        setId('')
    }
   






    const {msg} = alerta;
    
  return (
    <>
        <p className="text-xl text-center mb-10 ">
            Añadir nuevo paciente
        </p>
            {msg && <Alerta alerta={alerta}/>}
        <form className="bg-white py-10 px-5 mb-10 lg:mb-0 shadow-md rounded-md" onSubmit={handleSubmit}>
            <div className="mb-5">
                <label
                htmlFor="nombre"
                className="text-gray-700 uppercase font-bold">Mascota</label>
                <input
                id= 'nombre'
                type="text"
                placeholder="Nombre de la mascota"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value= {nombre}
                onChange={e => setNombre(e.target.value)}
                />
            </div>
            <div className="mb-5">
                <label
                htmlFor="propietario"
                className="text-gray-700 uppercase font-bold">Propietario</label>
                <input
                id= 'propietario'
                type="text"
                placeholder="Nombre del propietario"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value= {propietario}
                onChange={e => setPropietario(e.target.value)}
                />
            </div>
            <div className="mb-5">
                <label
                htmlFor="email"
                className="text-gray-700 uppercase font-bold">Email</label>
                <input
                id= 'email'
                type="text"
                placeholder="Email del propietario"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value= {email}
                onChange={e => setEmail(e.target.value)}
                />
            </div>
            <div className="mb-5">
                <label
                htmlFor="fecha"
                className="text-gray-700 uppercase font-bold">Fecha Alta</label>
                <input
                id= 'fecha'
                type="date"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value= {fecha}
                onChange={e => setFecha(e.target.value)}
                />
            </div>
            <div className="mb-5">
                <label
                htmlFor="sintomas"
                className="text-gray-700 uppercase font-bold">Sintomas</label>
                <textarea
                id= 'sintomas'
                placeholder="Describe los sintomas"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value= {sintomas}
                onChange={e => setSintomas(e.target.value)}
                />
            </div>
            <input 
                type="submit" 
                className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer rounded-md transition-colors"
                value={id ? 'Guardar cambios' : 'Agregar paciente'}
            />
        </form>
    </>   
  )
}

export default Formulario