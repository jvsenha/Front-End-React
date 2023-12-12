import React, { useEffect, useState } from 'react';
import Logo from "../../assets/Imagens/Primus_branca.png";
import "./style.css";
import { Link } from 'react-router-dom';

const Side = ({ page }) => {
  const [nome, setNome] = useState(null);
  const [username, setUsername] = useState(null);
  const [idUser, setIdUser] = useState(null);

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const response = await fetch("http://localhost:8080/auth/dadosUser", {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            
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

    fetchDados();

    const handleArrowClick = (e) => {
      const arrowParent = e.target.parentElement.parentElement; // selecionando o elemento pai principal da seta
      arrowParent.classList.toggle("showMenu");
    };

    const handleSidebarClick = () => {
      const sidebar = document.querySelector(".sidebar");
      sidebar.classList.toggle("close");
    };

    const arrow = document.querySelectorAll(".arrow");
    for (let i = 0; i < arrow.length; i++) {
      arrow[i].addEventListener("click", handleArrowClick);
    }

    const sidebarBtn = document.querySelector(".bx-menu");
    sidebarBtn.addEventListener("click", handleSidebarClick);

    // Remover os ouvintes de evento quando o componente é desmontado
    return () => {
      for (let i = 0; i < arrow.length; i++) {
        arrow[i].removeEventListener("click", handleArrowClick);
      }
      sidebarBtn.removeEventListener("click", handleSidebarClick);
    };
  }, []);

  const logout = () => {
  

    fetch('http://localhost:8080/auth/logout', {
      method: 'POST',
      headers: {
        
      }
    })
      .then(response => {
        if (response.ok) {
          // Logout bem-sucedido
          localStorage.clear();
          window.location.href = 'http://localhost:3000/';
        } else {
          throw new Error('Erro ao fazer logout.');
        }
      })
      .catch(error => {
        alert(error.message);
      });
  };

  return (
    <>
      <link href="https://cdn.jsdelivr.net/npm/boxicons@2.1.0/css/boxicons.min.css" rel="stylesheet" />

      <div className="sidebar close">
        <div className="logo-details">
          <span className="logo_name"> <img className='logo' src={Logo} alt="" /></span>
        </div>
        <ul className="nav-links">
          <li>
            <div className="iocn-link">
              <Link to="/homeemp" className="link_name">
                <i className='bx bx-grid-alt' ></i>
                <span className="link_name">Dashboard</span>
              </Link>
            </div>
            <ul className="sub-menu">
              <li><Link to="/homeemp" className="link_name">Dashboard</Link></li>
            </ul>
          </li>
          <li>
            <div className="iocn-link">
              <Link to="/listCliente">
                <i className='bx bx-list-check'></i>
                <span className="link_name">Clientes</span>
              </Link>
              <i className='bx bxs-chevron-down arrow' ></i>
            </div>
            <ul className="sub-menu">
              <li><Link className="link_name" to="/listCliente">Clientes</Link></li>
            </ul>
          </li>
          <li>
            <Link to="/cadCliente">
              <i className='bx bx-user' ></i>
              <span className="link_name">Cadastrar Cliente </span>
            </Link>
            <ul className="sub-menu blank">
              <li><Link to="/cadCliente" className="link_name" >Cadastrar Cliente </Link></li>
            </ul>
          </li>
          <li>
            <Link to={`/configuracoesAdm/${idUser}`}>
              <i className='bx bx-cog' ></i>
              <span className="link_name">Configurações</span>
            </Link>
            <ul className="sub-menu blank">
              <li><Link className="link_name">Configurações</Link></li>
            </ul>
          </li>
          <li>
            <div className="profile-details">
              <div className="profile-content">
              </div>
              <div className="name-job">
                <div className="profile_name">{nome}</div>
                <div className="job">{username}</div>
              </div>
              <button className='button-side' onClick={logout}>
                <i className='bx bx-log-out' ></i>
              </button>
            </div>
          </li>
        </ul>
      </div>
      <section className="home-section">
        <div className="home-content">
          <i className='bx bx-menu' ></i>
          <span className="text">{page}</span>
        </div>
      </section>
    </>
  );
}

export default Side;
