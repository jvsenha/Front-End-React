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

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const closeMenu = () => {
    setIsMenuVisible(false);
  };

  const logout = () => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:8080/auth/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          localStorage.clear();
          // Usar roteamento do React, se aplicável
          // Exemplo: history.push("/");
        } else {
          throw new Error("Erro ao fazer logout.");
        }
      })
      .catch((error) => {
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
    console.log(`Item clicado: ${item}`);
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
                to={"/configuracoesCliente/30"}
                onClick={() => handleDropdownItemClick("Configurações")}
              >
                Configurações
              </Link>
              <Link
                to={`/alterarSenha/30`}
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
              to={`/configuracoesCliente/30`}
              className="menu-item"
              onClick={closeMenu}
            >
              <i className="bx bx-user"></i>
              <p  className="p-icon">Perfil</p>
            </Link>
            <Link
              to={`/alterarSenha/30`}
              className="menu-item"
              onClick={closeMenu}
            >
              <i class="bx bx-lock-open-alt"></i>
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
