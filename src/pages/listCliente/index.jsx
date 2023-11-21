import React, { useEffect, useState, useMemo, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WindowDelete from '../../components/WindowDelete';
import Sidebar from '../../components/Sidebar';
import Search from '../../components/Search';
import Tabela from '../../components/Tabela';
import '../../assets/style.css';

const ListClienteEmp = () => {
  const [clientes, setClientes] = useState([]);
  const token = localStorage.getItem('token');
  const statusRef = useRef(null);

  const fetchClientes = async () => {
    try {
      const response = await fetch('https://app.compreagua.com.br/cliente/listarAtivos', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();

        const updatedClientes = [];

        for (const cliente of data) {
          try {
            let pastaId = ''; // Valor padrão caso não haja pasta cadastrada

            // Verifica se o cliente possui uma pasta cadastrada antes de obter o ID
            if (cliente.pastaCliente) {
              const response = await fetch(`https://gapi.compreagua.com.br/obterIdPasta/${cliente.pastaCliente}`);
              if (response.ok) {
                const responseData = await response.json();
                pastaId = responseData.pastaId;
              } else {
                console.error('Erro ao obter ID da pasta:', response.statusText);
              }
            }

            const isEnabled = cliente.enabled;
            const status = isEnabled ? 'Ativo' : 'Inativo';

            updatedClientes.push({
              idUser: cliente.idUser,
              login: cliente.login,
              nomeUser: cliente.nomeUser,
              emailCliente: cliente.emailCliente,
              pastaCliente: cliente.pastaCliente,
              pastaId: pastaId, // Adicionando o ID da pasta ao objeto do cliente
              isEnabled: status,
            });
          } catch (error) {
            console.error('Erro ao processar cliente:', error);
          }
        }

        setClientes(updatedClientes);
      }
    } catch (error) {
      console.error('Erro ao buscar clientes', error);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, [token]);

 


  const mudarStatus = (userId) => {
    const Inativar = { enabled: 'false' };

    fetch(`https://app.compreagua.com.br/cliente/updateUser/${userId}`, {
        method: 'PUT',
        body: JSON.stringify(Inativar),
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    }).then(retorno => retorno.json())
    .then(retorno_convert => {
        if (retorno_convert.message !== undefined) {
            toast.error(retorno_convert.message);
        }
        toast.success('Mudança realizada!');
        fetchClientes();
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
    // Remova o cliente aqui se o usuário confirmar
    fetch(`https://app.compreagua.com.br/cliente/remover/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(retorno => retorno.json())
      .then(retorno_convert => {
        toast.error(retorno_convert.message);
        fetchClientes();
      });
  };
  const [busca, setBusca] = useState('');

  const clientesFiltrados = useMemo(() => {
    const lowerBusca = busca.toLowerCase().trim();
    return clientes.filter(
      (cliente) =>
        cliente.nomeUser.toLowerCase().trim().includes(lowerBusca) ||
        cliente.login.toLowerCase().trim().includes(lowerBusca) ||
        cliente.emailCliente.toLowerCase().trim().includes(lowerBusca)
    );
  }, [busca, clientes]);

  const handleAbrirPasta = (pastaId) => {
    try {
      if (pastaId) {
        const urlDoDrive = `https://drive.google.com/drive/folders/${pastaId}`;
        
        // Abra a URL em uma nova janela
        window.open(urlDoDrive, '_blank');
        toast.success('Pasta do Google Drive aberta com sucesso!');
      } else {
        toast.error('ID da pasta não encontrado. Não é possível abrir a pasta.');
      }
    } catch (error) {
      console.error('Erro ao abrir a pasta no Google Drive:', error);
  
      // Exibe uma notificação Toastify em caso de erro ao abrir a pasta
      toast.error('Erro ao abrir a pasta no Google Drive');
    }
  };
  

  return (
    <>
      <section className='listcliente'>
        <ToastContainer />
        <Sidebar page="Lista de cliente" />
        <section className="Main-listC">
          <section className="header-listC">
            <h1 className="Title">Clientes Ativos</h1>
            <Search funcao={(ev) => setBusca(ev.target.value)} value={busca} />
          </section>
          <section className="table">
            <Tabela
              vetor={clientesFiltrados}
              onRemover={remover}
              onAtivar={(userId) => mudarStatus(userId, 'Ativar')}
              onInativar={(userId) => mudarStatus(userId, 'Inativar')}
              onAbrirPasta={handleAbrirPasta}
            />
          </section>
        </section>
      </section>
    </>
  );
};

export { ListClienteEmp };
