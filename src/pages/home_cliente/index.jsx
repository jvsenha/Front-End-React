import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import TabelaCliente from "../../components/TabelaCliente";
import "../../assets/style.css";

const HomeCliente = () => {
  const [arquivos, setArquivos] = useState([]);
  const [pastaCliente, setPastaCliente] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api.php?action=dadosUser", {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            Authorization: `Bearer ${token}`,
          }
        });
  
        if (response.ok) {
          const retorno_convert = await response.json();
  
          if (retorno_convert.length > 0) {
            const primeiroUsuario = retorno_convert[0];
            setPastaCliente(primeiroUsuario.pasta_cliente);
  
            const filesResponse = await fetch("http://localhost:8000/api.php?action=listarArquivo", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                pastaCliente: primeiroUsuario.pasta_cliente,
              }),
            });
  
            if (filesResponse.ok) {
              const filesData = await filesResponse.json();
              setArquivos(filesData);
            } else {
              throw new Error('Erro ao obter os arquivos.');
            }
          } else {
            throw new Error('Nenhum dado de usuário encontrado na resposta.');
          }
        } else {
          throw new Error('Erro ao obter os dados do usuário.');
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
        <TabelaCliente vetor={arquivos}/>
        </section>
      </section>
    </>
  );
};

export { HomeCliente };
