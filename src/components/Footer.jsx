import logowebanha from '../img/logo-webahna.svg'
const Footer = () => {
  return (
    <footer className="py-10 mt-5">
        <div className="flex flex-col justify-center items-center">
          <p>Creado por:</p>
          <img src={logowebanha} alt="Logo Webahna" width='200px' />
          
        </div>
    </footer>
  )
}

export default Footer