import { useEffect, useMemo, useState } from "react";
import Logo from "../../assets/Imagens/logotipo_grupo_engerb_base_site_branca.webp";
import { Link } from 'react-router-dom';
import "./style.css";


const Navbar = ({ placeholder, label, eventoTeclado, name, obj }) => {
  const token = localStorage.getItem('token');
  const [nome, setNome] = useState(null);
  const [username, setUsername] = useState(null);
  const [idUser, setIdUser] = useState(null);

  useEffect(() => {
    const fetchDados = async (token) => {
      try {
        const response = await fetch("http://localhost:8080/auth/dadosUser", {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const retorno_convert = await response.json();
          setNome(retorno_convert.nomeUser);
          setUsername(retorno_convert.login);
          setIdUser(retorno_convert.idUser);
        } else {
          throw new Error('Erro ao obter os dados do usuário.');
        }
      } catch (error) {
        console.error('Erro ao fazer a solicitação:', error);
      }
    };

    fetchDados(token);

    
 }, [token]);
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
          localStorage.clear();
          window.location.href = 'http://localhost:3000/'; // Ou use o roteamento do React, se aplicável
        } else {
          throw new Error('Erro ao fazer logout.');
        }
      })
      .catch(error => {
        alert(error.message);
      });
  }

  
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };
  return (
    <>
      <link href="https://cdn.jsdelivr.net/npm/boxicons@2.1.0/css/boxicons.min.css" rel="stylesheet" />

      <nav className="nav">
      <Link to={"http://localhost:3000/homeclt"}>
      <img className="img-nav" src={Logo} alt="" />
      </Link>
        <div className="div_icons">
          <button className="button-nav" onClick={logout}>
            <i className=' bx-nav bx bx-log-out'></i>
          </button>
          <button className="button-nav" onClick={logout}>
            <i className='bx-nav bx bxs-bell'></i>
          </button>
          <div className="dropdown">
            <button className="button-nav" onClick={toggleDropdown}>
              <i className='bx-nav bx bxs-cog'></i>
            </button>
            {dropdownVisible && (
              <div className="dropdown-content">
                {/* Dropdown content here */}
                <Link to={`/configuracoesCliente/${idUser}`}>Configurações</Link>
                <Link to={"/alterarSenha/"}>Alterar a Senha</Link>
                {/* Add more links as needed */}
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;