
import Logo from "../../assets/Imagens/logotipo_grupo_engerb_base_site_branca.webp";
import "./style.css";


const Navbar = ({placeholder,label, eventoTeclado, name, obj}) => {
  return (
    <>
   <nav className="nav">
   <img className="img-nav" src={Logo} alt="" />
   </nav>
    </>
  );
};

export default Navbar;