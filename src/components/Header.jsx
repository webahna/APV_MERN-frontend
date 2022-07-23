import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"


const Header = () => {

    const {auth, actualizarPerfil} = useAuth()
    const [perfil, setPerfil] = useState({})

    useEffect(() => {
      setPerfil(auth)
    }, [auth])

    const {nombre} = perfil;



    const {cerrarSesion} = useAuth()
    

  return (
    <header className="py-10 bg-indigo-600 ">
        <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
            <h1 className="font-bolg text-2xl text-indigo-200 text-center">Bienvenido, <span className="text-white font-bold">{nombre}!</span></h1>
            <nav className="flex items-center flex-col lg:flex-row gap-4 mt-5 lg:mt-0">
                <Link to='/admin' className="text-white text-sm uppercase font-bold">Pacientes</Link>
                <Link to='/admin/perfil' className="text-white text-sm uppercase font-bold">perfil</Link>
                <button type='button' className="text-red-600 text-3xl uppercase font-bold ml-7" onClick={cerrarSesion}><i class="fa-solid fa-right-from-bracket"></i></button>
            </nav>
        </div>
        
    </header>
  )
}

export default Header