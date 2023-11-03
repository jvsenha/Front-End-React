import "../../assets/style.css"
import Sidebar from "../../components/Sidebar";
import Input from '../../components/Input';
import Button from '../../components/Button';
import LinkButton from '../../components/Link-Button';
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

const ConfiguracoesAdm = () => {
    const { idUser } = useParams();
    // Estado para os campos do formulário
    const [nomeUser, setNomeUser] = useState("");
    const [smtpEmpresa, setSmtpEmpresa] = useState("");
    const [login, setLogin] = useState("");
    const [senhaUser, setSenhaUser] = useState("");
    const [portaEmpresa, setPortaEmpresa] = useState("");

    // useEffect para carregar os dados do cliente
    useEffect(() => {
        const token = localStorage.getItem('token');
        fetch(`http://localhost:8080/empresa/carregar/${idUser}`, {
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
                setSmtpEmpresa(retorno_convert.smtpEmpresa);
                setLogin(retorno_convert.login);
                setSenhaUser(retorno_convert.senhaUser);
                setPortaEmpresa(retorno_convert.portaEmpresa);
            })
            .catch(error => console.error('Error fetching cliente:', error));
    }, [idUser]); // Certifique-se de definir idUser antes de usar neste useEffect

    // Função para lidar com a submissão do formulário
    const alterar = () => {

        // Lógica para enviar os dados atualizados para o servidor
        const dadosAtualizados = {
            idUser: idUser,
            nomeUser,
            smtpEmpresa,
            login,
            senhaUser,
            portaEmpresa,
            role: "EMP"
        };


        const token = localStorage.getItem('token');
        fetch(`http://localhost:8080/empresa/alterar/${idUser}`, {
            method: 'PUT',
            body: JSON.stringify(dadosAtualizados),
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

            .then(retorno => retorno.json())
            .then(retorno_convert => {
                if (retorno_convert.message !== undefined) {
                    alert(retorno_convert.message);
                    window.location.reload()
                }
            });
    }

    const voltar = () => {
        // Usando window.history.back() ou window.history.go(-1) para voltar
        window.history.back();
      };

    return (
        <>

            <Sidebar page="Configurações" />

            < div className="Main-cadC">
                <form className="Form">
                    <div className="input-cad">
                        <Input placeholder="Nome" label="Nome" name="nomeUser" eventoTeclado={e => setNomeUser(e.target.value)} obj={nomeUser} />
                    </div>
                    <div className="input-cad">
                        <Input className="input-cad" placeholder="Nome de Usuario" name="login" label="Nome de Usuario" eventoTeclado={e => setLogin(e.target.value)} obj={login} />

                    </div>

                    <div className="button">
                        <Button nome="Alterar" classname="Alterar" funcao={alterar} />
                        <Button nome="Voltar"  funcao={voltar} />
                
                    </div>
                </form>

            </div>

        </>
    )
}

export { ConfiguracoesAdm };