import React, { useEffect, useState, useMemo, useRef } from 'react';
import Sidebar from '../../components/Sidebar';
import Search from '../../components/Search';
import Tabela from '../../components/Tabela'; // Substituí "Tabela" por "Table" no import
import '../../assets/style.css';

const ListClienteEmp = () => {
    const [clientes, setClientes] = useState([]);
    const token = localStorage.getItem('token');
    const statusRef = useRef(null);
    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const response = await fetch('http://localhost:8080/cliente/listarAtivos', {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    const updatedClientes = data.map((cliente) => {
                        const isEnabled = cliente.enabled;
                        const status = isEnabled ? 'Ativo' : 'Inativo'; // Altera a lógica aqui

                        return {
                            idUser: cliente.idUser,
                            login: cliente.login,
                            nomeUser: cliente.nomeUser,
                            emailCliente: cliente.emailCliente,
                            pastaCliente: cliente.pastaCliente,
                            isEnabled: status, // Atribui o valor 'status' a isEnabled
                        };
                    });
                    setClientes(updatedClientes);
                }
            } catch (error) {
                console.error('Erro ao buscar clientes', error);
            }
        };

        fetchClientes();
    }, [token]);

    const mudarStatus = (userId) => {
        const Inativar = { enabled: 'false' };

        fetch(`http://localhost:8080/cliente/updateUser/${userId}`, {
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
                    alert(retorno_convert.message);
                }
                alert('Mudança realizada!');
                fetch("http://localhost:8080/cliente/listarAtivos", {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
                    .then(retorno => retorno.json())
                    .then(retorno_convert => setClientes(retorno_convert));
            });
    };

    // REMOVER CLIENTE
    const remover = (userId) => {
        const resultado = window.confirm("Você tem certeza que deseja continuar?");
        if (resultado === true) {
            fetch(`http://localhost:8080/cliente/remover/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(retorno => retorno.json())
                .then(retorno_convert => {
                    alert(retorno_convert.message);
                    fetch("http://localhost:8080/cliente/listarAtivos", {
                        method: 'GET',
                        headers: {
                            'Content-type': 'application/json',
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    })
                        .then(retorno => retorno.json())
                        .then(retorno_convert => setClientes(retorno_convert));
                });
        } else {
           alert("Ação cancelada!!");
        }
        
    }

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

    return (
        <>
            <section className='listcliente'>

                <Sidebar page="Lista de cliente" />
                <section className="Main-listC">
                    <section className="header-listC">
                        <h1 className="Title">
                            Clientes Ativos
                        </h1>

                        <Search funcao={(ev) => setBusca(ev.target.value)} value={busca} />

                    </section>
                    <section className="table">
                        <Tabela
                            vetor={clientesFiltrados}
                            onRemover={remover}
                            onAtivar={(userId) => mudarStatus(userId, 'Ativar')}
                            onInativar={(userId) => mudarStatus(userId, 'Inativar')}
                        />
                    </section>
                </section>
            </section>
        </>
    );
};

export { ListClienteEmp };
