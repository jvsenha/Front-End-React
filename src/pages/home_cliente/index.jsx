
import React, { useEffect, useState, useMemo } from "react";
import Navbar from "../../components/Navbar";
import Search from "../../components/Search";
import TabelaCliente from "../../components/TabelaCliente";
import "../../assets/style.css";
import axios from 'axios';

const HomeCliente = () => {
  const [arquivos, setArquivos] = useState([]);
  const token = localStorage.getItem("token");
  const [pastaCliente, setPastaCliente] = useState(null);
  const [nome, setNome] = useState(null);
  const [username, setUsername] = useState(null);
  const [idUser, setIdUser] = useState(null);
  const [idPasta, setIdPasta] = useState(null);

  useEffect(() => {
    async function fetchDados(token) {
      try {
        const response = await axios.post(
          fetch = "http://localhost:3000/auth/google",
          
          {
            headers: {
              "Content-type": "application/json",
              "Accept": "application/json",
            },
          }
        );
        if (response.data && response.data.nomeUser) {
          setNome(response.data.nomeUser);
        } else {
          console.error("Propriedade nomeUser não encontrada na resposta do servidor");
        }
        setIdUser(response.data.idUser);
        setPastaCliente(response.data.pastaCliente);

        procurarPasta(response.data.pastaCliente);
      } catch (error) {
        console.error("Erro ao fazer a solicitação:", error);
      }
    }

    async function obterArquivosDoBackend() {
      try {
        const response = await axios.get("http://localhost:3000/listarPasta", {
          params: { pastaCliente: pastaCliente },
        });

        const arquivosDoBackend = response.data;
        setArquivos(arquivosDoBackend);
      } catch (error) {
        console.error("Erro ao obter arquivos do backend:", error);
      }
    }

    async function procurarPasta(pastaCliente) {
      try {
        const response = await axios.get("http://localhost:3000/procurarPasta", {
          params: { pastaCliente: pastaCliente },
        });

        if (response.data && response.data.id) {
          setIdPasta(response.data.id);
          listarArquivos(response.data.id);
          return response.data.id;
        } else {
          console.log("Nenhuma pasta encontrada com o nome especificado.");
          return null;
        }
      } catch (error) {
        console.error("Erro ao procurar a pasta:", error);
        return null;
      }
    }

    async function listarArquivos(idPasta) {
      try {
        const response = await axios.get("http://localhost:8000/listarArquivos", {
          params: { idPasta: idPasta },
        });

        if (response.data && response.data.length > 0) {
          const arquivos = response.data.map((arquivo) => ({
            nome: arquivo.name,
            id: arquivo.id,
            mimeType: arquivo.mimeType,
          }));
          setArquivos(arquivos);
        } else {
          console.log("Nenhum arquivo encontrado na pasta.");
        }
      } catch (error) {
        console.error("Erro ao listar os arquivos na pasta:", error);
      }
    }

    async function start() {
      try {
        const pastaCliente = await fetchDados(token);
        if (pastaCliente) {
          await procurarPasta(pastaCliente);
          await obterArquivosDoBackend();
        }
      } catch (error) {
        console.error("Erro ao iniciar:", error);
      }
    }

    start();
  }, [token, pastaCliente]);

  const [busca, setBusca] = useState("");
  const ArquivosFiltrados = useMemo(() => {
    const lowerBusca = busca.toLowerCase().trim();
    return arquivos.filter((arquivo) => arquivo.nome.toLowerCase().trim().includes(lowerBusca));
  }, [busca, arquivos]);



  return (
    <>
      <Navbar></Navbar>
      <section className="main-cliente">
        <section className="section-header">
          <h1 className="Title">Arquivo</h1>
          <Search funcao={(ev) => setBusca(ev.target.value)} value={busca} />
        </section>
        <section className="table">
          <TabelaCliente vetor={ArquivosFiltrados} />
        </section>
      </section>
    </>
  );
};

export { HomeCliente };
