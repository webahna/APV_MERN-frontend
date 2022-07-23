import { Link, useNavigate } from "react-router-dom";
import {useState} from 'react';
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";
import Swal from "sweetalert2";


const Registrar = () => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repetirPassword, setRepetirPassword] = useState('');

    const [alerta, setAlerta] = useState({})

    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault()
        if([nombre,email,password,repetirPassword].includes('')){
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Hay campos vacios',
                showConfirmButton: false,
                timer: 1500
              })
            // setAlerta({msg: 'Hay campos vacios', error: true})
            return;
        }

        if(password !== repetirPassword){
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Las contraseñas no coinciden',
                showConfirmButton: false,
                timer: 1500
              })
            // setAlerta({msg: 'Las contraseñas no son iguales', error: true})
            return;
        }
        
        if(password.length < 6){
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'La contraseña debe tener al menos 6 caracteres',
                showConfirmButton: false,
                timer: 2500
              })
            // setAlerta({msg: 'la contraseña es muy corta, agregar minimo 6 caracteres', error: true})
            return;
        }
        setAlerta({})

        // Crear el usuario en la api
        try {
            await clienteAxios.post('/veterinarios', { nombre, email, password })
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Cuenta creada correctamente, revisa tu email',
                showConfirmButton: false,
                timer: 4000

              })
              setTimeout(() => {
                navigate('/');
              }, 4000);
            // setAlerta({
            //     msg: 'Creado Correctamente, revisa tu email',
            //     error: false
            // })
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }


    }

    const {msg} = alerta










  return (
    <>
        <div>
            <h1 className='text-indigo-600 font-black text-6xl'>Crea tu {""} <span className='text-black'>cuenta</span></h1>
        </div>
        <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
            {msg && <Alerta 
                alerta = {alerta}
            />}
            <form onSubmit={handleSubmit}>
                <div className='my-5'>
                    <label className=' text-gray-600 block text-xl font-bold'>Nombre Completo</label>
                    <input type="text" 
                    placeholder='Ej. Alejandro Ramirez Quezada'
                    className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
                    value = {nombre}
                    onChange= {e => setNombre(e.target.value)}
                    />
                </div>
                <div className='my-5'>
                    <label className=' text-gray-600 block text-xl font-bold'>Email</label>
                    <input type="email" 
                    placeholder='Ingresa Email'
                    className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
                    value = {email}
                    onChange= {e => setEmail(e.target.value)}
                    />
                </div>
                <div className='my-5'>
                    <label className=' text-gray-600 block text-xl font-bold'>Contraseña</label>
                    <input type="password" 
                    placeholder='Ingresa contraseña'
                    className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
                    value = {password}
                    onChange= {e => setPassword(e.target.value)}
                    />
                </div>
                <div className='my-5'>
                    <label className=' text-gray-600 block text-xl font-bold'>Confirmar Contraseña</label>
                    <input type="password" 
                    placeholder='Confirmar contraseña'
                    className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
                    value = {repetirPassword}
                    onChange= {e => setRepetirPassword(e.target.value)}
                    />
                </div>
                <input type="submit" 
                value="Crear cuenta"
                className='bg-indigo-700 w-full py-3 px-10 rounded-xl text-white font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto '
                />
            </form>
            <nav className='mt-10 lg:flex lg:justify-between'>
                <Link to="/" className='block text-center my-5 text-gray-500'>¿Ya tienes una cuenta? Inicia sesión</Link>
                <Link to="/olvide-password" className='block text-center my-5 text-gray-500'>Olvide mi contraseña</Link>
            </nav>
        </div>
    </>
  )
}

export default Registrar