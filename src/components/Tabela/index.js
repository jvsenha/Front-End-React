import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const Tabela = ({ vetor, onRemover, onAtivar, onInativar, onAbrirPasta }) => {
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
      <div className="tbl-header">
        <table className='tb-cliente' cellPadding="0" cellSpacing="0" border="0">
          <thead>
            <tr>
              <th>id</th>
              <th>Usuario</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Pasta</th>
              <th>Status</th>
              <th> </th>
            </tr>
          </thead>
        </table>
      </div>
      <div className="tbl-content">
        <table className='tb-cliente' cellPadding="0" cellSpacing="0" border="0">
          <tbody>
            {vetor.map((cliente) => (
              <tr key={cliente.idUser}>
                <td>{cliente.idUser}</td>
                <td className="ellipsis">{cliente.login}</td>
                <td className="ellipsis">{cliente.nomeUser}</td>
                <td className="ellipsis">{cliente.emailCliente}</td>
                <td>
                  <i className='bx bx-link' onClick={() => onAbrirPasta(cliente.pastaId)}></i>
                </td>
                <td>
                  {cliente.isEnabled === 1 ? (
                    <span className='statusAtivo'> Ativo </span>
                  ) : (
                    <span className='statusInativo'> Inativo </span>
                  )}
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
                      {cliente.isEnabled === 1 ? (
                        <li onClick={() => onInativar(cliente.idUser, cliente.isEnabled)} className="link-li">
                          Inativar
                        </li>
                      ) : (
                        <li onClick={() => onAtivar(cliente.idUser, cliente.isEnabled)} className="link-li">
                          Ativar
                        </li>
                      )}
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Tabela;