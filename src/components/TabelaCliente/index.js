import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";

const TabelaCliente = ({ vetor }) => {
  return (
    <>
      <div className="tbl-header">
        <table
          className="tb-cliente"
          cellPadding="0"
          cellSpacing="0"
          border="0"
        >
          <thead>
            <tr>
              <th>Nome do Documento</th>
              <th>Tamanho do Documento</th>
              <th>Link</th>
              <th> </th>
            </tr>
          </thead>
        </table>
      </div>
      <div className="tbl-content">
        <table
          className="tb-cliente"
          cellPadding="0"
          cellSpacing="0"
          border="0"
        >
          <tbody>
            {vetor.map((arquivo) => (
              <tr key={arquivo.id}>
                <td className="ellipsis">{arquivo.name}</td>
                <td className="ellipsis">{arquivo.size}</td>
                <td>
                  <Link
                    to={arquivo.webViewLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="Link-doc"
                  >
                    Visualizar Documento
                  </Link>
                </td>
                <td>
                  <a href={arquivo.LinkDownload} download className="Link-doc">
                    Download
                  </a>
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
