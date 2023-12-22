import React, { useEffect, useState, useMemo } from "react";
import Navbar from "../../components/Navbar";
import Search from '../../components/Search';
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

  const [busca, setBusca] = useState('');

  const arquivosFiltrados = useMemo(() => {
    const lowerBusca = busca.toLowerCase().trim();
    return arquivos.filter(
      (arquivo) =>
      arquivo.name.toLowerCase().trim().includes(lowerBusca)
    );
  }, [busca, arquivos]);
  
  const downloadFile = async (fileId, nomeDocumento) => {
    try {
        const response = await fetch(`http://localhost:8000/download/${fileId}/${nomeDocumento}`, {
            method: 'GET',
        });


        if (response.ok) {
            // Aqui você pode tratar a resposta, como salvar o arquivo ou exibir uma mensagem ao usuário
            // No exemplo abaixo, estamos salvando o arquivo com o nome fornecido pelo servidor
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = nomeDocumento; // Use o nome do arquivo fornecido
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } else {
            console.error('Erro ao baixar o arquivo:', response.statusText);
            // Aqui você pode tratar o erro, como exibir uma mensagem de erro ao usuário
        }
    } catch (error) {
        console.error('Erro ao baixar o arquivo:', error);
        // Trate erros de rede ou exceções aqui, se necessário
    }
};

  return (
    <>
      <Navbar />
      <section className="main-cliente">
        <section className="section-header">
          <h1 className="Title">Arquivo</h1>
          <Search funcao={(ev) => setBusca(ev.target.value)} value={busca} />
        </section>
        <section className="table">
          <TabelaCliente vetor={arquivosFiltrados} onDownload={downloadFile} />
        </section>
      </section>
    </>
  );
};

export { HomeCliente };
