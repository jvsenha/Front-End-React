import { useEffect, useState } from "react";
import Logo from "../../assets/Imagens/logotipo_grupo_engerb_base_site_branca.webp";
import { Link } from 'react-router-dom';
import "./style.css";

const Navbar = ({ placeholder, label, eventoTeclado, name, obj }) => {
  const token = localStorage.getItem('token');
  const [nome, setNome] = useState(null);
  const [username, setUsername] = useState(null);
  const [idUser, setIdUser] = useState(null);
  const [reset, setReset] = useState(null);

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
          setReset(retorno_convert.reset);
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

  const [isBellDropdownVisible, setIsBellDropdownVisible] = useState(false);
  const [isCogDropdownVisible, setIsCogDropdownVisible] = useState(false);

  const handleBellButtonClick = () => {
    setIsBellDropdownVisible(!isBellDropdownVisible);
    // Feche o dropdown de configurações ao abrir o de sino
    setIsCogDropdownVisible(false);
  };

  const handleCogButtonClick = () => {
    setIsCogDropdownVisible(!isCogDropdownVisible);
    // Feche o dropdown de sino ao abrir o de configurações
    setIsBellDropdownVisible(false);
  };

  const handleDropdownItemClick = (item) => {
    console.log(`Item clicado: ${item}`);
    setIsBellDropdownVisible(false);
    setIsCogDropdownVisible(false);
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

          <button className="button-nav" onClick={handleBellButtonClick}>
            {reset === 2 ? (
              <>
                <i className={`bx-nav bx bxs-bell bx-tada`}></i>
                {isBellDropdownVisible && (
                  <div className="dropdown-content-hover">
                    <p><strong>Importante:</strong> Sua senha foi redefinida pelo administrador. Por favor, altere-a para garantir a segurança da sua conta.</p>
                  </div>
                )}
              </>
            ) : (
              <>
                <i className='bx-nav bx bxs-bell'></i>
                {isBellDropdownVisible && (
                  <div className="dropdown-content-hover">
                  <p className="empity">Nenhuma notificação</p>

                  </div>
                )}
              </>
            )}
          </button>

          <div>
            <button className="button-nav" onClick={handleCogButtonClick}>
              <i className='bx-nav bx bxs-cog'></i>
            </button>
          </div>

          {isCogDropdownVisible && (
            <div className="dropdown-content">
              {/* Dropdown content here */}
              <Link to={`/configuracoesCliente/${idUser}`} onClick={() => handleDropdownItemClick('Configurações')}>Configurações</Link>
              <Link to={`/alterarSenha/${idUser}`} onClick={() => handleDropdownItemClick('Alterar a Senha')}>Alterar a Senha</Link>
              {/* Add more links as needed */}
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
