import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/axios";
import Swal from 'sweetalert2'
import useAuth from "../hooks/useAuth";

const PacientesContext = createContext()


const PacientesProvider = ({children}) => {
    const {auth} = useAuth()
    const [pacientes, setPacientes] = useState([])
    const [paciente, setPaciente] = useState([])

    useEffect(() => {
        const obtenerPacientes = async () => {
            try {
                const token = localStorage.getItem('token')
                if(!token) return

                const config = {
                    headers: {
                        'Content-Type': "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await clienteAxios('/pacientes', config)
                setPacientes(data)
            } catch (error) {
                console.log(error)
            }
        }
        obtenerPacientes()
    },[auth])


    const guardarPaciente = async (paciente) => {
        
        


        const token = localStorage.getItem('token')
                const config = {
                    headers: {
                        'Content-Type': "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
        if(paciente.id){
            try {
                const {data} = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config)
                const pacientesActualizado = pacientes.map(pacienteState => pacienteState._id === data._id ? data : pacienteState)
                setPacientes(pacientesActualizado)
            } catch (error) {
                console.log(error)
            }
        }else{
            
            try {
                const {data} = await clienteAxios.post('/pacientes', paciente, config)
                const {createdAt, updatedAt, __v, ...pacienteAlmacenado} = data
                setPacientes([pacienteAlmacenado, ...pacientes])
            } catch (error) {
                console.log(error.response.data.msg)
            }
        }
    }


    const setEdicion = (paciente) => {
        setPaciente(paciente)
    }


    const eliminarPaciente = async (id,paciente) =>{
        Swal.fire({
            title: `¿Estas seguro que deseas eliminar?`,
            text: `Si eliminas el paciente ${paciente.nombre}, no podras recuperarlo`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#4e46e5',
            confirmButtonText: 'Eliminar',
            // cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed){
                try {
                 const token = localStorage.getItem('token')
                const config = {
                    headers: {
                        'Content-Type': "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const { data} = await clienteAxios.delete(`pacientes/${id}`,config)
                const pacientesActualizado = pacientes.filter(pacientesState => pacientesState._id !== id)
                setPacientes(pacientesActualizado)
                } catch (error) {
                    console.log(error)
                }
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                  )
            }
        })

        // const confirmar = confirm(`¿Estas seguro que deseas eliminar el paciente ${paciente.nombre}?`)
        // if(confirmar){
        //     try {
        //         const token = localStorage.getItem('token')
        //         const config = {
        //             headers: {
        //                 'Content-Type': "application/json",
        //                 Authorization: `Bearer ${token}`
        //             }
        //         }
        //         const { data} = await clienteAxios.delete(`pacientes/${id}`,config)
        //         const pacientesActualizado = pacientes.filter(pacientesState => pacientesState._id !== id)
        //         setPacientes(pacientesActualizado)
        //     } catch (error) {
        //         console.log(error)
        //     }
        // }
    }


    return(
        <PacientesContext.Provider
            value = {{
                pacientes,
                guardarPaciente,
                setEdicion,
                paciente,
                eliminarPaciente
            }}
        >
            {children}
        </PacientesContext.Provider>
    )
}


export {PacientesProvider}


export default PacientesContext;