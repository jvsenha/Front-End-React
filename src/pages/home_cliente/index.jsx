import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import TabelaCliente from "../../components/TabelaCliente";
import "../../assets/style.css";

const HomeCliente = () => {
  const [arquivos, setArquivos] = useState([]);
  const [pastaCliente, setPastaCliente] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Busca dados do usuário para obter o nome da pasta
        const responseDadosUser = await fetch('http://localhost:8080/auth/dadosUser', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (responseDadosUser.ok) {
          const dadosUser = await responseDadosUser.json();
          const pastaCliente = dadosUser.pastaCliente;

          // Realiza chamada à API para listar arquivos usando o nome da pasta
          const responseListarArquivos = await fetch(`http://localhost:8000/listarArquivos/${pastaCliente}`, {
            method: 'GET',
            headers: {
              'Content-type': 'application/json',
            },
          });

          if (responseListarArquivos.ok) {
            const data = await responseListarArquivos.json();
            const fileResponses = data; // Não precisa usar data.responses, pois o retorno já é o array de arquivos

            // Atualiza o estado arquivos
            setArquivos(fileResponses);
          } else {
            throw new Error('Erro ao obter dados do usuário.');
          }
        }
      } catch (error) {
        console.error('Erro ao buscar documentos', error);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

  return (
    <>
      <Navbar />
      <section className="main-cliente">
        <section className="section-header">
          <h1 className="Title">Arquivo</h1>
        </section>
        <section className="table">
          <TabelaCliente vetor={arquivos} />
        </section>
      </section>
    </>
  );
};

export { HomeCliente };
