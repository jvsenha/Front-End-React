import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const Tabledoc = ({ vetor, onRemover }) => {
    const [statusArquivos, setStatusArquivos] = useState({});

    const openMenu = (idDocumento) => {
      setStatusArquivos((prevStatus) => ({
        ...prevStatus,
        [idDocumento]: 'show',
      }));
    };
  
    const closeMenu = (idDocumento) => {
      setStatusArquivos((prevStatus) => ({
        ...prevStatus,
        [idDocumento]: 'hidden',
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
                  <th>Usuário</th>
                  <th>Nome do Documento</th>
                  <th>Tamanho do Documento</th>
                  <th>Link</th>
                  <th> </th>
                </tr>
              </thead>
            </table>
          </div>
          <div className="tbl-content">
            <table cellPadding="0" cellSpacing="0" border="0">
              <tbody>
                {vetor.map((arquivo) => (
                  <tr key={arquivo.idDocumento}>
                    <td>{arquivo.idDocumento}</td>
                    <td>{arquivo.usuario.nomeUser}</td>
                    <td>{arquivo.nomeDocumento}</td>
                    <td>{arquivo.tamanhoDocumento}</td>
                    <td>
                      <Link to={arquivo.linkDocumento} target="_blank" rel="noopener noreferrer" className='Link-doc'>
                        Visualizar Documento
                      </Link>
                    </td>
                    <td>
                      <div className="options"
                        onMouseOver={() => openMenu(arquivo.idDocumento)}
                        onMouseOut={() => closeMenu(arquivo.idDocumento)}>
                        <span className="options-trigger">
                          {statusArquivos[arquivo.idDocumento] === 'show' ? (
                            <i className="bx bx-x"></i>
                          ) : (
                            <i className="bx bx-dots-horizontal-rounded"></i>
                          )}
                        </span>
                        <ul className={`menu-options ${statusArquivos[arquivo.idDocumento] === 'show' ? 'show' : ''}`}>
                          <li onClick={() => onRemover(arquivo.idDocumento)} className='link-li'>Deletar</li>
                          <li><Link  className='link-li'>Download </Link></li>
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
export default Tabledoc;
