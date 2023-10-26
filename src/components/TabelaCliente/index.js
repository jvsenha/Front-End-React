import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const TabelaCliente = ({ vetor, onRemover }) => {
    const [statusArquivos, setStatusArquivos] = useState({});
  
    return (
      <>
        
          <div className="tbl-header">
            <table className='table-cliente ' cellPadding="0" cellSpacing="0" border="0">
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
            <table className='table-cliente' cellPadding="0" cellSpacing="0" border="0">
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
                      <Link to={arquivo.linkDocumento} target="_blank" rel="noopener noreferrer" className='Link-doc'>
                       Download
                      </Link>
                    </td>
                
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
     
      </>
    );
  };
export default TabelaCliente;
