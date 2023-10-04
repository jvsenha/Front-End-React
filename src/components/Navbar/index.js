import React, { useEffect } from 'react';
import Logo from "../../assets/Imagens/logotipo_grupo_engerb_base_site_branca.webp";
import "./style.css";
import { Link } from 'react-router-dom';

const Navbar = ({page}) => {
    useEffect(() => {
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

    return (
        <>
        
        <link href="https://cdn.jsdelivr.net/npm/boxicons@2.1.0/css/boxicons.min.css" rel="stylesheet" />
        
        
        <div className="sidebar close">
          <div className="logo-details">
            <span className="logo_name"> <img className='logo' src={Logo} alt="" /></span>
          </div>
          <ul className="nav-links">
            <li>
              <a href="#">
                <i className='bx bx-grid-alt' ></i>
                <Link to="/homeemp" className="link_name">Dashboard</Link>
              </a>
              <ul className="sub-menu blank">
                <li><Link to="/homeemp" className="link_name">Dashboard</Link></li>
              </ul>
            </li>
            <li>
              <div className="iocn-link">
                <a href="#">
                  <i className='bx bx-collection' ></i>
                  <span className="link_name">Clientes</span>
                </a>
                <i className='bx bxs-chevron-down arrow' ></i>
              </div>
              <ul className="sub-menu">
                <li><a className="link_name" href="#">Clientes</a></li>
                <li><Link to="/listCliente-emp" >Lista de Clientes</Link></li>
                <li><Link to="/cadCliente-emp" >Cadastrar Cliente </Link></li>
              </ul>
            </li>
            <li>
              <div className="iocn-link">
                <a href="#">
                  <i className='bx bx-book-alt' ></i>
                  <span className="link_name">Arquivos</span>
                </a>
                <i className='bx bxs-chevron-down arrow' ></i>
              </div>
              <ul className="sub-menu">
                <li><a className="link_name" href="#">Arquivos</a></li>
                <li><Link to="/listArquivo-emp" >Lista de Arquivo</Link></li>
                <li><Link to="/cadArquivo-emp" >Cadastrar Arquivos </Link></li>
               
              </ul>
            </li>
            <li>
              <a href="#">
                <i className='bx bx-pie-chart-alt-2' ></i>
                <span className="link_name">Lixeira</span>
              </a>
              <ul className="sub-menu blank">
                <li><a className="link_name" href="#">Lixeira</a></li>
              </ul>
            </li>
            <li>
            <a href="#">
              <i className='bx bx-line-chart' ></i>
              <span className="link_name">Backup</span>
            </a>
            <ul className="sub-menu blank">
              <li><a className="link_name" href="#">Backup</a></li>
            </ul>
          </li>
            <li>
              <div className="iocn-link">
                <a href="#">
                  <i className='bx bx-plug' ></i>
                  <span className="link_name">Plugins</span>
                </a>
                <i className='bx bxs-chevron-down arrow' ></i>
              </div>
              <ul className="sub-menu">
                <li><a className="link_name" href="#">Plugins</a></li>
                <li><a href="#">UI Face</a></li>
                <li><a href="#">Pigments</a></li>
                <li><a href="#">Box Icons</a></li>
              </ul>
            </li>
            <li>
              <a href="#">
                <i className='bx bx-compass' ></i>
                <span className="link_name">Explore</span>
              </a>
              <ul className="sub-menu blank">
                <li><a className="link_name" href="#">Explore</a></li>
              </ul>
            </li>
            <li>
              <a href="#">
                <i className='bx bx-history'></i>
                <span className="link_name">History</span>
              </a>
              <ul className="sub-menu blank">
                <li><a className="link_name" href="#">History</a></li>
              </ul>
            </li>
            <li>
              <a href="#">
                <i className='bx bx-cog' ></i>
                <span className="link_name">Setting</span>
              </a>
              <ul className="sub-menu blank">
                <li><a className="link_name" href="#">Setting</a></li>
              </ul>
            </li>
            <li>
          <div className="profile-details">
            <div className="profile-content">
              
            </div>
            <div className="name-job">
              <div className="profile_name">Prem Shahi</div>
              <div className="job">Web Desginer</div>
            </div>
            <i className='bx bx-log-out' ></i>
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

export default Navbar;