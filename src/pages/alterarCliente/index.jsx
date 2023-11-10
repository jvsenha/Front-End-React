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
        .then(response => {
            if (response.status === 422) {
              // Se o status for 422 (Unprocessable Entity), exibe toast.error com a mensagem do backend
              return response.json().then(data => {
                toast.error(data.message);
              });
            } else if (response.status === 200) {
              // Se o status for 200, a operação foi bem-sucedida
              toast.success('Operação realizada com sucesso!');
              return response.json();
            } else {
              // Trate outros status de resposta conforme necessário
              console.error(`Erro na requisição: ${response.status} ${response.statusText}`);
              // Se desejar, exiba um toast.error genérico para outros status
              toast.error('Erro na requisição');
            }
          })
          .catch(error => {
            // Captura qualquer erro ocorrido durante a requisição
            console.error(error);
            // Exibe toast.error com a mensagem de erro
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