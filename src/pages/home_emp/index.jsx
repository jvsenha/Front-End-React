import React, { useEffect, useState} from 'react';
import '../../assets/style.css';
import Sidebar from "../../components/Sidebar"
import ListaReset from "../../components/ListaReset"


const HomeEmp = () => {
    const [clientes, setClientes] = useState([]);
    const token = localStorage.getItem('token');

    
  useEffect(() => {
        const fetchReset = async () => {
            try {
                const response = await fetch('http://localhost:8080/cliente/listarReset', {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
  
                if (response.ok) {
                    const data = await response.json();
                    const updatedReset= data.map((cliente) => {
                        return {
                            idUser: cliente.idUser,
                            login: cliente.login,
                            nomeUser: cliente.nomeUser,
                            reset: cliente.reset
                        };
                    });
                    setClientes(updatedReset);
                }
            } catch (error) {
                console.error('Erro ao buscar clientes', error);
            }
        };
  
        fetchReset();
    }, [token]);

    const resetSenha = (login) => {
        try {
            fetch('http://localhost:8080/reset/reset-password', {
                    method: 'POST',
                    body: JSON.stringify({
                        login:login
                    }),
                    headers: {
                        'Content-type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then(retorno => retorno.json())
                .then(retorno_convert => {
                    console.log(login);
                    
                if (retorno_convert.message !== undefined) {
                    alert(retorno_convert.message);
                } else {
                    alert('senha redefinida com sucesso!!');
                }
                });
        } catch (error) {
            console.error('Erro durante o cadastro:', error);
        }
    };


    return (
        <>

            <Sidebar page="Dashboard" />
            <section className="section-reset">
                <section className="main-reset">
                    <div className='teste-div'>
1
                    </div>
                    <div className='solicitacao-div' >
                    <h1 className="Title">
                           Solicitações
                    </h1>
                        <ListaReset vetor={clientes} funcao={resetSenha}/>
                    </div>
                </section >
            </section >
        </>
    )
}

export { HomeEmp };