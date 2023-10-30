import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const Tabela = ({ vetor, onRemover, onAtivar, onInativar }) => {
    const [statusClientes, setStatusClientes] = useState({});

    const openMenu = (userId) => {
        setStatusClientes((prevStatus) => ({
            ...prevStatus,
            [userId]: 'show',
        }));
    };

    const closeMenu = (userId) => {
        setStatusClientes((prevStatus) => ({
            ...prevStatus,
            [userId]: 'hidden',
        }));
    };

    return (
        <>

            <table className='tb-cliente' cellPadding="0" cellSpacing="0" border="0">
                <div className="tbl-header">
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
                </div>
                <div className="tbl-content">
                    <tbody>
                        {vetor.map((cliente) => (
                            <tr key={cliente.nomeUser}>
                                <td>{cliente.idUser}</td>
                                <td>{cliente.login}</td>
                                <td>{cliente.nomeUser}</td>
                                <td>{cliente.emailCliente}</td>
                                <td>
                                    <Link to={`/cadArquivo/${cliente.idUser}`}><i className='bx bx-link'></i></Link>
                                </td>
                                <td>
                                    <div className="options"
                                        onMouseOver={() => openMenu(cliente.idUser)}
                                        onMouseOut={() => closeMenu(cliente.idUser)}>
                                        <span className="options-trigger">
                                            {statusClientes[cliente.idUser] === 'show' ? <i className="bx bx-x"></i> : <i className="bx bx-dots-horizontal-rounded"></i>}
                                        </span>
                                        <ul className={`menu-options ${statusClientes[cliente.idUser] === 'show' ? 'show' : ''}`}>
                                            <li onClick={() => onRemover(cliente.idUser)} className='link-li'>Deletar</li>
                                            <li><Link to={`/alterarCliente/${cliente.idUser}`} className='link-li'>Alterar</Link></li>
                                            {cliente.isEnabled === 'Ativo' ? (
                                                <li onClick={() => onAtivar(cliente.idUser, 'Inativar')} className="link-li">
                                                    Inativar
                                                </li>
                                            ) : (
                                                <li onClick={() => onInativar(cliente.idUser, 'Ativar')} className="link-li">
                                                    Ativar
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </div>
            </table>
        </>
    );
};

export default Tabela;