import "../../assets/style.css"
import Navbar from "../../components/Navbar";
import Input from '../../components/Input';
import Button from '../../components/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

const ConfiguracoesCliente = () => {
    
    const { idUser } = useParams();
    // Estado para os campos do formulário
    const [nomeUser, setNomeUser] = useState("");
    const [emailCliente, setEmailCliente] = useState("");
    const [login, setLogin] = useState("");
    const [senhaUser, setSenhaUser] = useState("");
    const [pastaCliente, setPastaCliente] = useState("");

    // useEffect para carregar os dados do cliente
    useEffect(() => {
        const token = localStorage.getItem('token');
        fetch(`http://localhost:8080/cliente/carregar/${idUser}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(retorno => retorno.json())
            .then(retorno_convert => {
                // Define os estados com os valores obtidos da API
                setNomeUser(retorno_convert.nomeUser);
                setEmailCliente(retorno_convert.emailCliente);
                setLogin(retorno_convert.login);
                setSenhaUser(retorno_convert.senhaUser);
                setPastaCliente(retorno_convert.pastaCliente);
            })
            .catch(error => console.error('Error fetching cliente:', error));
    }, [idUser]); // Certifique-se de definir idUser antes de usar neste useEffect

    // Função para lidar com a submissão do formulário
  const alterar = () => {
    // Lógica para enviar os dados atualizados para o servidor
    const dadosAtualizados = {
        idUser: idUser,
        nomeUser,
        emailCliente,
        login,
        senhaUser,
        pastaCliente,
        role: "USER"
    };

    const token = localStorage.getItem('token');
    fetch(`http://localhost:8080/cliente/alterar/${idUser}`, {
        method: 'PUT',
        body: JSON.stringify(dadosAtualizados),
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then(retorno => {
        if (retorno.status === 200) {
            return retorno.json();
        } else {
            return retorno.json().then(errorData => {
                throw new Error(errorData.message || 'Erro desconhecido ao atualizar o cliente.');
            });
        }
    })
    .then(retorno_convert => {
        if (retorno_convert.message !== undefined) {
            toast.success(retorno_convert.message);
        }
    })
    .catch(error => {
        toast.error(error.message);
    });
};


    const voltar = () => {
        // Usando window.history.back() ou window.history.go(-1) para voltar
        window.location.assign("http://localhost:3000/homeclt");
    };

    return (
        <>

            <Navbar></Navbar>

            <ToastContainer />
            < div className="Main-cadC-reset">
                <form className="Form-clt">
                    <div className="input-cad">
                        <Input placeholder="Nome" label="Nome" name="nomeUser" eventoTeclado={e => setNomeUser(e.target.value)} obj={nomeUser} />
                    </div>
                    <div className="input-cad">
                        <Input className="input-cad" placeholder="Email" name="emailCliente" label="Email" eventoTeclado={e => setEmailCliente(e.target.value)} obj={emailCliente} />

                    </div>
                    <div className="input-cad">
                        <Input className="input-cad" placeholder="Login" name="login" label="Nome de Usuario" eventoTeclado={e => setLogin(e.target.value)} obj={login} />

                    </div>

                    <div className="button">
                        <Button nome="Alterar" classname="Alterar" funcao={alterar} />
                        <Button nome="Voltar" classname="voltar" funcao={voltar} />
                    </div>
                    
                </form>

            </div>
        </>
    )
}

export { ConfiguracoesCliente };