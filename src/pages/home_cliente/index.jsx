import { useEffect, useMemo, useState } from "react";
import Navbar from "../../components/Navbar";
import Search from "../../components/Search";
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
          const pastaCliente = dadosUser.pastaCliente; // Supondo que o nome da pasta esteja em "nomePasta"
          
          // Realiza chamada à API para listar arquivos usando o nome da pasta
          const responseListarArquivos = await fetch(`http://localhost:8000/listarArquivos/${pastaCliente}`, {
            method: 'GET',
            headers: {
              'Content-type': 'application/json',
            },
          });

          if (responseListarArquivos.ok) {
            const data = await responseListarArquivos.json();
            const responseData = await response.json(); // Extrair os dados JSON da resposta
          const fileResponses = responseData.responses;
          if (fileResponses.length > 0) {
            const primeiraResposta = fileResponses[0];
        
            // Crie um novo objeto 'arquivo' com as informações da primeira resposta
            const novoArquivo = {
              idDocumento: primeiraResposta.fileId,
              nomeDocumento: primeiraResposta.fileName,
              tamanhoDocumento: primeiraResposta.fileSize,
              linkDocumento: primeiraResposta.webViewLink,
            };
        
            setArquivos(novoArquivo);
          } else {
            console.error('Erro ao buscar documentos. Resposta HTTP não está OK.');
          }
        } else {
          throw new Error('Erro ao obter dados do usuário.');
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
