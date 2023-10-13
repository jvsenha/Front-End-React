import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const Table = ({ vetor, onRemover, onAlterar }) => {
    const [openMenus, setOpenMenus] = useState({}); // Estado para controlar os menus abertos

    const openMenu = (id) => {
        setOpenMenus((prevOpenMenus) => ({
            ...prevOpenMenus,
            [id]: true, // Abrir o menu quando o mouse passar sobre o ícone
        }));
    };

    const closeMenu = (id) => {
        setOpenMenus((prevOpenMenus) => ({
            ...prevOpenMenus,
            [id]: false, // Fechar o menu quando o mouse sair do ícone
        }));
    };

    return (
        <>
            <section className="section-table">
                <div className="tbl-header">
                    <table cellPadding="0" cellSpacing="0" border="0">
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Usuario</th>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Pasta</th>
                                <th> </th>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div className="tbl-content">
                    <table cellPadding="0" cellSpacing="0" border="0">
                        <tbody>
                            {vetor.map((obj, indice) => (
                                <tr key={indice}>
                                    <td>{obj.idUser}</td>
                                    <td>{obj.login}</td>
                                    <td>{obj.nomeUser}</td>
                                    <td>{obj.emailCliente}</td>
                                    <td>
                                    <i class='bx bx-link'></i>
                                    </td>
                                    <td>
                                        <div className="options"
                                            onMouseOver={() => openMenu(obj.idUser)} // Abrir o menu quando o mouse passar sobre o ícone
                                            onMouseOut={() => closeMenu(obj.idUser)}>
                                            <span className="options-trigger" >
                                                {openMenus[obj.idUser] ? <i className="bx bx-x"></i> : <i className="bx bx-dots-horizontal-rounded"></i>}
                                            </span>
                                            <ul className={`menu-options ${openMenus[obj.idUser] ? 'show' : ''}`}>
                                                <li onClick={() => onRemover(obj.idUser)} className='link-li'>Deletar</li>
                                                <li><Link to={`/alterarCliente/${obj.idUser}`} className='link-li'>Alterar</Link></li>
                                            </ul>
                                        </div>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    );
};

export default Table;
