import React, { useEffect, useState, useMemo, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WindowDelete from "../../components/WindowDelete";
import Sidebar from "../../components/Sidebar";
import Search from "../../components/Search";
import Tabela from "../../components/Tabela";
import "../../assets/style.css";

const ListClienteEmp = () => {
  const [clientes, setClientes] = useState([]);
  const [pastas, setPastas] = useState([]);
  const token = localStorage.getItem("token");
  const statusRef = useRef(null);

  const fetchArquivos = async () => {
    try {
      const filesResponse = await fetch(
        "https://app.compreagua.com.br/api.php?action=listarArquivo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (filesResponse.ok) {
        const filesData = await filesResponse.json();
  
        // Retorna um array de objetos { id, name }
        const pastasInfo = filesData.map((pasta) => ({
          id: pasta.id,
          name: pasta.name,
        }));
  
        setPastas(pastasInfo);
  
        // Retorna apenas os IDs das pastas
        return pastasInfo;
      } else {
        throw new Error("Erro ao obter os arquivos.");
      }
    } catch (error) {
      console.error("Erro ao buscar arquivos", error);
    }
  };
  
  const fetchClientes = async () => {
    try {
      const pastaInfo = await fetchArquivos(); // Obtem as informações das pastas
  
      const response = await fetch(
        "https://app.compreagua.com.br/api.php?action=listarCliente",
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.ok) {
        const data = await response.json();
  
        const updatedClientes = [];
  
        for (const cliente of data) {
          try {
            let pastaId = ""; // Valor padrão caso não haja pasta cadastrada
  
            // Verifica se o cliente possui uma pasta cadastrada antes de obter o ID
            if (cliente.pasta_cliente) {
              // Encontra a pasta correspondente no pastasInfo
              const pastaCorrespondente = pastaInfo.find(
                (pasta) => pasta.name === cliente.pasta_cliente
              );
  
              // Se encontrou, atribui o ID da pasta
              if (pastaCorrespondente) {
                pastaId = pastaCorrespondente.id;
              }
            }
  
            updatedClientes.push({
              idUser: cliente.idUser,
              login: cliente.login,
              nomeUser: cliente.nomeUser,
              emailCliente: cliente.emailCliente,
              pasta_cliente: cliente.pasta_cliente,
              pastaId: pastaId, // Adicionando o ID da pasta ao objeto do cliente
              isEnabled: cliente.isEnabled,
            });
  
            // Mostra o pastaId no console
            console.log(`Cliente: ${cliente.nomeUser}, Pasta ID: ${pastaId}`);
          } catch (error) {
            console.error("Erro ao processar cliente:", error);
          }
        }
  
        setClientes(updatedClientes);
      }
    } catch (error) {
      console.error("Erro ao buscar clientes", error);
    }
  };
  
  useEffect(() => {
    fetchClientes();
  }, [token]);

  const mudarStatus = (isEnabled, idUser) => {
    const objEneabled = {
      id_user: idUser,
      is_enabled: isEnabled,
    };

    fetch("https://app.compreagua.com.br/api.php?action=mudarStatus", {
      method: "PUT",
      body: JSON.stringify(objEneabled),
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((retorno_convert) => {
        if (retorno_convert.message !== undefined) {
          toast.success(retorno_convert.message);
        }
        fetchClientes();
      })
      .catch((error) => {
        // Trata erros de requisição
        toast.error(`Erro na requisição: ${error.message}`);
      });
  };

  // REMOVER CLIENTE
  const remover = (userId) => {
    // Utilize o toast para confirmar a ação
    toast.warn(
      <WindowDelete
        confirmAction={() => handleConfirmAction(userId)}
        onCancel={() => toast.error("Ação cancelada!!")}
      />
    );
  };

  const handleConfirmAction = (userId) => {
    const idUserObj = {
      id_user: userId,
    };
    // Remova o cliente aqui se o usuário confirmar
    fetch(`https://app.compreagua.com.br/api.php?action=deletarCliente`, {
      method: "DELETE",
      body: JSON.stringify(idUserObj),
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((retorno) => retorno.json())
      .then((retorno_convert) => {
        toast.success(retorno_convert.message);
        fetchClientes();
      });
  };
  const [busca, setBusca] = useState("");

  const clientesFiltrados = useMemo(() => {
    const lowerBusca = busca.toLowerCase().trim();
    return clientes.filter(
      (cliente) =>
        cliente.nomeUser.toLowerCase().trim().includes(lowerBusca) ||
        cliente.login.toLowerCase().trim().includes(lowerBusca) ||
        cliente.emailCliente.toLowerCase().trim().includes(lowerBusca)
    );
  }, [busca, clientes]);

  const handleAbrirPasta = (pastaId, nomeUsuario) => {
    try {

      console.log(pastaId)
      if (pastaId) {
        const urlDoDrive = `https://drive.google.com/drive/folders/${pastaId}`;

        // Abra a URL em uma nova janela
        window.open(urlDoDrive, "_blank");
        toast.success("Pasta do Google Drive aberta com sucesso!");
      } else {
        toast.error(
          `ID da pasta não encontrado para o usuário ${nomeUsuario}. Não é possível abrir a pasta.`
        );
      }
    } catch (error) {
      console.error("Erro ao abrir a pasta no Google Drive:", error);

      // Exibe uma notificação Toastify em caso de erro ao abrir a pasta
      toast.error("Erro ao abrir a pasta no Google Drive");
    }
  };

  return (
    <>
      <section className="listcliente">
        <ToastContainer />
        <Sidebar page="Lista de Clientes" />
        <section className="Main-listC">
          <section className="header-listC">
            <h1 className="Title">Clientes</h1>
            <Search funcao={(ev) => setBusca(ev.target.value)} value={busca} />
          </section>
          <section className="table">
            <Tabela
              vetor={clientesFiltrados}
              onRemover={remover}
              onAtivar={(userId, isEnabled) => mudarStatus(isEnabled, userId)}
              onInativar={(userId, isEnabled) => mudarStatus(isEnabled, userId)}
              onAbrirPasta={handleAbrirPasta}
            />
          </section>
        </section>
      </section>
    </>
  );
};

export { ListClienteEmp };
