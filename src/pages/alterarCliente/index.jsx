import "../../assets/style.css"
import Sidebar from "../../components/Sidebar";
import Input from '../../components/Input';
import Button from '../../components/Button';
import LinkButton from '../../components/Link-Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

const AlterarCliente = () => {
    const { idUser } = useParams();
    // Estado para os campos do formulário
    const [nomeUser, setNomeUser] = useState("");
    const [emailCliente, setEmailCliente] = useState("");
    const [login, setLogin] = useState("");
    const [senhaUser, setSenhaUser] = useState("");
    const [pastaCliente, setPastaCliente] = useState("");

    // useEffect para carregar os dados do cliente
    const carregarCliente = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`https://app.compreagua.com.br/cliente/carregar/${idUser}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
    
            if (!response.ok) {
                throw new Error(`Erro ao carregar cliente: ${response.status}`);
            }
    
            const retorno_convert = await response.json();
    
            // Define os estados com os valores obtidos da API
            setNomeUser(retorno_convert.nomeUser);
            setEmailCliente(retorno_convert.emailCliente);
            setLogin(retorno_convert.login);
            setSenhaUser(retorno_convert.senhaUser);
            setPastaCliente(retorno_convert.pastaCliente);
        } catch (error) {
            console.error('Error fetching cliente:', error.message);
        }
    };
    
    // Uso do useEffect
    useEffect(() => {
        carregarCliente();
    }, []);

    // Função para lidar com a submissão do formulário
    const alterar = () => {
        const dadosAtualizados = {
            idUser,
            nomeUser,
            emailCliente,
            login,
            senhaUser,
            pastaCliente,
            role: "USER"
        };

        const token = localStorage.getItem('token');
        fetch(`https://app.compreagua.com.br/cliente/alterar/${idUser}`, {
            method: 'PUT',
            body: JSON.stringify(dadosAtualizados),
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if (response.status === 422) {
                return response.json().then(data => {
                    toast.error(data.message);
                    carregarCliente();
                });
            } else if (response.status === 200) {
                toast.success('Operação realizada com sucesso!');
                return response.json();
            } else {
                console.error(`Erro na requisição: ${response.status} ${response.statusText}`);
                toast.error('Erro na requisição');
                // Pode adicionar tratamento para outros status aqui, se necessário
            }
        })
        .catch(error => {
            console.error(`Erro na requisição: ${error.message}`);
            toast.error(`Erro na requisição: ${error.message}`);
        });
    }



    return (
        <>

            <Sidebar page="Alterar cliente" />
            <ToastContainer />
            < div className="Main-cadC">
                <form className="Form">
                    <div className="input-cad">
                        <Input placeholder="Nome" label="Nome" name="nomeUser" eventoTeclado={e => setNomeUser(e.target.value)} obj={nomeUser} />
                    </div>
                    <div className="input-cad">
                        <Input className="input-cad" placeholder="Email" name="emailCliente" label="Email" eventoTeclado={e => setEmailCliente(e.target.value)} obj={emailCliente} />

                    </div>
                    <div className="input-cad">
                        <Input className="input-cad" placeholder="Nome de Usuario" name="login" label="Nome de Usuario" eventoTeclado={e => setLogin(e.target.value)} obj={login} />

                    </div>

                    <div className="input-cad">
                        <Input className="input-cad" placeholder="Pasta" label="Pasta" name="pastaCliente" eventoTeclado={e => setPastaCliente(e.target.value)} obj={pastaCliente} />
                    </div>
                    <div className="button">
                        <Button nome="Alterar" classname="Alterar" funcao={alterar} />
                        <LinkButton nome="Voltar" classname="Voltar" link="/listCliente" />
                    </div>
                </form>

            </div>

        </>
    )
}

export { AlterarCliente };