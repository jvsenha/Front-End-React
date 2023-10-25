
import Logo from "../../assets/Imagens/logotipo_grupo_engerb_base_site_branca.webp";
import "./style.css";


const Navbar = ({placeholder,label, eventoTeclado, name, obj}) => {
  const logout = () => {
    const token = localStorage.getItem('token');
  
    fetch('http://localhost:8080/auth/logout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        if (response.ok) {
          // Logout bem-sucedido
          localStorage.removeItem("token");
          window.location.href = 'http://localhost:3000/'; // Ou use o roteamento do React, se aplicável
        } else {
          throw new Error('Erro ao fazer logout.');
        }
      })
      .catch(error => {
        alert(error.message);
      });
  }
  return (
    <>
    <link href="https://cdn.jsdelivr.net/npm/boxicons@2.1.0/css/boxicons.min.css" rel="stylesheet" />

   <nav className="nav">
   <img className="img-nav" src={Logo} alt="" />
   <button className="button-nav" onClick={logout}>
                <i className=' bx-nav bx bx-log-out' ></i>
  </button>
   </nav>
    </>
  );
};

export default Navbar;