import {Link, useNavigate} from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import {useState} from 'react';
import Alerta from "../components/Alerta";
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alerta, setAlerta] = useState({})

    const {setAuth} = useAuth()

    const navigate = useNavigate()
    

    const handleSubmit = async e => {
        e.preventDefault()
        if([email,password].includes('')){
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Hay campos vacios',
                showConfirmButton: false,
                timer: 2500

              })
            // setAlerta({ msg: 'Hay campos vacios', error: true })
            return
        }
        
        try {
            const {data} = await clienteAxios.post('/veterinarios/login', {email,password});
            
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Iniciando sesion...',
                showConfirmButton: false,
                timer: 2000

              })
            // setAlerta({
            //     msg: 'Iniciando sesion... '
            // })

            localStorage.setItem('token', data.token)
            setAuth(data)
            setTimeout(() => {
                navigate('/admin');
            }, 2000);
            location.reload();
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error:true
            })
        }


    }


const {msg} = alerta;

  return (
    <>

        <div>
            <h1 className='text-indigo-600 font-black text-6xl'>Inicia Sesión y Administra tus {""}<span className='text-black'>Pacientes</span></h1>
        </div>
        <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
            {msg && <Alerta 
                alerta = {alerta}
            />}

            <form onSubmit={handleSubmit}>
                <div className='my-5'>
                    <label className=' text-gray-600 block text-xl font-bold'>Email</label>
                    <input type="email" 
                    placeholder='Email'
                    className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
                    value = {email}
                    onChange= {e => setEmail(e.target.value)}
                    />
                </div>
                <div className='my-5'>
                    <label className=' text-gray-600 block text-xl font-bold'>Contraseña</label>
                    <input type="password" 
                    placeholder='Contraseña'
                    className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
                    value = {password}
                    onChange= {e => setPassword(e.target.value)}
                    />
                </div>
                <input type="submit" 
                value="Iniciar Sesión"
                className='bg-indigo-700 w-full py-3 px-10 rounded-xl text-white font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto '
                />
            </form>
            <nav className='mt-10 lg:flex lg:justify-between'>
                <Link to="/registrar" className='block text-center my-5 text-gray-500'>¿No tienes una cuenta? Registrate</Link>
                <Link to="/olvide-password" className='block text-center my-5 text-gray-500'>Olvide mi contraseña</Link>
            </nav>
        </div>
        
    </>
  )
}

export default Login;