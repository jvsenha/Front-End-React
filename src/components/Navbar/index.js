// Navbar.js

import { useEffect, useState } from "react";
import Logo from "../../assets/Imagens/Primus_branca.png";
import { Link } from "react-router-dom";
import "./style.css";

const Navbar = ({ placeholder, label, eventoTeclado, name, obj }) => {
  const [reset, setReset] = useState();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isBellDropdownVisible, setIsBellDropdownVisible] = useState(false);
  const [isCogDropdownVisible, setIsCogDropdownVisible] = useState(false);
  const token = localStorage.getItem('token');
  const [idUser, setIdUser] = useState(null);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const closeMenu = () => {
    setIsMenuVisible(false);
  };

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const response = await fetch("https://app.compreagua.com.br/api.php?action=dadosUser", {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            Authorization: `Bearer ${token}`,
          }
        });
    
        if (response.ok) {
          const retorno_convert = await response.json();
    
          // Verifique se há pelo menos um objeto no array antes de acessar suas propriedades
          if (retorno_convert.length > 0) {
            const primeiroUsuario = retorno_convert[0];
            setReset(primeiroUsuario.reset);
            setIdUser(primeiroUsuario.id_user);
          } else {
            // O array está vazio
            throw new Error('Nenhum dado de usuário encontrado na resposta.');
          }
        } else {
          throw new Error('Erro ao obter os dados do usuário.');
        }
      } catch (error) {
        console.error('Erro ao fazer a solicitação:', error);
      }
    };
    
    fetchDados();
  }, []);

  const logout = () => {
    fetch('https://app.compreagua.com.br/api.php?action=logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        if (response.ok) {
          // Logout bem-sucedido
          localStorage.clear();
          window.location.href = 'https://compreagua.com.br/';
        } else {
          throw new Error('Erro ao fazer logout.');
        }
      })
      .catch(error => {
        alert(error.message);
      });
  };

  const handleBellButtonClick = () => {
    setIsBellDropdownVisible(!isBellDropdownVisible);
    setIsCogDropdownVisible(false);
  };

  const handleCogButtonClick = () => {
    setIsCogDropdownVisible(!isCogDropdownVisible);
    setIsBellDropdownVisible(false);
  };

  const handleDropdownItemClick = (item) => {
    setIsBellDropdownVisible(false);
    setIsCogDropdownVisible(false);
  };

  return (
    <>
      <link
        href="https://cdn.jsdelivr.net/npm/boxicons@2.1.0/css/boxicons.min.css"
        rel="stylesheet"
      />

      <nav className={`nav ${isMenuVisible ? "menu-open" : ""}`}>
        <div className="menu-header">
          <Link to={"/homeclt"}>
            <img className="img-nav" src={Logo} alt="" />
          </Link>
        </div>

        {isMenuVisible && (
          <div className="menu-overlay" onClick={closeMenu}></div>
        )}

        <button className="menu-icon" onClick={toggleMenu}>
          <i className={`bx ${isMenuVisible ? "bx-x" : "bx-menu"}`}></i>
        </button>

        <div className="div_icons">
          <button className="button-nav" onClick={logout}>
            <i className=" bx-nav bx bx-log-out"></i>
          </button>

          <button className="button-nav" onClick={handleBellButtonClick}>
            {reset === 2 ? (
              <>
                <i className={`bx-nav bx bxs-bell bx-tada`}></i>
                {isBellDropdownVisible && (
                  <div className="dropdown-content-hover">
                    <p>
                      <strong>Importante:</strong> Sua senha foi redefinida pelo
                      administrador. Por favor, altere-a para garantir a
                      segurança da sua conta.
                    </p>
                  </div>
                )}
              </>
            ) : (
              <>
                <i className="bx-nav bx bxs-bell"></i>
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
              <i className="bx-nav bx bxs-cog"></i>
            </button>
          </div>

          {isCogDropdownVisible && (
            <div className="dropdown-content">
              <Link
                to={`/configuracoesCliente/${idUser}`}
                onClick={() => handleDropdownItemClick("Configurações")}
              >
                Configurações
              </Link>
              <Link
                to={`/alterarSenha/${idUser}`}
                onClick={() => handleDropdownItemClick("Alterar a Senha")}
              >
                Alterar a Senha
              </Link>
            </div>
          )}
        </div>
      </nav>
      <div className={`menu-container ${isMenuVisible ? "menu-open" : "close-nav"} `}>
        {/* Menu */}
        <div className={`menu ${isMenuVisible ? "menu-open" : ""}`}>
          {/* Menu items are now inside the menu-items-container div */}
          <div className="menu-items-container">
            <Link
              to={`/configuracoesCliente/${idUser}`}
              className="menu-item"
              onClick={closeMenu}
            >
              <i className="bx bx-user"></i>
              <p  className="p-icon">Perfil</p>
            </Link>
            <Link
              to={`/alterarSenha/${idUser}`}
              className="menu-item"
              onClick={closeMenu}
            >
              <i className="bx bx-lock-open-alt"></i>
              <p className="p-icon">Alterar senha</p>
            </Link>
            <Link className="menu-item" onClick={logout}>
              <i className="bx bx-log-out"></i>
              <p  className="p-icon">Sair</p>
            </Link>
            {/* Add more links as necessary */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
